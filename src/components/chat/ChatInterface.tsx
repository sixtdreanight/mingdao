'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, UserProfile } from '@/types';
import { MessageBubble } from './MessageBubble';
import { ProfileCard } from './ProfileCard';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: `嗨，我是 Career Maze 的决策教练 👋

我的职责不是给你答案，而是帮你**学会判断**一条路适不适合自己。

我们先从最简单的开始：

**你现在大几？学什么专业？**`,
  timestamp: new Date().toISOString(),
};

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        const aiMsg: ChatMessage = {
          role: 'assistant',
          content: json.data.reply,
          sources: json.data.sources,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (json.data.profile) {
          setProfile((prev) => mergeProfile(prev, json.data.profile));
        }
      } else {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: '抱歉，我现在暂时无法回答。请稍后再试。',
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: '网络似乎不太稳定，请检查连接后重试。',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {messages.length > 1 && (
          <div className="mb-6">
            <ProfileCard profile={profile} />
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {loading && (
          <div className="mb-5 flex justify-start">
            <div className="max-w-[82%]">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-brass/60">教练</span>
                <span className="h-px flex-1 bg-paper-line" />
              </div>
              <div className="rounded-r-xl rounded-bl-md border-l-[3px] border-brass/40 bg-white px-4 py-3 shadow-card">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-brass/50" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-brass/50 [animation-delay:0.12s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-brass/50 [animation-delay:0.24s]" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-paper-line bg-white/60 px-5 py-3 backdrop-blur-sm">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的回答..."
            rows={2}
            className="flex-1 resize-none rounded-xl border border-paper-line bg-white px-4 py-2.5 text-sm text-ink placeholder-ink-faint transition-colors focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/20"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-paper-warm transition-all hover:bg-walnut-light disabled:cursor-not-allowed disabled:opacity-20"
          >
            发送
          </button>
        </div>
        <p className="mt-1.5 text-center text-[11px] text-ink-faint">
          决策教练 · 教你怎么判断，不替你做决定
        </p>
      </div>
    </div>
  );
}

function mergeProfile(old: Partial<UserProfile>, incoming: Partial<UserProfile>): Partial<UserProfile> {
  const merged = { ...old };
  for (const key of Object.keys(incoming) as (keyof UserProfile)[]) {
    const newVal = incoming[key];
    if (newVal === undefined || newVal === null) continue;
    if (Array.isArray(newVal) && Array.isArray(merged[key])) {
      const existing = merged[key] as string[];
      const combined = [...existing];
      for (const item of newVal as string[]) {
        if (!combined.includes(item)) combined.push(item);
      }
      (merged as Record<string, unknown>)[key] = combined;
    } else if (Array.isArray(newVal)) {
      (merged as Record<string, unknown>)[key] = [...(newVal as string[])];
    } else {
      (merged as Record<string, unknown>)[key] = newVal;
    }
  }
  return merged;
}
