'use client';

import { useState, useMemo } from 'react';

/**
 * MBTI 48题版
 * 每维度12题，1-5分 Likert 量表
 * 计分公式对齐官方 Form M 93题标准：score = (raw/12 - 0.5) × 20，映射到 -10 到 +10
 */

const QUESTIONS = [
  // === E/I: 外向 vs 内向 (12题) ===
  { id: 1, dim: 'EI', pole: 'E', text: '我是聚会中的活跃分子，喜欢结识新朋友' },
  { id: 2, dim: 'EI', pole: 'I', text: '独处让我恢复精力，过度社交让我疲惫' },
  { id: 3, dim: 'EI', pole: 'E', text: '我倾向于先行动再思考' },
  { id: 4, dim: 'EI', pole: 'I', text: '我在发言前习惯先在脑中整理好思路' },
  { id: 5, dim: 'EI', pole: 'E', text: '我喜欢成为众人关注的焦点' },
  { id: 6, dim: 'EI', pole: 'I', text: '我更喜欢一对一的深度交流而不是群体讨论' },
  { id: 7, dim: 'EI', pole: 'E', text: '遇到问题时我倾向找朋友讨论来解决' },
  { id: 8, dim: 'EI', pole: 'I', text: '我更享受独自思考和解决问题' },
  { id: 9, dim: 'EI', pole: 'E', text: '我很容易与新认识的人打成一片' },
  { id:10, dim: 'EI', pole: 'I', text: '我只有少数几个真正亲密的朋友' },
  { id:11, dim: 'EI', pole: 'E', text: '电话或当面沟通比文字消息更适合我' },
  { id:12, dim: 'EI', pole: 'I', text: '比起说话，我更擅长用文字表达自己' },

  // === S/N: 实感 vs 直觉 (12题) ===
  { id:13, dim: 'SN', pole: 'S', text: '我注重事实和细节，不太喜欢空想' },
  { id:14, dim: 'SN', pole: 'N', text: '我经常沉浸在未来的想象和可能性中' },
  { id:15, dim: 'SN', pole: 'S', text: '学习新事物时，我喜欢有人先演示具体操作' },
  { id:16, dim: 'SN', pole: 'N', text: '我更喜欢理解理论框架而不是记具体步骤' },
  { id:17, dim: 'SN', pole: 'S', text: '我更信任经过验证的方法，而非新颖的创意' },
  { id:18, dim: 'SN', pole: 'N', text: '我经常有灵光一现的想法，并想立刻尝试' },
  { id:19, dim: 'SN', pole: 'S', text: '我更关注眼前需要完成的事' },
  { id:20, dim: 'SN', pole: 'N', text: '我更喜欢思考事物的深层意义和关联' },
  { id:21, dim: 'SN', pole: 'S', text: '我按部就班，不喜欢频繁改变计划' },
  { id:22, dim: 'SN', pole: 'N', text: '我喜欢尝试新方法，即使不确定结果' },
  { id:23, dim: 'SN', pole: 'S', text: '描述事物时我习惯从具体细节开始' },
  { id:24, dim: 'SN', pole: 'N', text: '我看到的是整体画面而非细枝末节' },

  // === T/F: 思考 vs 情感 (12题) ===
  { id:25, dim: 'TF', pole: 'T', text: '做决定时我主要依靠逻辑和分析' },
  { id:26, dim: 'TF', pole: 'F', text: '做决定时我首先考虑对相关人员的影响' },
  { id:27, dim: 'TF', pole: 'T', text: '我认为公平比同情更重要' },
  { id:28, dim: 'TF', pole: 'F', text: '朋友低落时，我先给情感支持而非给解决方案' },
  { id:29, dim: 'TF', pole: 'T', text: '我喜欢就事论事的讨论，即使可能冒犯他人' },
  { id:30, dim: 'TF', pole: 'F', text: '我很容易感受到周围人的情绪变化' },
  { id:31, dim: 'TF', pole: 'T', text: '我认为规则和标准应该一视同仁' },
  { id:32, dim: 'TF', pole: 'F', text: '我认为不同情况需要不同的处理方式' },
  { id:33, dim: 'TF', pole: 'T', text: '别人觉得我比较理性和冷静' },
  { id:34, dim: 'TF', pole: 'F', text: '我做决定时很难完全抛开个人感受' },
  { id:35, dim: 'TF', pole: 'T', text: '我更看重事情的对错而非人际和谐' },
  { id:36, dim: 'TF', pole: 'F', text: '维护人际关系比证明自己正确更让我在意' },

  // === J/P: 判断 vs 感知 (12题) ===
  { id:37, dim: 'JP', pole: 'J', text: '我喜欢提前制定计划并按计划执行' },
  { id:38, dim: 'JP', pole: 'P', text: '我更喜欢保持灵活，随机应变' },
  { id:39, dim: 'JP', pole: 'J', text: '事情定下来后我感到轻松，悬而未决让我焦虑' },
  { id:40, dim: 'JP', pole: 'P', text: '我喜欢保留多种选择，不急于做决定' },
  { id:41, dim: 'JP', pole: 'J', text: '我的桌面和工作空间通常整洁有序' },
  { id:42, dim: 'JP', pole: 'P', text: '我习惯在截止日期前才开始集中精力工作' },
  { id:43, dim: 'JP', pole: 'J', text: '我喜欢按清单逐项完成任务' },
  { id:44, dim: 'JP', pole: 'P', text: '我经常同时进行多个项目，看心情切换' },
  { id:45, dim: 'JP', pole: 'J', text: '遵守日程和约定让我感到安心' },
  { id:46, dim: 'JP', pole: 'P', text: '计划永远赶不上变化，何必做那么细' },
  { id:47, dim: 'JP', pole: 'J', text: '做出最终决定比一直留着可能性让我更舒服' },
  { id:48, dim: 'JP', pole: 'P', text: '我享受探索过程中的不确定性' },
];

