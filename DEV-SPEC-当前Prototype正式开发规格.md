# 璞之谷 AI 内容生产工作台 V1 Prototype 开发规格

版本：V1.0  
日期：2026-06-15  
对象：前端、后端、AI 工程、测试、项目交付人员  
对应原型文件：[index.html](./index.html)、[styles.css](./styles.css)、[app.js](./app.js)  
关联文档：[PRD-璞之谷内容运营助手-V1.md](./PRD-璞之谷内容运营助手-V1.md)、[TECH-璞之谷AI内容生产工作台-V1.md](./TECH-璞之谷AI内容生产工作台-V1.md)

## 1. 规格目标

本文将当前前端 Prototype 中已经存在的页面、按钮、流程和 mock 数据整理为正式开发规格。正式开发时，应以本文定义的“可见页面和主流程”为准。

当前 V1 主流程：

```text
登录 → 解析工作台粘贴爆款链接 → 模拟/真实解析爆款 → 查看结构与视觉拆解 → 用参考生成原创方案 → 保存成稿 → 编辑/复制
```

## 2. 当前可见页面

当前导航只暴露 4 个业务页面：

| 路由 ID | 页面名称 | 当前函数 | 正式定位 |
| --- | --- | --- | --- |
| `dashboard` | 解析工作台 | `renderDashboard()` | 首页主流程，粘贴爆款链接并查看拆解 |
| `materials` | 景区素材 | `renderMaterials()` | 管理/选择璞之谷素材 |
| `generator` | 原创生成 | `renderGenerator()` | 基于爆款拆解和素材生成原创内容方案 |
| `drafts` | 成稿库 | `renderDrafts()` | 管理生成后的成稿 |

另有登录页：

| 页面 | 当前函数 | 正式定位 |
| --- | --- | --- |
| 登录页 | `renderLogin()` | 内部账号登录入口 |

当前 `app.js` 中仍保留 `renderHotspots()`、`renderTopics()`、`renderSettings()` 等旧原型函数，但已不在主导航暴露。正式 V1 不应默认实现这些旧入口，除非产品后续重新确认。

## 3. 全局布局规格

### 3.1 App Shell

当前函数：`renderShell()`

全局结构：

- 左侧侧边栏。
- 顶部页面标题区。
- 主内容区域。
- 右下角 Toast 提示。

侧边栏内容：

- 品牌：璞之谷 / AI 内容生产台。
- 主导航：
  - 解析工作台
  - 景区素材
  - 原创生成
  - 成稿库
- V1 边界说明：
  - 只模拟爆款链接解析、结构拆解和原创生成。
  - 不自动发布。
  - 不接真实平台。
  - 不接真实模型。

顶部内容：

- 当前页面标题。
- 当前页面说明。
- `Prototype / Mock Data` 标记。
- `退出` 按钮。

正式开发要求：

- 登录后进入 `dashboard`。
- 当前导航项需要高亮。
- 页面刷新后，正式系统应保持登录态和最近访问路径；Prototype 暂不保持。
- Toast 用于轻量反馈，默认 1.8 秒消失。

## 4. 登录页规格

当前函数：`renderLogin()`

### 4.1 页面目标

让景区内部运营人员进入系统。

### 4.2 页面元素

| 元素 | 类型 | 当前默认值 | 正式开发要求 |
| --- | --- | --- | --- |
| 内部账号 | input | `operation@puzhigu` | 必填，支持账号或邮箱 |
| 密码 | password input | `prototype` | 必填，密文展示 |
| 进入工作台 | button | `data-action="login"` | 调用登录接口 |

### 4.3 当前按钮行为

| 按钮 | 当前行为 | 正式行为 |
| --- | --- | --- |
| 进入工作台 | 设置 `state.loggedIn = true`，渲染工作台 | 调用 `POST /api/auth/login`，成功后保存 token/session 并进入工作台 |

### 4.4 正式验收标准

- 空账号或空密码不能提交。
- 登录失败需展示错误提示。
- 登录成功进入解析工作台。
- 不在前端存储明文密码。

