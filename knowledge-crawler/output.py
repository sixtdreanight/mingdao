"""输出 — 将提取的 KnowledgeAtom 写入 .ts 文件到知识库目录。"""

import json
from pathlib import Path
from typing import Optional

TS_TEMPLATE = """import type {{ KnowledgeAtom }} from '@/types';

const atom: KnowledgeAtom = {json_str};

export default atom;
"""


def write_atom_file(
    atom: dict,
    kb_dir: Path,
    dry_run: bool = False,
) -> Optional[Path]:
    """将一条 KnowledgeAtom 写入知识库目录。

    文件名：{category}/{id}.ts
    """
    atom_id: str = atom.get("id", "")
    category: str = atom.get("category", "other")

    if not atom_id:
        print("  [output] 跳过：缺少 id")
        return None

    # 确保目录存在
    cat_dir = kb_dir / category
    if not dry_run:
        cat_dir.mkdir(parents=True, exist_ok=True)

    file_path = cat_dir / f"{atom_id}.ts"

    # 生成 TypeScript 内容
    json_str = json.dumps(atom, ensure_ascii=False, indent=2)
    ts_content = TS_TEMPLATE.format(json_str=json_str)

    if dry_run:
        print(f"  [dry-run] 将写入: {file_path}")
        return file_path

    file_path.write_text(ts_content, encoding="utf-8")
    print(f"  [output] 写入: {file_path}")
    return file_path


def update_index_file(
    atom_ids: list[tuple[str, str]],  # [(id, category), ...]
    kb_dir: Path,
    dry_run: bool = False,
) -> None:
    """更新 index.ts 注册表，添加新的原子导入。

    注意：此函数生成新增的 import 语句。
    实际合并需要手动处理或更完善的 AST 操作。
    当前版本输出新增条目到 stdout，由操作者手动合并。
    """
    print("\n=== 以下条目需要添加到 src/data/knowledge/index.ts ===")
    print("在 atomModules 对象中添加：\n")

    for atom_id, category in atom_ids:
        print(
            f"  '{atom_id}': () =>"
            f" import('./{category}/{atom_id}'),"
        )

    print("\n=== 以上条目需要手动添加到 index.ts ===")
