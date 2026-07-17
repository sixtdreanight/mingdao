'use client';

import { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

interface Choice {
  label: string; result: string; icon: string;
}

interface Node {
  question: string;
  choices: Choice[];
}

const TREE: Node[] = [
  {
    question: '毕业后你想？',
    choices: [
      { label: '直接就业', result: '就业路径', icon: '💼' },
      { label: '考研深造', result: '升学路径', icon: '🎓' },
      { label: '出国留学', result: '留学路径', icon: '✈️' },
      { label: '考公/考编', result: '体制路径', icon: '🏛️' },
    ],
  },
  {
    question: '你更看重什么？',
    choices: [
      { label: '高薪资', result: '高薪导向', icon: '💰' },
      { label: '工作生活平衡', result: '平衡导向', icon: '⚖️' },
      { label: '快速成长', result: '成长导向', icon: '🚀' },
      { label: '稳定保障', result: '稳定导向', icon: '🛡️' },
    ],
  },
  {
    question: '你能接受多大的压力？',
    choices: [
      { label: '高强度高压', result: '高压适应', icon: '🔥' },
      { label: '中等程度', result: '中压适应', icon: '⚡' },
      { label: '轻松为主', result: '低压偏好', icon: '🌿' },
    ],
  },
];

const PATHS: Record<string, { title: string; desc: string; steps: string[]; color: string }> = {
  '就业路径_高薪导向_高压适应': {
    title: '大厂技术岗 / 投行 / 咨询',
    desc: '高薪但高强度，适合野心大、抗压强、追求快速财富积累的你。',
    steps: ['大三暑期实习（大厂/投行）','毕业前拿到return offer','入职2-3年快速晋升','5年后可转向管理或创业'],
    color: '#ef4444',
  },
  '就业路径_高薪导向_中压适应': {
    title: '外企研发 / 金融科技 / 产品经理',
    desc: '薪资可观、节奏可控，外企文化和金融科技是当前高性价比选择。',
    steps: ['提升英语+技术栈','大三暑期实习（外企/FinTech）','校招或社招入职','3-5年积累后跳槽涨薪'],
    color: '#f59e0b',
  },
  '就业路径_平衡导向_中压适应': {
    title: '国企技术岗 / 银行科技部 / 运营商',
    desc: '稳定、福利好、加班少，适合追求生活质量和工作平衡的你。',
    steps: ['关注国企/银行校招时间线','准备行测+专业笔试','通过面试入职','享受稳定发展+副业探索'],
    color: '#10b981',
  },
  '升学路径_高薪导向_高压适应': {
    title: '985/211 硕博 → 科研/大厂算法',
    desc: '学历门槛高但回报可观，AI/芯片方向硕士年薪可达40万+。',
    steps: ['大二大三准备考研（408/数学一）','考上985/211目标院校','研究生期间刷论文/刷题/实习','校招拿SP offer'],
    color: '#8b5cf6',
  },
  '升学路径_成长导向_中压适应': {
    title: '跨专业考研 → 复合型人才',
    desc: '本科学历不够用？跨考热门专业，打造独特竞争力。',
    steps: ['确定目标专业和院校','制定12个月复习计划','参加考研（12月）','复试+调剂，上岸后深耕'],
    color: '#06b6d4',
  },
  '留学路径_高薪导向_高压适应': {
    title: '美国TOP50 / 英国G5 CS硕士',
    desc: '投入高（50-80万）回报高，STEM专业3年OPT留美工作机会。',
    steps: ['大二准备托福/GRE','大三申请+套磁','拿到offer+签证','赴美读研→硅谷/华尔街就业'],
    color: '#3b82f6',
  },
  '体制路径_稳定导向_中压适应': {
    title: '公务员 / 选调生 / 事业单位',
    desc: '铁饭碗，社会地位高，适合追求稳定和公共服务的你。计算机专业在信息化岗位需求大。',
    steps: ['关注国考/省考/选调公告','准备行测+申论（6个月）','参加笔试+面试+体检','入职+基层锻炼后定岗'],
    color: '#6366f1',
  },
};

function fallbackPath(key: string): { title: string; desc: string; steps: string[]; color: string } {
  return { title: '定制化路径', desc: '你的选择组合比较独特。建议在AI规划师中详细讨论，我们会为你量身定制路线。', steps: ['在AI规划师中详细描述你的情况','AI根据你的画像生成个性化路线','在成就图鉴中追踪进度'], color: '#6b7280' };
}

export function DecisionTree() {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [result, setResult] = useState<{ title: string; desc: string; steps: string[]; color: string } | null>(null);

  const handleChoice = (choice: Choice) => {
    const next = [...choices, choice.result];
    if (step < TREE.length - 1) {
      setChoices(next);
      setStep(step + 1);
    } else {
      const key = next.join('_');
      setResult(PATHS[key] || fallbackPath(key));
    }
  };

  const reset = () => { setStep(0); setChoices([]); setResult(null); };

  if (result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 spring-in">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl text-4xl" style={{ backgroundColor: result.color + '15' }}>
            🎯
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{result.title}</h2>
          <p className="text-sm text-muted-foreground mb-8">{result.desc}</p>
          <div className="space-y-3 mb-8">
            {result.steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border/30 bg-card px-4 py-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i+1}</span>
                <span className="text-foreground">{s}</span>
              </div>
            ))}
          </div>
          <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
            <RefreshCw className="h-4 w-4" /> 重新选择
          </button>
        </div>
      </div>
    );
  }

  const node = TREE[step];
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-2 flex justify-center gap-1">
          {TREE.map((_, i) => (
            <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-secondary'}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-8">第 {step+1} / {TREE.length} 步</p>
        <h2 className="text-xl font-semibold text-foreground mb-6">{node.question}</h2>
        <div className="space-y-2">
          {node.choices.map(c => (
            <button key={c.label} onClick={() => handleChoice(c)}
              className="w-full flex items-center gap-4 rounded-2xl border border-border/30 bg-card px-5 py-4 text-left card-hover btn-press spring-in">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-base font-medium text-foreground">{c.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/30" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
