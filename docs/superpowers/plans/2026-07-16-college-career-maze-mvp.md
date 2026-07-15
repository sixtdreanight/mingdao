# 大学生职业规划引导平台 — MVP 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个 Web 应用 MVP，让大一大二学生通过与 AI 对话获得个性化路径推荐，基于可追溯知识库数据，多维度对比路径，生成阶梯行动计划。

**Architecture:** Next.js App Router 全栈应用，Markdown 文件作知识库（30 条路径），Claude API + 通义千问双模型 RAG，Tailwind CSS + 自定义组件，SQLite 存用户会话记录。

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Claude API (Anthropic SDK) / 通义千问 API, SQLite (better-sqlite3), Vercel 部署

## Global Constraints

- 文件 ≤ 400 行（含类型和注释），不拆分到子组件的组件 ≤ 250 行
- 函数 ≤ 50 行
- 嵌套 ≤ 4 层
- 使用 immutable 模式：const newObj = { ...old, field: newValue }
- 所有 API routes 需处理错误并返回 `{ success: boolean, data?: T, error?: string }` 格式
- 知识库每条路径需标注 `trustLevel: "official" | "ai-inferred" | "community-unreviewed"`
- AI 仅从知识库检索推理（RAG），不做开放域生成
- 必须在 `package.json` 设置 `"type": "module"`（ESM）

---

### Task 1: 项目脚手架与基础配置

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/types/index.ts`
- Create: `.env.example`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `CareerPath`, `HardConstraint`, `UserProfile`, `ChatMessage`, `TrustLevel` types exported from `src/types/index.ts`

- [ ] **Step 1: 初始化 package.json**

```bash
mkdir -p src/app src/lib src/data/paths src/components/chat src/components/paths src/components/compare src/components/plan src/components/ui src/types public
cd src
```

创建 `package.json`：

```json
{
  "name": "career-maze",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "better-sqlite3": "^11.0.0",
    "@anthropic-ai/sdk": "^0.32.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/better-sqlite3": "^7.6.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: 安装依赖并验证**

```bash
npm install
```

Expected: 安装成功无报错。

- [ ] **Step 3: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] },
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: 创建 next.config.js, tailwind.config.ts, postcss.config.js**

`next.config.js`：
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
};
export default nextConfig;
```

`tailwind.config.ts`：
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          500: '#4f6ef7',
          700: '#3b4fcf',
          900: '#1e2a6e',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f6f8fa',
          elevated: '#ffffff',
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          muted: '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
```

`postcss.config.js`：
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: 创建类型定义 src/types/index.ts**

```ts
export type TrustLevel = 'official' | 'ai-inferred' | 'community-unreviewed';

export interface HardConstraint {
  id: string;
  label: string;
  description: string;
  // 该路径在此约束下的评估
  assessment: 'pass' | 'fail' | 'at-risk' | 'unknown';
  detail: string;
  sourceUrl?: string;
}

export interface CareerPath {
  slug: string;
  title: string;                    // e.g. "国内考研 → 上海外企软件开发"
  category: 'domestic-employment' | 'domestic-postgrad' | 'overseas-study'
    | 'civil-service' | 'freelance' | 'gap-year' | 'other';
  summary: string;                  // 一句话总结
  description: string;              // 详细描述（Markdown）
  constraints: HardConstraint[];    // 9 维硬约束评估
  preferenceScores: {               // 偏好维度 0-100
    interestMatch: number;
    timeFlexibility: number;
    lifestyleCompat: number;
    growthCurve: number;
  };
  trend: 'rising' | 'stable' | 'declining' | 'substitution-risk';
  trendDetail: string;
  exclusivity: string[];            // 选了这条意味着放弃什么
  actionPlan: {                     // 大一 → 大四执行阶梯
    year: string;
    tasks: string[];
  }[];
  tags: string[];                   // 匹配标签
  trustLevel: TrustLevel;
  sourceUrls: string[];             // 数据来源链接
  lastUpdated: string;              // ISO date
  alternatives: string[];           // 相关路径 slug 列表
}

export interface UserProfile {
  grade: string;                    // e.g. "大一上"
  major: string;                    // e.g. "计算机科学与技术"
  universityTier: string;           // e.g. "双非一本"
  targetCity: string;               // e.g. "上海"
  householdBudget: number;          // 家庭可支配教育资金（元）
  interests: string[];
  lifestyle: string[];              // 生活方式偏好
  redLines: string[];               // 底线（不可妥协的）
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  paths?: CareerPath[];             // AI 附带的路径推荐
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

- [ ] **Step 6: 创建根布局 src/app/layout.tsx 和 globals.css**

`src/app/layout.tsx`：
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Career Maze — 找到属于你的路',
  description: '一个帮大学生在信息迷雾中找到方向的引导式决策工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-surface font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
```

`src/app/globals.css`：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --trust-official: #059669;
    --trust-ai: #d97706;
    --trust-community: #dc2626;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  .trust-badge-official {
    @apply inline-flex items-center gap-1 rounded-full border border-emerald-200
           bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700;
  }
  .trust-badge-ai {
    @apply inline-flex items-center gap-1 rounded-full border border-amber-200
           bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700;
  }
  .trust-badge-community {
    @apply inline-flex items-center gap-1 rounded-full border border-red-200
           bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700;
  }

  .trend-rising {
    @apply inline-flex items-center gap-1 text-emerald-600 text-sm font-medium;
  }
  .trend-stable {
    @apply inline-flex items-center gap-1 text-blue-600 text-sm font-medium;
  }
  .trend-declining {
    @apply inline-flex items-center gap-1 text-amber-600 text-sm font-medium;
  }
  .trend-risk {
    @apply inline-flex items-center gap-1 text-red-600 text-sm font-medium;
  }
}
```

- [ ] **Step 7: 创建 .env.example 和 .gitignore**

`.env.example`：
```bash
# AI API Keys (至少配一个)
ANTHROPIC_API_KEY=sk-ant-...
DASHSCOPE_API_KEY=sk-...

# App config
NEXT_PUBLIC_APP_NAME=Career Maze
```

`.gitignore`：
```
node_modules/
.next/
.env
.env.local
*.db
*.db-journal
```

- [ ] **Step 8: 验证脚手架**

```bash
npm run typecheck
```

Expected: `tsc --noEmit` 通过，无类型错误。

```bash
git init && git add -A && git commit -m "chore: scaffold Next.js project with TypeScript and Tailwind"
```

---

### Task 2: 知识库加载器

**Files:**
- Create: `src/lib/knowledge-base.ts`
- Create: `src/data/paths/index.ts`

**Interfaces:**
- Consumes: `CareerPath`, `TrustLevel` from `src/types/index.ts`
- Produces: `loadAllPaths(): Promise<CareerPath[]>`, `getPathBySlug(slug: string): Promise<CareerPath | null>`, `searchPaths(query: string, tags: string[]): Promise<CareerPath[]>`

- [ ] **Step 1: 创建路径注册表 src/data/paths/index.ts**

```ts
import type { CareerPath } from '@/types';

// 路径注册表 — 每个 .md 文件在此注册
// 导入方式：打包时静态 import，无需运行时文件读取
const pathModules: Record<string, () => Promise<{ default: CareerPath }>> = {
  // Task 3 创建第一批路径后取消注释
  // 'cs-domestic-employment': () => import('./cs-domestic-employment.md'),
};

export async function loadAllPaths(): Promise<CareerPath[]> {
  const paths: CareerPath[] = [];
  for (const loader of Object.values(pathModules)) {
    const mod = await loader();
    paths.push(mod.default);
  }
  return paths;
}

export function getPathSlugs(): string[] {
  return Object.keys(pathModules);
}
```

- [ ] **Step 2: 创建知识库工具函数 src/lib/knowledge-base.ts**

```ts
import type { CareerPath, HardConstraint } from '@/types';
import { loadAllPaths } from '@/data/paths';

