# 知识库原子化重设计方案

> 舍弃「预存路径匹配」架构，改为「原子事实 → 动态推理」架构。

---

## 一、核心类型

```ts
// 一条原子事实
interface KnowledgeAtom {
  id: string;                    // e.g. "salary-sh-cs-bachelor-foreign-2024"
  category: AtomCategory;
  content: string;               // 可检索的文本描述
  data: Record<string, unknown>; // 结构化数据（数值、列表等）
  tags: string[];                // 检索标签
  sourceUrl: string;             // 数据来源
  trustLevel: TrustLevel;
  lastUpdated: string;
}

type AtomCategory =
  | 'salary'      // 薪资数据
  | 'education'   // 教育路径（门槛/费用/时间）
  | 'employment'  // 就业市场（需求/招聘偏好）
  | 'trend'       // 行业趋势/风险评估
  | 'policy'      // 政策（落户/选调/签证）
  | 'cost'        // 生活成本
  | 'life'        // 工作文化/生活质量
  | 'skill';      // 技能需求
```

---

## 二、七大维度分类

### 1. salary — 薪资数据
按「城市 × 行业 × 学历 × 经验 × 公司类型」五维交叉。

| 文件示例 | 内容 |
|---------|------|
| `shanghai-cs-bachelor-0y-foreign-2024` | 上海 CS 本科应届 外企 薪资范围 |
| `shanghai-cs-master-0y-bigtech-2024` | 上海 CS 硕士应届 大厂 薪资范围 |
| `beijing-cs-bachelor-3y-internet-2024` | 北京 CS 本科 3年经验 互联网 薪资 |
| `shenzhen-cs-bachelor-0y-hardware-2024` | 深圳 CS 本科 硬件/嵌入式 薪资 |

结构化数据：
```ts
data: {
  city: '上海',
  industry: '计算机/软件',
  degree: '本科',
  experience: '0-1年',
  companyType: '外企',
  salaryRange: { min: 10000, max: 15000, median: 12000 },
  currency: 'CNY',
  sampleSize: '中位数估算',
  year: 2024,
}
```

### 2. education — 教育路径
每条记录写一个具体的升学/留学方案的真实数据。

| 维度 | 说明 |
|------|------|
| 路径类型 | 国内考研 / 保研 / 出国读研 / 第二学位 / 在职研 / 证书 |
| 学校层次需求 | 本科什么层次可以申请 |
| 硬性门槛 | GPA、语言成绩、笔试面试 |
| 费用 | 学费 + 生活费（年均/总计） |
| 时间 | 学制、备考时间 |
| 成功率 | 报录比/录取率（如有数据） |

文件示例：
- `domestic-cs-postgrad-sh-2024` — 上海高校 CS 考研（报录比、分数线、学费）
- `germany-cs-masters-public-2024` — 德国公立大学 CS 硕士（APS、德语、费用）
- `us-cs-masters-top50-2024` — 美国 TOP50 CS 硕士（GRE、费用、OPT）

### 3. employment — 就业市场
招聘需求量、公司偏好、学历门槛、技能需求变化。

| 文件示例 | 内容 |
|---------|------|
| `shanghai-tech-company-tiers-2024` | 上海科技公司梯队及招聘偏好 |
| `cs-junior-demand-trend-2024` | CS 初级岗位需求变化 |
| `degree-gate-reality-2024` | 第一学历在各类型公司的真实门槛 |

### 4. trend — 行业趋势
每条引用一份产业报告或政策文件。

| 文件示例 | 内容 |
|---------|------|
| `ai-impact-junior-dev-2024` | AI 辅助开发对初级岗位的替代风险评估 |
| `cloud-native-growth-2024` | 云原生/DevOps 人才需求增长趋势 |
| `game-industry-license-impact-2024` | 版号政策对游戏行业就业的影响 |
| `chip-domestic-demand-2024` | 芯片国产化对嵌入式/IC 设计人才的需求 |

### 5. policy — 政策
签证、落户、选调、人才引进等可查证的政策条目。

| 文件示例 | 内容 |
|---------|------|
| `shanghai-hukou-points-2024` | 上海应届生落户积分政策 |
| `selected-transfer-cs-2024` | 计算机专业选调生报考条件 |
| `us-h1b-odds-2024` | H1B 抽签概率及变化趋势 |
| `uk-graduate-route-2024` | 英国毕业生签证（PSW）政策 |
| `australia-485-skilled-migration-2024` | 澳洲 485 签证及技术移民打分 |

### 6. cost — 生活成本
各城市的生活成本基准数据。

| 文件示例 | 内容 |
|---------|------|
| `shanghai-living-cost-2024` | 上海租房+生活月均支出 |
| `shenzhen-living-cost-2024` | 深圳租房+生活月均支出 |
| `munich-living-cost-2024` | 慕尼黑留学生月均生活费 |
| `tokyo-living-cost-2024` | 东京 IT 从业者月均生活费 |

### 7. life — 工作文化与生活质量
| 文件示例 | 内容 |
|---------|------|
| `work-culture-foreign-vs-internet-2024` | 外企 vs 互联网公司工作文化对比 |
| `career-ceiling-degree-2024` | 学历对管理岗晋升天花板的影响 |
| `remote-work-feasibility-cs-2024` | CS 岗位远程办公可行性 |

---

## 三、RAG 推理流程

```
用户: "大二，双非计算机，想去上海，预算 15 万，不想 996"

1. 关键词提取 → 检索相关原子事实:
   salary: shanghai-cs-bachelor-0y-foreign-2024 (薪资条件 ✓)
   employment: shanghai-tech-company-tiers-2024 (哪些公司不卡学历 ✓)
   cost: shanghai-living-cost-2024 (15 万预算能覆盖多久 ✓)
   education: domestic-cs-postgrad-sh-2024 (考研要不要考 ✓)
   trend: ai-impact-junior-dev-2024 (AI 风险评估 ✓)
   life: work-culture-foreign-vs-internet-2024 (不 996 的公司类型 ✓)

2. AI 综合推理（不是匹配路径）:
   "根据知识库数据：
   - 上海 CS 本科外企起薪 12-15k/月（来源: salary-sh-cs-bachelor-foreign-2024）
   - 双非学历在外企和中型公司的接受度较高（来源: degree-gate-reality-2024）
   - 外企工作节奏多为 10-7-5，符合你不想要 996 的偏好（来源: work-culture-...）
   - 15 万预算如果想读研，国内考研费用约 X 万，德国公立大学约 Y 万（来源: ...）
   - AI 辅助开发可能对初级岗位有 X% 影响（来源: ai-impact-...）
   
   综合来看，你的情况有这些可行的方向：
   方向 A: ...（适配度 X%，主要风险 Y）
   方向 B: ..."

3. 每条结论可追溯到具体的原子事实 ID → 用户可点击验证来源
```

---

## 四、与旧架构的对比

| | 旧（存路径） | 新（存事实） |
|---|---|---|
| 知识库条目数 | 30 条（有限） | 理论上每条事实独立，可逐步扩展 |
| 推荐方式 | 匹配最接近的路径 | 按画像检索事实 → 推理组合 |
| 千人千面 | ✗ 路径不够就拼凑 | ✓ 任何组合都能推理 |
| 数据可验证 | 整条路径一个 trustLevel | 每条事实独立来源链接 |
| 可维护性 | 改一条路径要全改 | 改一条事实只影响一个维度 |
| 用户路径缺失 | 沉默，推荐不相关的 | AI："你这种组合目前知识库数据不充分，我建议先了解 X 和 Y" |
| 扩展性 | 每加一条路径要从头写 | 加一条事实即可丰富推理 |