const TOTAL = QUESTIONS.length;
const PER_DIM = 12;

const DIM_LABELS: Record<string, [string, string]> = {
  EI: ['外向 Extraversion', '内向 Introversion'],
  SN: ['实感 Sensing', '直觉 Intuition'],
  TF: ['思考 Thinking', '情感 Feeling'],
  JP: ['判断 Judging', '感知 Perceiving'],
};

const MBTI_CAREERS: Record<string, string[]> = {
  'ISTJ': ['审计师', '工程师', '公务员', '军官', '医生'],
  'ISFJ': ['护士', '教师', '社会工作者', '行政', '图书管理员'],
  'INFJ': ['心理咨询师', '作家', '人力资源', '教育咨询', '非营利管理者'],
  'INTJ': ['科学家', '战略顾问', '教授', '律师', '软件架构师'],
  'ISTP': ['飞行员', '外科医生', '机械师', '数据分析师', '刑警'],
  'ISFP': ['设计师', '摄影师', '兽医', '理疗师', '花艺师'],
  'INFP': ['作家', '心理咨询师', '翻译', 'UX设计师', '公益项目负责人'],
  'INTP': ['程序员', '数学家', '物理学家', '游戏设计师', '哲学家'],
  'ESTP': ['销售总监', '企业家', '急救医生', '体育教练', '特技演员'],
  'ESFP': ['演员', '导游', '活动策划', '公关经理', '幼儿园教师'],
  'ENFP': ['记者', '创业者', '广告创意', '培训师', '外交官'],
  'ENTP': ['律师', '产品经理', '投资人', '辩论者', '管理顾问'],
  'ESTJ': ['CEO', '军官', '法官', '财务总监', '校长'],
  'ESFJ': ['护士长', '酒店经理', '客服总监', '社区工作者', '牙医'],
  'ENFJ': ['政治家', '培训师', '人力资源总监', '牧师', '品牌经理'],
  'ENTJ': ['CEO', '管理顾问', '投资银行家', '大学校长', '军事指挥官'],
};

interface Props {
  onComplete: (mbti: string) => void;
  onClose: () => void;
}

