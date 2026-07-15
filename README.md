# Career Maze — 找到属于你的路

> 一个给大学生的引导式职业规划工具。不制造焦虑，不贩卖成功学，只帮你把每条路都看清楚。

---

## 为什么要有这个项目

在中国上大学，规划这件事挺难的。

大一的时候你可能连自己专业能干什么都不清楚，到了大二，身边的人已经开始卷考研、卷实习、卷考公，声音越来越多，也越来越乱。你打开小红书，满屏的"双非逆袭985""XX专业已死""大学四年必须做的50件事"；你问学长学姐，听到的是经过严重筛选的幸存者故事——失败了的人不会发帖，也不会主动来讲。

信息不对称 + 幸存者偏差 + 算法加持的焦虑叙事，让本该是"探索可能性"的大学四年，变成了"在噪音中赌博"。

**Career Maze 想做的只有一件事：把你的选项摊开，把每条路真实的样子告诉你，然后让你自己选。**

我们不做"你应该选A"这种判断，那是你的事。我们做的是"A路在你当前的约束下适配度 72%，主要风险是 X，如果选了 A 意味着你要放弃 B 和 C"——把信息给到，把决策留给你。

---

## 三个核心机制

### 1. 知识库驱动，不是瞎聊

AI 对话不会凭空编造信息。所有回答都从知识库中检索——O\*NET 职业数据、教育部公开报告、政策文件——每条数据都标注来源、可信度和更新时间。你看得到每句话是从哪来的。

### 2. 引导式对话，不是问答机器人

不是那种"输入你的专业→返回职业列表"的工具。对话会引导你一步步理清自己的约束条件：经济可行性、语言门槛、目标城市、生活方式偏好……不是告诉你要选什么，而是帮你发现自己不能接受什么。

### 3. 多维度对比，不是单一结论

任何推荐都同时展示 3 条以上不同类别的路径，每条路径标注趋势（上升/稳定/下降/替代风险）、排他性（选了这条意味着你放弃了什么），以及从大一到大四的可执行阶梯计划。你可以把多条路径并排对比，看硬约束通过情况、适配度、风险、趋势。

---

## 核心理念

| 理念 | 说明 |
|------|------|
| **H-I-P（人主导规划）** | AI 只是信息检索和推理工具，所有决策由人做出。AI 不说"你应该选A"，而是说"A路适配度72%，主要风险X"。 |
| **拒绝幸存者偏差** | 每条数据标注来源和可信度（🟢 官方公开数据 / 🟡 AI 推理数据 / 🔴 社区未审核），主动呈现失败叙事和平凡样本。 |
| **路径不能单一** | 任何输出必须展示 3 条以上不同类别的路径，主动暴露你不知道的选项。 |
| **永远有退路** | 每条路径标注排他性，考研失败、出国被拒的 Plan B 永远并行展示。你不被任何一条路绑架。 |

---

## 技术栈

| 层 | 技术 |
|---|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript (strict mode) |
| 样式 | Tailwind CSS 3 |
| AI | Claude API / 通义千问 (可切换) |
| 知识库 | Markdown 文件 + RAG 检索 |
| 数据库 | SQLite (better-sqlite3) |

---

## 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/your-username/career-maze.git
cd career-maze

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env，填入至少一个 AI API Key（Anthropic 或 DashScope）

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# 5. 打开浏览器
# http://localhost:3000
```

### 环境变量说明

| 变量 | 必填 | 说明 |
|------|------|------|
| `ANTHROPIC_API_KEY` | 二选一 | Claude API 密钥 |
| `DASHSCOPE_API_KEY` | 二选一 | 通义千问 API 密钥 |
| `NEXT_PUBLIC_APP_NAME` | 否 | 应用名称，默认 `Career Maze` |

---

## 项目结构

```
career-maze/
├── docs/                           # 设计文档
│   ├── superpowers/
│   │   ├── specs/                  # 产品设计文档
│   │   └── plans/                  # MVP 实施计划
│   └── design-process/             # 设计推导过程
├── public/                         # 静态资源
├── src/
│   ├── app/                        # Next.js App Router 页面
│   │   ├── page.tsx                # 首页（对话入口）
│   │   ├── layout.tsx              # 全局布局
│   │   ├── globals.css             # 全局样式
│   │   ├── paths/                  # 路径浏览与详情页
│   │   │   ├── page.tsx            # 路径库列表
│   │   │   └── [slug]/page.tsx     # 单条路径详情
│   │   ├── compare/                # 路径对比页
│   │   │   └── page.tsx
│   │   └── api/chat/route.ts       # AI 对话 API
│   ├── components/
│   │   ├── chat/                   # 对话相关组件
│   │   │   ├── ChatInterface.tsx   # 对话主界面
│   │   │   ├── MessageBubble.tsx   # 消息气泡
│   │   │   └── PathCard.tsx        # 路径推荐卡片
│   │   ├── paths/                  # 路径相关组件
│   │   │   ├── PathExplorer.tsx    # 路径探索器
│   │   │   ├── PathDetail.tsx      # 路径详情面板
│   │   │   ├── ConstraintFilter.tsx # 硬约束筛选器
│   │   │   └── ConstraintList.tsx  # 约束列表
│   │   ├── compare/                # 对比组件
│   │   │   └── PathComparator.tsx  # 路径对比器
│   │   └── ui/                     # 通用 UI 组件
│   │       ├── TrustBadge.tsx      # 可信度徽章
│   │       └── TrendBadge.tsx      # 趋势标签
│   ├── data/paths/                 # 知识库 — 路径数据
│   │   ├── index.ts                # 路径注册表
│   │   ├── cs-domestic-employment.md
│   │   ├── cs-germany-masters.md
│   │   └── ...（30 条核心路径）
│   ├── lib/                        # 核心库
│   │   ├── knowledge-base.ts       # 知识库加载器
│   │   ├── filter.ts               # 硬约束筛选引擎
│   │   ├── score.ts                # 偏好评分引擎
│   │   ├── rag.ts                  # RAG 检索引擎
│   │   └── ai.ts                   # AI 客户端（Claude/千问）
│   └── types/                      # TypeScript 类型定义
│       ├── index.ts                # 核心类型
│       └── md.d.ts                 # Markdown 模块声明
├── .env.example                    # 环境变量模板
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 如何参与

这个项目还处于早期阶段，欢迎任何形式的参与：

### 新增路径

知识库目前以计算机专业为主，你可以贡献其他专业方向（金融、医学、法学、建筑等）的路径。参考 `src/data/paths/` 下的现有文件作为模板。

### 完善数据

发现数据过时、不准确，或者某条路径的某个约束评估不合适？提 Issue 或直接改 PR。

### 代码贡献

Fork → 创建分支 → 提交 PR。详情见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

### 反馈与讨论

最直接的方式：用这个工具做一次你自己的规划，把过程中任何让你觉得"不对""不够好""缺了什么"的地方告诉我们。Issue 区随时开放。

---

## 设计文档

项目有完整的设计推导和产品文档：

- [产品设计文档](docs/superpowers/specs/2026-07-16-college-career-maze-design.md) — 问题定义、核心理念、架构设计、决策引擎设计
- [MVP 实施计划](docs/superpowers/plans/2026-07-16-college-career-maze-mvp.md) — 开发阶段、里程碑、技术选型
- [设计推导过程](docs/design-process/design-derivation.md) — 从问题到方案的完整推导记录

---

## 许可

MIT License — 详见 [LICENSE](./LICENSE)。

简单说：随便用、随便改、随便分发，保留版权声明就行。
