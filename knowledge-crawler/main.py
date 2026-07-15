"""Career Maze 知识库爬虫 — 主流水线。

借鉴 weekly-hotspot 架构，增强为四层管道：

Phase 0: 数据获取（双通道并行）
  - Channel A: 搜索引擎 (DDG + Bing) → 动态搜索词 → 返回搜索结果
  - Channel B: 权威数据源 → 已知 URL 直接抓取 → 返回结构化文本

Phase 1: AI 提取 → KnowledgeAtom
Phase 2: 质量验证（结构 + 数值边界 + AI 交叉验证）
Phase 3: 输出 .ts 文件（只写质量分 ≥ 阈值）

两种模式：
  1. 动态模式 (--profile): 根据用户画像生成搜索词，千人千面
  2. 批量模式 (默认): 使用预设的 CS 专业搜索词做种子数据

用法:
  # 动态模式 — 根据用户画像爬取
  python main.py --profile '{"major":"金融学","targetCity":"上海","budget":200000}'

  # 批量模式 — 预设搜索词
  python main.py                          # 全量运行
  python main.py --category salary        # 只爬薪资
  python main.py --dry-run                # 预演
  python main.py --min-score 70           # 提高质量阈值
"""

import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Optional

from chinese_scraper_utils import DeepSeekClient  # type: ignore

from config import (
    ALL_SOURCES,
    DEEPSEEK_API_KEY,
    DEEPSEEK_MODEL,
    KB_DIR,
    CACHE_DIR,
)
from search import search_knowledge_data
from scrape import AUTHORITATIVE_SOURCES, scrape_target
from extract import extract_atom
from validate import validate_atom
from output import write_atom_file
from query_builder import UserContext, build_search_queries
from query_expander import build_expanded_queries, ExpandedQuery


