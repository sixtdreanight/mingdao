"""Career Maze 知识库爬虫 — 主流水线。

借鉴 weekly-hotspot 架构：
Phase 0: 多源搜索
Phase 1: AI 提取结构化数据
Phase 2: 输出 .ts 原子文件 + 更新 index.ts

用法:
  python main.py                          # 全文运行
  python main.py --category salary        # 只爬薪资
  python main.py --dry-run                # 预演，不写文件
  python main.py --skip-search            # 跳过搜索，用缓存
"""

import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from chinese_scraper_utils import DeepSeekClient  # type: ignore

from config import (
    ALL_SOURCES,
    DEEPSEEK_API_KEY,
    DEEPSEEK_MODEL,
    KB_DIR,
    CACHE_DIR,
)
from search import search_knowledge_data
from extract import extract_atom
from output import write_atom_file


def main(argv: list[str] | None = None):
    args = parse_args(argv or sys.argv[1:])

    if not DEEPSEEK_API_KEY:
        print("错误: 请设置 DEEPSEEK_API_KEY 环境变量")
        sys.exit(1)

    client = DeepSeekClient(DEEPSEEK_API_KEY, model=DEEPSEEK_MODEL)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    total_atoms = 0
    all_new_ids: list[tuple[str, str]] = []

    # 筛选数据源
    sources = ALL_SOURCES
    if args.category:
        sources = [s for s in ALL_SOURCES if s["category"] == args.category]
        if not sources:
            print(f"未找到类别: {args.category}")
            sys.exit(1)

    for src in sources:
        category = src["category"]
        queries = src["search_queries"]
        print(f"\n{'='*60}")
        print(f"[{category}] 开始处理 ({len(queries)} 个搜索词)")
        print(f"{'='*60}")

        for i, query in enumerate(queries):
            print(f"\n[{category}] ({i+1}/{len(queries)}) 搜索: {query}")

            # Phase 0: 搜索
            if args.skip_search:
                # 尝试读缓存
                cache_file = CACHE_DIR / f"{category}_{i}.json"
                if cache_file.exists():
                    results = json.loads(cache_file.read_text("utf-8"))
                    print(f"  从缓存加载: {len(results)} 条")
                else:
                    print("  无缓存，跳过")
                    continue
            else:
                results = search_knowledge_data(query, max_results=8)
                print(f"  找到: {len(results)} 条")

                # 存缓存
                cache_file = CACHE_DIR / f"{category}_{i}.json"
                cache_file.write_text(
                    json.dumps(results, ensure_ascii=False, indent=2),
                    encoding="utf-8",
                )

            if not results:
                print("  无结果，跳过")
                continue

            # Phase 2: AI 提取
            print(f"  AI 提取中...")
            atom_data = extract_atom(client, category, results)
            if not atom_data:
                print("  提取失败，跳过")
                continue

            print(f"  提取成功: {atom_data.get('title', 'N/A')}")

            # Phase 3: 输出
            if not args.dry_run:
                file_path = write_atom_file(atom_data, KB_DIR)
                if file_path:
                    total_atoms += 1
                    all_new_ids.append((atom_data["id"], category))
            else:
                total_atoms += 1
                all_new_ids.append((atom_data["id"], category))

    # 汇总
    print(f"\n{'='*60}")
    print(f"完成。共生成 {total_atoms} 条原子事实。")
    print(f"{'='*60}")

    if all_new_ids:
        print("\n新增条目（需手动添加到 index.ts）：")
        for atom_id, cat in all_new_ids:
            print(f"  '{atom_id}': () => import('./{cat}/{atom_id}'),")

    cost = client.total_cost if hasattr(client, "total_cost") else 0
    print(f"\nAPI 费用: ${cost:.4f}")


def parse_args(argv: list[str]) -> "argparse.Namespace":
    import argparse

    parser = argparse.ArgumentParser(
        description="Career Maze 知识库数据爬虫",
    )
    parser.add_argument(
        "--category", "-c", type=str,
        help="只爬取指定类别 (salary/education/employment/trend/policy/cost/life)",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="预演，不写入文件",
    )
    parser.add_argument(
        "--skip-search", action="store_true",
        help="跳过搜索，仅用缓存",
    )
    return parser.parse_args(argv)


if __name__ == "__main__":
    main()
