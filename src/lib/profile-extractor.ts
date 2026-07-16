import type { UserProfile } from '@/types';
import type { InferredSignal, ProficiencyLevel } from '@/types/competency';

/**
 * 从对话历史中渐进提取用户画像。
 * 每轮对话后调用，返回当前已知的画像片段。
 * 已提取的字段不会丢失，新的信息会合并。
 */
export function extractProfile(
  messages: { role: string; content: string }[]
): Partial<UserProfile> {
  const fullText = messages
    .map((m) => m.content)
    .join('\n');

  const profile: Partial<UserProfile> = {};

  // === 年级 ===
  const gradePatterns: RegExp[] = [
    /大[一二三四][上下]期?/g,
    /大一[上下]?/g, /大二[上下]?/g,
    /大三[上下]?/g, /大四[上下]?/g,
    /研[一二三]/g,
  ];
  for (const re of gradePatterns) {
    const m = fullText.match(re);
    if (m) {
      profile.grade = m[m.length - 1]; // 取最近一次提到的
    }
  }

  // === 专业 ===
  const majorPatterns: [RegExp, string][] = [
    [/计算机科学|计算机科学与技术|软件工程|CS|计科/, '计算机科学与技术'],
    [/人工智能|AI/, '人工智能'],
    [/数学与应用数学|数学/, '数学'],
    [/电子信息|电子工程|通信/, '电子信息'],
    [/大数据|数据科学/, '数据科学'],
    [/网络安全|信息安全/, '信息安全'],
    [/物联网/, '物联网工程'],
    [/数字媒体/, '数字媒体技术'],
  ];
  for (const [re, label] of majorPatterns) {
    if (re.test(fullText)) {
      profile.major = label;
      break;
    }
  }

  // === 学校层次 ===
  if (/双非|普通一本|一本/.test(fullText)) profile.universityTier = '双非一本';
  else if (/985/.test(fullText)) profile.universityTier = '985';
  else if (/211/.test(fullText)) profile.universityTier = '211';
  else if (/二本/.test(fullText)) profile.universityTier = '二本';
  else if (/专科|大专/.test(fullText)) profile.universityTier = '专科';

  // === 目标城市 ===
  const cityPatterns: [RegExp, string][] = [
    [/上海/, '上海'], [/北京/, '北京'], [/深圳/, '深圳'],
    [/广州/, '广州'], [/杭州/, '杭州'], [/成都/, '成都'],
    [/武汉/, '武汉'], [/南京/, '南京'], [/苏州/, '苏州'],
    [/西安/, '西安'], [/厦门/, '厦门'],
  ];
  for (const [re, label] of cityPatterns) {
    if (re.test(fullText)) {
      profile.targetCity = profile.targetCity
        ? `${profile.targetCity}、${label}`
        : label;
    }
  }

  // === 经济预算 ===
  const budgetMatches = fullText.match(
    /(\d+)\s*(?:万|w|W)(?:以内|左右|预算|资金|支持|家里能|家里可以|家庭)/
  );
  if (budgetMatches) {
    profile.householdBudget = parseInt(budgetMatches[1], 10) * 10000;
  }
  // 间接推断
  if (/家里条件一般|经济压力|需要尽快工作|不能花太多/.test(fullText)) {
    profile.householdBudget = profile.householdBudget || 50000;
  }
  if (/家里能支持/.test(fullText) && /出国/.test(fullText)) {
    profile.householdBudget = Math.max(profile.householdBudget || 0, 300000);
  }

  // === 兴趣偏好 ===
  const interests: string[] = [];
  const interestPatterns: [RegExp, string][] = [
    [/二次元|动漫|漫展|cosplay|Cos/, '二次元'],
    [/游戏|电竞/, '游戏'],
    [/编程|开发|写代码|做项目/, '编程开发'],
    [/设计|UI|UX|美术/, '设计'],
    [/写作|内容|自媒体/, '内容创作'],
    [/开源|社区/, '开源社区'],
    [/运动|健身|跑步|球/, '运动'],
    [/音乐|乐器|唱歌/, '音乐'],
  ];
  for (const [re, label] of interestPatterns) {
    if (re.test(fullText)) interests.push(label);
  }
  if (interests.length > 0) profile.interests = interests;

  // === 生活方式偏好 ===
  const lifestyle: string[] = [];
  if (/自由|弹性|不加班|朝九晚五|wlb/i.test(fullText)) lifestyle.push('时间自由');
  if (/远程|居家|在家工作/i.test(fullText)) lifestyle.push('远程办公');
  if (/稳定|体制|铁饭碗|安稳/.test(fullText)) lifestyle.push('稳定优先');
  if (/高薪|薪资|收入|赚钱|年薪/.test(fullText)) lifestyle.push('追求高薪');
  if (/成长|进步|学习|提升|发展/.test(fullText)) lifestyle.push('快速成长');
  if (/平衡|兼顾|生活/.test(fullText)) lifestyle.push('工作生活平衡');
  if (/挑战|刺激|竞争/.test(fullText)) lifestyle.push('追求挑战');
  if (lifestyle.length > 0) profile.lifestyle = lifestyle;

  // === 底线红线 ===
  const redLines: string[] = [];
  if (/不能接受.?996|坚决.?996|绝不.?996|讨厌.?加班/.test(fullText)) redLines.push('不接受996');
  if (/不能离开|必须留在|一定要在/.test(fullText)) redLines.push('地域锁定');
  if (/不想花家里|不想靠家里|不花父母/.test(fullText)) redLines.push('经济独立');
  if (/不想考研|不考研|坚决不考研/.test(fullText)) redLines.push('不考研');
  if (/不想考公|不考公/.test(fullText)) redLines.push('不考公');
  if (/不出国|不想出国|不考虑出国/.test(fullText)) redLines.push('不出国');
  if (redLines.length > 0) profile.redLines = redLines;

  return profile;
}

