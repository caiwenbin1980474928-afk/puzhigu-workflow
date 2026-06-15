# 璞之谷 AI 内容生产工作台 V1 技术文档

版本：V1.0  
日期：2026-06-15  
对象：产品、设计、前端、后端、AI 工程与项目交付人员  
关联文档：[PRD-璞之谷内容运营助手-V1.md](./PRD-璞之谷内容运营助手-V1.md)

## 1. 技术目标

V1 目标是建设一个面向景区运营人员的 AI 内容生产工作台。当前 Prototype 已确认，正式开发不重做 UI，而是在保留现有主流程的前提下，逐步将 mock 替换为真实数据库和 AI service。

已确认的 V1 核心闭环：

1. 运营复制爆款素材链接。
2. 系统保存爆款素材。
3. AI 拆解爆款结构、情绪、标题套路和视觉风格。
4. 用户输入或选择璞之谷景区信息。
5. 系统生成契合本景区、具有爆款感的原创文案。
6. 系统生成配图方案 / 图片 prompt。
7. 保存生成历史。

V1 技术限制：

1. 本地开发使用 SQLite。
2. 使用 Prisma 管理数据库。
3. 不依赖 PostgreSQL、Docker、Redis。
4. AI 调用封装成独立 service。
5. 不大范围重构 Prototype UI。
6. 不一次性做全栈重写，按任务树逐步替换 mock。

当前阶段已完成的是前端交互 Prototype，只用于体验产品流程，不接真实数据库、不接真实平台解析服务、不接真实 LLM。

## 2. 当前 Prototype 实现说明

### 2.1 文件结构

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
│   ├── architect-landmark.png
│   ├── central-lawn.png
│   ├── forest-path.png
│   ├── forest-trail.png
│   ├── insect-museum.png
│   ├── mist-valley.png
│   ├── mountain-table.png
│   └── valley-hotel.png
├── PRD-璞之谷内容运营助手-V1.md
└── 水长城 · 璞之谷森林度假区【简述】.pdf
```

### 2.2 前端技术形态

- 纯静态 HTML/CSS/JavaScript。
- 不使用构建工具。
- 不引入前端框架。
- 不引入大型依赖。
- 所有数据存放在 `app.js` 的 mock 数组和前端内存状态中。

### 2.3 当前核心页面

- 登录页：模拟内部账号登录。
- 解析工作台：首页主流程，粘贴爆款链接并模拟解析。
- 景区素材：展示璞之谷素材库。
- 原创生成：基于爆款拆解和景区素材生成 mock 内容方案。
- 成稿库：保存、编辑、复制生成内容。

### 2.4 当前 mock 数据

`app.js` 中主要 mock 数据：

- `mockHotspots`：爆款参考样本。
- `mockMaterials`：璞之谷景区素材。
- `initialTopics`：由爆款样本转化出的内容方向。
- `initialDrafts`：成稿样例。
- `state`：前端本地状态。

### 2.5 当前 mock 行为

- 登录：点击按钮即进入系统。
- 链接解析：根据链接字符串模拟匹配一个爆款样本。
- 爆款拆解：直接读取 mock 样本里的结构、视觉风格、风险和原创性说明。
- 原创生成：前端函数 `buildGeneratedDraft()` 拼装 mock 标题、正文、配图方案、分镜和风险提示。
- 保存成稿：只保存在前端内存中，刷新页面后丢失。

## 3. V1 正式开发架构

V1 正式开发采用“轻后端 + SQLite 持久化 + 独立 AI service”的渐进式架构。目标不是重做 Prototype，而是保留现有页面、按钮和主流程，逐步把前端 mock 替换为真实 API。

```text
浏览器前端（保留当前 Prototype 主流程）
  ↓
Express Web API
  ↓
业务服务层
  ├── 账号认证服务
  ├── 链接解析服务
  ├── 爆款素材服务
  ├── 景区素材服务
  ├── 内容方向服务
  ├── AI service
  ├── 生成历史服务
  ├── 成稿管理服务
  └── AI 调用日志服务
  ↓
Prisma ORM
  ↓
SQLite 本地数据库
  ↓