## 5. 解析工作台规格

当前函数：`renderDashboard()`

### 5.1 页面目标

这是产品第一主页面。运营人员在这里粘贴小红书/抖音爆款链接，系统解析并展示爆款结构、视觉风格、景区映射和发布边界。

### 5.2 页面结构

1. 爆款链接输入区。
2. 四步流程提示。
3. 当前爆款参考卡片。
4. 四张拆解洞察卡片。
5. 最近爆款样本。
6. 最近成稿。

### 5.3 爆款链接输入区

当前字段：

| 字段 | 当前状态字段 | 类型 | 说明 |
| --- | --- | --- | --- |
| 爆款内容链接 | `state.viralLink` | string | 用户粘贴的小红书/抖音链接 |
| 解析状态 | `selectedHot.parseStatus` | string | `解析成功` / `需人工补充` 等 |
| 平台 | `selectedHot.platform` | string | 小红书、抖音等 |
| 互动数据 | `selectedHot.metrics` | string | 点赞、收藏、评论、转发等 |

按钮：

| 按钮 | 当前 action | 当前行为 | 正式行为 |
| --- | --- | --- | --- |
| 解析爆款链接 | `analyze-link` | 调用 `analyzeViralLink()`，650ms 后匹配 mock 样本 | 创建解析任务，展示异步解析状态 |

正式解析状态建议：

- `pending`：待解析。
- `parsing`：解析中。
- `success`：解析成功。
- `need_manual_input`：需人工补充。
- `failed`：解析失败。

### 5.4 四步流程提示

当前展示：

1. 解析爆款：识别平台、标题、互动数据和内容摘要。
2. 拆解方法：提取 Hook、结构、情绪和视觉风格。
3. 映射景区：匹配璞之谷素材与可拍摄场景。
4. 原创生成：产出标题、正文、配图方案和分镜。

正式开发要求：

- 该模块为静态流程说明。
- 后续可根据任务状态高亮当前步骤。

### 5.5 当前爆款参考卡片

字段来源：`selectedHot`

| 字段 | 来源字段 | 说明 |
| --- | --- | --- |
| 原链接 | `sourceUrl` 或 `state.viralLink` | 展示参考链接 |
| 图片 | `image` | 当前为本地素材图，正式可为封面/截图 |
| 标题 | `title` | 爆款标题 |
| 摘要 | `summary` | 内容摘要 |

按钮：

| 按钮 | 当前 action | 当前行为 | 正式行为 |
| --- | --- | --- | --- |
| 用它生成原创方案 | `use-reference` | 调用 `makeTopicFromHotspot()`，进入原创生成页 | 基于当前 `viralReferenceId` 创建内容方向并进入生成页 |

### 5.6 拆解洞察卡片

当前卡片：

| 卡片 | 主字段 | 副字段 |
| --- | --- | --- |
| 爆款结构 | `analysis.hook` | `analysis.structure` |
| 视觉风格 | `visualStyle` | 固定提示：只借鉴构图、节奏和图文顺序 |
| 璞之谷映射 | `analysis.adapt` | `analysis.originality` |
| 发布边界 | `analysis.risk` | 固定提示：发布前确认事实、活动、价格和版权风险 |

正式开发要求：

- 拆解结果应来自 LLM 分析或人工补充。
- 必须明确区分“参考爆款”和“原创生成”。
- 视觉风格只输出参考方法，不输出盗用原图建议。

### 5.7 最近爆款样本

当前函数：`renderHotspotListItem()`

点击行为：

- 设置 `state.selectedHotspotId`。
- 重新渲染解析工作台。

正式开发要求：

- 列表默认按最近解析时间倒序。
- 点击后加载该爆款样本及拆解结果。
- 应支持解析状态筛选，但 V1 可先弱化。

### 5.8 最近成稿

当前函数：`renderDraftPreview()`

按钮：

| 按钮 | 当前行为 | 正式行为 |
| --- | --- | --- |
| 查看 | 跳转 `drafts` 页面 | 跳转成稿库 |

## 6. 景区素材页规格

