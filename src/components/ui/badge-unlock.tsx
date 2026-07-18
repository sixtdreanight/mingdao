'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Share2 } from 'lucide-react';
import type { AchievementDef } from '@/lib/achievement-store';
import { ParticleCanvas } from './particle-canvas';

interface BadgeUnlockOverlayProps {
  badge: AchievementDef;
  onClose: () => void;
}

export function BadgeUnlockOverlay({ badge, onClose }: BadgeUnlockOverlayProps) {
  const [phase, setPhase] = useState<'animating' | 'visible' | 'exiting'>('animating');

  useEffect(() => {
    // Phase 1: particle burst (gold sparks)
    const t1 = setTimeout(() => setPhase('visible'), 400);
    // Auto-dismiss after 3.5s
    const t2 = setTimeout(() => setPhase('exiting'), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClose = useCallback(() => {
    setPhase('exiting');
    setTimeout(onClose, 200);
  }, [onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  }, [handleClose]);

  if (phase === 'exiting') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-200 opacity-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={`成就解锁: ${badge.title}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Particle layer */}
      <ParticleCanvas mode="gold-spark" duration={2500} />

      {/* Badge card */}
      <div
        className={`relative z-10 mx-4 max-w-xs w-full rounded-2xl bg-card p-6 text-center shadow-2xl border border-border/50 ${
          phase === 'animating' ? 'badge-unlocking' : 'spring-in'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Animated glow ring */}
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 border-2 border-amber-200 glow-pulse">
          <span className="text-4xl">{badge.icon}</span>
        </div>

        {/* Title + description */}
        <h3 className="text-lg font-bold text-foreground mb-1">
          🎉 {badge.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {badge.description}
        </p>

        {/* Category label */}
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {categoryLabel(badge.category)}
        </span>

        {/* Share hint */}
        <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1 opacity-60">
          <Share2 className="h-3 w-3" />
          去成就图鉴查看全部徽章
        </p>
      </div>
    </div>
  );
}

function categoryLabel(cat: string): string {
  switch (cat) {
    case 'route': return '路线里程碑';
    case 'streak': return '连续打卡';
    case 'explore': return '探索发现';
    case 'growth': return '成长印记';
    case 'special': return '特殊成就';
    default: return cat;
  }
}