let cachedPaths: CareerPath[] | null = null;

export async function getAllPaths(): Promise<CareerPath[]> {
  if (!cachedPaths) {
    cachedPaths = await loadAllPaths();
  }
  return cachedPaths;
}

export async function getPathBySlug(
  slug: string
): Promise<CareerPath | null> {
  const paths = await getAllPaths();
  return paths.find((p) => p.slug === slug) ?? null;
}

export async function searchPaths(
  query: string,
  tags: string[]
): Promise<CareerPath[]> {
  const paths = await getAllPaths();
  const queryLower = query.toLowerCase();

  return paths.filter((p) => {
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(queryLower) ||
      p.summary.toLowerCase().includes(queryLower) ||
      p.tags.some((t) => t.toLowerCase().includes(queryLower));

    const matchesTags =
      tags.length === 0 ||
      tags.some((t) => p.tags.includes(t));

    return matchesQuery && matchesTags;
  });
}

export function filterByHardConstraints(
  paths: CareerPath[],
  constraintIds: string[]
): { passing: CareerPath[]; failed: CareerPath[] } {
  const passing: CareerPath[] = [];
  const failed: CareerPath[] = [];

  for (const path of paths) {
    const hasFailure = constraintIds.some((cid) => {
      const c = path.constraints.find((c) => c.id === cid);
      return c?.assessment === 'fail';
    });
    if (hasFailure) {
      failed.push(path);
    } else {
      passing.push(path);
    }
  }

  return { passing, failed };
}

export function getPathAlternatives(path: CareerPath): string[] {
  return path.alternatives;
}
```

- [ ] **Step 3: 为知识库函数写单元测试**

创建测试基础设施（Task 14 统一完成），先确认 `npm run typecheck` 通过。

```bash
npm run typecheck
```

Expected: 无类型错误。

---

### Task 3: 第一批核心路径（5条种子内容）

**Files:**
- Create: `src/data/paths/cs-domestic-employment.md`
- Create: `src/data/paths/cs-domestic-postgrad.md`
- Create: `src/data/paths/cs-germany-masters.md`
- Create: `src/data/paths/cs-japan-it.md`
- Create: `src/data/paths/cs-freelance.md`
- Modify: `src/data/paths/index.ts`

**Interfaces:**
- Consumes: `CareerPath` from `src/types/index.ts`
- Produces: 5 条可加载的 CareerPath 数据，通过 `src/data/paths/index.ts` 注册

- [ ] **Step 1: 创建 cs-domestic-employment.md**

每个路径 Markdown 文件的 frontmatter 字段必须与 `CareerPath` 接口精确对应。文件格式为 ESM 模块导出 JSON 对象：

```ts
import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-domestic-employment',
  title: '直接就业 — 上海外企/中型科技公司软件开发',
  category: 'domestic-employment',
  summary: '本科毕业后直接进入上海外企或中型互联网公司做软件开发，学历要求相对宽松，时间弹性好。',
  description: `## 路径概述

这条路径适合对学历要求不高、希望尽快经济独立的学生。上海的外企（如 SAP、Microsoft、IBM）和
中型科技公司对第一学历的筛选不如大厂严格，更看重实际技术能力和项目经验。

## 真实画像

- **起薪中位数**：上海 CS 本科 12-15k/月（2024 年数据，含年终均摊）
- **3年后薪资**：20-30k/月（取决于技术栈和跳槽策略）
- **工作时间**：外企普遍 10-7-5，中型公司看项目
- **从业者满意度**：中等偏上（外企员工满意度普遍高于互联网大厂）

## 优势

- 零额外时间成本，毕业即就业
- 上海此类岗位充足，跳槽选择多
- 外企工作节奏规律，有时间发展副业或兴趣爱好
- 实战经验积累快，技术成长靠项目驱动

## 风险

- 第一学历可能在晋升到管理岗时成为天花板
- AI 辅助开发工具可能压低初级开发需求
- 外企近年在中国有收缩趋势（部分公司裁员或转移）
- 长期薪资天花板低于大厂或读研后进大厂

## 适合谁

- 家庭经济压力大，需要尽快工作
- 对学历提升没有执念，相信能力比学历重要
- 希望工作和生活有明确边界
- 愿意通过跳槽和自学来弥补学历短板`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外投入，毕业即可获得收入。起薪 12-15k 在上海可覆盖基本生活。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '外企需要基本英语读写能力（CET-4/6），日常沟通以中文为主。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '外企和中型公司对双非学历的接受度较高，更看重技术面试表现。大厂（阿里/腾讯/字节）则较难进入。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'pass', detail: '上海软件开发岗位全国第二（仅次于北京），外企研发中心集中。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4年本科正常毕业即就业，无额外时间投入。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '起薪 12-15k，在上海租房+生活基本够用，但存钱速度慢。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'at-risk', detail: '双非本科在上海 CS 行业入行没问题，但中长期晋升可能受阻。5-8年后部分外企会有学历天花板。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '国内就业，无地缘政治风险。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 85,
    timeFlexibility: 80,
    lifestyleCompat: 75,
    growthCurve: 60,
  },
  trend: 'stable',
  trendDetail: '上海软件开发需求稳定但增长放缓。外企招聘从扩张转向优化，AI 辅助开发可能影响初级岗位需求。建议学习 AI 工具链和架构设计以保持竞争力。',
  exclusivity: ['放弃大厂应届高薪起点的机会', '放弃研究生学历带来的长期晋升优势', '放弃通过保研/考研换学校层次的机会'],
  actionPlan: [
    { year: '大一上', tasks: ['确定计算机子方向（后端/前端/移动端/嵌入式）', '学好 C 语言和数据结构', '加入一个技术社团或开源项目'] },
    { year: '大一下', tasks: ['学习一门主流语言（Java/Python/Go）并做一个小项目', '参加 LeetCode 刷题，从 Easy 开始', '暑假：学习 Git + Linux 基础'] },
    { year: '大二上', tasks: ['深入学习一门框架（Spring Boot / React / Django）', '做一个完整的个人项目并部署上线', '开始系统刷 LeetCode Medium（每周 5 题）'] },
    { year: '大二下', tasks: ['学习系统设计基础（数据库、缓存、消息队列）', '准备一份英文简历', '暑假目标：找到第一份实习（即使是小公司）'] },
    { year: '大三上', tasks: ['继续刷 LeetCode Hard + 系统设计题', '参加 1-2 次技术竞赛或 Hackathon', '更新个人项目，写技术博客'] },
    { year: '大三下', tasks: ['投递暑期实习（外企的暑期实习转正率高）', '准备外企面试（行为面试 + 技术面）', '寒假后开始刷牛客网面经'] },
    { year: '大四上', tasks: ['秋招投递 20+ 家目标公司', '如有暑期实习 offer，全力争取转正', '同步准备 Plan B（中小公司/考研报名）'] },
    { year: '大四下', tasks: ['如秋招未拿到满意 offer，继续春招', '毕业设计', '入职前 3 个月：学习公司技术栈，熟悉业务'] },
  ],
  tags: ['计算机', '就业', '上海', '外企', '软件开发', '本科'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.onetonline.org/link/summary/15-1252.00', 'https://www.mohrss.gov.cn/（需补充具体就业报告链接）'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-postgrad', 'cs-germany-masters', 'cs-freelance'],
};

