"""多引擎并行搜索 — DDG + Bing，合并去重。

借鉴 weekly-hotspot 的并行搜索模式。
"""

import os
import json
import time
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Optional

from chinese_scraper_utils import search_web as _search_ddg  # type: ignore

BING_API_KEY = os.environ.get("BING_API_KEY", "")


def _search_bing(query: str, max_results: int = 10) -> list[dict]:
    """Bing Web Search API。"""
    if not BING_API_KEY:
        return []

    encoded = urllib.parse.quote(query)
    url = (
        f"https://api.bing.microsoft.com/v7.0/search"
        f"?q={encoded}&count={max_results}&mkt=zh-CN"
    )
    req = urllib.request.Request(
        url, headers={"Ocp-Apim-Subscription-Key": BING_API_KEY}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception:
        return []

    results = []
    for item in data.get("webPages", {}).get("value", [])[:max_results]:
        results.append({
            "title": item.get("name", ""),
            "url": item.get("url", ""),
            "snippet": item.get("snippet", ""),
        })
    return results


def search_knowledge_data(
    query: str, max_results: int = 10
) -> list[dict]:
    """并行搜索 DDG + Bing，URL 去重，返回合并结果。"""
    ddg_results: list[dict] = []
    bing_results: list[dict] = []

    with ThreadPoolExecutor(max_workers=2) as pool:
        ddg_future = pool.submit(_search_ddg, query, max_results)
        bing_future = (
            pool.submit(_search_bing, query, max_results)
            if BING_API_KEY
            else None
        )

        try:
            ddg_results = [
                {"title": r.title, "url": r.url, "snippet": r.snippet}
                for r in ddg_future.result()
            ]
        except Exception:
            pass

        if bing_future:
            try:
                bing_results = bing_future.result()
            except Exception:
                pass

    # URL 去重合并
    seen_urls: set[str] = set()
    merged: list[dict] = []

    for r in ddg_results + bing_results:
        url_key = r["url"].rstrip("/").lower()
        if url_key not in seen_urls:
            seen_urls.add(url_key)
            merged.append(r)

    return merged[:max_results]


def fetch_page_content(url: str, timeout: int = 15) -> Optional[str]:
    """抓取单页面文本内容。"""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0.0.0 Safari/537.36"
                )
            },
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            # 只取前 50000 字符，避免超大页面
            raw = resp.read(50000).decode("utf-8", errors="replace")
            return _strip_html(raw)
    except Exception:
        return None


def _strip_html(html: str) -> str:
    """简单去除 HTML 标签，保留文本。"""
    import re

    # 移除 script/style
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", html, flags=re.DOTALL)
    # 移除标签
    html = re.sub(r"<[^>]+>", " ", html)
    # 合并空白
    html = re.sub(r"\s+", " ", html)
    return html.strip()[:8000]  # 限制最大文本长度