def main(argv: list[str] | None = None):
    args = parse_args(argv or sys.argv[1:])

    if not DEEPSEEK_API_KEY:
        print("错误: 请设置 DEEPSEEK_API_KEY 环境变量")
        sys.exit(1)

    client = DeepSeekClient(DEEPSEEK_API_KEY, model=DEEPSEEK_MODEL)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    total_atoms = 0
    passed_atoms = 0
    rejected_atoms = 0
    all_new_ids: list[tuple[str, str, int]] = []  # [(id, category, score)]

    # === 动态模式：根据用户画像生成搜索词 ===
    if args.profile:
        ctx = _parse_profile(args.profile)
        print(f"\n🎯 动态模式 — 用户画像:")
        print(f"   专业: {ctx.major or '未知'}")
        print(f"   城市: {ctx.target_city or '未知'}")
        print(f"   预算: {ctx.budget or '未知'}")
        print(f"   兴趣: {ctx.interests or '未知'}")
        print(f"   层次: {ctx.university_tier or '未知'}")

        # 扩展查询维度
        expanded = build_expanded_queries(
            user_city=ctx.target_city,
            user_major=ctx.major,
            user_budget=ctx.budget,
        )
        print(f"\n  扩展结果:")
        for dim, queries in expanded.items():
            exact = [q for q in queries if q.priority == "exact"]
            ext = [q for q in queries if q.priority == "extended"]
            print(f"    [{dim}] 精确: {[e.query for e in exact]}")
            if ext:
                print(f"    [{dim}] 扩展: {[e.query for e in ext]} ({ext[0].reason})")

        # 用扩展后的城市/专业生成搜索词
        # 策略：精确匹配的每个组合都搜，扩展匹配的只搜核心维度
        exact_cities = [q.query for q in expanded.get("city", []) if q.priority == "exact"]
        extended_cities = [q.query for q in expanded.get("city", []) if q.priority == "extended"]
        exact_majors = [q.query for q in expanded.get("major", []) if q.priority == "exact"]
        extended_majors = [q.query for q in expanded.get("major", []) if q.priority == "extended"]

        # 构建搜索词：精确城市 × 精确专业（全维度）
        primary_ctx = UserContext(
            major=exact_majors[0] if exact_majors else ctx.major,
            grade=ctx.grade,
            university_tier=ctx.university_tier,
            target_city=exact_cities[0] if exact_cities else ctx.target_city,
            budget=ctx.budget,
            interests=ctx.interests,
            lifestyle=ctx.lifestyle,
            red_lines=ctx.red_lines,
        )
        primary_queries = build_search_queries(primary_ctx, args.category and [args.category])

        # 构建搜索词：扩展城市 × 精确专业（salary + employment）
        extended_queries: dict[str, list[str]] = {}
        for ext_city in extended_cities:
            ext_ctx = UserContext(
                major=exact_majors[0] if exact_majors else ctx.major,
                target_city=ext_city,
                budget=ctx.budget,
            )
            ext_qs = build_search_queries(ext_ctx, ["salary", "employment"])
            for cat, qs in ext_qs.items():
                if cat not in extended_queries:
                    extended_queries[cat] = []
                # 标记为扩展参考
                extended_queries[cat].extend(qs)

        # 构建搜索词：精确城市 × 扩展专业（salary + trend）
        for ext_major in extended_majors:
            ext_ctx = UserContext(
                major=ext_major,
                target_city=exact_cities[0] if exact_cities else ctx.target_city,
            )
            ext_qs = build_search_queries(ext_ctx, ["salary", "trend"])
            for cat, qs in ext_qs.items():
                if cat not in extended_queries:
                    extended_queries[cat] = []
                extended_queries[cat].extend(qs)

        # 合并：精确查询 + 扩展查询
        all_queries: dict[str, list[tuple[str, str]]] = {}  # cat → [(query, priority)]
        for cat, qs in primary_queries.items():
            all_queries.setdefault(cat, []).extend((q, "exact") for q in qs)
        for cat, qs in extended_queries.items():
            all_queries.setdefault(cat, []).extend((q, "extended") for q in qs)

        # 转为 sources 格式（去重）
        sources = [
            {"category": cat, "search_queries": list(dict.fromkeys(q for q, _ in qs))}
            for cat, qs in all_queries.items() if qs
        ]

        print(f"\n  搜索计划:")
        for src in sources:
            exact_count = sum(1 for q, p in all_queries.get(src["category"], []) if p == "exact")
            ext_count = len(src["search_queries"]) - exact_count
            print(f"    [{src['category']}] {exact_count} 精确 + {ext_count} 扩展")
            for q in src["search_queries"][:3]:
                tag = "🎯" if any(q == q2 and p == "exact" for q2, p in all_queries.get(src["category"], [])) else "📎"
                print(f"      {tag} {q[:60]}")
            if len(src["search_queries"]) > 3:
                print(f"      ... 还有 {len(src['search_queries']) - 3} 个")

        if args.category:
            authoritative = [
                s for s in AUTHORITATIVE_SOURCES if s.category == args.category
            ]
        else:
            authoritative = AUTHORITATIVE_SOURCES
    else:
        # === 批量模式：使用预设搜索词 ===
        sources = ALL_SOURCES
        authoritative = AUTHORITATIVE_SOURCES
        if args.category:
            sources = [s for s in ALL_SOURCES if s["category"] == args.category]
            authoritative = [
                s for s in AUTHORITATIVE_SOURCES if s.category == args.category
            ]
            if not sources:
                print(f"未找到类别: {args.category}")
                sys.exit(1)

    # ================================================================
    # Phase 0: 数据获取 — 搜索 + 权威抓取
    # ================================================================
    print(f"\n{'='*60}")
    print(f"Phase 0: 数据获取")
    print(f"  搜索源: {sum(len(s['search_queries']) for s in sources)} 个搜索词")
    print(f"  权威源: {len(authoritative)} 个已知 URL")
    print(f"{'='*60}")

    all_raw_data: list[dict] = []  # {category, source, results}

    # Channel A: 搜索
    if not args.skip_scrape_authoritative:
        print("\n--- Channel A: 搜索引擎 ---")
        for src in sources:
            category = src["category"]
            for i, query in enumerate(src["search_queries"]):
                cache_key = f"search_{category}_{_safe_filename(query[:50])}"
                cache_file = CACHE_DIR / f"{cache_key}.json"

                if args.skip_search and cache_file.exists():
                    results = json.loads(cache_file.read_text("utf-8"))
                    print(f"  [{category}] 缓存: {query[:50]}... ({len(results)} 条)")
                elif not args.skip_search:
                    results = search_knowledge_data(query, max_results=8)
                    print(f"  [{category}] 搜索: {query[:50]}... ({len(results)} 条)")
                    cache_file.write_text(
                        json.dumps(results, ensure_ascii=False, indent=2),
                        encoding="utf-8",
                    )
                else:
                    continue

                if results:
                    all_raw_data.append({
                        "category": category,
                        "source": f"search:{query[:50]}",
                        "results": results,
                    })

    # Channel B: 权威数据源直接抓取
    if not args.skip_search and authoritative:
        print("\n--- Channel B: 权威数据源直接抓取 ---")
        for target in authoritative:
            cache_file = CACHE_DIR / f"scrape_{_safe_filename(target.name)}.json"

            if not args.skip_cache and cache_file.exists():
                text = cache_file.read_text("utf-8")
                print(f"  [{target.category}] 缓存: {target.name}")
            else:
                text = scrape_target(target)
                if text:
                    cache_file.write_text(text, encoding="utf-8")

            if text:
                all_raw_data.append({
                    "category": target.category,
                    "source": f"scrape:{target.name}",
                    "results": [{
                        "title": target.name,
                        "url": target.url,
                        "snippet": text[:500],
                    }],
                    "full_text": text,
                    "trust_level": target.trust_level,
                })

    if not all_raw_data:
        print("\n无可用数据，退出。")
        sys.exit(1)

    print(f"\n  总计获取 {len(all_raw_data)} 组原始数据")

    # ================================================================
    # Phase 1: AI 提取 + Phase 2: 质量验证
    # ================================================================
    print(f"\n{'='*60}")
    print(f"Phase 1-2: AI 提取 + 质量验证")
    print(f"{'='*60}")

    for idx, raw in enumerate(all_raw_data):
        category = raw["category"]
        results = raw["results"]
        source = raw["source"]
        full_text = raw.get("full_text", "")
        trust_level = raw.get("trust_level", "ai-inferred")

        print(f"\n[{category}] ({idx+1}/{len(all_raw_data)}) {source}")

        # Phase 1: AI 提取
        # 如果有完整文本（权威抓取），将其注入搜索结果
        if full_text:
            results_for_extract = list(results)
            results_for_extract[0] = {
                **results_for_extract[0],
                "snippet": full_text[:2000],
            }
        else:
            results_for_extract = results

        atom_data = extract_atom(client, category, results_for_extract)
        if not atom_data:
            print("  提取失败")
            continue

        # 权威源的数据标注为 official
        if trust_level == "official":
            atom_data["trustLevel"] = "official"

        print(f"  提取: {atom_data.get('title', 'N/A')}")

        # Phase 2: 质量验证
        passed, issues, score = validate_atom(client, atom_data, min_score=args.min_score)

        if issues:
            for issue in issues[:3]:  # 只显示前 3 个
                print(f"  {'⚠️' if passed else '❌'} {issue}")

        print(f"  质量评分: {score}/100 {'✅ 通过' if passed else '❌ 拒绝'}")

        total_atoms += 1

        if not passed:
            rejected_atoms += 1
            continue

        # Phase 3: 输出
        passed_atoms += 1
        if not args.dry_run:
            file_path = write_atom_file(atom_data, KB_DIR)
            if file_path:
                all_new_ids.append((atom_data["id"], category, score))
        else:
            all_new_ids.append((atom_data["id"], category, score))

    # ================================================================
    # 汇总
    # ================================================================
    print(f"\n{'='*60}")
    print(f"流水线完成")
    print(f"{'='*60}")
    print(f"  总提取: {total_atoms}")
    print(f"  通过:   {passed_atoms} (质量分 ≥ {args.min_score})")
    print(f"  拒绝:   {rejected_atoms}")
    print(f"  通过率: {passed_atoms/max(total_atoms,1)*100:.0f}%")

    if all_new_ids:
        print(f"\n通过质量验证的条目（需添加到 src/data/knowledge/index.ts）：\n")
        for atom_id, cat, score in sorted(all_new_ids, key=lambda x: -x[2]):
            print(f"  [{score:3d}] '{atom_id}': () => import('./{cat}/{atom_id}'),")

    cost = client.total_cost if hasattr(client, "total_cost") else 0
    print(f"\nAPI 费用: ${cost:.4f}")