export default path;
```

（其余 4 条路径的结构相同、内容不同，为节约篇幅不在此重复，实现时照此模板填写。）

- [ ] **Step 2: 创建剩余 4 条路径**

- `cs-domestic-postgrad.md` — 国内考研 → 上海外企/中厂软件开发
- `cs-germany-masters.md` — 德国公立大学 CS 硕士
- `cs-japan-it.md` — 日本 IT 就职路径
- `cs-freelance.md` — 远程开发 / 自由职业

每条路径填入对应专业的 `constraints`, `preferenceScores`, `actionPlan`, `trend` 等字段（具体内容在实现时根据设计文档中的路径矩阵数据填入）。

- [ ] **Step 3: 注册路径到 index.ts**

修改 `src/data/paths/index.ts` 中的 `pathModules`：

```ts
const pathModules: Record<string, () => Promise<{ default: CareerPath }>> = {
  'cs-domestic-employment': () => import('./cs-domestic-employment.md'),
  'cs-domestic-postgrad': () => import('./cs-domestic-postgrad.md'),
  'cs-germany-masters': () => import('./cs-germany-masters.md'),
  'cs-japan-it': () => import('./cs-japan-it.md'),
  'cs-freelance': () => import('./cs-freelance.md'),
};
```

- [ ] **Step 4: 验证知识库可加载**

创建临时测试脚本或在浏览器 console 验证（后续 Task 用 Vitest 正式测试）：

```bash
# 临时验证：用 Node 脚本直接 import
node -e "
  import('./src/data/paths/index.js').then(m => {
    m.loadAllPaths().then(p => console.log('Loaded', p.length, 'paths:', p.map(x => x.slug)))
  })
" 2>&1 || echo "Markdown imports require bundler; verify at runtime in browser instead"
```

> Markdown 文件通过 ESM import 加载需要打包器支持。Next.js 的 Webpack/Turbopack 会处理 `import './file.md'`。如果此处直接 Node 运行失败是预期行为，在 Task 8 中通过浏览器运行时验证。

```bash
git add -A && git commit -m "feat: add knowledge base loader and first 5 career paths"
```

---

### Task 4: 硬约束过滤器引擎

**Files:**
- Create: `src/lib/filter.ts`

**Interfaces:**
- Consumes: `CareerPath`, `HardConstraint` from `src/types/index.ts`
- Produces: `applyConstraints(paths, profile): FilterResult`, `CONSTRAINT_ORDER: string[]`

- [ ] **Step 1: 创建过滤器引擎 src/lib/filter.ts**

```ts
import type { CareerPath, HardConstraint, UserProfile } from '@/types';

// 硬约束筛选顺序（可配置，社区可扩展）
export const CONSTRAINT_ORDER: string[] = [
  'economy',
  'language',
  'degree-gate',
  'graduation-difficulty',
  'location-lock',
  'time-cost',
  'living-standard',
  'degree-value',
  'geopolitics',
];

export interface FilterResult {
  passing: CareerPath[];
  failed: { path: CareerPath; failedConstraints: HardConstraint[] }[];
  atRisk: CareerPath[];
  total: number;
}

export function applyConstraints(
  paths: CareerPath[],
  constraintIds: string[] = CONSTRAINT_ORDER
): FilterResult {
  const passing: CareerPath[] = [];
  const failed: FilterResult['failed'] = [];
  const atRisk: CareerPath[] = [];

  for (const path of paths) {
    const failedConstraints = constraintIds
      .map((cid) => path.constraints.find((c) => c.id === cid))
      .filter((c): c is HardConstraint => c !== undefined)
      .filter((c) => c.assessment === 'fail');

    const atRiskConstraints = constraintIds
      .map((cid) => path.constraints.find((c) => c.id === cid))
      .filter((c): c is HardConstraint => c !== undefined)
      .filter((c) => c.assessment === 'at-risk');

    if (failedConstraints.length > 0) {
      failed.push({ path, failedConstraints });
    } else if (atRiskConstraints.length > 0) {
      atRisk.push(path);
    } else {
      passing.push(path);
    }
  }

  return {
    passing,
    failed,
    atRisk: atRisk.filter((p) => !passing.includes(p) && !failed.find((f) => f.path.slug === p.slug)),
    total: paths.length,
  };
}

export function getConstraintSummary(
  paths: CareerPath[],
  constraintId: string
): { passCount: number; failCount: number; atRiskCount: number } {
  let passCount = 0;
  let failCount = 0;
  let atRiskCount = 0;

  for (const path of paths) {
    const c = path.constraints.find((c) => c.id === constraintId);
    if (!c) continue;
    if (c.assessment === 'pass') passCount++;
    else if (c.assessment === 'fail') failCount++;
    else if (c.assessment === 'at-risk') atRiskCount++;
  }

  return { passCount, failCount, atRiskCount };
}
```

- [ ] **Step 2: 创建偏好评分引擎 src/lib/score.ts**

```ts
import type { CareerPath, UserProfile } from '@/types';

export interface ScoredPath {
  path: CareerPath;
  score: number;        // 0-100
  breakdown: {
    interestMatch: number;     // weighted
    timeFlexibility: number;
    lifestyleCompat: number;
    growthCurve: number;
  };
}

const DEFAULT_WEIGHTS = {
  interestMatch: 0.35,
  timeFlexibility: 0.25,
  lifestyleCompat: 0.25,
  growthCurve: 0.15,
};

export function scorePaths(
  paths: CareerPath[],
  weights: Partial<typeof DEFAULT_WEIGHTS> = {}
): ScoredPath[] {
  const w = { ...DEFAULT_WEIGHTS, ...weights };

  const scored = paths.map((path) => {
    const breakdown = {
      interestMatch: path.preferenceScores.interestMatch * w.interestMatch,
      timeFlexibility: path.preferenceScores.timeFlexibility * w.timeFlexibility,
      lifestyleCompat: path.preferenceScores.lifestyleCompat * w.lifestyleCompat,
      growthCurve: path.preferenceScores.growthCurve * w.growthCurve,
    };

    const score = Object.values(breakdown).reduce((sum, v) => sum + v, 0);

    return { path, score: Math.round(score), breakdown };
  });

  return scored.sort((a, b) => b.score - a.score);
}

export function getUserWeights(userProfile: UserProfile): Partial<typeof DEFAULT_WEIGHTS> {
  const weights: Partial<typeof DEFAULT_WEIGHTS> = {};

  // 根据用户画像动态调整权重
  const freedomKeywords = ['自由', '弹性', '远程', '时间自由'];
  const hasFreedomPreference = userProfile.lifestyle.some((l) =>
    freedomKeywords.some((kw) => l.includes(kw))
  );
  if (hasFreedomPreference) {
    weights.timeFlexibility = 0.35;
    weights.growthCurve = 0.10;
  }

  const growthKeywords = ['高薪', '成长', '发展', '晋升'];
  const hasGrowthPreference = userProfile.lifestyle.some((l) =>
    growthKeywords.some((kw) => l.includes(kw))
  );
  if (hasGrowthPreference) {
    weights.growthCurve = 0.30;
    weights.lifestyleCompat = 0.15;
  }

  return weights;
}
```

- [ ] **Step 3: 验证过滤器**

```bash
npm run typecheck
```

Expected: 无类型错误。

```bash
git add -A && git commit -m "feat: add hard constraint filter and preference scoring engine"
```

---

### Task 5: RAG 引擎与 AI 对话 API

**Files:**
- Create: `src/lib/rag.ts`
- Create: `src/lib/ai.ts`
- Create: `src/app/api/chat/route.ts`

**Interfaces:**
- Consumes: `CareerPath`, `ChatMessage`, `ApiResponse` from `src/types/index.ts`
- Produces: `searchRelevantPaths(query)`, `buildSystemPrompt(paths)`, `POST /api/chat`

- [ ] **Step 1: 创建 RAG 检索引擎 src/lib/rag.ts**

```ts
import type { CareerPath } from '@/types';
import { searchPaths } from './knowledge-base';

interface RagResult {
  path: CareerPath;
  relevance: number;    // 0-1
  matchedFields: string[];
}