LLM Provider（mock / OpenAI / DeepSeek）
```

### 3.1 技术栈

V1 固定技术栈：

- 前端：沿用当前 `index.html`、`styles.css`、`app.js`。
- 后端：Node.js + Express。
- 数据库：SQLite。
- ORM：Prisma。
- AI：独立 `aiService`，支持 `mock`、`openai`、`deepseek` provider。
- 认证：内部账号登录，使用 session 或 httpOnly cookie。
- 本地运行：Node 服务托管静态文件与 API。

V1 暂不引入：

- PostgreSQL。
- Docker。
- Redis。
- 消息队列。
- React / Vue 等前端框架重构。
- 大型状态管理库。

### 3.2 目录结构

建议正式开发目录：

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
├── server/
│   ├── index.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── viral.routes.js
│   │   ├── materials.routes.js
│   │   ├── directions.routes.js
│   │   ├── generations.routes.js
│   │   └── drafts.routes.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── viralService.js
│   │   ├── materialService.js
│   │   ├── directionService.js
│   │   ├── generationService.js
│   │   └── draftService.js
│   ├── repositories/
│   ├── middleware/
│   └── lib/prisma.js
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── dev.db
└── docs/
```

### 3.3 异步任务策略

V1 不引入消息队列。解析和生成任务采用数据库状态字段 + 前端轮询：

- `pending`：待处理。
- `running`：处理中。
- `success`：成功。
- `need_manual_input`：需人工补充。
- `failed`：失败。

以下任务可以先同步执行并写入状态，后续再演进为队列：

- 爆款链接解析。
- LLM 拆解。
- LLM 原创生成。

### 3.4 Mock 替换总原则

1. 先把当前 mock 数据 seed 到 SQLite。
2. 再把前端读取数组替换为 API 请求。
3. 最后把 mock 生成函数替换为 AI service。
4. 每一步都保持现有页面可点击、可体验。
5. 不做 UI 大改，不新增复杂页面层级。

## 4. 核心模块设计

## 4.1 账号认证模块

V1 仅内部账号登录。

功能：

- 账号密码登录。
- Session 或 JWT。
- 管理员初始化账号。

V1 不做：

- 多租户。
- 复杂角色权限。
- SSO。
- 组织架构。

## 4.2 爆款链接解析模块

输入：

- 平台链接。
- 可选：运营手动补充的标题、正文、截图、封面图、视频画面描述。

输出：

- 平台。
- 内容类型：图文、短视频、合集、未知。
- 标题。
- 正文摘要。
- 作者信息。
- 发布时间。
- 互动数据。
- 封面或截图。
- 解析状态。

解析状态：

- `pending`：待解析。
- `success`：解析成功。
- `need_manual_input`：需人工补充。
- `failed`：解析失败。

注意：

- V1 不应承诺所有小红书、抖音链接都能自动解析。
- 若平台限制访问，应允许人工补充内容。
- 不做违规爬虫和批量抓取。

## 4.3 爆款拆解模块

输入：

- 解析后的爆款内容。
- 人工补充内容。
- 平台类型。

输出：

- 爆点总结。
- 标题公式。
- 开头 Hook。
- 内容节奏。
- 情绪价值。
- 目标人群。
- 互动触发点。
- 视觉风格拆解。
- 可迁移到璞之谷的表达方法。
- 原创边界和风险提示。

视觉风格拆解字段建议：

- 封面构图。
- 图片顺序。
- 主色调。
- 字幕/标题样式。
- 人物与场景关系。
- 视频镜头节奏。
- 可复拍画面清单。

## 4.4 景区素材模块

素材类型：

- 品牌表达。
- 景点。
- 住宿。
- 活动。
- 餐饮。
- 建筑。
- 服务信息。
- 图片/视频素材。
- 常见问答。

关键要求：

- 所有事实性信息必须可维护。
- 活动、价格、开放时间需要有效期。
- 生成内容必须引用素材来源。

## 4.5 景区特色映射模块

作用：

将爆款结构与璞之谷素材匹配，形成“可原创生成”的内容方向。

示例：

