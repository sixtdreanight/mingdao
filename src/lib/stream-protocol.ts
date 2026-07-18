/**
 * 聊天流协议解析 — 纯函数，便于测试。
 *
 * 协议：首行为 sources 元数据 JSON（`{"type":"sources",...}\n`），
 * 之后是原始正文字节（可含换行），流末尾追加 `\n[DONE]\n`。
 */

export const DONE_MARKER = '\n[DONE]';

/**
 * 从累计正文中剥离结束标记。
 * 流未结束时（final=false），扣住可能是标记前缀的尾部字符，避免闪现 "[DON"。
 */
export function stripDoneMarker(s: string, final: boolean): string {
  const idx = s.lastIndexOf(DONE_MARKER);
  if (idx >= 0 && s.slice(idx + DONE_MARKER.length).trim() === '') return s.slice(0, idx);
  if (final) return s;
  for (let k = DONE_MARKER.length - 1; k > 0; k--) {
    if (s.endsWith(DONE_MARKER.slice(0, k))) return s.slice(0, -k);
  }
  return s;
}

export interface SourcesLineResult {
  /** 解析出的元数据（未匹配时为 null） */
  meta: { sources?: unknown[]; profile?: Record<string, unknown> } | null;
  /** 剩余正文 */
  rest: string;
  /** 首行是否已完整（false = 继续等待更多字节） */
  complete: boolean;
}

/**
 * 尝试从缓冲的开头解析 sources 元数据行。
 * 首行未完整到达时返回 complete=false；首行不是元数据时整体视为正文。
 */
export function parseSourcesLine(pending: string): SourcesLineResult {
  const nl = pending.indexOf('\n');
  if (nl < 0) return { meta: null, rest: '', complete: false };
  const firstLine = pending.slice(0, nl);
  if (firstLine.startsWith('{"type":"sources"')) {
    try {
      const meta = JSON.parse(firstLine);
      return { meta, rest: pending.slice(nl + 1), complete: true };
    } catch {
      // 格式坏了 — 丢弃该行，其余视为正文
      return { meta: null, rest: pending.slice(nl + 1), complete: true };
    }
  }
  return { meta: null, rest: pending, complete: true };
}