export async function searchRelevantPaths(
  query: string,
  maxResults: number = 5
): Promise<RagResult[]> {
  // 关键词提取：从用户查询中提取专业、路径、城市等关键词
  const keywords = extractKeywords(query);

  // 从知识库检索匹配路径
  const matchedPaths: RagResult[] = [];

  for (const keyword of keywords) {
    const paths = await searchPaths(keyword, []);
    for (const path of paths) {
      const existing = matchedPaths.find((r) => r.path.slug === path.slug);
      if (existing) {
        existing.relevance += 0.2;
        existing.matchedFields.push(keyword);
      } else {
        matchedPaths.push({
          path,
          relevance: 0.3,
          matchedFields: [keyword],
        });
      }
    }
  }

  // 标题和摘要包含查询词时增加相关性
  const queryLower = query.toLowerCase();
  for (const result of matchedPaths) {
    if (result.path.title.toLowerCase().includes(queryLower)) {
      result.relevance += 0.3;
    }
    if (result.path.summary.toLowerCase().includes(queryLower)) {
      result.relevance += 0.2;
    }
  }

  return matchedPaths
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxResults);
}

function extractKeywords(query: string): string[] {
  const keywords: string[] = [];
  const patterns: [RegExp, string][] = [
    [/计算机|CS|软件工程|编程|开发|前端|后端|算法|AI|人工智能/, '计算机'],
    [/考研|读研|硕士|博士|保研/, '考研'],
    [/出国|留学|海外|德国|日本|美国|英国|法国/, '出国'],
    [/就业|工作|上班|校招|社招/, '就业'],
    [/考公|选调|公务员|体制|事业编/, '考公'],
    [/自由职业|远程|兼职|副业/, '自由职业'],
    [/上海|北京|深圳|广州|杭州|成都/, '上海'],
    [/外企|大厂|创业|国企/, '外企'],
  ];

  for (const [regex, keyword] of patterns) {
    if (regex.test(query) && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  }

  return keywords;
}

export function buildSystemPrompt(
  relevantPaths: RagResult[],
  userProfile?: Record<string, string>
): string {
  const pathDescriptions = relevantPaths
    .map(
      (r, i) => `
### 路径 ${i + 1}：${r.path.title}
- 摘要：${r.path.summary}
- 类别：${r.path.category}
- 趋势：${r.path.trend}（${r.path.trendDetail}）
- 起薪中位数：见 constraints 中的 economy 字段
- 时间弹性评分：${r.path.preferenceScores.timeFlexibility}/100
- 主要优势：${r.path.constraints.filter((c) => c.assessment === 'pass').slice(0, 3).map((c) => c.label).join('、')}
- 主要风险：${r.path.constraints.filter((c) => c.assessment === 'at-risk' || c.assessment === 'fail').map((c) => `${c.label}: ${c.detail}`).join('；')}
- 排他性：${r.path.exclusivity.join('、')}
`
    )
    .join('\n');

  const userContext = userProfile
    ? `\n## 用户信息\n${Object.entries(userProfile)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}`
    : '';

  return `你是 Career Maze 的职业规划助手。你的职责是帮助学生看清每条路的真面貌，而不是替他们做决定。

## 核心原则（必须严格遵守）

1. **H-I-P（人主导规划）**：你不替学生做决定。你说"根据你的情况，A路适配度72%主要风险X，B路适配度65%主要风险Y"，不说"你应该选A"。
2. **仅从知识库回答**：你只能基于下面的知识库路径推荐，不得凭空编造信息或推荐知识库中不存在的路径。
3. **必须标注来源**：每当你引用数据或给出建议，必须说明数据来自知识库的哪条路径。
4. **反幸存者偏差**：如果数据是极端个例（只看顶部/只看成功者），你必须明确指出。
5. **路径丰富度**：每次推荐至少展示 3 条以上不同类别的路径，不要说只有一条路。
6. **时滞意识**：提醒学生当前数据对应什么时间点，以及毕业时可能的行业变化。
7. **永远保留退路**：每条推荐路径都要有备选方案。

## 知识库路径数据

${pathDescriptions}

## 交互流程

1. 如果学生信息不完整，先通过对话了解他的基本情况（年级、专业、学校层次、目标城市、经济状况、兴趣偏好）
2. 基于了解的信息，匹配知识库中的路径
3. 用"对比展示"的方式呈现路径（不要罗列一堆文字）
4. 每条路径标注：适配度评分、硬约束状态、趋势、主要风险
5. 询问学生是否要深入某条路径（展开执行阶梯计划）

${userContext}

## 输出格式偏好

- 用简洁的对比格式，不用长篇大论
- 用表格或列表对比不同路径
- 数字和评分要醒目
- 风险用⚠️标注，优势用✅标注`;
}
```

- [ ] **Step 2: 创建 AI 客户端 src/lib/ai.ts**

```ts
import Anthropic from '@anthropic-ai/sdk';
import type { CareerPath, ChatMessage } from '@/types';
import { buildSystemPrompt, searchRelevantPaths } from './rag';

let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

export async function chatWithAI(
  messages: ChatMessage[],
  userProfile?: Record<string, string>
): Promise<string> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    return '请先告诉我你的情况，我来帮你看看有哪些路可以走。';
  }

  // RAG：检索相关路径
  const relevantPaths = await searchRelevantPaths(lastUserMessage.content);

  // 如果没有匹配的路径，诚实告知
  if (relevantPaths.length === 0) {
    return '目前知识库中还没有完全匹配你问题的路径信息。你可以试试换个方向描述你的需求，或者告诉我你对哪类专业/行业感兴趣？';
  }

  const systemPrompt = buildSystemPrompt(relevantPaths, userProfile);

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: systemPrompt,
    messages: messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock?.text ?? '抱歉，我暂时无法回答。请稍后再试。';
}

