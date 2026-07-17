'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, MapPin, ArrowUp, ArrowDown, Info } from 'lucide-react';

interface Major {
  name: string; salary: number; industry: string;
}

const MAJORS: Major[] = [
  { name: '微电子科学与工程', salary: 7814, industry: '半导体' },
  { name: '电子科学与技术', salary: 7752, industry: '电子制造' },
  { name: '自动化', salary: 7573, industry: '工业控制' },
  { name: '信息安全', salary: 7548, industry: '网络安全' },
  { name: '软件工程', salary: 7092, industry: '互联网' },
  { name: '计算机科学与技术', salary: 6980, industry: '互联网' },
  { name: '通信工程', salary: 7249, industry: '通信设备' },
  { name: '机械工程', salary: 7401, industry: '机械制造' },
  { name: '材料科学与工程', salary: 7304, industry: '新材料' },
  { name: '电气工程及其自动化', salary: 7150, industry: '电力能源' },
  { name: '临床医学', salary: 5980, industry: '医疗健康' },
  { name: '金融学', salary: 6650, industry: '金融' },
  { name: '法学', salary: 5610, industry: '法律服务' },
  { name: '会计学', salary: 5820, industry: '财务审计' },
  { name: '数字媒体艺术', salary: 6480, industry: '创意设计' },
  { name: '翻译', salary: 6350, industry: '语言服务' },
];

const CITIES: { name: string; salary: number }[] = [
  { name: '北京', salary: 8604 }, { name: '上海', salary: 8568 },
  { name: '深圳', salary: 8320 }, { name: '杭州', salary: 7362 },
  { name: '南京', salary: 7261 }, { name: '苏州', salary: 7254 },
  { name: '广州', salary: 7057 }, { name: '宁波', salary: 7046 },
  { name: '东莞', salary: 6930 }, { name: '成都', salary: 6580 },
  { name: '武汉', salary: 6490 }, { name: '长沙', salary: 6320 },
  { name: '西安', salary: 6180 }, { name: '重庆', salary: 6050 },
];

const avg = 6435;

function Bar({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2 group">
      <span className="w-28 text-right text-[11px] text-muted-foreground truncate">{label}</span>
      <div className="flex-1 h-5 bg-secondary rounded-full overflow-hidden relative">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-16 text-[11px] font-semibold tabular-nums text-foreground">¥{value.toLocaleString()}</span>
      <span className="w-12 text-[10px] tabular-nums text-muted-foreground/50">{value > avg ? <ArrowUp className="inline h-3 w-3 text-emerald-500"/> : <ArrowDown className="inline h-3 w-3 text-red-400"/>}{Math.abs(value-avg)}</span>
    </div>
  );
}

export function SalaryCompare() {
  const [selectedMajors, setSelectedMajors] = useState<Set<string>>(new Set(MAJORS.slice(0, 5).map(m => m.name)));
  const [selectedCity, setSelectedCity] = useState('上海');

  const toggleMajor = (name: string) => {
    const next = new Set(selectedMajors);
    if (next.has(name)) { if (next.size > 1) next.delete(name); }
    else if (next.size < 8) next.add(name);
    setSelectedMajors(next);
  };

  const compareList = useMemo(() =>
    MAJORS.filter(m => selectedMajors.has(m.name)).sort((a,b) => b.salary - a.salary),
  [selectedMajors]);
  const maxSalary = Math.max(...compareList.map(m => m.salary), 1);
  const cityData = CITIES.find(c => c.name === selectedCity) || CITIES[0];

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">薪资对比</h2>
          <p className="mt-1 text-sm text-muted-foreground">选择想对比的专业，直观看到薪资差距</p>
        </div>

        {/* City selector */}
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1"><MapPin className="inline h-3.5 w-3.5"/> 参照城市：</span>
          {CITIES.slice(0, 8).map(c => (
            <button key={c.name} onClick={() => setSelectedCity(c.name)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${c.name === selectedCity ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {c.name} ¥{c.salary.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Bars */}
        <div className="mb-8 space-y-2">
          {compareList.map(m => (
            <Bar key={m.name} value={m.salary} max={maxSalary} label={m.name} color={m.salary > cityData.salary ? '#10b981' : '#f59e0b'} />
          ))}
          {/* City reference line */}
          <div className="relative mt-1 pt-2 border-t border-dashed border-border/40">
            <div className="flex items-center gap-2">
              <span className="w-28 text-right text-[10px] text-muted-foreground/50">{selectedCity} 均值</span>
              <div className="flex-1 relative">
                <div className="absolute top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-foreground/30" style={{ left: `${(cityData.salary / maxSalary) * 100}%` }} />
              </div>
              <span className="w-16 text-[11px] font-semibold tabular-nums">¥{cityData.salary.toLocaleString()}</span>
              <span className="w-12" />
            </div>
          </div>
        </div>

        {/* Major picker */}
        <div className="rounded-2xl border border-border/30 bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-xs text-muted-foreground">点击选择要对比的专业（最多8个）</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MAJORS.map(m => (
              <button key={m.name} onClick={() => toggleMajor(m.name)}
                className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                  selectedMajors.has(m.name)
                    ? 'bg-foreground text-background shadow-sm'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}>
                {m.name} {m.salary > avg ? '↑' : '↓'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