当前函数：`renderMaterials()`

### 6.1 页面目标

维护和选择璞之谷真实素材，供原创生成时引用。

### 6.2 筛选项

来源：`materialTypes`

当前类型：

- 全部
- 景点
- 住宿
- 活动
- 餐饮
- 建筑
- 品牌
- 服务

按钮行为：

| 控件 | 当前 action | 行为 |
| --- | --- | --- |
| 类型筛选 chip | `material-filter` | 设置 `state.materialFilter` |

正式开发要求：

- 类型筛选通过 API 查询或前端过滤均可。
- 正式素材类型应与后台枚举一致。

### 6.3 新增素材

按钮：

| 按钮 | 当前 action | 行为 |
| --- | --- | --- |
| 新增素材 | `toggle-material-panel` | 展开/收起新增表单 |
| 保存素材 | `add-material` | 读取表单并加入 `state.materials` |
| 取消 | `toggle-material-panel` | 关闭表单 |

新增素材字段：

| 字段 | 当前 DOM ID | 类型 |
| --- | --- | --- |
| 素材名称 | `new-mat-title` | string |
| 类型 | `new-mat-type` | enum |
| 素材描述 | `new-mat-content` | text |

正式开发要求：

- 必填：素材名称、素材类型、素材描述。
- 可选：标签、有效期、素材图片/视频、是否推荐。
- 保存成功后刷新素材列表。

### 6.4 素材卡片

当前函数：`renderMaterialCard()`

字段：

| 字段 | 来源 |
| --- | --- |
| 图片 | `image` |
| 类型 | `type` |
| 推荐引用 | `recommended` |
| 标题 | `title` |
| 描述 | `content` |
| 标签 | `tags` |

按钮：

| 按钮 | 当前 action | 当前行为 | 正式行为 |
| --- | --- | --- | --- |
| 加入生成 / 已加入生成 | `toggle-material` | 增删 `state.generator.materialIds` | 更新当前生成上下文中的素材选择 |

## 7. 原创生成页规格

当前函数：`renderGenerator()`

### 7.1 页面目标

基于当前参考爆款、原创方向、平台、风格、景区素材和约束，生成原创内容方案。

### 7.2 输入区域

| 区域 | 字段 | 当前来源 |
| --- | --- | --- |
| 参考爆款摘要 | 标题、Hook | `selectedHot.title`、`selectedHot.analysis.hook` |
| 原创方向 | `topicId` | `state.generator.topicId` |
| 平台 | `platform` | `state.generator.platform` |
| 风格 | `style` | `state.generator.style` |
| 景区特色 | `emphasize` | `state.generator.emphasize` |
| 原创边界 / 风险约束 | `avoid` | `state.generator.avoid` |
| 引用素材 | `materialIds` | `state.generator.materialIds` |

平台选项：

- 小红书
- 抖音
- 公众号

风格选项：

- 自然种草
- 攻略型
- 亲子温暖
- 年轻化
- 活动促销
- 诗意文旅

### 7.3 生成按钮

| 按钮 | 当前 action | 当前行为 | 正式行为 |
| --- | --- | --- | --- |
| 生成原创内容方案 | `generate` | 700ms 后调用 `buildGeneratedDraft()` 拼装 mock 输出 | 调用生成接口，进入异步任务轮询或 SSE/WebSocket 流式返回 |

生成中状态：

- 当前：按钮文案变为 `生成中...`。
- 正式：应禁用按钮，展示任务进度或 loading。

### 7.4 输出区域

当前函数：`renderGeneratedOutput()`、`renderOutputTab()`

输出顶部：

- 原创方向标题。
- 平台。
- 风格。
- 发布前人工确认提示。
- 引用素材。
- Mock 标记。

操作按钮：

| 按钮 | 当前 action | 当前行为 | 正式行为 |
| --- | --- | --- | --- |
| 保存成稿 | `save-draft` | 保存到 `state.drafts` 并跳转成稿库 | 调用 `POST /api/drafts` |
| 复制正文 | `copy-draft` | 复制当前正文 | 复制当前正文 |

