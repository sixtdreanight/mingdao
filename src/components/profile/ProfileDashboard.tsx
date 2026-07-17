'use client';

import { useState, useEffect } from 'react';
import type { UserProfile } from '@/types';
import { ProfileCard } from '@/components/chat/ProfileCard';
import { CompetencyCard } from '@/components/chat/CompetencyCard';
import type { OccupationCompetencyProfile, StudentCompetencyProfile, SelfAssessment, ProficiencyLevel } from '@/types/competency';
import { batchMatch } from '@/lib/resource-matcher';

export function ProfileDashboard() {
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [competencyProfile, setCompetencyProfile] = useState<OccupationCompetencyProfile | null>(null);
  const [studentCompetency, setStudentCompetency] = useState<StudentCompetencyProfile>({ selfAssessments: [], inferredSignals: [] });
  const [showCompetency, setShowCompetency] = useState(false);
  const [competencyLoading, setCompetencyLoading] = useState(false);
  const [competencyOccupation, setCompetencyOccupation] = useState('');
  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem('mingdao-competency');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.studentCompetency) setStudentCompetency(parsed.studentCompetency);
          if (parsed.competencyProfile) { setCompetencyProfile(parsed.competencyProfile); setShowCompetency(true); }
        }
        const profileSaved = localStorage.getItem('mingdao-profile');
        if (profileSaved) setProfile(JSON.parse(profileSaved));
        const activities = JSON.parse(localStorage.getItem('mingdao-activity') || '[]');
        setActivityCount(activities.length);
      } catch { /* ignore */ }
    };
    load();
    // 监听自定义事件 — ChatInterface 写入时触发
    window.addEventListener('profile-updated', load);
    window.addEventListener('storage', load);
    return () => {
      window.removeEventListener('profile-updated', load);
      window.removeEventListener('storage', load);
    };
  }, []);

  const handleAssess = (competencyId: string, level: ProficiencyLevel, evidence: string) => {
    setStudentCompetency((prev) => {
      const existing = prev.selfAssessments.findIndex((a) => a.competencyId === competencyId);
      const assessment: SelfAssessment = { competencyId, currentLevel: level, evidence, lastUpdated: new Date().toISOString() };
      const selfAssessments = existing >= 0
        ? prev.selfAssessments.map((a, i) => (i === existing ? assessment : a))
        : [...prev.selfAssessments, assessment];
      const updated = { ...prev, selfAssessments };
      localStorage.setItem('mingdao-competency', JSON.stringify({ studentCompetency: updated, competencyProfile }));
      return updated;
    });
  };

  const handleGenerate = async () => {
    const occupation = competencyOccupation.trim();
    if (!occupation) return;
    setCompetencyLoading(true);
    try {
      const res = await fetch('/api/competency', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ occupation }) });
      const json = await res.json();
      if (json.success && json.data) {
        setCompetencyProfile(json.data);
        setStudentCompetency((prev) => {
          const updated = { ...prev, targetCareer: occupation };
          localStorage.setItem('mingdao-competency', JSON.stringify({ studentCompetency: updated, competencyProfile: json.data }));
          return updated;
        });
        setShowCompetency(true);
      }
    } catch { /* ignore */ }
    finally { setCompetencyLoading(false); }
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">个人画像</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 角色卡 */}
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">角色卡</h3>
          <ProfileCard profile={profile} />
        </div>

        {/* 能力画像入口 */}
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">能力画像</h3>
          {showCompetency && competencyProfile ? (
            <CompetencyCard
              profile={competencyProfile}
              selfAssessments={studentCompetency.selfAssessments}
              onAssess={handleAssess}
              onViewResources={() => {}}
              onRefresh={() => { setShowCompetency(false); setCompetencyProfile(null); setCompetencyOccupation(''); localStorage.removeItem('mingdao-competency'); }}
            />
          ) : (
            <div className="rounded-lg border border-dashed border-border/60 bg-card/40 px-4 py-3">
              <p className="mb-2 text-xs text-muted-foreground">生成目标职业的能力画像</p>
              <div className="flex gap-2">
                <input
                  value={competencyOccupation}
                  onChange={(e) => setCompetencyOccupation(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
                  placeholder="输入目标职业，如：律师..."
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                  disabled={competencyLoading}
                />
                <button
                  onClick={handleGenerate}
                  disabled={competencyLoading || !competencyOccupation.trim()}
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-30"
                >
                  {competencyLoading ? '生成中...' : '查看能力需求'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 成长轨迹 */}
      <div className="mt-8">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">成长轨迹</h3>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="对话次数" value={String(activityCount)} />
          <StatCard label="能力评估" value={String(studentCompetency.selfAssessments.length)} />
          <StatCard label="资源收藏" value="—" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 text-center shadow-sm">
      <p className="text-2xl font-bold text-foreground font-serif-hero">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
