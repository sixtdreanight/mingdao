import type { CareerPath } from '@/types';

const path: CareerPath = {
  slug: 'cs-embedded',
  title: '嵌入式/物联网开发 — Linux/RTOS/单片机',
  category: 'domestic-employment',
  summary: '从事嵌入式 Linux、RTOS、单片机开发或 IoT 硬件方向，芯片国产化和车联网驱动行业持续增长。',
  description: `## 路径概述

嵌入式开发是 CS 专业与电子工程的交叉领域。与纯软件开发不同，嵌入式工程师需要理解硬件底层，
编写与物理世界交互的代码。芯片国产化浪潮、新能源车爆发、IoT 设备普及三重驱动下，
嵌入式人才需求持续增长，且人才供给长期不足（大多数 CS 学生流向互联网）。

## 真实画像

- **起薪中位数**：上海嵌入式应届 12-18k/月（汽车电子最高，消费电子偏低）
- **3年后薪资**：20-35k/月（芯片原厂和车厂薪资竞争力强）
- **工作时间**：芯片公司/车厂相对规律（9-7-5），消费电子公司加班较多
- **从业者满意度**：中上（技术深度高，护城河宽，35 岁危机感弱于互联网）

## 优势

- 人才供给长期不足，竞争压力远小于互联网开发
- 技术护城河深（硬件+软件复合技能），年龄友好
- 芯片国产化政策带来大量岗位（海思/展锐/地平线等）
- 新能源汽车（比亚迪/蔚来/小鹏）嵌入式岗位爆发式增长
- 技能永不过时——底层原理变化慢，不像前端框架三个月一换

## 风险

- 岗位高度集中在深圳/北京/上海，离开一线城市就业困难
- 初学门槛高（需要硬件设备和实验环境）
- 薪资天花板可能低于互联网大厂纯软件岗
- 需要额外的硬件基础知识（数电/模电/示波器/逻辑分析仪）
- 行业节奏慢，技术迭代不如互联网快

## 适合谁

- 对底层原理有好奇心，想知道代码如何驱动硬件
- 能接受"慢行业"的节奏，不追求快速跳槽涨薪
- 愿意在上海/深圳长期发展，不打算回二三线城市
- 动手能力强，喜欢软硬件结合的实践`,
  constraints: [
    { id: 'economy', label: '经济可行性', description: '总投入 vs 家庭预算', assessment: 'pass', detail: '零额外学费投入。自学需要购买开发板（STM32 约 100 元，树莓派约 300 元）+ 基础工具（万用表/杜邦线等约 200 元）。总投入约 500-1000 元。', sourceUrl: '' },
    { id: 'language', label: '语言能力', description: '该路径的最低语言要求', assessment: 'pass', detail: '芯片数据手册和参考手册大部分为英文，需要较强的英文技术文档阅读能力。听说能力要求不高，CET-4 阅读水平即可。', sourceUrl: '' },
    { id: 'degree-gate', label: '学历准入', description: '第一学历的真实竞争力', assessment: 'pass', detail: '嵌入式行业务实，看重调试能力和项目经验。芯片原厂和车厂对学历要求中等，双非一本可进入大部分公司。', sourceUrl: '' },
    { id: 'graduation-difficulty', label: '毕业难度', description: '真实毕业率', assessment: 'pass', detail: 'N/A，不涉及额外学业。', sourceUrl: '' },
    { id: 'location-lock', label: '地域锁定', description: '上海岗位充足度', assessment: 'at-risk', detail: '嵌入式岗位高度集中在一线城市。深圳是全国嵌入式中心（华为/大疆/比亚迪总部），上海有展锐/联发科/蔚来等。离开一线城市后岗位急剧减少。', sourceUrl: '' },
    { id: 'time-cost', label: '时间成本', description: '到稳定就业的总时间', assessment: 'pass', detail: '4年本科正常毕业即就业。但嵌入式学习曲线前陡后缓，大一大二需要投入额外时间学习硬件基础。', sourceUrl: '' },
    { id: 'living-standard', label: '生活水平底线', description: '就业初期的生活水平', assessment: 'pass', detail: '起薪 12-18k，在上海可覆盖基本生活。芯片公司和车厂年终奖丰厚（4-6 个月），实际年收入优于月薪表现。', sourceUrl: '' },
    { id: 'degree-value', label: '学历含金量', description: '学历在目标城市/行业的认可度', assessment: 'pass', detail: '嵌入式行业学历权重中等。双非一本在消费电子/汽车电子领域足够，但进入海思/高通等顶级芯片原厂可能略有门槛。', sourceUrl: '' },
    { id: 'geopolitics', label: '地缘政治与安全', description: '该路径的地缘政治风险', assessment: 'pass', detail: '芯片国产化是国家战略，政策长期利好。但需注意部分芯片 EDA 工具和 IP 核受美国出口管制，可能影响部分公司。', sourceUrl: '' },
  ],
  preferenceScores: {
    interestMatch: 75,
    timeFlexibility: 65,
    lifestyleCompat: 70,
    growthCurve: 70,
  },
  trend: 'rising',
  trendDetail: '芯片国产化（华为海思/展锐/地平线/黑芝麻等）+ 新能源汽车（比亚迪/蔚来/小鹏/理想）+ IoT 设备爆发三重驱动，嵌入式人才需求年增长超 20%。RISC-V 生态成熟带来新的芯片架构机会。建议从 STM32 + FreeRTOS 入门，逐步过渡到嵌入式 Linux。',
  exclusivity: ['放弃互联网/纯软件行业的快速跳槽涨薪模式', '地域选择受限（离开一线城市就业机会急剧减少）', '需要学习额外硬件知识，学习曲线比纯软件更陡'],
  actionPlan: [
    { year: '大一上', tasks: ['学好 C 语言（嵌入式核心语言），重点掌握指针和内存管理', '了解计算机组成原理（CPU/内存/总线/I/O）', '购买一块 STM32 开发板，搭建 Keil/HAL 库开发环境'] },
    { year: '大一下', tasks: ['学习数字电路和模拟电路基础（看懂原理图、理解 GPIO/ADC/PWM/UART 等概念）', '用 STM32 完成第一个项目（如温湿度传感器数据采集与显示）', '学习 Git 版本控制和 Makefile 基础'] },
    { year: '大二上', tasks: ['学习 RTOS 基础（FreeRTOS 任务调度、信号量、消息队列）', '学习常用通信协议（I2C/SPI/UART/CAN）编程', '购买树莓派或其他 Linux 开发板，开始接触嵌入式 Linux'] },
    { year: '大二下', tasks: ['深入学习嵌入式 Linux（Bootloader/Kernel/根文件系统/设备树）', '学习 Linux 驱动开发基础（字符设备驱动）', '暑假目标：找到第一份嵌入式实习（消费电子/物联网公司）'] },
    { year: '大三上', tasks: ['根据兴趣选择方向：MCU 单片机 / 嵌入式 Linux / 汽车电子 / IoT 物联网', '深入学习方向技能（如 Linux 驱动/V4L2 框架/AUTOSAR 等）', '参加电子设计竞赛或嵌入式相关比赛（电赛/智能车竞赛）'] },
    { year: '大三下', tasks: ['做一个完整的嵌入式项目（如智能家居网关/四轴飞行器飞控）', '学习调试工具使用（示波器/逻辑分析仪/JTAG 调试器）', '暑期实习：投递芯片原厂/车厂/IoT 公司嵌入式岗位'] },
    { year: '大四上', tasks: ['秋招投递嵌入式岗位（芯片原厂 > 车厂 > IoT 公司 > 消费电子）', '如有暑期实习 offer，全力争取转正', '关注 RISC-V 和开源硬件趋势，保持技术视野'] },
    { year: '大四下', tasks: ['如秋招未拿到满意 offer，继续春招', '完成毕业设计（建议选题与嵌入式相关）', '入职前了解公司使用的芯片平台和开发工具链'] },
  ],
  tags: ['计算机', '嵌入式', '物联网', '单片机', 'Linux', '上海', '本科'],
  trustLevel: 'ai-inferred',
  sourceUrls: ['https://www.st.com/', 'https://www.freertos.org/', 'https://www.onetonline.org/link/summary/15-1252.00'],
  lastUpdated: '2026-07-16',
  alternatives: ['cs-domestic-employment', 'cs-devops', 'cs-domestic-postgrad'],
};

export default path;