export async function extractUserProfile(
  messages: ChatMessage[]
): Promise<Record<string, string>> {
  // 从对话历史中提取用户画像
  const profile: Record<string, string> = {};

  const fullText = messages.map((m) => m.content).join('\n').toLowerCase();

  const patterns: [RegExp, string][] = [
    [/大[一二三四][上下]|大一|大二|大三|大四/, 'grade'],
    [/计算机|软件|数学|物理|电子|机械|土木/, 'major'],
    [/双非|985|211|一本|二本|专科/, 'universityTier'],
    [/上海|北京|深圳|广州|杭州|成都|武汉|南京/, 'targetCity'],
    [/漫展|二次元|自由|弹性|远程/i, 'lifestyle'],
  ];

  for (const [regex, key] of patterns) {
    const match = fullText.match(regex);
    if (match && !profile[key]) {
      profile[key] = match[0];
    }
  }

  return profile;
}
```

- [ ] **Step 3: 创建 API Route src/app/api/chat/route.ts**

```ts
import { NextRequest, NextResponse } from 'next/server';
import type { ChatMessage, ApiResponse } from '@/types';
import { chatWithAI, extractUserProfile } from '@/lib/ai';

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ reply: string }>>> {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'messages 不能为空' },
        { status: 400 }
      );
    }

    // 提取用户画像用于个性化
    const userProfile = await extractUserProfile(messages);

    // RAG + AI 生成回复
    const reply = await chatWithAI(messages, userProfile);

    return NextResponse.json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI 服务暂时不可用';
    console.error('[chat] error:', message);

    // 不暴露内部错误细节
    return NextResponse.json(
      {
        success: false,
        error: message.includes('ANTHROPIC_API_KEY')
          ? 'AI 服务未配置，请联系管理员'
          : 'AI 服务暂时不可用，请稍后再试',
      },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: 验证 API Route 编译通过**

```bash
npm run typecheck
```

Expected: 无类型错误。

```bash
git add -A && git commit -m "feat: add RAG engine, AI client, and chat API endpoint"
```

---

### Task 6: 聊天界面 UI

**Files:**
- Create: `src/components/chat/ChatInterface.tsx`
- Create: `src/components/chat/MessageBubble.tsx`
- Create: `src/components/chat/PathCard.tsx`
- Create: `src/components/ui/TrustBadge.tsx`
- Create: `src/components/ui/TrendBadge.tsx`
- Create: `src/app/page.tsx`

**Interfaces:**
- Consumes: `ChatMessage`, `CareerPath`, `TrustLevel` from `src/types/index.ts`
- Produces: Chat UI components used by the landing page

- [ ] **Step 1: 创建 TrustBadge src/components/ui/TrustBadge.tsx**

```tsx
import type { TrustLevel } from '@/types';

const LABELS: Record<TrustLevel, string> = {
  official: '官方数据',
  'ai-inferred': 'AI 推理',
  'community-unreviewed': '社区未审核',
};

const STYLES: Record<TrustLevel, string> = {
  official: 'trust-badge-official',
  'ai-inferred': 'trust-badge-ai',
  'community-unreviewed': 'trust-badge-community',
};

const ICONS: Record<TrustLevel, string> = {
  official: '🟢',
  'ai-inferred': '🟡',
  'community-unreviewed': '🔴',
};

interface TrustBadgeProps {
  level: TrustLevel;
  className?: string;
}

export function TrustBadge({ level, className = '' }: TrustBadgeProps) {
  return (
    <span className={`${STYLES[level]} ${className}`} title={`数据可信度：${LABELS[level]}`}>
      {ICONS[level]} {LABELS[level]}
    </span>
  );
}
```

- [ ] **Step 2: 创建 TrendBadge src/components/ui/TrendBadge.tsx**

```tsx
interface TrendBadgeProps {
  trend: 'rising' | 'stable' | 'declining' | 'substitution-risk';
  detail?: string;
}

const TREND_CONFIG = {
  rising: { label: '上升', icon: '↑', className: 'trend-rising' },
  stable: { label: '稳定', icon: '→', className: 'trend-stable' },
  declining: { label: '下降', icon: '↓', className: 'trend-declining' },
  'substitution-risk': { label: '替代风险', icon: '⚠', className: 'trend-risk' },
};

export function TrendBadge({ trend, detail }: TrendBadgeProps) {
  const config = TREND_CONFIG[trend];
  return (
    <span className={config.className} title={detail}>
      {config.icon} {config.label}
    </span>
  );
}
```

- [ ] **Step 3: 创建 PathCard src/components/chat/PathCard.tsx**

```tsx
import type { CareerPath } from '@/types';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { TrendBadge } from '@/components/ui/TrendBadge';

interface PathCardProps {
  path: CareerPath;
  score?: number;
  compact?: boolean;
}

export function PathCard({ path, score, compact = false }: PathCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{path.title}</h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <TrustBadge level={path.trustLevel} />
        </div>
      </div>

      <p className="mb-3 text-sm text-gray-600">
        {compact ? path.summary.slice(0, 120) + '...' : path.summary}
      </p>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <TrendBadge trend={path.trend} detail={path.trendDetail} />
        {score !== undefined && (
          <span className="rounded-full bg-brand-100 px-2 py-0.5 font-semibold text-brand-700">
            适配度 {score}%
          </span>
        )}
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500">
          {path.category === 'domestic-employment' ? '直接就业' :
           path.category === 'domestic-postgrad' ? '国内升学' :
           path.category === 'overseas-study' ? '出国出境' :
           path.category === 'civil-service' ? '体制内' :
           path.category === 'freelance' ? '自由职业' : '其他'}
        </span>
      </div>

      {!compact && (
        <>
          <div className="mb-2 space-y-1 text-sm">
            {path.constraints
              .filter((c) => c.assessment === 'at-risk' || c.assessment === 'fail')
              .slice(0, 2)
              .map((c) => (
                <div key={c.id} className="flex items-start gap-1 text-amber-700">
                  <span className="shrink-0 mt-0.5">⚠️</span>
                  <span>{c.detail.slice(0, 80)}...</span>
                </div>
              ))}
          </div>

          <div className="text-xs text-gray-400">
            <span>选择此路径将放弃：{path.exclusivity.slice(0, 2).join('；')}</span>
          </div>
        </>
      )}

      <a
        href={`/paths/${path.slug}`}
        className="mt-3 inline-block text-sm font-medium text-brand-500 hover:text-brand-700"
      >
        查看详情 →
      </a>
    </div>
  );
}
```

- [ ] **Step 4: 创建 MessageBubble src/components/chat/MessageBubble.tsx**

```tsx
import type { ChatMessage } from '@/types';
import { PathCard } from './PathCard';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  // 将 Markdown 格式的 AI 回复中的 **text** 转为 HTML
  const formattedContent = message.content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-brand-500 text-white'
            : 'bg-white border border-gray-200 text-gray-900'
        }`}
      >
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {message.paths && message.paths.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.paths.map((path) => (
              <PathCard key={path.slug} path={path} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 创建 ChatInterface src/components/chat/ChatInterface.tsx**

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '@/types';
import { MessageBubble } from './MessageBubble';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: `你好！我是 Career Maze 的规划助手 👋

我不会替你做决定，但我会帮你把每条路的真面貌看清楚。

先告诉我你的基本情况吧——比如：
- 你大几了？学什么专业？
- 有没有特别想去的城市？
- 你对未来最看重什么？（薪资、自由、稳定、兴趣...）
- 家里能支持你到什么程度？

或者你也可以直接问："学计算机、想去上海、喜欢二次元、希望时间自由一点，有什么路可以走？"`,
  timestamp: new Date().toISOString(),
};

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const json = await res.json();

      const aiMsg: ChatMessage = {
        role: 'assistant',
        content: json.success
          ? json.data.reply
          : '抱歉，我现在暂时无法回答。请稍后再试。',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '网络似乎不太稳定，请检查连接后重试。',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-2xl flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-500" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:0.1s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="说说你的情况..."
            rows={2}
            className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            发送
          </button>
        </div>
        <p className="mt-1.5 text-center text-xs text-gray-400">
          AI 仅基于知识库数据推理，不会替你做决定。数据来源可追溯。
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: 创建首页 src/app/page.tsx**

```tsx
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <div>
            <h1 className="text-lg font-bold text-brand-900">Career Maze</h1>
            <p className="text-xs text-gray-500">找到属于你的路</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/paths" className="text-gray-600 hover:text-brand-500 transition-colors">
              路径库
            </a>
            <a href="/compare" className="text-gray-600 hover:text-brand-500 transition-colors">
              对比
            </a>
          </nav>
        </div>
      </header>
      <ChatInterface />
    </main>
  );
}
```

- [ ] **Step 7: 启动开发服务器验证界面**

```bash
npm run dev
```

打开 `http://localhost:3000`，确认：
- 页面加载正常
- 欢迎消息显示正确
- 输入框和发送按钮可用
- AI API 调用正常（需要配置 ANTHROPIC_API_KEY 环境变量）

```bash
git add -A && git commit -m "feat: add chat UI with welcome message, input, and AI integration"
```

---

### Task 7: 路径详情页

**Files:**
- Create: `src/app/paths/[slug]/page.tsx`
- Create: `src/components/paths/PathDetail.tsx`
- Create: `src/components/paths/ConstraintList.tsx`

**Interfaces:**
- Consumes: `CareerPath`, `HardConstraint` from `src/types/index.ts`
- Produces: 路径详情页，展示全部 9 维约束、执行计划、趋势标注、备选路径

- [ ] **Step 1: 创建 ConstraintList src/components/paths/ConstraintList.tsx**

```tsx
import type { HardConstraint } from '@/types';

interface ConstraintListProps {
  constraints: HardConstraint[];
}

const STATUS_ICONS: Record<string, string> = {
  pass: '✅',
  fail: '❌',
  'at-risk': '⚠️',
  unknown: '❓',
};

export function ConstraintList({ constraints }: ConstraintListProps) {
  return (
    <div className="space-y-3">
      {constraints.map((c) => (
        <div
          key={c.id}
          className={`rounded-lg border p-3 ${
            c.assessment === 'fail'
              ? 'border-red-200 bg-red-50'
              : c.assessment === 'at-risk'
                ? 'border-amber-200 bg-amber-50'
                : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span>{STATUS_ICONS[c.assessment]}</span>
                <h4 className="font-medium text-gray-900">{c.label}</h4>
              </div>
              <p className="mt-1 text-sm text-gray-600">{c.detail}</p>
            </div>
          </div>
          {c.sourceUrl && (
            <a
              href={c.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-block text-xs text-brand-500 hover:underline"
            >
              数据来源 →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 创建 PathDetail 组件**

此组件展示路径的完整信息：标题、摘要、描述、约束、偏好评分、趋势、执行计划。

```tsx
import type { CareerPath } from '@/types';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { ConstraintList } from './ConstraintList';

interface PathDetailProps {
  path: CareerPath;
}

export function PathDetail({ path }: PathDetailProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TrustBadge level={path.trustLevel} />
          <TrendBadge trend={path.trend} detail={path.trendDetail} />
          <span className="text-sm text-gray-500">
            更新于 {path.lastUpdated}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{path.title}</h1>
        <p className="mt-2 text-gray-600">{path.summary}</p>
      </div>

      {/* 偏好评分 */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">适配度画像</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: '兴趣匹配', value: path.preferenceScores.interestMatch },
            { label: '时间弹性', value: path.preferenceScores.timeFlexibility },
            { label: '生活方式', value: path.preferenceScores.lifestyleCompat },
            { label: '成长曲线', value: path.preferenceScores.growthCurve },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="text-2xl font-bold text-brand-500">{item.value}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 硬约束 */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          硬约束评估（{path.constraints.filter((c) => c.assessment === 'fail').length} 项不通过）
        </h2>
        <ConstraintList constraints={path.constraints} />
      </section>

      {/* 详细描述（Markdown 渲染） */}
      <section className="prose prose-gray mb-8 max-w-none">
        <h2 className="text-lg font-semibold text-gray-900">路径详情</h2>
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{
            __html: path.description
              .replace(/## (.*)/g, '<h3 class="text-base font-semibold mt-4 mb-2">$1</h3>')
              .replace(/- (.*)/g, '<li class="ml-4 text-sm">$1</li>')
              .replace(/\n/, '<br/>'),
          }}
        />
      </section>

      {/* 排他性 */}
      <section className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h2 className="mb-2 font-semibold text-amber-800">选择此路径意味着放弃</h2>
        <ul className="space-y-1">
          {path.exclusivity.map((item, i) => (
            <li key={i} className="text-sm text-amber-700">
              · {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 执行计划 */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">大学四年执行阶梯</h2>
        <div className="space-y-3">
          {path.actionPlan.map((plan) => (
            <div key={plan.year} className="rounded-lg border border-gray-200 bg-white p-3">
              <h3 className="mb-1.5 font-medium text-brand-700">{plan.year}</h3>
              <ul className="space-y-1">
                {plan.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0 text-brand-400">▸</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 数据来源 */}
      <section className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-gray-500">数据来源</h2>
        <ul className="space-y-1">
          {path.sourceUrls.map((url, i) => (
            <li key={i}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-500 break-all hover:underline"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 备选路径 */}
      {path.alternatives.length > 0 && (
        <section className="rounded-lg border border-brand-100 bg-brand-50 p-4">
          <h2 className="mb-2 font-semibold text-brand-900">相关路径</h2>
          <div className="flex flex-wrap gap-2">
            {path.alternatives.map((slug) => (
              <a
                key={slug}
                href={`/paths/${slug}`}
                className="rounded-md bg-white px-3 py-1.5 text-sm text-brand-600 shadow-sm transition-colors hover:bg-brand-100"
              >
                {slug.replace(/-/g, ' ')}
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
```

- [ ] **Step 3: 创建路径详情页面路由 src/app/paths/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPathBySlug } from '@/lib/knowledge-base';
import { PathDetail } from '@/components/paths/PathDetail';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const path = await getPathBySlug(params.slug);
  if (!path) return { title: '路径未找到 — Career Maze' };
  return { title: `${path.title} — Career Maze`, description: path.summary };
}

export default async function PathPage({ params }: PageProps) {
  const path = await getPathBySlug(params.slug);
  if (!path) notFound();

  return <PathDetail path={path} />;
}
```

- [ ] **Step 4: 验证类型检查和路由**

```bash
npm run typecheck
```

Expected: 无类型错误。

```bash
git add -A && git commit -m "feat: add path detail page with constraints, action plan, and alternatives"
```

---

### Task 8: 路径浏览器

**Files:**
- Create: `src/app/paths/page.tsx`
- Create: `src/components/paths/PathExplorer.tsx`
- Create: `src/components/paths/ConstraintFilter.tsx`

**Interfaces:**
- Consumes: `CareerPath` from `src/types/index.ts`
- Produces: 路径列表页，支持按约束、类别、搜索词过滤

- [ ] **Step 1: 创建 ConstraintFilter 组件**

```tsx
'use client';

import { CONSTRAINT_ORDER } from '@/lib/filter';

const CONSTRAINT_LABELS: Record<string, string> = {
  economy: '经济可行性',
  language: '语言能力',
  'degree-gate': '学历准入',
  'graduation-difficulty': '毕业难度',
  'location-lock': '地域锁定',
  'time-cost': '时间成本',
  'living-standard': '生活水平',
  'degree-value': '学历含金量',
  geopolitics: '地缘政治',
};

interface ConstraintFilterProps {
  enabledConstraints: string[];
  onToggle: (id: string) => void;
}

export function ConstraintFilter({
  enabledConstraints,
  onToggle,
}: ConstraintFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">硬约束筛选</h3>
      <p className="text-xs text-gray-400">勾选的约束会过滤掉不通过的路径</p>
      <div className="flex flex-wrap gap-1.5">
        {CONSTRAINT_ORDER.map((id) => (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              enabledConstraints.includes(id)
                ? 'bg-brand-100 text-brand-700 border border-brand-300'
                : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            {CONSTRAINT_LABELS[id] || id}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 PathExplorer 组件**

```tsx
'use client';

import { useState, useMemo } from 'react';
import type { CareerPath } from '@/types';
import { applyConstraints } from '@/lib/filter';
import { PathCard } from '@/components/chat/PathCard';
import { ConstraintFilter } from './ConstraintFilter';
import { scorePaths } from '@/lib/score';

interface PathExplorerProps {
  paths: CareerPath[];
}

type SortKey = 'score' | 'interest' | 'flexibility' | 'lifestyle' | 'growth';

export function PathExplorer({ paths }: PathExplorerProps) {
  const [search, setSearch] = useState('');
  const [enabledConstraints, setEnabledConstraints] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortKey>('score');

  const toggleConstraint = (id: string) => {
    setEnabledConstraints((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    let result = paths;

    // 搜索过滤
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 类别过滤
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // 硬约束过滤
    if (enabledConstraints.length > 0) {
      const { passing, atRisk } = applyConstraints(result, enabledConstraints);
      result = [...passing, ...atRisk];
    }

    return result;
  }, [paths, search, category, enabledConstraints]);

  const sorted = useMemo(() => {
    if (sortBy === 'score') {
      return scorePaths(filtered).map((s) => ({ path: s.path, score: s.score }));
    }
    return filtered
      .map((path) => {
        const key =
          sortBy === 'interest'
            ? path.preferenceScores.interestMatch
            : sortBy === 'flexibility'
              ? path.preferenceScores.timeFlexibility
              : sortBy === 'lifestyle'
                ? path.preferenceScores.lifestyleCompat
                : path.preferenceScores.growthCurve;
        return { path, score: key };
      })
      .sort((a, b) => b.score - a.score);
  }, [filtered, sortBy]);

  const categories = [
    { value: '', label: '全部' },
    { value: 'domestic-employment', label: '直接就业' },
    { value: 'domestic-postgrad', label: '国内升学' },
    { value: 'overseas-study', label: '出国' },
    { value: 'civil-service', label: '体制' },
    { value: 'freelance', label: '自由职业' },
  ];

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="搜索路径、标签、关键词..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                category === c.value
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <ConstraintFilter
          enabledConstraints={enabledConstraints}
          onToggle={toggleConstraint}
        />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">排序：</span>
          {[
            { key: 'score' as SortKey, label: '综合适配' },
            { key: 'interest' as SortKey, label: '兴趣' },
            { key: 'flexibility' as SortKey, label: '弹性' },
            { key: 'growth' as SortKey, label: '成长' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`rounded px-2 py-0.5 text-xs transition-colors ${
                sortBy === key
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500">{sorted.length} 条路径</p>
        {sorted.map(({ path, score }) => (
          <PathCard key={path.slug} path={path} score={score} />
        ))}
        {sorted.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <p className="text-lg">没有匹配的路径</p>
            <p className="mt-1 text-sm">试试放宽筛选条件或换个关键词</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建路径库页面 src/app/paths/page.tsx**

```tsx
import { getAllPaths } from '@/lib/knowledge-base';
import type { Metadata } from 'next';
import { PathExplorer } from '@/components/paths/PathExplorer';

export const metadata: Metadata = {
  title: '路径库 — Career Maze',
  description: '浏览和筛选所有职业规划路径',
};

export default async function PathsPage() {
  const paths = await getAllPaths();

  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <div>
            <a href="/" className="text-lg font-bold text-brand-900">Career Maze</a>
            <p className="text-xs text-gray-500">路径库</p>
          </div>
          <a href="/" className="text-sm text-gray-600 hover:text-brand-500 transition-colors">
            ← 回到对话
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">路径库</h1>
        <p className="mb-8 text-gray-500">
          浏览所有已录入的职业路径。每条路径都标注了数据可信度和趋势预测。
        </p>
        <PathExplorer paths={paths} />
      </div>
    </main>
  );
}
```

- [ ] **Step 4: 验证**

```bash
npm run typecheck && git add -A && git commit -m "feat: add path explorer with search, filter, and sort"
```

---

### Task 9: 路径对比器

**Files:**
- Create: `src/app/compare/page.tsx`
- Create: `src/components/compare/PathComparator.tsx`

**Interfaces:**
- Consumes: `CareerPath` from `src/types/index.ts`
- Produces: 路径对比页，最多 5 条路径并列对比

- [ ] **Step 1: 创建 PathComparator 组件**

```tsx
'use client';

import { useState } from 'react';
import type { CareerPath } from '@/types';

interface PathComparatorProps {
  paths: CareerPath[];
}

export function PathComparator({ paths }: PathComparatorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 5
          ? [...prev, slug]
          : prev
    );
  };

  const selectedPaths = paths.filter((p) => selected.includes(p.slug));

  const comparisonFields = [
    { key: 'category', label: '类别', render: (p: CareerPath) => p.category },
    { key: 'economy', label: '经济可行性', render: (p: CareerPath) => p.constraints.find((c) => c.id === 'economy')?.assessment },
    { key: 'language', label: '语言要求', render: (p: CareerPath) => p.constraints.find((c) => c.id === 'language')?.assessment },
    { key: 'degree', label: '学历准入', render: (p: CareerPath) => p.constraints.find((c) => c.id === 'degree-gate')?.assessment },
    { key: 'time', label: '时间成本', render: (p: CareerPath) => p.constraints.find((c) => c.id === 'time-cost')?.assessment },
    { key: 'trend', label: '趋势', render: (p: CareerPath) => p.trend },
    { key: 'interest', label: '兴趣匹配', render: (p: CareerPath) => `${p.preferenceScores.interestMatch}/100` },
    { key: 'flexibility', label: '时间弹性', render: (p: CareerPath) => `${p.preferenceScores.timeFlexibility}/100` },
    { key: 'lifestyle', label: '生活方式', render: (p: CareerPath) => `${p.preferenceScores.lifestyleCompat}/100` },
    { key: 'growth', label: '成长曲线', render: (p: CareerPath) => `${p.preferenceScores.growthCurve}/100` },
  ];

  const assessmentIcon: Record<string, string> = {
    pass: '✅', fail: '❌', 'at-risk': '⚠️', unknown: '❓',
  };

  const trendLabel: Record<string, string> = {
    rising: '↑ 上升', stable: '→ 稳定', declining: '↓ 下降', 'substitution-risk': '⚠ 替代风险',
  };

  return (
    <div className="space-y-8">
      {/* Selector */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">选择要对比的路径（最多5条）</h2>
        <div className="flex flex-wrap gap-2">
          {paths.map((p) => (
            <button
              key={p.slug}
              onClick={() => toggle(p.slug)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                selected.includes(p.slug)
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p.title.slice(0, 25)}
              {p.title.length > 25 ? '...' : ''}
            </button>
          ))}
        </div>
        {selected.length >= 5 && (
          <p className="mt-1.5 text-xs text-amber-600">已达到最大对比数量（5条）</p>
        )}
      </div>

      {/* Comparison Table */}
      {selectedPaths.length >= 2 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">维度</th>
                {selectedPaths.map((p) => (
                  <th key={p.slug} className="px-4 py-3 text-left font-medium text-gray-700">
                    <a href={`/paths/${p.slug}`} className="text-brand-500 hover:underline">
                      {p.title.slice(0, 20)}...
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {comparisonFields.map((field) => (
                <tr key={field.key}>
                  <td className="px-4 py-2.5 font-medium text-gray-600">{field.label}</td>
                  {selectedPaths.map((p) => {
                    const value = field.render(p);
                    if (field.key === 'trend') {
                      return (
                        <td key={p.slug} className="px-4 py-2.5">
                          {trendLabel[value as string] || value}
                        </td>
                      );
                    }
                    if (['economy', 'language', 'degree', 'time'].includes(field.key)) {
                      return (
                        <td key={p.slug} className="px-4 py-2.5">
                          {assessmentIcon[value as string] || '?'} {value}
                        </td>
                      );
                    }
                    return (
                      <td key={p.slug} className="px-4 py-2.5 text-gray-700">
                        {String(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPaths.length < 2 && (
        <div className="py-12 text-center text-gray-400">
          <p>请至少选择 2 条路径进行对比</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 创建对比页路由**

```tsx
import { getAllPaths } from '@/lib/knowledge-base';
import type { Metadata } from 'next';
import { PathComparator } from '@/components/compare/PathComparator';

export const metadata: Metadata = {
  title: '路径对比 — Career Maze',
};

export default async function ComparePage() {
  const paths = await getAllPaths();

  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <div>
            <a href="/" className="text-lg font-bold text-brand-900">Career Maze</a>
            <p className="text-xs text-gray-500">路径对比</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/paths" className="text-gray-600 hover:text-brand-500 transition-colors">路径库</a>
            <a href="/" className="text-gray-600 hover:text-brand-500 transition-colors">对话</a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">路径对比器</h1>
        <p className="mb-8 text-gray-500">
          并列对比不同路径在关键维度上的差异，帮你做出知情决策。
        </p>
        <PathComparator paths={paths} />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: 验证**

```bash
npm run typecheck && git add -A && git commit -m "feat: add path comparison tool with side-by-side constraints and scores"
```

---

### Task 10: 补充知识库到 30 条路径

**Files:**
- Create: `src/data/paths/cs-civil-service-tech.md`, `cs-us-masters.md`, `cs-france-masters.md`, `cs-uk-masters.md`, `cs-australia-masters.md`, `cs-singapore-masters.md`, `cs-korea-masters.md`, `cs-startup-join.md`, `cs-remote-overseas.md`, `cs-digital-nomad.md`, `cs-tech-writer.md`, `cs-devops.md`, `cs-security.md`, `cs-data-science.md`, `cs-game-dev.md`, `cs-embedded.md`, `cs-selected-transfer.md`, `cs-teacher-cert.md`, `cs-mba-path.md`, `cs-gap-year.md`, `cs-second-degree.md`, `cs-exchange-program.md`, `cs-indie-hacker.md`, `cs-blockchain.md`, `cs-open-source.md`
- Modify: `src/data/paths/index.ts`

按照 Task 3 中的模板格式创建剩余 25 条路径，每条填入：
- 基础信息（slug, title, category, summary, description, tags）
- 9 维硬约束评估
- 4 维偏好评分
- 趋势标注
- 排他性说明
- 大一 → 大四执行计划
- 备选路径
- 数据来源

> 限于篇幅不在此重复全部 25 条路径的完整内容。实现时参照 Task 3 模板，根据设计文档中的路径矩阵填充数据。

在 `index.ts` 中注册所有新路径。

```bash
git add -A && git commit -m "feat: add 25 additional career paths to knowledge base (30 total)"
```

---

### Task 11: README 与开源发布

**Files:**
- Create: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `LICENSE`

- [ ] **Step 1: 创建 README.md**

```markdown
# Career Maze — 找到属于你的路

一个帮中国大学生在信息迷雾中找到方向的引导式决策工具。

## 为什么需要 Career Maze

> 很多大学生对自己的定位不够清晰，目标也不清晰，导致对未来很焦虑和迷茫。
> 主要是不会规划，而网络上的事情又真真假假，各方的观点都有局限，不能作为很好的参考，只会徒增焦虑。

Career Maze 通过三个核心机制解决这个问题：

1. **知识库驱动**：每条路径的数据标注来源和可信度，AI 只从知识库推理，不编造信息
2. **引导式对话**：不是丢给你一堆数据自己看，而是通过自然对话帮你梳理自己的需求
3. **多维度对比**：不只是就业率——经济可行性、语言门槛、时间弹性、生活方式兼容性，全在这

## 核心原则

- **H-I-P（人主导规划）**：AI 只是工具，所有决定由你做出
- **拒绝幸存者偏差**：数据标注是「中位数」还是「极端个例」
- **路径不能单一**：每次推荐至少 3 条以上不同类别的路径
- **永远有退路**：每条路都带着 Plan B

## 技术栈

Next.js · TypeScript · Tailwind CSS · Claude API / 通义千问 · Markdown 知识库

## 快速开始

```bash
git clone https://github.com/YOUR_USERNAME/career-maze.git
cd career-maze
cp .env.example .env
# 编辑 .env，填入你的 ANTHROPIC_API_KEY
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 开始使用。

## 项目结构

```
src/
├── app/           # Next.js App Router 页面和 API
├── components/    # React 组件（chat/paths/compare/ui）
├── lib/           # 核心逻辑（知识库/过滤器/评分/RAG）
├── data/paths/    # Markdown 知识库路径条目
└── types/         # TypeScript 类型定义
```

## 贡献

这个项目目前是个人 MVP，非常欢迎你参与完善！

### 如何贡献

1. **新增路径**：在 `src/data/paths/` 下创建新的 `.md` 文件，参照现有模板填写
2. **完善数据**：找到数据错误或过时？提 Issue 或 PR
3. **建议约束维度**：你认为硬约束应该增加什么？在 Discussions 提出
4. **改进 AI 提示词**：`src/lib/rag.ts` 中的 `buildSystemPrompt` 函数

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 设计文档

- [产品设计文档](docs/superpowers/specs/2026-07-16-college-career-maze-design.md)
- [设计推导过程](docs/design-process/design-derivation.md)

## License

MIT
```

- [ ] **Step 2: 创建 CONTRIBUTING.md**

```markdown
# 贡献指南

感谢你愿意帮 Career Maze 变得更好！

## 路径贡献

路径文件在 `src/data/paths/` 下，是 ESM 模块格式的 TypeScript 文件（目前是 `.md` 扩展名以区分于其他 TS 文件，内容为 `export default pathObject`）。

### 路径模板

参考 `cs-domestic-employment.md` 的完整模板。提交新路径前确认：
- [ ] 所有 9 维约束评估有具体说明（不是空字符串）
- [ ] 偏好评分基于真实数据或合理推断（标注推断来源）
- [ ] 趋势标注有产业报告或政策文件支持
- [ ] 执行计划可操作（不为空或模糊的"好好学习"）
- [ ] 数据来源 URL 可访问

### 可信度标注

- 🟢 官方数据：来自教育部、统计局、O*NET、高校官方报告
- 🟡 AI 推理：基于多个可靠来源的综合推断
- 🔴 社区未审核：社区贡献但未经人工审核确认

## 代码贡献

1. Fork 并 Clone
2. 创建分支：`feat/your-feature-name`
3. 遵循项目代码风格：TypeScript strict、immutable 模式、Tailwind 组件
4. 提交 PR 并描述变更
```

- [ ] **Step 3: 验证 GitHub 就绪**

```bash
npm run typecheck && npm run build
```

修复所有构建错误。

```bash
git add -A && git commit -m "docs: add README, CONTRIBUTING, and LICENSE"
```

- [ ] **Step 4: 推送到 GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/career-maze.git
git branch -M main
git push -u origin main
```

---

### Task 12: 最终验证与部署

- [ ] **Step 1: 全量构建验证**

```bash
npm run build
```

Expected: 构建成功，无错误和警告。

- [ ] **Step 2: 部署到 Vercel**

```bash
# 在 Vercel 控制台导入 GitHub 仓库，或使用 CLI
npx vercel --prod
```

在 Vercel Dashboard 中配置环境变量 `ANTHROPIC_API_KEY`。

- [ ] **Step 3: 功能验收清单**

| 功能 | 验证方式 |
|------|---------|
| 对话页面加载 | 访问 `/`，看到欢迎消息 |
| AI 对话 | 输入用户画像描述，AI 基于知识库回复 |
| AI 不编造信息 | 问知识库中不存在的路径方向，AI 应诚实告知 |
| 路径库浏览 | 访问 `/paths`，看到所有路径，可搜索/过滤/排序 |
| 路径详情 | 点击"查看详情"，展示完整 9 维约束和 4 年计划 |
| 路径对比 | 访问 `/compare`，选择 2-5 条路径并列对比 |
| 可信度标注 | 每条路径展示 🟢/🟡/🔴 可信度标签 |
| 趋势标注 | 每条路径展示 ↑/→/↓/⚠ 趋势 |
| 响应式 | 在 375px 和 1024px 宽度下测试 |
| RAG 检索 | AI 回复引用知识库具体路径的数据 |

- [ ] **Step 4: 发布到社群**

```bash
# 1. GitHub Release
gh release create v0.1.0 --title "Career Maze MVP" --notes "首个 MVP 版本。包含 30 条路径、AI 对话引导、路径对比器。详见 README。"

# 2. 社群分享
# 在你的群中分享 GitHub 链接 + 简短的文字说明
```

---

## 实现预估

| Task | 内容 | 预估时间 |
|------|------|---------|
| 1 | 项目脚手架 | 15 min |
| 2 | 知识库加载器 | 20 min |
| 3 | 第一批 5 条路径 | 60 min |
| 4 | 过滤器和评分引擎 | 30 min |
| 5 | RAG + AI API | 45 min |
| 6 | 聊天 UI | 45 min |
| 7 | 路径详情页 | 30 min |
| 8 | 路径浏览器 | 30 min |
| 9 | 路径对比器 | 30 min |
| 10 | 补充 25 条路径 | 90 min |
| 11 | README + 开源 | 20 min |
| 12 | 验证 + 部署 | 20 min |

**总计：约 7-8 小时**（可在 1-2 天内完成）

---

## 后续迭代（不在此计划中）

- 小程序版本
- 用户会话持久化（SQLite）
- 通义千问双模型支持
- 社区贡献系统
- 自定义约束维度
- 联合分析偏好测量（替代简单评分）
- 自动爬虫 + 数据更新
