# 璞之谷 AI 内容生产工作台 V1 技术文档

版本：V1.0  
日期：2026-06-15  
对象：产品、设计、前端、后端、AI 工程与项目交付人员  
关联文档：[PRD-璞之谷内容运营助手-V1.md](./PRD-璞之谷内容运营助手-V1.md)

## 1. 技术目标

V1 目标是建设一个面向景区运营人员的 AI 内容生产工作台。运营人员粘贴小红书、抖音等平台的爆款内容链接后，系统完成以下流程：

1. 识别平台与内容类型。
2. 在合规可访问范围内解析爆款内容。
3. 拆解爆款结构与视觉风格。
4. 匹配璞之谷景区素材。
5. 生成原创宣传文案、配图方案、短视频分镜和风险提示。
6. 支持运营人员编辑、保存、复制和导出成稿。

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

## 3. 推荐线上技术架构

V1 正式开发建议采用前后端分离架构。

```text
浏览器前端
  ↓
Web API 服务
  ↓
业务服务层
  ├── 链接解析服务
  ├── 爆款拆解服务
  ├── 素材检索服务
  ├── LLM 编排服务
  ├── 成稿管理服务
  └── 账号认证服务
  ↓
数据库 / 对象存储 / 缓存
  ↓
第三方平台能力 / 第三方数据服务 / LLM Provider
```

### 3.1 前端建议

若继续轻量开发：

- React + Vite。
- TypeScript。
- CSS Modules 或 Tailwind CSS。
- 不建议一开始引入复杂状态管理。

若希望快速交付：

- 保持单页应用。
- 先不做复杂路由权限。
- 以 API 对接和表单体验为主。

### 3.2 后端建议

可选技术栈：

- Node.js：NestJS / Fastify / Express。
- Python：FastAPI。

推荐选择取决于团队熟悉度。若后续 LLM、解析、文本处理较重，FastAPI 更顺手；若团队前端偏强，Node.js 更容易统一栈。

### 3.3 数据库建议

- PostgreSQL：主业务数据库。
- Redis：异步任务状态、短期缓存。
- 对象存储：图片、截图、素材文件。

### 3.4 异步任务建议

以下任务不建议同步阻塞请求：

- 爆款链接解析。
- 截图/OCR/视频帧分析。
- LLM 拆解。
- LLM 原创生成。

建议使用任务队列：

- BullMQ / Redis Queue。
- Celery / RQ。
- 云厂商队列服务。

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

## 4.6 LLM 编排模块

建议拆成多个 Prompt 任务，而不是一个大 Prompt 一次完成所有事。

任务链：

1. 爆款内容摘要。
2. 爆款结构拆解。
3. 视觉风格拆解。
4. 景区素材匹配。
5. 原创文案生成。
6. 配图方案生成。
7. 风险与原创性检查。

好处：

- 输出更稳定。
- 便于单独重试。
- 便于定位质量问题。
- 便于后续缓存拆解结果。

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

## 6. API 草案

## 6.1 登录

```http
POST /api/auth/login
```

请求：

```json
{
  "username": "operation@puzhigu",
  "password": "******"
}
```

## 6.2 创建爆款解析任务

```http
POST /api/viral-references
```

请求：

```json
{
  "sourceUrl": "https://www.xiaohongshu.com/explore/xxx",
  "platform": "xiaohongshu"
}
```

响应：

```json
{
  "id": "vr_001",
  "parseStatus": "pending",
  "taskId": "task_001"
}
```

## 6.3 查询解析结果

```http
GET /api/viral-references/{id}
```

## 6.4 人工补充解析内容

```http
PATCH /api/viral-references/{id}/manual-input
```

请求：

```json
{
  "title": "北京周边 1.5h，藏进山谷里的亲子草坪周末",
  "rawText": "人工补充正文...",
  "mediaDescription": "首图为草坪和树屋，整体清新自然..."
}
```

## 6.5 执行爆款拆解

```http
POST /api/viral-references/{id}/analyze
```

响应：

```json
{
  "analysisId": "va_001",
  "status": "pending"
}
```

## 6.6 获取素材列表

```http
GET /api/scenic-materials?type=activity&keyword=草坪
```

## 6.7 生成原创内容方案

```http
POST /api/generations/original-content
```

请求：

```json
{
  "viralReferenceId": "vr_001",
  "analysisId": "va_001",
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

## 6.8 保存成稿

```http
POST /api/drafts
```

## 6.9 更新成稿

```http
PATCH /api/drafts/{id}
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

当前 Prototype 可以作为交互参考，但正式开发建议重构为组件化结构。

推荐组件：

```text
AppShell
LoginPage
ViralLinkComposer
ViralAnalysisPanel
InsightCard
MaterialPicker
OriginalGenerationPanel
DraftEditor
DraftList
```

推荐状态：

```text
auth
currentViralReference
currentAnalysis
selectedMaterials
generationResult
drafts
```

## 9. 部署建议

## 9.1 Prototype 运行

```bash
cd /Users/caiwenbin/Desktop/项目/璞智谷
python3 -m http.server 5173
```

访问：

```text
http://127.0.0.1:5173/index.html
```

## 9.2 正式环境

建议环境：

- Web 前端：静态资源托管或 Nginx。
- API 服务：Docker 部署。
- 数据库：PostgreSQL。
- 缓存/队列：Redis。
- 对象存储：S3 兼容服务或云厂商 OSS/COS。
- LLM Key：通过环境变量或密钥管理服务注入。

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

## 12. 开发里程碑建议

### Milestone 1：前端可用版

- 登录。
- 解析工作台。
- 素材库。
- 原创生成页。
- 成稿库。
- 全部使用 mock API。

### Milestone 2：后端基础版

- 账号登录。
- 素材 CRUD。
- 爆款样本 CRUD。
- 成稿 CRUD。
- 文件上传。

### Milestone 3：AI 链路版

- LLM 拆解。
- LLM 原创生成。
- 风险检查。
- Prompt 模板管理。

### Milestone 4：平台解析增强

- 合规链接解析。
- 人工补充流程。
- 截图/OCR 辅助。
- 第三方数据服务接入。

## 13. 当前 Prototype 与正式系统替换点

| 当前 Prototype | 正式系统替换 |
| --- | --- |
| `mockHotspots` | `viral_references` + 平台解析服务 |
| `mockMaterials` | `scenic_materials` 数据表 |
| `buildGeneratedDraft()` | LLM 编排服务 |
| 前端内存 `state` | API + 数据库 |
| 静态图片 `assets/` | 对象存储 + 素材管理 |
| 假登录 | 内部账号认证 |
| 刷新即丢失 | 持久化成稿与版本 |

## 14. 关键风险

- 小红书、抖音链接解析不稳定，需准备人工补充方案。
- 爆款拆解容易被误解成洗稿，需要在产品和 Prompt 中强化原创边界。
- 景区素材不完整会导致 AI 编造事实。
- 视觉风格拆解若没有截图或画面描述，输出质量会下降。
- LLM 输出需要结构化校验，避免返回不可用格式。

## 15. 后续技术决策待确认

1. 后端技术栈选择 Node.js 还是 Python。
2. LLM 供应商使用 OpenAI、DeepSeek、通义、豆包或私有化模型。
3. 是否优先支持小红书链接解析。
4. 是否允许上传爆款截图作为解析材料。
5. 素材文件使用本地存储还是云对象存储。
6. 是否需要私有化部署。

