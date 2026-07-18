import { describe, it, expect } from 'vitest';
import { stripDoneMarker, parseSourcesLine, DONE_MARKER } from '@/lib/stream-protocol';

describe('stripDoneMarker', () => {
  it('removes complete marker', () => {
    expect(stripDoneMarker('Hello' + DONE_MARKER, true)).toBe('Hello');
  });

  it('keeps text without marker', () => {
    expect(stripDoneMarker('Hello world', true)).toBe('Hello world');
  });

  it('keeps text when marker has trailing junk', () => {
    expect(stripDoneMarker('Hello' + DONE_MARKER + ' extra', true)).toBe('Hello' + DONE_MARKER + ' extra');
  });

  it('clips possible marker prefix when not final', () => {
    // '\n[DO' is prefix of DONE_MARKER, should be hidden
    expect(stripDoneMarker('Hello\n[DO', false)).toBe('Hello');
  });

  it('does not clip when final', () => {
    // Even if it looks like a prefix, final=true returns everything
    expect(stripDoneMarker('Hello\n[DO', true)).toBe('Hello\n[DO');
  });

  it('handles empty string', () => {
    expect(stripDoneMarker('', true)).toBe('');
    expect(stripDoneMarker('', false)).toBe('');
  });
});

describe('parseSourcesLine', () => {
  it('returns incomplete when no newline', () => {
    const r = parseSourcesLine('{"type":"sources');
    expect(r.complete).toBe(false);
  });

  it('parses valid sources line', () => {
    const r = parseSourcesLine('{"type":"sources","profile":{"grade":"大三"}}\ncontent here');
    expect(r.complete).toBe(true);
    expect(r.meta?.profile?.grade).toBe('大三');
    expect(r.rest).toBe('content here');
  });

  it('handles empty sources array', () => {
    const r = parseSourcesLine('{"type":"sources","sources":[]}\nhello');
    expect(r.complete).toBe(true);
    expect(r.meta?.sources).toEqual([]);
    expect(r.rest).toBe('hello');
  });

  it('treats non-sources line as plain text', () => {
    const r = parseSourcesLine('Hello world\nmore text');
    expect(r.complete).toBe(true);
    expect(r.meta).toBeNull();
    expect(r.rest).toBe('Hello world\nmore text');
  });

  it('drops malformed JSON and treats rest as text', () => {
    const r = parseSourcesLine('{"type":"sources",broken}\nrest');
    expect(r.complete).toBe(true);
    expect(r.meta).toBeNull();
    expect(r.rest).toBe('rest');
  });
});
