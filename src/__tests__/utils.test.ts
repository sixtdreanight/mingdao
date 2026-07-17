import { describe, it, expect } from 'vitest';
import { escapeHtml, safeMarkdown, cn } from '@/lib/utils';

describe('escapeHtml', () => {
  it('escapes < > & " \'', () => {
    const input = '<script>alert("XSS")</script> &copy;';
    const out = escapeHtml(input);
    expect(out).not.toContain('<script>');
    expect(out).toContain('&lt;script&gt;');
    expect(out).toContain('&quot;XSS&quot;');
    expect(out).toContain('&amp;copy;');
  });

  it('preserves normal text', () => {
    expect(escapeHtml('Hello World 你好')).toBe('Hello World 你好');
  });
});

describe('safeMarkdown', () => {
  it('converts **bold** to strong tags safely', () => {
    const result = safeMarkdown('Hello **World**');
    expect(result).toContain('<strong class="font-semibold text-foreground">World</strong>');
  });

  it('escapes HTML in bold content', () => {
    const result = safeMarkdown('**<script>alert(1)</script>**');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('converts newlines to <br/>', () => {
    const result = safeMarkdown('line 1\nline 2');
    expect(result).toContain('<br/>');
  });
});
