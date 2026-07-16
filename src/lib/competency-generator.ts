import type { OccupationCompetencyProfile } from '@/types/competency';
import { chat } from './ai-client';

const SYSTEM_PROMPT = `你是一位职业能力分析师。你的任务是为给定的目标职业生成一份结构化的能力画像。

## 输出要求

输出一个 JSON 对象，格式如下：
{
  "occupation": "目标职业名称",
  "competencies": [
    {
      "id": "职业名-能力名（英文slug）",
      "name": "中文能力名",
      "layer": "skill|knowledge|cert|self_concept|trait|motive",
      "type": "professional|transferable|digital|career_dev|emotional|self_efficacy",
      "proficiencyLevels": {
        "1": "Level 1 的行为描述：了解阶段——知道概念但没做过什么",
        "2": "Level 2 的行为描述：辅助阶段——在他人指导下能完成",
        "3": "Level 3 的行为描述：独立阶段——能自主完成交付",
        "4": "Level 4 的行为描述：分析阶段——能拆解、对比、改进",
        "5": "Level 5 的行为描述：创新阶段——能设计新方案、指导他人"
      },
      "relatedOccupations": ["相近职业1", "相近职业2"],
      "weightInOccupation": 0.85,
      "importanceRationale": "这项能力为什么对这个职业重要（一句话）"
    }
  ]
}

## 规则

1. 生成 12-20 条能力，覆盖冰山各层和水上水下两部分。不要遗漏软能力（抗压力、沟通、职业认同等）和门槛证书。
2. layer 分类：skill=可执行的技术技能, knowledge=需要掌握的理论知识, cert=证书/资质/考试, self_concept=自我认知与职业认同, trait=性格特质, motive=内在动机
3. type 分类：professional=专业素养（本专业核心能力）, transferable=可迁移通用能力（沟通/合作/解决问题）, digital=数智素养（数字工具/AI使用）, career_dev=职业发展能力（求职/规划/人脉）, emotional=情绪管理（抗压/调节）, self_efficacy=自我效能（自信/责任感）
4. 5 级水平描述必须具体到该能力，用该职业的实际工作场景描述，不要泛泛而谈。
5. weightInOccupation 是 0-1 的权重，区分核心能力（0.8+）、支撑能力（0.5-0.8）、辅助能力（0.3-0.5）。
6. relatedOccupations 列出 2-4 个也需此能力的相近职业。
7. 如果该职业有国家法定准入门槛证书（如法律职业资格证、医师资格证、教师资格证），必须作为 layer="cert" 的条目。

只输出 JSON，不要任何解释文字。`;

/** 解析 AI 返回的 JSON，容错处理 */
function parseCompetencyJSON(raw: string): OccupationCompetencyProfile {
  try {
    return JSON.parse(raw) as OccupationCompetencyProfile;
  } catch {
    const jsonMatch = raw.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]) as OccupationCompetencyProfile;
    }
    throw new Error(`Failed to parse competency JSON from AI response`);
  }
}

/** 为指定职业生成能力画像 */
export async function generateCompetencyProfile(
  occupation: string
): Promise<OccupationCompetencyProfile> {
  const { text } = await chat({
    systemPrompt: SYSTEM_PROMPT,
    maxTokens: 4096,
    temperature: 0.3,
    messages: [
      { role: 'user', content: `请为「${occupation}」生成职业能力画像。` },
    ],
  });

  if (!text) throw new Error('AI returned no text content');

  const profile = parseCompetencyJSON(text);

  profile.generatedBy = 'ai';
  profile.trustLevel = 'ai-inferred';
  profile.generatedAt = new Date().toISOString();

  if (!profile.competencies || profile.competencies.length === 0) {
    throw new Error('AI generated empty competency list');
  }

  return profile;
}

export { SYSTEM_PROMPT as COMPETENCY_SYSTEM_PROMPT };