```text
爆款结构：北京周边 1.5h + 亲子草坪 + 家长轻松
映射素材：2000㎡中心草坪、树屋区、山野厨房、亲水游戏
原创方向：长城脚下亲子周末，不赶路也能放电
```

推荐实现：

- V1 可用规则 + LLM。
- 后续可引入 Embedding 检索。

## 4.6 AI service 模块

AI 调用必须封装为独立 service，不允许散落在路由、前端或业务控制器中。

建议文件：

```text
server/services/aiService.js
server/services/ai/providers/mockProvider.js
server/services/ai/providers/openaiProvider.js
server/services/ai/providers/deepseekProvider.js
```

Provider 通过环境变量切换：

```text
AI_PROVIDER=mock|openai|deepseek
```

核心方法：

| 方法 | 作用 | 替换的 Prototype mock |
| --- | --- | --- |
| `analyzeViralReference(input)` | 拆解爆款结构、情绪、标题套路、视觉风格 | `selectedHot.analysis` |
| `mapToScenicMaterials(input)` | 将爆款拆解结果映射到璞之谷素材 | `analysis.adapt` |
| `generateOriginalContent(input)` | 生成原创文案、标题、标签、配图方案、图片 prompt | `buildGeneratedDraft()` |
| `regenerateSection(input)` | 局部重生成标题、正文或配图方案 | `reroll-title` |
| `checkRisk(input)` | 输出事实风险、原创边界和发布前提醒 | mock 风险提示 |

输出要求：

- 必须返回结构化 JSON。
- 必须包含引用素材 ID。
- 必须包含借鉴的爆款结构或视觉方法。
- 必须包含原创性说明。
- 必须包含风险提示。
- 不得输出“复制原文”“照搬原图”等指令。

任务链建议：

1. 先保存爆款链接和人工补充内容。
2. 调用 `analyzeViralReference()` 生成拆解结果。
3. 调用 `mapToScenicMaterials()` 推荐景区素材。
4. 用户确认平台、风格、强调信息和引用素材。
5. 调用 `generateOriginalContent()` 生成原创方案。
6. 保存 `GenerationRun`、`AiCallLog` 和 `Draft`。

## 4.7 成稿管理模块

功能：

- 保存成稿。
- 编辑标题、正文、话题标签、配图方案。
- 保存版本。
- 标记状态：草稿、待发布、已发布、废弃。
- 记录外部发布链接。

V1 不做：

- 自动发布。
- 自动抓取发布后数据。
- 审批流。

## 5. 数据模型草案

## 5.1 users

```sql
id
username
password_hash
display_name
role
created_at
updated_at
```

## 5.2 viral_references

```sql
id
platform
source_url
source_type
parse_status
title
author_name
published_at
metrics_json
raw_text
summary
cover_asset_id
screenshot_asset_ids
media_description
tags
fit_level
created_by
created_at
updated_at
```

## 5.3 viral_analyses

```sql
id
viral_reference_id
summary
title_formula
hook
content_structure
emotion_value
target_audience
interaction_triggers
visual_style_json
scenic_fit_suggestions
originality_boundary
risk_notes
created_at
updated_at
```

## 5.4 scenic_materials

```sql
id
type
title
content
tags
asset_ids
valid_from
valid_to
is_recommended
created_by
created_at
updated_at
```

## 5.5 content_directions

```sql
id
viral_reference_id
title
target_platform
target_audience
content_goal
borrowed_structure_points
borrowed_visual_points
original_direction
material_ids
status
created_by
created_at
updated_at
```

## 5.6 drafts

```sql
id
content_direction_id
viral_reference_id
platform
title
body
hashtags
image_plan_json
visual_execution_plan_json
video_script_json
cta
risk_notes
originality_notes
material_ids
version
status
publish_url
created_by
created_at
updated_at
```

## 5.7 assets

```sql
id
file_name
file_type
mime_type
storage_url
source
description
tags
created_by
created_at
updated_at
```

## 5.8 Prisma schema 初稿