输出 tabs：

| Tab | 当前 value | 内容 |
| --- | --- | --- |
| 标题 | `titles` | 5 个标题候选，支持重新生成标题 |
| 正文 | `body` | 正文初稿、话题标签 |
| 配图方案 | `visual` | 首图、场景图、细节图、信息图建议 |
| 分镜 | `video` | 0-3 秒、3-8 秒、8-15 秒短视频分镜 |
| 原创说明 | `originality` | 借鉴点、原创点、禁止直接使用内容 |

Tab 内按钮：

| 按钮 | 当前 action | 行为 |
| --- | --- | --- |
| 重新生成标题 | `reroll-title` | 将新标题插入标题列表首位 |

正式开发要求：

- 生成结果必须结构化返回。
- 标题、正文、配图方案、分镜、原创说明应能分别重新生成。
- 需保留引用素材和参考爆款。
- 需保留风险提示和原创性说明。

## 8. 成稿库规格

当前函数：`renderDrafts()`、`renderDraftEditor()`

### 8.1 页面目标

保存和编辑 AI 生成后的最终内容，方便运营复制到外部平台。

### 8.2 成稿列表

字段：

| 字段 | 来源 |
| --- | --- |
| 标题 | `draft.title` |
| 平台 | `draft.platform` |
| 更新时间 | `draft.updatedAt` |
| 状态 | `draft.status` |

交互：

- 点击列表项：设置 `state.selectedDraftId`。
- 复制按钮：复制标题、正文、话题标签。

### 8.3 成稿编辑区

字段：

| 字段 | 当前 data 字段 | 类型 |
| --- | --- | --- |
| 标题 | `data-draft-field="title"` | input |
| 正文 | `data-draft-field="body"` | textarea |
| 话题标签 | `data-draft-field="hashtags"` | input |
| 配图方案 | `data-draft-field="imageSuggestions"` | textarea |

按钮：

| 按钮 | 当前 action | 当前行为 | 正式行为 |
| --- | --- | --- | --- |
| 标记已发布 | `mark-published` | 状态改为 `已发布` | 更新成稿状态 |
| 复制全文 | `copy-selected-draft` | 复制标题、正文、标签 | 复制完整成稿 |

正式开发要求：

- 编辑时应支持自动保存或手动保存，需产品确认。
- 成稿状态至少支持：草稿、待发布、已发布、废弃。
- 已发布后可填写外部发布链接。

## 9. 按钮与事件总表

| action / route | 页面 | 文案 | 当前行为 | 正式替换 |
| --- | --- | --- | --- | --- |
| `login` | 登录页 | 进入工作台 | 前端登录 | 登录 API |
| `logout` | 全局 | 退出 | 清空登录态 | 登出 API / 清 session |
| `data-route` | 全局 | 导航按钮 | 切换 `state.route` | 前端路由 |
| `analyze-link` | 解析工作台 | 解析爆款链接 | mock 匹配样本 | 创建解析任务 |
| `use-reference` | 解析工作台 | 用它生成原创方案 | 创建本地 topic 并跳转生成页 | 创建内容方向 |
| `material-filter` | 景区素材 | 类型筛选 | 本地过滤 | API 查询或本地过滤 |
| `toggle-material-panel` | 景区素材 | 新增素材/取消 | 展开收起表单 | 展开收起表单 |
| `add-material` | 景区素材 | 保存素材 | 本地新增素材 | 创建素材 API |
| `toggle-material` | 景区素材/生成页 | 加入生成 | 修改素材选择 | 更新生成上下文 |
| `check-material` | 原创生成 | 引用素材 checkbox | 修改 `materialIds` | 更新生成上下文 |
| `generate` | 原创生成 | 生成原创内容方案 | mock 生成 | 调用生成任务 API |
| `tab` | 原创生成 | 输出 tab | 切换输出类型 | 前端状态 |
| `reroll-title` | 原创生成 | 重新生成标题 | 本地插入标题 | 标题重生成 API |
| `save-draft` | 原创生成 | 保存成稿 | 本地保存 | 创建成稿 API |
| `copy-draft` | 原创生成 | 复制正文 | 剪贴板复制 | 剪贴板复制 |
| `copy-selected-draft` | 成稿库 | 复制/复制全文 | 剪贴板复制 | 剪贴板复制 |
| `mark-published` | 成稿库 | 标记已发布 | 本地改状态 | 更新成稿状态 API |

