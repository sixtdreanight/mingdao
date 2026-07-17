'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, TrendingUp, GraduationCap, Clock, MapPin, X } from 'lucide-react';

interface Career {
  title: string; industry: string; salaryRange: [number, number]; education: string; experience: string; outlook: 'rising' | 'stable' | 'declining'; cities: string[]; tags: string[]; desc: string;
}

const CAREERS: Career[] = [
  { title:'算法工程师', industry:'互联网/AI', salaryRange:[25000,60000], education:'硕士及以上', experience:'0-3年', outlook:'rising', cities:['北京','上海','深圳','杭州'], tags:['AI','高薪','技术'], desc:'设计实现机器学习算法，大模型应用落地需求爆发式增长' },
  { title:'集成电路工程师', industry:'半导体', salaryRange:[20000,50000], education:'硕士及以上', experience:'0-3年', outlook:'rising', cities:['上海','北京','深圳','无锡'], tags:['芯片','硬科技','高薪'], desc:'芯片设计/验证/测试，国产替代带来巨大人才缺口' },
  { title:'数据科学家', industry:'互联网/金融', salaryRange:[18000,45000], education:'硕士及以上', experience:'1-5年', outlook:'rising', cities:['北京','上海','深圳','杭州'], tags:['大数据','AI','高薪'], desc:'从海量数据中提取商业洞察，金融和互联网需求最大' },
  { title:'产品经理', industry:'互联网', salaryRange:[15000,35000], education:'本科及以上', experience:'1-5年', outlook:'stable', cities:['北京','上海','深圳','杭州'], tags:['互联网','综合','沟通'], desc:'定义产品方向，协调技术、设计、运营，是团队中枢' },
  { title:'网络安全工程师', industry:'信息安全', salaryRange:[15000,35000], education:'本科及以上', experience:'1-5年', outlook:'rising', cities:['北京','上海','深圳','成都'], tags:['安全','技术','稳定'], desc:'企业数字化转型带来安全需求激增，人才缺口持续扩大' },
  { title:'电气工程师', industry:'电力/能源', salaryRange:[12000,28000], education:'本科及以上', experience:'0-5年', outlook:'rising', cities:['北京','上海','广州','武汉'], tags:['能源','稳定','绿牌'], desc:'新能源和智能电网建设推动需求增长，2026绿牌专业' },
  { title:'临床医生', industry:'医疗健康', salaryRange:[10000,30000], education:'硕士及以上(规培)', experience:'3-8年', outlook:'stable', cities:['北京','上海','广州','成都'], tags:['医疗','稳定','高门槛'], desc:'需要规培+执业医师资格，周期长但职业稳定性和社会地位高' },
  { title:'律师(诉讼)', industry:'法律服务', salaryRange:[12000,40000], education:'本科+法考', experience:'2-5年', outlook:'stable', cities:['北京','上海','深圳','广州'], tags:['法律','高门槛','专业'], desc:'需通过法律职业资格考试，诉讼方向竞争激烈但回报可观' },
  { title:'注册会计师', industry:'财务审计', salaryRange:[10000,30000], education:'本科+CPA', experience:'2-5年', outlook:'stable', cities:['北京','上海','深圳','广州'], tags:['财务','证书','稳定'], desc:'四大/内资所/企业财务三条路径，CPA是硬门槛' },
  { title:'教师(高校)', industry:'教育', salaryRange:[8000,20000], education:'博士优先', experience:'0-3年', outlook:'stable', cities:['北京','上海','南京','武汉'], tags:['教育','稳定','学术'], desc:'高校教职竞争激烈，但寒暑假+稳定编制是核心吸引力' },
  { title:'公务员/选调生', industry:'政府/公共管理', salaryRange:[8000,15000], education:'本科及以上', experience:'0-1年', outlook:'stable', cities:['北京','上海','广州','成都'], tags:['体制','稳定','综合'], desc:'国考/省考/选调三条路径，社会地位高，计算机专业需求增加' },
  { title:'金融分析师', industry:'金融', salaryRange:[15000,40000], education:'硕士优先+CFA', experience:'1-5年', outlook:'stable', cities:['北京','上海','深圳','香港'], tags:['金融','高薪','证书'], desc:'投行/券商/基金/银行多条路径，CFA/FRM证书加分显著' },
  { title:'建筑师', industry:'建筑/设计', salaryRange:[10000,25000], education:'本科+注册建筑师', experience:'3-8年', outlook:'declining', cities:['北京','上海','深圳','广州'], tags:['设计','证书','周期长'], desc:'房地产下行影响需求，但绿色建筑和城市更新有转机' },
  { title:'新媒体运营', industry:'传媒/互联网', salaryRange:[8000,20000], education:'本科及以上', experience:'0-3年', outlook:'rising', cities:['北京','上海','杭州','广州'], tags:['内容','互联网','创意'], desc:'短视频+直播赛道持续扩大，内容能力和数据分析并重' },
  { title:'心理咨询师', industry:'健康/教育', salaryRange:[8000,25000], education:'硕士+执业资格', experience:'2-5年', outlook:'rising', cities:['北京','上海','深圳','成都'], tags:['健康','成长','专业'], desc:'年轻人心理健康意识提升，需求快速增长但执业门槛不低' },
  { title:'机械工程师', industry:'制造/汽车', salaryRange:[10000,25000], education:'本科及以上', experience:'0-5年', outlook:'rising', cities:['上海','深圳','苏州','重庆'], tags:['制造','技术','绿牌'], desc:'智能制造+新能源汽车推动需求，绿牌专业之一' },
];