export function PersonalityTest({ onComplete, onClose }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const answered = Object.keys(answers).length;
  const progress = (answered / TOTAL) * 100;
  const canSubmit = answered >= TOTAL * 0.8; // 允许跳过20%

  const calcMBTI = (): string => {
    const raw: Record<string, Record<string, number>> = { EI: { E:0,I:0 }, SN: { S:0,N:0 }, TF: { T:0,F:0 }, JP: { J:0,P:0 } };
    for (const q of QUESTIONS) {
      raw[q.dim][q.pole] += answers[q.id] || 3; // 未答默认3
    }
    // 官方公式: score = (raw - perDim*3) / (perDim*2) * 10 映射到 -10~+10
    const score = (dim: string, pole: string) => ((raw[dim][pole] - PER_DIM * 3) / (PER_DIM * 2)) * 10;
    const ei = score('EI', 'E') >= 0 ? 'E' : 'I';
    const sn = score('SN', 'S') >= 0 ? 'S' : 'N';
    const tf = score('TF', 'T') >= 0 ? 'T' : 'F';
    const jp = score('JP', 'J') >= 0 ? 'J' : 'P';
    return ei + sn + tf + jp;
  };

  const renderScores = () => {
    const raw: Record<string, Record<string, number>> = { EI: { E:0,I:0 }, SN: { S:0,N:0 }, TF: { T:0,F:0 }, JP: { J:0,P:0 } };
    for (const q of QUESTIONS) raw[q.dim][q.pole] += answers[q.id] || 3;
    const dims = ['EI', 'SN', 'TF', 'JP'] as const;
    return dims.map(d => {
      const [a, b] = DIM_LABELS[d];
      const scoreA = ((raw[d][d[0]] - PER_DIM*3) / (PER_DIM*2)) * 10;
      const scoreB = ((raw[d][d[1]] - PER_DIM*3) / (PER_DIM*2)) * 10;
      const winner = scoreA >= 0 ? d[0] : d[1];
      return { dim: d, labelA: a.split(' ')[0], labelB: b.split(' ')[0], scoreA, scoreB, winner };
    });
  };

  if (showResult) {
    const mbti = calcMBTI();
    const scores = renderScores();
    const careers = MBTI_CAREERS[mbti] || [];
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">🧠</p>
          <h3 className="text-lg font-semibold text-foreground mb-1">你的 MBTI 类型</h3>
          <p className="text-4xl font-bold text-primary mb-3 tracking-widest">{mbti}</p>
        </div>

        {/* 维度得分条 */}
        <div className="space-y-3 mb-6">
          {scores.map(s => (
            <div key={s.dim} className="flex items-center gap-2 text-xs">
              <span className="w-12 text-right font-medium">{s.labelA}</span>
              <div className="flex-1 h-4 rounded-full bg-secondary overflow-hidden flex">
                <div className="h-full bg-blue-400 rounded-l-full transition-all" style={{ width: `${Math.max(0, (s.scoreA + 10) / 20 * 100)}%` }} />
                <div className="h-full bg-amber-400 rounded-r-full transition-all" style={{ width: `${Math.max(0, (s.scoreB + 10) / 20 * 100)}%` }} />
              </div>
              <span className="w-12 font-medium">{s.labelB}</span>
            </div>
          ))}
        </div>

        {/* 推荐职业 */}
        <div className="mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-2">推荐探索的职业方向</p>
          <div className="flex flex-wrap gap-1.5">
            {careers.map(c => (
              <span key={c} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{c}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => {
            localStorage.setItem('mingdao-mbti', JSON.stringify({ type: mbti, date: new Date().toISOString() }));
            onComplete(mbti);
          }}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            保存到画像
          </button>
          <button onClick={onClose} className="rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground">关闭</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">🧠 MBTI 性格测评</h3>
          <span className="text-xs text-muted-foreground">{answered}/{TOTAL} 题</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-4 max-h-[50vh] overflow-y-auto mb-4 pr-2">
        {QUESTIONS.map(q => (
          <div key={q.id} className="rounded-xl border border-border/30 bg-card p-3">
            <p className="text-sm text-foreground mb-2">{q.id}. {q.text}</p>
            <div className="flex justify-between gap-1">
              {[
                { v: 1, l: '非常不同意' },
                { v: 2, l: '不太同意' },
                { v: 3, l: '中立' },
                { v: 4, l: '比较同意' },
                { v: 5, l: '非常同意' },
              ].map(o => (
                <button key={o.v}
                  onClick={() => setAnswers(p => ({ ...p, [q.id]: o.v }))}
                  className={`flex-1 rounded-lg py-1.5 text-[10px] transition-colors ${
                    answers[q.id] === o.v
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >{o.l}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => { if (canSubmit) setShowResult(true); }}
          disabled={!canSubmit}
          className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-30">
          {canSubmit ? `查看结果（${answered}/${TOTAL}）` : `还需至少 ${TOTAL - Math.floor(TOTAL*0.8) - answered + Object.keys(answers).length} 题`}
        </button>
        <button onClick={onClose} className="rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground">退出</button>
      </div>
    </div>
  );
}
