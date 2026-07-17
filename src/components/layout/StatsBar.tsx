'use client';

import { useEffect, useState } from 'react';

export function StatsBar() {
  const [stats, setStats] = useState({ majors: 0, cities: 0, industries: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/data/salaries.json').then(r => r.json()),
      fetch('/data/cities.json').then(r => r.json()),
      fetch('/data/industries.json').then(r => r.json()),
    ]).then(([s, c, i]) => {
      setStats({ majors: s.count || 0, cities: c.count || 0, industries: i.count || 0 });
    }).catch(() => {});
  }, []);

  return (
    <div className="flex items-center gap-4 px-6 py-2 text-[11px] text-muted-foreground/50 border-b border-border/20 bg-background/50">
      <span>📊 {stats.majors} 个专业薪资</span>
      <span>🏙️ {stats.cities} 个城市成本</span>
      <span>🏭 {stats.industries} 个行业数据</span>
    </div>
  );
}
