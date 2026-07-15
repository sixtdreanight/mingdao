'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, UserProfile } from '@/types';
import { MessageBubble } from './MessageBubble';
import { ProfileCard } from './ProfileCard';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: `嗨！我是 Career Maze 的规划助手 👋

我不会替你决定走哪条路，但我会一步步帮你理清每一条路的真实样貌——代价、回报、风险、日常，都摆在你面前。

我们先从最简单的问题开始吧：

**你目前大几？学的是什么专业？**`,
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
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, aiMsg]);

        // 更新角色卡
        if (json.data.profile) {
          setProfile((prev) => mergeProfile(prev, json.data.profile));
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '抱歉，我现在暂时无法回答。请稍后再试。',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '网络似乎不太稳定，请检查连接后重试。',
          timestamp: new Date().toISOString(),
        },
      ]);
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
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-2xl flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Profile Card — shown after first user message */}
        {messages.length > 1 && (
          <div className="mb-4">
            <ProfileCard profile={profile} />
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-500" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:0.1s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的回答..."
            rows={2}
            className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            发送
          </button>
        </div>
        <p className="mt-1.5 text-center text-xs text-gray-400">
          AI 仅基于知识库数据推理，不会替你做决定。数据来源可追溯。
        </p>
      </div>
    </div>
  );
}

/** 深度合并两个 profile，新值覆盖旧值，数组字段合并去重 */
function mergeProfile(
  old: Partial<UserProfile>,
  incoming: Partial<UserProfile>
): Partial<UserProfile> {
  const merged = { ...old };

  for (const key of Object.keys(incoming) as (keyof UserProfile)[]) {
    const newVal = incoming[key];
    if (newVal === undefined || newVal === null) continue;

    if (Array.isArray(newVal) && Array.isArray(merged[key])) {
      // 合并数组字段（去重）
      const existing = merged[key] as string[];
      const incoming_arr = newVal as string[];
      const combined = [...existing];
      for (const item of incoming_arr) {
        if (!combined.includes(item)) combined.push(item);
      }
      (merged as Record<string, unknown>)[key] = combined;
    } else if (Array.isArray(newVal)) {
      (merged as Record<string, unknown>)[key] = [...(newVal as string[])];
    } else {
      // 字符串/数字直接覆盖
      (merged as Record<string, unknown>)[key] = newVal;
    }
  }

  return merged;
}
