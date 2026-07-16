'use client';
import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, UserProfile } from '@/types';
import { MessageBubble } from './MessageBubble';
import { ProfileCard } from './ProfileCard';
import { CompetencyCard } from './CompetencyCard';
import type {
  OccupationCompetencyProfile,
  StudentCompetencyProfile,
  SelfAssessment,
  ProficiencyLevel,
} from '@/types/competency';
import { batchMatch } from '@/lib/resource-matcher';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant', timestamp: new Date().toISOString(),
  content: `嗨，我是 Career Maze 的决策助手 👋\n\n我的职责不是给你答案，而是帮你**学会判断**一条路适不适合自己。\n\n我们从最简单的开始：\n\n**你现在大几？学什么专业？**`,
};

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [competencyProfile, setCompetencyProfile] = useState<OccupationCompetencyProfile | null>(null);
  const [studentCompetency, setStudentCompetency] = useState<StudentCompetencyProfile>({ selfAssessments: [], inferredSignals: [] });
  const [showCompetency, setShowCompetency] = useState(false);
  const [competencyLoading, setCompetencyLoading] = useState(false);
  const [competencyOccupation, setCompetencyOccupation] = useState('');
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // localStorage key
  const COMPETENCY_STORAGE_KEY = 'mingdao-competency';

  // Restore competency data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(COMPETENCY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.studentCompetency) setStudentCompetency(parsed.studentCompetency);
        if (parsed.competencyProfile) setCompetencyProfile(parsed.competencyProfile);
        if (parsed.competencyProfile) setShowCompetency(true);
      }
    } catch { /* ignore parse errors */ }
  }, []);

  // Self-assessment callback
  const handleAssess = (competencyId: string, level: ProficiencyLevel, evidence: string) => {
    setStudentCompetency((prev) => {
      const existing = prev.selfAssessments.findIndex((a) => a.competencyId === competencyId);
      const assessment: SelfAssessment = {
        competencyId,
        currentLevel: level,
        evidence,
        lastUpdated: new Date().toISOString(),
      };
      const selfAssessments =
        existing >= 0
          ? prev.selfAssessments.map((a, i) => (i === existing ? assessment : a))
          : [...prev.selfAssessments, assessment];
      const updated = { ...prev, selfAssessments };
      localStorage.setItem(
        COMPETENCY_STORAGE_KEY,
        JSON.stringify({ studentCompetency: updated, competencyProfile })
      );
      return updated;
    });
  };

  // Generate competency profile
  const handleGenerateCompetency = async () => {
    const occupation = competencyOccupation.trim();
    if (!occupation) return;
    setCompetencyLoading(true);
    try {
      const res = await fetch('/api/competency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occupation }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCompetencyProfile(json.data);
        setStudentCompetency((prev) => {
          const updated = { ...prev, targetCareer: occupation };
          localStorage.setItem(
            COMPETENCY_STORAGE_KEY,
            JSON.stringify({ studentCompetency: updated, competencyProfile: json.data })
          );
          return updated;
        });
        setShowCompetency(true);
      }
    } catch {
      // silent failure — user can retry
    } finally {
      setCompetencyLoading(false);
    }
  };

  // View resources (for GapPanel)
  const [selectedGapId, setSelectedGapId] = useState<string | null>(null);
  const handleViewResources = (competencyId: string) => {
    setSelectedGapId((prev) => (prev === competencyId ? null : competencyId));
  };

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
        {showCompetency && competencyProfile && (
          <div className="mb-6">
            <CompetencyCard
              profile={competencyProfile}
              selfAssessments={studentCompetency.selfAssessments}
              onAssess={handleAssess}
              onViewResources={handleViewResources}
              onRefresh={() => { setShowCompetency(false); setCompetencyProfile(null); setCompetencyOccupation(''); }}
            />
          </div>
        )}
        {!showCompetency && (
          <div className="mb-4 rounded-lg border border-dashed border-border/60 bg-card/40 px-4 py-3">
            <p className="text-xs text-muted-foreground mb-2">想知道你离目标职业还差哪些能力？</p>
            <div className="flex gap-2">
              <input
                value={competencyOccupation}
                onChange={(e) => setCompetencyOccupation(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleGenerateCompetency(); }}
                placeholder="输入目标职业，如：律师、产品经理..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                disabled={competencyLoading}
              />
              <button
                onClick={handleGenerateCompetency}
                disabled={competencyLoading || !competencyOccupation.trim()}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-30"
              >
                {competencyLoading ? '生成中...' : '查看能力需求'}
              </button>
            </div>
          </div>
        )}
        {messages.map((msg, i) => (<MessageBubble key={i} message={msg} />))}
        {loading && <div className="mb-5 flex justify-start">
          <div className="max-w-[82%]"><div className="mb-1 flex items-center gap-2"><span className="text-xs font-medium uppercase tracking-wider text-primary/60">助手</span><span className="h-px flex-1 bg-border" /></div>
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
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">把路看清楚，决定你自己做</p>
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
