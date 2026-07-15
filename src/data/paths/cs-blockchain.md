import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-blockchain',
  title: '区块链/Web3 开发 — Solidity 智能合约/链上数据分析',
  category: 'domestic-employment',
  summary: '从事 Solidity 智能合约开发、Web3 前端或链上数据分析，国内监管收紧但海外远程岗位仍有大量需求。',
  description: `## 路径概述

Web3/区块链开发是 CS 领域中一个高度垂直但充满机会的方向。核心技能栈包括 Solidity（以太坊智能合约）、
Rust（Solana/Polkadot）、Web3.js/Ethers.js（前端对接）、以及链上数据分析（Dune Analytics/Flipside）。
目前国内对加密货币和 Web3 的监管整体收紧，但海外远程岗位和合规方向仍然活跃。

## 真实画像

- **薪资范围**：初级 Web3 开发者国内约 15-25k/月，海外远程岗位 $3k-$8k/月，合约审计更高
- **就业渠道**：CryptoJobsList、Web3.career、DeJob、推特/X 社区招聘
- **技能门槛**：Solidity + EVM 基础 + DeFi 协议理解是入门三件套
- **工作模式**：海外项目多为完全远程，国内合规项目（联盟链、数字藏品平台）为线下办公

## 优势

- 技术栈相对集中，入门路径清晰（OZ 库 + Hardhat/Foundry + Ethers.js）
- 海外远程岗位多，高薪资且不受地理限制
- 智能合约审计方向时薪极高（$200-$500/h）
- 社区文化开放，顶级项目（Uniswap、AAVE）代码完全开源可学习
- 不看重学历，只看链上记录和 GitHub 贡献

## 风险

- 国内监管环境高度不确定（交易所清退、挖矿禁止、数字藏品降温）
- 行业周期性极强（牛市狂热招人、熊市大规模裁员）
- 安全责任重大（合约漏洞可能导致数百万美元损失）
- 部分项目「空气币」性质，从业声誉风险
- 技术迭代极快，需持续学习新链、新协议、新攻击向量
- 社保/公积金等福利在海外远程模式下需自行解决`,

  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '学习成本极低（官方文档 + 开源项目 + 测试网免费 Gas）。无需额外培训费用，一台电脑即可开始。海外远程薪资通常用 USDT/USDC 结算。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'at-risk', detail: '技术文档和社区交流以英文为主（Ethereum 官方文档、EIP 提案、Discord 社区）。海外远程岗位面试通常为全英文。国内合规项目以中文为主。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: 'Web3 行业极不看学历。链上交易记录、GitHub commit 历史、审计比赛（Code4rena/Sherlock）排名比学位重要得多。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，正常本科毕业即可。Web3 开发学习可在大二大三期间并行进行。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '国内合规 Web3 岗位（联盟链、数字藏品合规方向）上海有一定数量但有限。大量海外远程岗位可在上海远程工作，但需自行解决收汇和税务问题。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'at-risk', detail: '学习周期约 6-12 个月（Solidity + DeFi 协议 + 做一个项目）。但行业周期性波动大，可能在熊市找不到工作，需设定合理的入行时间窗口。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '海外远程岗位薪资较高（$3k-$8k/月），在上海可维持中上生活水平。但需自行缴纳社保/公积金，且薪资以加密货币结算有汇率波动风险。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: 'Web3 行业不依赖学历。但如果后续转回传统互联网行业，Web3 经验在简历上可能被部分 HR 和面试官视为非主流经历，需准备充分的叙事。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'at-risk', detail: '国内对加密货币和 Web3 的监管政策持续收紧（交易所禁止、挖矿清退）。海外合规风险（OFAC 制裁名单、KYC/AML 要求）需关注。参与未合规项目可能面临法律风险。', sourceUrl: '' },
  ],

  preferenceScores: {
    interestMatch: 65,
    timeFlexibility: 75,
    lifestyleCompat: 60,
    growthCurve: 40,
  },

  trend: 'declining',
  trendDetail: '国内 Web3 领域因监管收紧持续降温，合规空间收窄（数字藏品市场大幅萎缩，联盟链应用有限）。海外 DeFi/NFT 赛道经历 2024-2025 熊市后尚未完全复苏，但 RWA（现实资产代币化）和合规 DeFi 等方向仍在增长。智能合约审计和链上数据分析方向相对稳定。',

  exclusivity: ['放弃传统互联网行业的稳定发展路径', '放弃国内社保/公积金等劳动保障（海外远程模式）', '放弃在简历上积累传统大厂经验的选项', '行业熊市期可能面临较长空窗期'],

  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言和数据结构（理解底层内存管理对智能合约安全至关重要）', '学习区块链基础概念：比特币白皮书、以太坊黄皮书简介', '注册以太坊钱包（MetaMask）并完成第一笔链上交易'] },
    { year: '大一下', tasks: ['学习 JavaScript/TypeScript（Web3 前端基础）', '学习 Solidity 语言基础（CryptoZombies 教程）', '在 Remix IDE 上部署第一个智能合约到测试网', '暑假：完成一个完整的 DeFi 教程项目（如 Uniswap V2 clone）'] },
    { year: '大二上', tasks: ['深入学习 Solidity（OpenZeppelin 库使用、Gas 优化、安全模式）', '学习 Hardhat/Foundry 开发框架', '阅读顶级 DeFi 协议源码（Uniswap V2/V3、Compound、AAVE）', '参加 Code4rena 或 Sherlock 审计比赛（观看学习）'] },
    { year: '大二下', tasks: ['做一个完整的 DeFi 项目并部署到测试网', '学习链上数据分析（Dune Analytics SQL）', '开始写技术文章（Mirror/Medium），建立个人品牌', '暑假：找一个 Web3 实习或加入一个开源 DAO 项目'] },
    { year: '大三上', tasks: ['深入学习 EVM 底层和智能合约安全（重入攻击、闪电贷、MEV）', '参加审计比赛并争取拿到一次有效发现', '完整学习一个非 EVM 链（如 Solana Rust 开发）', '维护 GitHub 活跃度和链上身份（ENS、Attestation）'] },
    { year: '大三下', tasks: ['在 CryptoJobsList/Web3.career 投递简历', '准备 Web3 面试（Solidity 八股文 + DeFi 协议深度理解 + 安全题）', '如国内市场收紧，重点瞄准海外远程岗位', '暑假：争取正式实习或全职 offer'] },
    { year: '大四上', tasks: ['全力投入 Web3 求职（海外远程 + 国内合规双线并行）', '同步准备传统互联网开发岗位作为 Plan B', '持续输出技术内容，增加行业可见度', '关注行业周期，理性评估入行时机'] },
    { year: '大四下', tasks: ['如已拿到 offer：正式入职并解决收汇和税务问题', '如未拿到 offer：评估是否先进入传统开发岗位，业余继续 Web3', '完成毕业论文', '无论是否入行 Web3，保持技术学习和社区活跃度'] },
  ],

  tags: ['计算机', '区块链', 'Web3', 'Solidity', '智能合约', '远程工作'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://ethereum.org/en/developers/', 'https://cryptojobslist.com/', 'https://code4rena.com/'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-freelance', 'cs-indie-hacker'],
};

export default path;