def parse_args(argv: list[str]) -> "argparse.Namespace":
    import argparse

    parser = argparse.ArgumentParser(description="Career Maze 知识库数据爬虫")
    parser.add_argument(
        "--profile", "-p", type=str,
        help='用户画像 JSON，动态生成搜索词。例如: \'{"major":"金融学","targetCity":"上海"}\'',
    )
    parser.add_argument("--category", "-c", type=str, help="只爬取指定类别")
    parser.add_argument("--dry-run", action="store_true", help="预演，不写入文件")
    parser.add_argument("--skip-search", action="store_true", help="跳过搜索，仅用缓存")
    parser.add_argument("--skip-cache", action="store_true", help="跳过缓存，强制重新获取")
    parser.add_argument(
        "--skip-scrape-authoritative", action="store_true",
        help="跳过权威源直接抓取（仅搜索）",
    )
    parser.add_argument(
        "--min-score", type=int, default=60,
        help="最低质量评分阈值（默认 60）",
    )
    return parser.parse_args(argv)


def _parse_profile(json_str: str) -> UserContext:
    """解析 --profile JSON 参数。"""
    data = json.loads(json_str)
    return UserContext(
        major=data.get("major", ""),
        grade=data.get("grade", ""),
        university_tier=data.get("universityTier", ""),
        target_city=data.get("targetCity", ""),
        budget=data.get("householdBudget", 0) or data.get("budget", 0),
        interests=data.get("interests", []),
        lifestyle=data.get("lifestyle", []),
        red_lines=data.get("redLines", []),
    )


def _safe_filename(text: str) -> str:
    """将文本转为安全的文件名片段。"""
    import re
    text = re.sub(r'[^\w一-鿿]', '_', text)
    return text[:60]


if __name__ == "__main__":
    main()