## 10. 当前 mock 数据规格

## 10.1 爆款参考样本 `mockHotspots`

字段规格：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 样本 ID |
| `platform` | string | 小红书/抖音 |
| `title` | string | 爆款标题 |
| `sourceUrl` | string | 参考链接 |
| `parseStatus` | string | 解析状态 |
| `author` | string | 作者昵称 |
| `time` | string | 发布时间 |
| `metrics` | string | 互动数据展示文本 |
| `tags` | string[] | 内容标签 |
| `fit` | string | 适配程度 |
| `image` | string | 本地图片路径 |
| `summary` | string | 内容摘要 |
| `visualStyle` | string | 视觉风格拆解 |
| `analysis.hook` | string | Hook |
| `analysis.structure` | string | 内容结构 |
| `analysis.emotion` | string | 情绪价值 |
| `analysis.adapt` | string | 璞之谷映射 |
| `analysis.risk` | string | 风险提示 |
| `analysis.originality` | string | 原创说明 |

正式数据表建议：`viral_references` + `viral_analyses`。

## 10.2 景区素材 `mockMaterials`

字段规格：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 素材 ID |
| `type` | string | 素材类型 |
| `title` | string | 素材标题 |
| `tags` | string[] | 标签 |
| `image` | string | 本地图片路径 |
| `content` | string | 素材描述 |
| `recommended` | boolean | 是否推荐引用 |

正式数据表建议：`scenic_materials`。

## 10.3 内容方向 `initialTopics`

字段规格：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 内容方向 ID |
| `title` | string | 内容方向标题 |
| `source` | string | 来源 |
| `platform` | string | 目标平台 |
| `audience` | string | 目标人群 |
| `goal` | string | 内容目标 |
| `hotId` | string | 关联爆款样本 |
| `materialIds` | string[] | 引用素材 |
| `priority` | string | 优先级 |
| `status` | string | 状态 |
| `plan` | string | 计划日期 |
| `notes` | string | 备注 |

正式数据表建议：`content_directions`。

## 10.4 成稿 `initialDrafts`

字段规格：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 成稿 ID |
| `topicId` | string | 关联内容方向 |
| `platform` | string | 平台 |
| `title` | string | 标题 |
| `body` | string | 正文 |
| `hashtags` | string[] | 话题标签 |
| `imageSuggestions` | string[] | 配图方案 |
| `status` | string | 状态 |
| `updatedAt` | string | 更新时间 |

正式数据表建议：`drafts`。

## 10.5 前端状态 `state`

关键字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `loggedIn` | boolean | 登录状态 |
| `route` | string | 当前页面 |
| `viralLink` | string | 当前链接输入 |
| `analyzing` | boolean | 是否解析中 |
| `selectedHotspotId` | string | 当前选中爆款样本 |
| `selectedTopicId` | string | 当前内容方向 |
| `selectedDraftId` | string | 当前成稿 |
| `materialFilter` | string | 素材筛选 |
| `outputTab` | string | 生成结果 tab |
| `generator` | object | 生成输入上下文 |
| `generatedDraft` | object/null | 当前生成结果 |
| `hotspots` | array | 爆款样本列表 |
| `materials` | array | 素材列表 |
| `topics` | array | 内容方向列表 |
| `drafts` | array | 成稿列表 |
| `toast` | string | Toast 文案 |

## 11. 主流程开发规格

## 11.1 爆款链接解析流程

当前 Prototype：

```text
输入链接 → 点击解析爆款链接 → analyzeViralLink()
→ 根据链接关键字匹配 mockHotspots
→ 更新 selectedHotspotId / parseStatus
→ 展示 Toast
```

正式流程：