const INDUSTRIES = [...new Set(CAREERS.map(c => c.industry))];
const OUTLOOK_MAP = { rising: '📈 上升', stable: '➡️ 稳定', declining: '📉 下降' };

export function CareerExplorer() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState<string | null>(null);
  const [outlook, setOutlook] = useState<string | null>(null);
  const [minSalary, setMinSalary] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => CAREERS.filter(c => {
    if (search && !c.title.includes(search) && !c.tags.some(t => t.includes(search)) && !c.industry.includes(search)) return false;
    if (industry && c.industry !== industry) return false;
    if (outlook && c.outlook !== outlook) return false;
    if (minSalary && c.salaryRange[0] < minSalary) return false;
    return true;
  }), [search, industry, outlook, minSalary]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">职业探索</h2>
          <p className="mt-1 text-sm text-muted-foreground">{CAREERS.length} 个职业方向，筛选找到适合你的路</p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 shadow-sm">
              <Search className="h-4 w-4 text-muted-foreground/40" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索职业、行业、标签..." className="flex-1 bg-transparent text-sm outline-none" />
              {search && <button onClick={() => setSearch('')}><X className="h-4 w-4 text-muted-foreground/40" /></button>}
            </div>
            <select value={minSalary || ''} onChange={e => setMinSalary(Number(e.target.value))}
              className="rounded-xl border border-border/60 bg-card px-3 py-2.5 text-sm text-foreground outline-none">
              <option value="">薪资不限</option>
              <option value="10000">¥10k+</option><option value="15000">¥15k+</option><option value="20000">¥20k+</option><option value="25000">¥25k+</option>
            </select>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button onClick={() => setIndustry(null)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${!industry ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>全部行业</button>
            {INDUSTRIES.map(i => (
              <button key={i} onClick={() => setIndustry(i === industry ? null : i)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors ${i === industry ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{i}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="text-xs text-muted-foreground mb-3">{filtered.length} 个结果</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((c, i) => (
            <div key={c.title} className={`rounded-2xl border border-border/20 bg-card p-5 card-hover card-enter card-enter-${Math.min(i+1, 6)} cursor-pointer ${expanded === c.title ? 'ring-2 ring-primary/20' : ''}`}
              onClick={() => setExpanded(expanded === c.title ? null : c.title)}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.industry}</p>
                </div>
                <span className="text-xs font-medium text-primary">{OUTLOOK_MAP[c.outlook]}</span>
              </div>
              {expanded === c.title && (
                <div className="mt-3 pt-3 border-t border-border/10 space-y-2">
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary/60 px-2 py-1 text-[10px]"><GraduationCap className="h-3 w-3 text-muted-foreground/50"/>{c.education}</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary/60 px-2 py-1 text-[10px]"><Clock className="h-3 w-3 text-muted-foreground/50"/>{c.experience}</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">¥{c.salaryRange[0]/1000}k-{c.salaryRange[1]/1000}k</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.cities.map(city => (<span key={city} className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/70"><MapPin className="h-2.5 w-2.5"/>{city}</span>))}
                  </div>
                </div>
              )}
              {expanded !== c.title && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.tags.map(t => (<span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>))}
                  <span className="ml-auto text-[10px] font-medium text-primary">¥{c.salaryRange[0]/1000}k-{c.salaryRange[1]/1000}k</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
