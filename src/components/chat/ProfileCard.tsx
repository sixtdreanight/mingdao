'use client';
import { useState } from 'react';
import type { UserProfile } from '@/types';
interface ProfileCardProps { profile: Partial<UserProfile> }
interface FieldDef { key: keyof UserProfile; label: string; icon: string; format: (v: unknown) => string }
const FIELDS: FieldDef[] = [
  { key:'grade',label:'年级',icon:'🎓',format:v=>String(v)},{ key:'major',label:'专业',icon:'📚',format:v=>String(v)},{ key:'universityTier',label:'学校',icon:'🏫',format:v=>String(v)},{ key:'targetCity',label:'城市',icon:'📍',format:v=>String(v)},{ key:'householdBudget',label:'预算',icon:'💰',format:v=>`${(Number(v)/10000).toFixed(0)}万`},{ key:'interests',label:'兴趣',icon:'🎯',format:v=>Array.isArray(v)?(v as string[]).join('、'):String(v)},{ key:'lifestyle',label:'方式',icon:'🌿',format:v=>Array.isArray(v)?(v as string[]).join('、'):String(v)},{ key:'redLines',label:'底线',icon:'🚫',format:v=>Array.isArray(v)?(v as string[]).join('、'):String(v)},
];
const countFilled = (p: Partial<UserProfile>) => FIELDS.filter(f=>{const v=p[f.key];if(v===undefined||v===null)return false;if(typeof v==='string')return v.trim().length>0;if(typeof v==='number')return true;if(Array.isArray(v))return v.length>0;return false;}).length;

export function ProfileCard({ profile }: ProfileCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const filled = countFilled(profile), total = FIELDS.length, pct = Math.round((filled/total)*100);
  if (collapsed) return <button onClick={()=>setCollapsed(false)} className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-sm shadow-sm transition-all hover:shadow-md"><span className="text-base">📋</span><span className="font-medium text-foreground">角色卡</span><span className="text-muted-foreground">({filled}/{total})</span><span className="ml-auto text-xs text-muted-foreground">展开 ▾</span></button>;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/50 bg-secondary/50 px-4 py-2.5"><div className="flex items-center gap-2"><span className="text-base">📋</span><span className="text-sm font-semibold">角色卡</span><span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border">{filled}/{total}</span></div><button onClick={()=>setCollapsed(true)} className="rounded p-0.5 text-muted-foreground hover:text-foreground" aria-label="收起"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button></div>
      <div className="grid grid-cols-2 gap-px bg-border/30 p-3">{FIELDS.map(f=>{const v=profile[f.key];const isFilled=v!==undefined&&v!==null&&v!==''&&!(Array.isArray(v)&&v.length===0);return(<div key={f.key} className={`rounded-lg px-2.5 py-2 ${isFilled?'bg-background':'bg-background/50'}`}><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span>{f.icon}</span><span>{f.label}</span></div><div className={`mt-0.5 text-sm ${isFilled?'font-medium text-foreground':'text-muted-foreground/60'}`}>{isFilled?f.format(v):'—'}</div></div>)})}</div>
      <div className="border-t border-border/50 px-4 py-2.5"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>了解程度</span><span className={`font-medium ${filled>=6?'text-emerald-600':filled>=4?'text-primary':'text-muted-foreground'}`}>{pct}%</span></div><div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary"><div className={`h-full rounded-full transition-all duration-500 ${filled>=6?'bg-emerald-500':filled>=4?'bg-primary':'bg-border'}`} style={{width:`${pct}%`}}/></div><div className="mt-1 text-center text-xs">{filled>=6?<span className="text-emerald-600">可以开始分析了</span>:filled>=4?<span className="text-primary">继续了解中</span>:<span className="text-muted-foreground">慢慢来</span>}</div></div>
    </div>
  );
}