```text
输入链接
→ POST /api/viral-references
→ 返回 taskId / viralReferenceId
→ 轮询或订阅解析状态
→ 成功后展示解析结果
→ 失败或受限时进入人工补充
```

验收标准：

- 小红书链接、抖音链接可以被识别平台。
- 解析中有 loading。
- 解析失败有明确说明。
- 允许人工补充标题、正文摘要、截图/画面描述。

## 11.2 用爆款参考生成原创方案流程

当前 Prototype：

```text
点击用它生成原创方案
→ makeTopicFromHotspot()
→ 创建本地 topic
→ 设置 generator 输入
→ 跳转原创生成页
```

正式流程：

```text
点击用它生成原创方案
→ 创建 content_direction
→ 带入 viral_reference、analysis、material candidates
→ 进入原创生成页
```

验收标准：

- 原创生成页能看到当前参考爆款。
- 默认带入推荐素材。
- 可以修改平台、风格、强调信息和原创边界。

## 11.3 原创生成流程

当前 Prototype：

```text
点击生成原创内容方案
→ 700ms loading
→ buildGeneratedDraft()
→ 展示标题/正文/配图方案/分镜/原创说明
```

正式流程：

```text
点击生成
→ POST /api/generations/original-content
→ 后端执行 LLM 编排
→ 返回结构化 generation result
→ 前端按 tabs 展示
```

验收标准：

- 至少 5 个标题。
- 至少 1 版正文。
- 配图方案包含首图、场景图、细节图、信息图。
- 分镜适配抖音短视频。
- 必须包含原创说明和风险提示。

## 11.4 保存成稿流程

当前 Prototype：

```text
点击保存成稿
→ saveGeneratedDraft()
→ 插入 state.drafts
→ 跳转成稿库
```

正式流程：

```text
点击保存成稿
→ POST /api/drafts
→ 返回 draftId
→ 跳转 /drafts/{id} 或成稿库
```

验收标准：

- 保存后刷新页面不丢失。
- 成稿可继续编辑。
- 成稿保留参考爆款、引用素材、原创说明和风险提示。

## 12. 正式接口替换清单

| Prototype 函数/状态 | 正式能力 |
| --- | --- |
| `state.loggedIn` | 登录 session/JWT |
| `analyzeViralLink()` | 爆款链接解析任务 API |
| `mockHotspots` | 爆款样本 API |
| `mockMaterials` | 景区素材 API |
| `makeTopicFromHotspot()` | 创建内容方向 API |
| `buildGeneratedDraft()` | LLM 原创生成 API |
| `saveGeneratedDraft()` | 保存成稿 API |
| `navigator.clipboard.writeText` | 可保留前端能力 |
| `state.drafts` | 成稿数据库 |

## 13. 暂不进入正式 V1 的 Prototype 残留

以下能力在 `app.js` 中仍有函数或事件，但当前主导航不暴露，不建议作为正式 V1 默认范围：

- 独立爆款样本管理页：`renderHotspots()`。
- 独立选题池看板：`renderTopics()`。
- 系统设置页：`renderSettings()`。
- 表格导入样例：`import-demo`。
- 选题状态推进：`advance-topic`。

如需恢复，应重新进入 PRD 和排期确认。

## 14. 正式开发验收清单

### 页面验收

- 登录页可用。
- 解析工作台为登录后默认首页。
- 景区素材页可筛选、查看、选择素材。
- 原创生成页可生成并查看多 tab 输出。
- 成稿库可编辑、复制、标记发布。

### 交互验收

- 所有按钮有明确 loading 或反馈。
- 所有保存类操作成功后有 Toast。
- 解析失败时可进入人工补充。
- 生成失败时保留用户输入。
- 页面在桌面和移动窄屏不横向溢出。

### 数据验收

- 生成内容可追溯到参考爆款。
- 生成内容可追溯到引用素材。
- 成稿保存后刷新不丢失。
- 发布状态可更新。

### 合规验收

- 不复制爆款原文。
- 不使用原作者图片或视频。
- 不编造价格、开放时间、活动权益。
- 发布前展示人工确认提示。

