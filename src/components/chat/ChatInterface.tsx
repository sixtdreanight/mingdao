'use client';
import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, UserProfile } from '@/types';
import { MessageBubble } from './MessageBubble';
import { ProfileCard } from './ProfileCard';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant', timestamp: new Date().toISOString(),
  content: `嗨，我是 Career Maze 的决策教练 👋\n\n我的职责不是给你答案，而是帮你**学会判断**一条路适不适合自己。\n\n我们从最简单的开始：\n\n**你现在大几？学什么专业？**`,
};

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    const text = input.trim(); if (!text || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: new Date().toISOString() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages); setInput(''); setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMessages }) });
      const json = await res.json();
      if (json.success && json.data) {
        setMessages(prev => [...prev, { role: 'assistant', content: json.data.reply, sources: json.data.sources, timestamp: new Date().toISOString() }]);
        if (json.data.profile) setProfile(prev => mergeProfile(prev, json.data.profile));
      } else setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，暂时无法回答。', timestamp: new Date().toISOString() }]);
    } catch { setMessages(prev => [...prev, { role: 'assistant', content: '网络不稳定，请重试。', timestamp: new Date().toISOString() }]); }
    finally { setLoading(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="chat-scroll flex-1 overflow-y-auto px-5 py-6">
        {messages.length > 1 && <div className="mb-6"><ProfileCard profile={profile} /></div>}
        {messages.map((msg, i) => (<MessageBubble key={i} message={msg} />))}
        {loading && <div className="mb-5 flex justify-start">
          <div className="max-w-[82%]"><div className="mb-1 flex items-center gap-2"><span className="text-xs font-medium uppercase tracking-wider text-primary/60">教练</span><span className="h-px flex-1 bg-border" /></div>
          <div className="rounded-r-xl rounded-bl-md border-l-[3px] border-primary/40 bg-card px-4 py-3 shadow-sm">
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 animate-bounce rounded-full bg-primary/50" /><div className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:0.12s]" /><div className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:0.24s]" /></div></div></div></div>}
        <div ref={chatEndRef} />
      </div>
      <div className="shrink-0 border-t border-border/50 bg-card/60 px-5 py-3 backdrop-blur-sm">
        <div className="flex items-end gap-2">
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="输入你的回答..." rows={2}
            className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20" disabled={loading} />
          <button onClick={handleSend} disabled={loading || !input.trim()}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-20">发送</button>
        </div>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">决策教练 · 教你怎么判断，不替你做决定</p>
      </div>
    </div>
  );
}

function mergeProfile(old: Partial<UserProfile>, incoming: Partial<UserProfile>): Partial<UserProfile> {
  const merged = { ...old };
  for (const key of Object.keys(incoming) as (keyof UserProfile)[]) {
    const newVal = incoming[key]; if (newVal === undefined || newVal === null) continue;
    if (Array.isArray(newVal) && Array.isArray(merged[key])) {
      const combined = [...(merged[key] as string[])];
      for (const item of newVal as string[]) { if (!combined.includes(item)) combined.push(item); }
      (merged as Record<string, unknown>)[key] = combined;
    } else if (Array.isArray(newVal)) { (merged as Record<string, unknown>)[key] = [...(newVal as string[])]; }
    else { (merged as Record<string, unknown>)[key] = newVal; }
  }
  return merged;
}
