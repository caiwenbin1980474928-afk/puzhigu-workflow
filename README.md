# 璞之谷 AI 内容生产工作台

面向璞之谷景区运营团队的 AI 内容生产工作台。V1 目标是帮助运营人员从“小红书 / 抖音爆款链接”出发，完成爆款结构拆解、景区素材匹配、原创文案生成、配图方案生成和成稿保存。

当前项目已完成可交互前端 Prototype，用于体验和评估产品流程。V1 正式开发策略是：保留现有 Prototype 主流程，不重做 UI，逐步将前端 mock 替换为 SQLite + Prisma + 独立 AI service 的真实能力。

## 核心流程

```text
复制爆款素材链接
→ 粘贴到解析工作台
→ 保存爆款素材
→ AI 拆解爆款结构、情绪、标题套路和视觉风格
→ 选择或输入璞之谷景区信息
→ 生成原创文案、标题、话题标签
→ 生成配图方案 / 图片 prompt / 短视频分镜
→ 保存生成历史和成稿
```

## V1 产品边界

V1 做：

- 支持运营人员粘贴爆款内容链接。
- 保存爆款素材与解析状态。
- 拆解爆款内容的标题套路、结构、情绪钩子和视觉风格。
- 结合璞之谷素材生成原创宣传文案。
- 生成配图方案、图片 prompt、短视频分镜建议。
- 保存生成历史和成稿。
- 支持内部账号登录。

V1 不做：

- 不自动发布到小红书、抖音、公众号等外部平台。
- 不做违规爬虫或绕过平台限制的数据抓取。
- 不做多租户、多景区、多角色复杂权限。
- 不做完整审批流、BI 分析、投放归因。
- 不做图片精修、视频剪辑、封面设计器。
- 不做洗稿或搬运，AI 只借鉴结构和方法，内容必须原创。

## 当前 Prototype

当前为纯前端原型：

- `index.html`：页面入口。
- `styles.css`：界面样式。
- `app.js`：页面渲染、交互逻辑和 mock 数据。
- `assets/`：从景区资料中整理出的视觉素材。

当前可体验页面：

- 登录页：模拟内部账号登录。
- 解析工作台：首页主流程，粘贴爆款链接并查看拆解结果。
- 景区素材：展示和选择璞之谷素材。
- 原创生成：基于爆款拆解和景区素材生成 mock 内容方案。
- 成稿库：保存、编辑、复制生成内容。

## 如何运行当前原型

方式一：直接打开文件。

```text
index.html
```

方式二：使用本地静态服务。

```bash
python3 -m http.server 5173
```

然后访问：

```text
http://127.0.0.1:5173/index.html
```

默认模拟账号：

```text
账号：operation@puzhigu
密码：prototype
```

## 当前 Mock 内容

当前 mock 数据集中在 `app.js`：

- `mockHotspots`：爆款参考样本。
- `mockMaterials`：璞之谷景区素材。
- `initialTopics`：由爆款样本转化出的内容方向。
- `initialDrafts`：成稿样例。
- `state`：前端本地状态。

当前 mock 行为：

- 登录：点击后直接进入系统。
- 链接解析：根据链接字符串匹配本地样本。
- 爆款拆解：读取本地预设分析字段。
- 原创生成：由前端函数拼装模拟结果。
- 保存成稿：只保存在前端内存中，刷新后丢失。

## 推荐 V1 技术方案

正式开发在不大范围重构 Prototype UI 的前提下，逐步替换 mock：

- 前端：保留当前单页 Prototype 结构，优先替换数据来源和交互调用。
- 后端：Node.js + Express。
- 数据库：SQLite。
- ORM：Prisma。
- AI 调用：封装为独立 `aiService`。
- 本地开发：不依赖 PostgreSQL / Docker / Redis。
- 任务状态：V1 先使用数据库状态字段和前端轮询，不引入消息队列。

建议后续目录：

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
├── server/
│   ├── index.js
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── middleware/
│   └── lib/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
└── docs/
```

## Mock 替换顺序

1. 使用 Prisma seed 导入当前 mock 数据。
2. 将模拟登录替换为真实内部账号登录。
3. 将素材库替换为 SQLite + Prisma。
4. 将首页爆款链接保存为真实 `ViralReference` 数据。
5. 将爆款拆解替换为 `aiService.analyzeViralReference()`。
6. 将“用它生成原创方案”替换为真实内容方向创建。
7. 将原创生成替换为 `aiService.generateContent()`。
8. 将保存成稿替换为真实 Draft 数据。
9. 增加生成历史、版本记录和 AI 调用日志。

## 正式开发任务树

| 顺序 | 任务 | 验收标准 | 建议 commit |
| --- | --- | --- | --- |
| 1 | 对齐 V1 文档策略 | README、PRD、TECH 均明确 SQLite + Prisma + 独立 AI service | `docs: align v1 development strategy` |
| 2 | 初始化 Express 服务 | 可启动后端并托管当前静态页面 | `chore: add express server scaffold` |
| 3 | 接入 Prisma + SQLite | 可执行 migration 并生成本地数据库 | `chore: add prisma sqlite setup` |
| 4 | 导入 mock seed | 当前 mock 数据可进入数据库 | `db: seed prototype mock data` |
| 5 | 替换登录 mock | 内部账号可登录，刷新后保持会话 | `feat(auth): add internal login session` |
| 6 | 替换素材 mock | 素材列表、新增、筛选来自 API | `feat(materials): persist scenic materials` |
| 7 | 替换爆款链接 mock | 粘贴链接后保存为爆款素材并生成解析状态 | `feat(viral): save viral references` |
| 8 | 接入 AI service mock provider | 拆解与生成能力通过 service 调用 | `feat(ai): add ai service abstraction` |
| 9 | 替换爆款拆解 mock | AI 输出结构、情绪、标题套路和视觉风格 | `feat(analysis): analyze viral structure` |
| 10 | 替换原创生成 mock | AI 输出原创文案、配图方案和图片 prompt | `feat(generation): generate original content plan` |
| 11 | 替换成稿 mock | 成稿和生成历史刷新后不丢失 | `feat(drafts): persist drafts and generation history` |
| 12 | 完成主流程验收 | 登录到保存成稿的 V1 闭环跑通 | `test: verify v1 core workflow` |

## 文档索引

- [PRD-璞之谷内容运营助手-V1.md](./PRD-璞之谷内容运营助手-V1.md)：产品需求文档。
- [DEV-SPEC-当前Prototype正式开发规格.md](./DEV-SPEC-当前Prototype正式开发规格.md)：当前 Prototype 页面、按钮、流程和 mock 数据规格。
- [TECH-璞之谷AI内容生产工作台-V1.md](./TECH-璞之谷AI内容生产工作台-V1.md)：技术方案与模块说明。
- [水长城 · 璞之谷森林度假区【简述】.pdf](./水长城%20·%20璞之谷森林度假区【简述】.pdf)：景区基础资料。

## 开发原则

- 先跑通 V1 核心闭环，再扩展复杂能力。
- 保留当前原型的信息架构和主流程，避免重做 UI。
- 数据和 AI 能力通过 service 层隔离，方便 mock 与真实 provider 切换。
- 所有 AI 输出必须保留引用素材、参考爆款和原创性说明。
- 对价格、开放时间、活动权益等事实信息，必须以素材库为准，不能由 AI 编造。
- 发布前必须由运营人员人工确认。
