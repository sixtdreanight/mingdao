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
  { title:'兽医', industry:'农业/宠物', salaryRange:[8000,25000], education:'本科+执业兽医资格', experience:'1-5年', outlook:'rising', cities:['北京','上海','广州','成都'], tags:['宠物','医疗','增长'], desc:'宠物经济爆发式增长，宠物医院连锁扩张带来巨大人才缺口' },
  { title:'翻译/同声传译', industry:'语言服务', salaryRange:[10000,35000], education:'硕士优先+CATTI', experience:'2-5年', outlook:'stable', cities:['北京','上海','广州','深圳'], tags:['语言','专业','门槛高'], desc:'AI翻译冲击初级岗位，但高端口译/专业领域翻译需求稳定' },
  { title:'博物馆策展人', industry:'文化艺术', salaryRange:[8000,18000], education:'硕士及以上', experience:'3-8年', outlook:'stable', cities:['北京','上海','西安','南京'], tags:['文化','学术','稳定'], desc:'文博事业持续发展，虽然薪资不高但职业稳定性和文化价值感强' },
  { title:'环境工程师', industry:'环保/能源', salaryRange:[10000,22000], education:'本科及以上', experience:'1-5年', outlook:'rising', cities:['北京','上海','深圳','杭州'], tags:['环保','绿色','增长'], desc:'碳中和目标驱动，环保产业投资增加带来新岗位' },
  { title:'食品科学与工程', industry:'食品/快消', salaryRange:[8000,20000], education:'本科及以上', experience:'0-5年', outlook:'stable', cities:['上海','广州','天津','青岛'], tags:['食品','消费品','稳定'], desc:'民以食为天，食品研发/质检/供应链需求稳定，受经济波动影响小' },
  { title:'特殊教育教师', industry:'教育', salaryRange:[6000,15000], education:'本科+教师资格', experience:'0-3年', outlook:'rising', cities:['北京','上海','广州','成都'], tags:['教育','公益','社会价值'], desc:'国家对特殊教育投入持续增加，人才缺口大、社会意义深远' },
  { title:'护理学/护士', industry:'医疗健康', salaryRange:[7000,18000], education:'本科+护士执业证', experience:'0-5年', outlook:'rising', cities:['北京','上海','广州','成都'], tags:['医疗','刚需','稳定'], desc:'老龄化社会推动护理需求上升，男护士尤其紧缺' },
  { title:'社会工作者', industry:'社会服务/NGO', salaryRange:[6000,15000], education:'本科+社工证', experience:'0-3年', outlook:'rising', cities:['北京','上海','深圳','广州'], tags:['公益','社会','意义'], desc:'社会治理现代化推动社工职业化，政府购买服务增加岗位' },
  { title:'农林经济管理', industry:'农业/政府', salaryRange:[7000,18000], education:'本科及以上', experience:'1-5年', outlook:'stable', cities:['北京','南京','武汉','成都'], tags:['农业','政策','稳定'], desc:'乡村振兴战略持续推进，农业管理和技术人才需求稳定' },
  { title:'航海技术/轮机工程', industry:'航运/物流', salaryRange:[15000,40000], education:'本科+船员证书', experience:'0-5年', outlook:'stable', cities:['上海','大连','青岛','厦门'], tags:['航运','高薪','特殊'], desc:'高薪但需长期海上作业，适合愿意吃苦换取高收入的毕业生' },
  { title:'珠宝鉴定/设计', industry:'奢侈品/零售', salaryRange:[8000,30000], education:'本科+鉴定证书', experience:'2-5年', outlook:'stable', cities:['北京','上海','深圳','香港'], tags:['设计','奢侈品','专业'], desc:'中国奢侈品市场持续增长，珠宝鉴定师和设计师需求稳定' },
  { title:'体育教练/康复师', industry:'体育/健康', salaryRange:[7000,25000], education:'本科+专业认证', experience:'1-5年', outlook:'rising', cities:['北京','上海','广州','深圳'], tags:['体育','健康','增长'], desc:'全民健身热潮+运动康复需求增长，体育产业人才缺口扩大' },
  { title:'殡葬服务管理', industry:'社会服务', salaryRange:[8000,20000], education:'专科/本科', experience:'0-3年', outlook:'stable', cities:['北京','上海','广州','武汉'], tags:['特殊','刚需','稳定'], desc:'老龄化推动殡葬需求增长，专业人才稀缺导致薪资较高' },
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
