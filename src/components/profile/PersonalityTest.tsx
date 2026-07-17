'use client';

import { useState } from 'react';

/** MBTI 四维度，每维度 4 题 */
const MBTI_QUESTIONS = [
  // E vs I (外向 vs 内向)
  { id: 'ei1', dim: 'EI', text: '在聚会或社交场合中，你通常感到精力充沛', positive: 'E' },
  { id: 'ei2', dim: 'EI', text: '独处时你更容易恢复精力、理清思路', positive: 'I' },
  { id: 'ei3', dim: 'EI', text: '你更喜欢通过与他人讨论来形成自己的想法', positive: 'E' },
  { id: 'ei4', dim: 'EI', text: '比起广泛社交，你更偏好少数几个深交的朋友', positive: 'I' },
  // S vs N (实感 vs 直觉)
  { id: 'sn1', dim: 'SN', text: '你更关注具体的事实和细节，而不是宏观的想象', positive: 'S' },
  { id: 'sn2', dim: 'SN', text: '你经常思考未来的可能性，而不是眼前的具体事务', positive: 'N' },
  { id: 'sn3', dim: 'SN', text: '学习新事物时，你更喜欢从实际操作入手', positive: 'S' },
  { id: 'sn4', dim: 'SN', text: '你经常有灵光一现的想法或创意', positive: 'N' },
  // T vs F (思考 vs 情感)
  { id: 'tf1', dim: 'TF', text: '做决定时，你更依赖逻辑分析而非个人感受', positive: 'T' },
  { id: 'tf2', dim: 'TF', text: '朋友遇到困难时，你首先想提供情感支持而非解决方案', positive: 'F' },
  { id: 'tf3', dim: 'TF', text: '你认为公平比同情更重要', positive: 'T' },
  { id: 'tf4', dim: 'TF', text: '你很容易感受到他人的情绪变化', positive: 'F' },
  // J vs P (判断 vs 感知)
  { id: 'jp1', dim: 'JP', text: '你喜欢提前计划，按照清单完成任务', positive: 'J' },
  { id: 'jp2', dim: 'JP', text: '你更愿意保持灵活，根据情况随机应变', positive: 'P' },
  { id: 'jp3', dim: 'JP', text: '做出决定后你感到轻松，不喜欢事情悬而未决', positive: 'J' },
  { id: 'jp4', dim: 'JP', text: '你经常在截止日期前才开始集中精力工作', positive: 'P' },
];

const DIM_LABELS: Record<string, string> = {
  E: '外向 Extraversion', I: '内向 Introversion',
  S: '实感 Sensing', N: '直觉 Intuition',
  T: '思考 Thinking', F: '情感 Feeling',
  J: '判断 Judging', P: '感知 Perceiving',
};

const MBTI_CAREER_MAP: Record<string, string[]> = {
  'ISTJ': ['会计', '审计', '工程师', '公务员', '医生'],
  'ISFJ': ['护理', '教师', '社会工作者', '行政', '图书管理员'],
  'INFJ': ['心理咨询师', '教师', '作家', '人力资源', '非营利组织'],
  'INTJ': ['科学家', '工程师', '教授', '战略顾问', '律师'],
  'ISTP': ['技术专家', '飞行员', '外科医生', '机械师', '数据分析师'],
  'ISFP': ['艺术家', '设计师', '摄影师', '兽医', '理疗师'],
  'INFP': ['作家', '心理咨询师', '教师', '翻译', '用户体验设计师'],
  'INTP': ['程序员', '科学家', '数学家', '哲学家', '游戏设计师'],
  'ESTP': ['销售', '企业家', '急救人员', '体育教练', '演员'],
  'ESFP': ['演员', '销售', '导游', '活动策划', '公关'],
  'ENFP': ['记者', '创业者', '咨询师', '广告创意', '教师'],
  'ENTP': ['律师', '企业家', '产品经理', '辩论者', '投资人'],
  'ESTJ': ['管理者', '军官', '法官', '财务分析师', '校长'],
  'ESFJ': ['教师', '护士', '酒店管理', '社区服务', '客户经理'],
  'ENFJ': ['教师', '人力资源', '政治家', '培训师', '教练'],
  'ENTJ': ['CEO', '创业者', '管理顾问', '律师', '投资人'],
};

interface Props {
  onComplete: (mbti: string) => void;
  onClose: () => void;
}

export function PersonalityTest({ onComplete, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const q = MBTI_QUESTIONS[current];
  const allAnswered = Object.keys(answers).length === MBTI_QUESTIONS.length;

  const handleAnswer = (score: number) => {
    setAnswers(prev => ({ ...prev, [q.id]: score }));
    if (current < MBTI_QUESTIONS.length - 1) {
      setCurrent(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calcMBTI = (): string => {
    const scores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    for (const q of MBTI_QUESTIONS) {
      const score = answers[q.id] || 3;
      scores[q.positive] += score;
    }
    const ei = scores.E >= scores.I ? 'E' : 'I';
    const sn = scores.S >= scores.N ? 'S' : 'N';
    const tf = scores.T >= scores.F ? 'T' : 'F';
    const jp = scores.J >= scores.P ? 'J' : 'P';
    return ei + sn + tf + jp;
  };

  if (showResult) {
    const mbti = calcMBTI();
    const matched = MBTI_CAREER_MAP[mbti] || [];
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <p className="text-3xl mb-2">🧠</p>
        <h3 className="text-xl font-bold text-foreground mb-1">你的 MBTI 类型</h3>
        <p className="text-3xl font-bold text-primary mb-3">{mbti}</p>
        <div className="grid grid-cols-2 gap-1 mb-4 text-xs text-left text-muted-foreground">
          {mbti.split('').map(l => (
            <span key={l} className="rounded bg-secondary px-2 py-1 text-center">{DIM_LABELS[l]}</span>
          ))}
        </div>
        {matched.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">推荐职业方向</p>
            <div className="flex justify-center gap-1 flex-wrap">
              {matched.map(j => (
                <span key={j} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{j}</span>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => {
            localStorage.setItem('mingdao-mbti', mbti);
            onComplete(mbti);
          }} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            保存并更新画像
          </button>
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">关闭</button>
        </div>
      </div>
    );
  }

  const progress = ((current + 1) / MBTI_QUESTIONS.length) * 100;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">🧠 MBTI 性格测评</h3>
          <span className="text-xs text-muted-foreground">{current + 1}/{MBTI_QUESTIONS.length}</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <p className="text-sm font-medium text-foreground mb-6">{q.text}</p>

      <div className="space-y-2 mb-4">
        {[
          { score: 1, label: '非常不同意' },
          { score: 2, label: '不太同意' },
          { score: 3, label: '中立' },
          { score: 4, label: '比较同意' },
          { score: 5, label: '非常同意' },
        ].map(opt => (
          <button key={opt.score}
            onClick={() => handleAnswer(opt.score)}
            className="w-full rounded-lg border border-border/40 bg-card px-4 py-2.5 text-sm text-left hover:border-primary/30 hover:bg-primary/5 transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button onClick={onClose} className="w-full rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">跳过测试</button>
    </div>
  );
}