/**
 * 从对话历史中提取学生暴露的能力信号。
 * 基于正则模式匹配学生提到的技能、课程、证书、项目经历，
 * 推断相关能力及其水平。
 */
export function extractCompetencySignals(
  messages: { role: string; content: string }[]
): InferredSignal[] {
  const fullText = messages.map((m) => m.content).join('\n');
  const signals: InferredSignal[] = [];

  // 学生自述的能力水平模式
  const patterns: [RegExp, string, ProficiencyLevel][] = [
    // 明确学过/考过 → Level 2-3
    [/我?修过[「「]?(.{2,12})[」」]?(?:课程|课)/g, 'course', 3],
    [/我?考了|我?拿过|我?通过[了]?(.{2,16})?(?:证书|资格证|考试)/g, 'cert', 3],
    [/我?做过|我?参加过|我?实习[过]?|我?完成[了]?(.{2,20})?(?:项目|比赛|竞赛|实习)/g, 'project', 3],
    // 不熟练 → Level 1-2
    [/(.{2,12})(?:不太会|不熟练|没学过|没接触过|基础差)/g, 'weak', 1],
    // 熟练 → Level 4
    [/(.{2,12})(?:很熟练|比较熟|经常用|一直在做|是我的强项)/g, 'strong', 4],
    // 教别人 → Level 5
    [/(.{2,12})(?:教[过]?|指导[过]?|带[过]?)(?:别人|同学|新人|学弟)/g, 'teach', 5],
  ];

  for (const [regex, source, level] of patterns) {
    let match: RegExpExecArray | null;
    // 重置 regex 的 lastIndex
    const re = new RegExp(regex.source, regex.flags);
    while ((match = re.exec(fullText)) !== null) {
      const extracted = match[1]?.trim();
      if (extracted && extracted.length >= 2) {
        signals.push({
          competencyId: `inferred-${source}-${extracted}`,
          inferredLevel: level,
          confidence: source === 'weak' || source === 'strong' || source === 'teach' ? 0.7 : 0.5,
          source: `从对话中「${match[0]}」推断`,
        });
      }
    }
  }

  return signals;
}