SQLite 不支持数组字段，V1 中标签、互动数据、图片方案、视频分镜、AI 输入输出等结构化内容统一使用 `String` 保存 JSON 文本，由 service 层负责序列化和校验。

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String   @id @default(cuid())
  account      String   @unique
  passwordHash String
  displayName  String?
  role         String   @default("operator")
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model ViralReference {
  id              String   @id @default(cuid())
  platform        String
  sourceUrl       String   @unique
  sourceType      String   @default("url")
  contentType     String?
  parseStatus     String   @default("pending")
  analysisStatus  String   @default("pending")
  title           String?
  authorName      String?
  metricsJson     String   @default("{}")
  rawText         String?
  summary         String?
  coverImageUrl   String?
  mediaDescription String?
  tagsJson        String   @default("[]")
  fitLevel        String?
  manualInputJson String   @default("{}")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  analysis        ViralAnalysis?
  directions      ContentDirection[]
  generations     GenerationRun[]
  drafts          Draft[]
}

model ViralAnalysis {
  id                  String   @id @default(cuid())
  viralReferenceId    String   @unique
  viralReference      ViralReference @relation(fields: [viralReferenceId], references: [id], onDelete: Cascade)
  hook                String?
  titleFormula        String?
  structure           String?
  emotion             String?
  targetAudience      String?
  interactionTriggers String?
  visualStyle         String?
  scenicFit           String?
  originalityBoundary String?
  riskNotes           String?
  analysisJson        String   @default("{}")
  provider            String?
  model               String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

model ScenicMaterial {
  id             String   @id @default(cuid())
  type           String
  title          String
  content        String
  tagsJson       String   @default("[]")
  imageUrl       String?
  validFrom      DateTime?
  validTo        DateTime?
  isRecommended  Boolean  @default(false)
  status         String   @default("active")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model ContentDirection {
  id                String   @id @default(cuid())
  title             String
  sourceType        String
  targetPlatform    String
  targetAudience    String?
  contentGoal       String?
  materialIdsJson   String   @default("[]")
  originalDirection String?
  status            String   @default("pending")
  viralReferenceId  String?
  viralReference    ViralReference? @relation(fields: [viralReferenceId], references: [id])
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  generations       GenerationRun[]
  drafts            Draft[]
}

model GenerationRun {
  id                 String   @id @default(cuid())
  taskType           String   @default("content_generate")
  status             String   @default("pending")
  provider           String?
  model              String?
  inputJson          String
  outputJson         String?
  errorMessage       String?
  viralReferenceId   String?
  viralReference     ViralReference? @relation(fields: [viralReferenceId], references: [id])
  contentDirectionId String?
  contentDirection   ContentDirection? @relation(fields: [contentDirectionId], references: [id])
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  drafts             Draft[]
}

model Draft {
  id                   String   @id @default(cuid())
  contentDirectionId   String?
  contentDirection     ContentDirection? @relation(fields: [contentDirectionId], references: [id])
  generationRunId      String?
  generationRun        GenerationRun? @relation(fields: [generationRunId], references: [id])
  viralReferenceId     String?
  viralReference       ViralReference? @relation(fields: [viralReferenceId], references: [id])
  platform             String
  title                String
  body                 String
  hashtagsJson         String   @default("[]")
  imageSuggestionsJson String   @default("[]")
  imagePromptsJson     String   @default("[]")
  videoScriptJson      String   @default("[]")
  riskNotes            String?
  originalityNotes     String?
  status               String   @default("draft")
  publishUrl           String?
  version              Int      @default(1)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  versions             DraftVersion[]
}

model DraftVersion {
  id         String   @id @default(cuid())
  draftId    String
  draft      Draft    @relation(fields: [draftId], references: [id], onDelete: Cascade)
  version    Int
  title      String
  body       String
  outputJson String?
  createdAt  DateTime @default(now())

  @@unique([draftId, version])
}

model PromptTemplate {
  id        String   @id @default(cuid())
  scene     String
  name      String
  platform  String?
  content   String
  version   String
  isDefault Boolean  @default(false)
  enabled   Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AiCallLog {
  id           String   @id @default(cuid())
  scene        String
  provider     String
  model        String?
  status       String
  requestJson  String?
  responseJson String?
  errorMessage String?
  latencyMs    Int?
  relatedType  String?
  relatedId    String?
  createdAt    DateTime @default(now())
}
```

## 6. API 草案

API 命名以当前 Prototype 主流程为准，V1 不做复杂资源层级。

## 6.1 认证

```http
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout
```

登录请求：

```json
{
  "account": "operation@puzhigu",
  "password": "******"
}
```

## 6.2 爆款素材

```http
POST /api/viral-references
GET /api/viral-references
GET /api/viral-references/:id
PATCH /api/viral-references/:id
```

创建请求：

```json
{
  "sourceUrl": "https://www.xiaohongshu.com/explore/mock-puzhigu-family-lawn",
  "platform": "xiaohongshu"
}
```

响应：

```json
{
  "id": "vr_001",
  "platform": "xiaohongshu",
  "parseStatus": "pending"
}
```

## 6.3 人工补充爆款内容

```http
PATCH /api/viral-references/:id/manual-input
```

请求：

```json
{
  "title": "北京周边 1.5h，藏进山谷里的亲子草坪周末",
  "rawText": "人工补充正文...",
  "mediaDescription": "首图为草坪和树屋，整体清新自然..."
}
```

## 6.4 AI 拆解爆款

```http
POST /api/viral-references/:id/analyze
```

响应：

```json
{
  "analysisId": "va_001",
  "status": "pending"
}
```

## 6.5 景区素材

```http
GET /api/materials
POST /api/materials
PATCH /api/materials/:id
DELETE /api/materials/:id
```

## 6.6 内容方向

```http
POST /api/content-directions
GET /api/content-directions
GET /api/content-directions/:id
PATCH /api/content-directions/:id
```

## 6.7 原创生成

```http
POST /api/generations
GET /api/generations/:id
POST /api/generations/:id/regenerate-section
```

请求：

```json
{
  "viralReferenceId": "vr_001",
  "analysisId": "va_001",
  "contentDirectionId": "dir_001",
  "targetPlatform": "xiaohongshu",
  "targetAudience": "亲子家庭",
  "style": "自然种草",
  "materialIds": ["mat_001", "mat_002"],
  "emphasis": "中心草坪、树屋、山野餐饮",
  "constraints": "不要编造价格，不要复制原文"
}
```

响应：

```json
{
  "generationId": "gen_001",
  "status": "pending"
}
```

## 6.8 成稿

```http
POST /api/drafts
GET /api/drafts
GET /api/drafts/:id
PATCH /api/drafts/:id
POST /api/drafts/:id/versions
PATCH /api/drafts/:id/status
```

## 7. LLM Prompt 输入输出规范

## 7.1 爆款拆解 Prompt 输入

```json
{
  "platform": "小红书",
  "title": "爆款标题",
  "rawText": "正文或摘要",
  "mediaDescription": "图片/视频描述",
  "metrics": {
    "likes": 18000,
    "collects": 9420,
    "comments": 386
  }
}
```

## 7.2 爆款拆解 Prompt 输出

```json
{
  "titleFormula": "地区距离 + 场景反差 + 人群利益",
  "hook": "北京周边不累的亲子度假",
  "contentStructure": ["距离", "主场景", "体验清单", "适合人群", "收藏理由"],
  "emotionValue": "轻松、被照顾、孩子放电",
  "visualStyle": {
    "cover": "大草坪全景 + 人物背影",
    "color": "清新自然，高饱和绿色",
    "sequence": ["全景", "互动", "餐饮", "信息图"]
  },
  "originalityBoundary": "可借鉴结构，不得复制原文和原图"
}
```

## 7.3 原创生成 Prompt 输出

```json
{
  "titles": [],
  "hooks": [],
  "body": "",
  "hashtags": [],
  "imagePlan": [],
  "visualExecutionPlan": [],
  "videoScript": [],
  "cta": "",
  "riskNotes": [],
  "originalityNotes": ""
}
```

## 8. 前端改造建议

当前 Prototype 已确认，V1 不做前端框架重构。前端改造重点是保留现有页面、按钮、布局和主流程，只替换数据来源。

保留：

- `renderLogin()` 登录页。
- `renderDashboard()` 解析工作台。
- `renderMaterials()` 景区素材。
- `renderGenerator()` 原创生成。
- `renderDrafts()` 成稿库。
- 现有侧边栏、顶部栏、Toast、tab 和表单结构。

逐步替换：

| 当前前端能力 | V1 替换方式 |
| --- | --- |
| `state.loggedIn` | `/api/auth/login` + session |
| `mockHotspots` | `/api/viral-references` |
| `mockMaterials` | `/api/materials` |
| `initialTopics` | `/api/content-directions` |
| `analyzeViralLink()` | `/api/viral-references` + `/api/viral-references/:id/analyze` |
| `buildGeneratedDraft()` | `/api/generations` |
| `saveGeneratedDraft()` | `/api/drafts` |
| `state.drafts` | `/api/drafts` |

前端状态原则：

- 页面状态、tab、输入框内容仍可保留在 local state。
- 业务数据、生成结果、成稿和历史必须来自 API。
- 每个 API 操作都需要 loading、成功 Toast、失败提示。
- 复制正文、切换 tab 等纯前端能力可以保留。

## 9. 部署建议

## 9.1 当前 Prototype 运行

```bash
cd /Users/caiwenbin/Desktop/项目/璞智谷
python3 -m http.server 5173
```

访问：

```text
http://127.0.0.1:5173/index.html
```

## 9.2 V1 本地正式开发运行

V1 本地开发建议由 Node 服务同时托管静态页面和 API：

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

环境变量建议：

```text
DATABASE_URL="file:./dev.db"
SESSION_SECRET="local-dev-secret"
AI_PROVIDER="mock"
OPENAI_API_KEY=""
DEEPSEEK_API_KEY=""
```

## 9.3 V1 线上部署原则

V1 线上部署可以后续再升级基础设施，但不作为本地开发前置条件。

- 可以先使用单台 Node 服务部署。
- SQLite 适合本地开发和早期演示，正式多人并发上线前再评估是否迁移数据库。
- API Key 通过环境变量或密钥管理服务注入。
- 不在 V1 本地开发阶段引入 Docker、PostgreSQL、Redis。
- 文件上传可先使用本地目录，后续再迁移到对象存储。

## 10. 安全与合规

### 10.1 数据安全

- 内部账号密码必须哈希存储。
- LLM API Key 不得明文入库。
- 景区素材、生成内容和业务数据不得公开访问。
- 文件上传需限制类型和大小。

### 10.2 平台合规

- 不绕过小红书、抖音等平台访问限制。
- 不做批量抓取。
- 不保存不必要的第三方原始素材。
- 原平台内容只作为结构和视觉方法参考。

### 10.3 内容合规

- 不生成夸大宣传。
- 不编造价格、开放时间、活动权益。
- 不复制爆款原文、原图或独特表达。
- 发布前必须人工确认。

## 11. 质量保障

### 11.1 单元测试

建议覆盖：

- 链接平台识别。
- 解析状态流转。
- 素材筛选。
- 生成结果结构校验。
- 成稿保存与更新。

### 11.2 集成测试

主流程：

1. 登录。
2. 粘贴爆款链接。
3. 创建解析任务。
4. 获取拆解结果。
5. 选择景区素材。
6. 生成原创方案。
7. 保存成稿。

### 11.3 人工验收

验收重点：

- 是否能理解爆款为何有效。
- 是否能转成璞之谷自己的表达。
- 是否有明确原创性说明。
- 是否给出可执行配图方案。
- 是否能规避明显事实和合规风险。

## 12. V1 正式开发任务树

V1 的任务顺序以“逐步替换 mock”为原则，不重做 UI。

| 顺序 | 任务 | 替换对象 | 验收标准 | 建议 commit |
| --- | --- | --- | --- | --- |
| 1 | 对齐文档策略 | 旧技术口径 | README、PRD、TECH 均明确 SQLite + Prisma + 独立 AI service | `docs: align v1 development strategy` |
| 2 | 初始化 Express 服务 | 无后端 | Node 服务可托管当前静态页面和 `/api/health` | `chore: add express server scaffold` |
| 3 | 接入 Prisma + SQLite | 无数据库 | `prisma migrate` 可创建本地 SQLite 数据库 | `chore: add prisma sqlite setup` |
| 4 | Seed 当前 mock 数据 | `mockHotspots`、`mockMaterials`、`initialTopics`、`initialDrafts` | 当前样例数据可从数据库读取 | `db: seed prototype mock data` |
| 5 | 内部账号登录 | `state.loggedIn` | 登录成功后刷新保持会话，登录失败有错误提示 | `feat(auth): add internal login session` |
| 6 | 景区素材 API | `mockMaterials` | 素材列表、新增、筛选来自 API | `feat(materials): persist scenic materials` |
| 7 | 爆款素材保存 | `state.viralLink`、`analyzeViralLink()` | 粘贴链接后生成 `ViralReference`，可识别平台和状态 | `feat(viral): save viral references` |
| 8 | AI service 抽象 | 前端 mock 生成逻辑 | `aiService` 支持 mock provider，路由不直接调用模型 SDK | `feat(ai): add ai service abstraction` |
| 9 | 爆款 AI 拆解 | `selectedHot.analysis`、`visualStyle` | 输出结构、情绪、标题套路、视觉风格和风险边界 | `feat(analysis): analyze viral structure` |
| 10 | 内容方向创建 | `makeTopicFromHotspot()` | “用它生成原创方案”创建 `ContentDirection` 并进入生成页 | `feat(directions): create direction from viral reference` |
| 11 | 原创内容生成 | `buildGeneratedDraft()` | 输出标题、正文、话题标签、配图方案、图片 prompt、原创说明 | `feat(generation): generate original content plan` |
| 12 | 生成历史保存 | `generatedDraft` 临时状态 | 每次生成保存输入、输出、provider、状态和时间 | `feat(history): persist generation runs` |
| 13 | 成稿库持久化 | `state.drafts`、`saveGeneratedDraft()` | 成稿刷新后不丢，可编辑、复制、标记已发布 | `feat(drafts): persist drafts and versions` |
| 14 | 前端接 API | 本地数组读取 | 主流程体验不变，业务数据均来自 API | `feat(frontend): replace prototype mocks with api calls` |
| 15 | V1 闭环验收 | 分散功能 | 登录、粘贴链接、AI 拆解、选择素材、生成、保存历史全流程跑通 | `test: verify v1 core workflow` |

## 13. 当前 Prototype 与正式系统替换点

| 当前 Prototype | 正式系统替换 |
| --- | --- |
| `state.loggedIn` | 内部账号 session |
| `mockHotspots` | `ViralReference` + `ViralAnalysis` |
| `mockMaterials` | `ScenicMaterial` |
| `initialTopics` | `ContentDirection` |
| `analyzeViralLink()` | 保存爆款素材 + AI 拆解 API |
| `makeTopicFromHotspot()` | 创建内容方向 API |
| `buildGeneratedDraft()` | `aiService.generateOriginalContent()` |
| `generatedDraft` | `GenerationRun` |
| `saveGeneratedDraft()` | `Draft` + `DraftVersion` |
| 静态图片 `assets/` | V1 可继续本地使用，后续再迁移素材文件管理 |
| 刷新即丢失 | SQLite 持久化 |

## 14. 关键风险

- 小红书、抖音链接解析不稳定，需准备人工补充方案。
- 爆款拆解容易被误解成洗稿，需要在产品和 Prompt 中强化原创边界。
- 景区素材不完整会导致 AI 编造事实。
- 视觉风格拆解若没有截图或画面描述，输出质量会下降。
- LLM 输出需要结构化校验，避免返回不可用格式。

## 15. 后续技术决策待确认

以下事项不阻塞 V1 本地正式开发：

1. AI 供应商优先接入 OpenAI 还是 DeepSeek。
2. 小红书、抖音链接解析的合规数据来源和稳定性。
3. 是否允许上传爆款截图作为人工补充材料。
4. 素材文件 V1 是否继续使用本地目录，还是提前接对象存储。
5. 线上多人使用前是否需要从 SQLite 迁移到更强数据库。
6. 是否需要私有化部署或景区内网部署。
