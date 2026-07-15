# 贡献指南

感谢你想为 Career Maze 贡献！这个文档说明如何参与项目——不管是新增路径、完善数据，还是改进代码。

---

## 路径贡献

### 路径模板

新增一条路径需要创建一个 Markdown 文件，放在 `src/data/paths/` 目录下。文件名格式为 `{专业缩写}-{路径描述}.md`，例如 `cs-germany-masters.md`。

路径文件格式参考现有文件，核心字段包括：

```yaml
---
slug: "cs-your-path-slug"
title: "路径名称，一句话说清楚这条路是什么"
category: "domestic-employment | domestic-postgrad | overseas-study | civil-service | freelance | gap-year | other"
summary: "一句话总结这条路径"
trustLevel: "official | ai-inferred | community-unreviewed"
lastUpdated: "2026-07-16"
tags: ["标签1", "标签2"]
sourceUrls:
  - "https://..."
trend: "rising | stable | declining | substitution-risk"
trendDetail: "趋势说明，为什么是这个趋势"
exclusivity:
  - "选了这条路意味着放弃什么"
alternatives:
  - "相关路径的 slug"
---
```

约束评估、偏好评分、行动阶梯等字段的具体格式，请直接参考 `src/data/paths/` 下的现有文件。

### 提交路径的检查清单

在提交新增路径之前，确认以下事项：

- [ ] 路径标题清晰，不包含误导性或夸大的表述
- [ ] 每条数据都有可追溯的来源链接（`sourceUrls`）
- [ ] 可信度级别（`trustLevel`）标注正确
- [ ] 硬约束评估基于可验证的数据，而非个人感受
- [ ] 偏好评分有合理的依据说明
- [ ] 行动阶梯具体可执行，不是泛泛的"努力学习"
- [ ] 趋势标注基于近两年的行业报告或政策文件
- [ ] 排他性说明诚实，不刻意隐瞒代价
- [ ] 文件放在正确的目录下，命名符合规范

---

## 可信度级别说明

项目中每条数据都标注了可信度，方便使用者判断信息的可靠程度：

| 级别 | 标示 | 含义 | 示例 |
|------|------|------|------|
| **官方公开数据** | 🟢 | 来自政府统计、教育部报告、O\*NET、统计局等权威公开来源 | 考研报录比（教育部）、行业薪资（统计局） |
| **AI 推理数据** | 🟡 | 基于公开数据经 AI 推理、综合或翻译得到，未经人工逐条审核 | 由 O\*NET 数据综合推断的某岗位成长曲线 |
| **社区未审核** | 🔴 | 来自社区贡献，尚未通过审核流程验证 | 个人经验分享、社区投票数据 |

**我们的目标是让知识库中 🟢 和 🟡 的数据比例不断提高。** 如果你发现某条标注为 🟢 的数据实际来源不够权威，或者某条 🟡 的数据可以找到更好的公开来源替代，请提 Issue。

---

## 代码贡献流程

### 1. Fork 与分支

```bash
# Fork 项目到自己的 GitHub 账号
# Clone 你自己的 fork
git clone https://github.com/your-username/career-maze.git
cd career-maze

# 添加上游仓库
git remote add upstream https://github.com/original-owner/career-maze.git

# 创建功能分支
git checkout -b feat/your-feature-name
```

分支命名建议：
- 新功能：`feat/功能描述`
- Bug 修复：`fix/问题描述`
- 文档更新：`docs/更新内容`
- 路径新增：`path/路径名称`

### 2. 开发

```bash
npm install
cp .env.example .env   # 配置 API Key
npm run dev             # 启动开发服务器
```

提交前运行检查：

```bash
npm run typecheck       # TypeScript 类型检查
npm run lint            # ESLint
npm run build           # 确保构建通过
```

### 3. 提交与 PR

```bash
# 提交（使用约定式提交格式）
git add .
git commit -m "feat: 新增XX专业海外留学路径"

# 同步上游
git fetch upstream
git rebase upstream/main

# 推送并创建 PR
git push origin feat/your-feature-name
```

在 GitHub 上创建 Pull Request，描述清楚你做了什么、为什么这样做。

### 4. 之后

- 维护者会在一周内 review 你的 PR
- CI 检查必须全部通过
- 可能需要根据 review 意见修改

---

## 代码风格

本项目遵循以下代码规范：

### TypeScript

- 开启 strict mode，不允许 `any` 类型
- 公开 API 必须写明参数和返回值类型
- 优先使用 `interface`，联合类型用 `type`
- 错误必须显式处理，不允许静默吞掉异常
- 使用 `unknown` 处理外部输入，然后窄化类型

### 不可变性

永远创建新对象，不修改现有对象：

```typescript
// 正确
function updateProfile(profile: UserProfile, update: Partial<UserProfile>): UserProfile {
  return { ...profile, ...update };
}

// 错误
function updateProfile(profile: UserProfile, update: Partial<UserProfile>): UserProfile {
  Object.assign(profile, update);  // 直接修改了原对象
  return profile;
}
```

### 组件与文件

- 文件控制在 400 行以内，超过 800 行必须拆分
- 函数控制在 50 行以内
- 嵌套不超过 4 层
- 组件按功能领域组织（`chat/`、`paths/`、`compare/`），不按文件类型

### Tailwind CSS

- 优先使用 Tailwind 内置的工具类
- 设计 token（颜色、间距、字号）通过 `tailwind.config.ts` 统一管理
- 避免使用内联 `style` 属性

---

## 提问与讨论

- Bug 报告：在 Issue 中描述复现步骤、期望行为、实际行为
- 功能建议：先说清楚你遇到了什么问题，再说你希望怎么解决
- 一般讨论：Issue 区随时开放
