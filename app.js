const app = document.querySelector("#app");

const routes = [
  { id: "dashboard", label: "解析工作台" },
  { id: "materials", label: "景区素材" },
  { id: "generator", label: "原创生成" },
  { id: "drafts", label: "成稿库" },
];

const platformOptions = ["小红书", "抖音", "公众号"];
const styleOptions = ["自然种草", "攻略型", "亲子温暖", "年轻化", "活动促销", "诗意文旅"];
const materialTypes = ["全部", "景点", "住宿", "活动", "餐饮", "建筑", "品牌", "服务"];
const hotspotFilters = ["全部", "小红书", "抖音", "高适配", "亲子", "徒步", "民宿", "美食"];
const topicStatuses = ["待评估", "待创作", "已生成", "已使用"];

const mockHotspots = [
  {
    id: "hot-1",
    platform: "小红书",
    title: "北京周边 1.5h，藏进山谷里的亲子草坪周末",
    sourceUrl: "https://www.xiaohongshu.com/explore/mock-puzhigu-family-lawn",
    parseStatus: "解析成功",
    author: "山里周末计划",
    time: "今天 09:20",
    metrics: "赞 1.8w · 藏 9,420 · 评 386",
    tags: ["亲子", "草坪", "周末", "高适配"],
    fit: "高",
    image: "./assets/central-lawn.png",
    summary:
      "以周末亲子轻度假为入口，强调大草坪、树屋、自然游戏和不费力的出行体验。",
    visualStyle: "清新自然图文：首图大草坪 + 人物背影，正文用清单节奏，图片顺序从全景到亲子互动再到餐饮承接。",
    analysis: {
      hook: "把“北京周边不累的亲子度假”作为强入口，降低决策成本。",
      structure: "距离与场景先行，随后列出草坪、树屋、拍照、餐饮四个可感知体验。",
      emotion: "轻松、被照顾、孩子放电、家长也能休息。",
      adapt: "适合改写为璞之谷 2000㎡中心草坪、树屋区、亲水游戏和山野餐饮组合选题。",
      risk: "不要照搬原笔记具体路线、价格和“隐藏宝藏”等夸张表达。",
      originality: "借鉴“低门槛亲子周末”的结构，用璞之谷真实草坪、树屋、山野餐饮重写内容。"
    }
  },
  {
    id: "hot-2",
    platform: "抖音",
    title: "长城脚下的咖啡馆，风一吹就像进了电影",
    sourceUrl: "https://www.douyin.com/video/mock-greatwall-cafe",
    parseStatus: "解析成功",
    author: "北京取景地",
    time: "昨天 18:42",
    metrics: "赞 5.2w · 评 1,104 · 转 2,088",
    tags: ["咖啡", "打卡", "长城", "美食"],
    fit: "高",
    image: "./assets/mountain-table.png",
    summary:
      "用短视频镜头表现长城、山风、咖啡和花草，适合做视觉氛围型内容。",
    visualStyle: "氛围短视频：远山建立场、咖啡杯近景、花草摇晃和慢推镜头，字幕短、画面留白多。",
    analysis: {
      hook: "第一秒直接给长城脚下的空间反差，抓住“城市人逃离感”。",
      structure: "镜头从远山切到咖啡，再切花草、露台、手部动作，节奏很轻。",
      emotion: "松弛、治愈、值得专程去一趟。",
      adapt: "可结合高巅咖啡、岳鹿山野厨房和山谷景观做抖音分镜。",
      risk: "视频脚本中避免承诺“人少”“包场”等不可控体验。",
      originality: "借鉴“长城脚下的松弛感”，用高巅咖啡、岳鹿山野厨房和璞之谷山风重新组织镜头。"
    }
  },
  {
    id: "hot-3",
    platform: "小红书",
    title: "不只是民宿，是能把人慢慢安静下来的山野汤泉",
    sourceUrl: "https://www.xiaohongshu.com/explore/mock-valley-hot-spring",
    parseStatus: "需人工补充",
    author: "温泉地图",
    time: "06-14 20:16",
    metrics: "赞 7,620 · 藏 3,180 · 评 142",
    tags: ["民宿", "汤泉", "疗愈", "高适配"],
    fit: "高",
    image: "./assets/valley-hotel.png",
    summary:
      "把住宿从“房型卖点”转成“疗愈归处”，突出私汤、山景和身心放松。",
    visualStyle: "治愈民宿图文：封面聚焦窗外山景或汤泉水汽，正文先讲情绪，再讲房间、院落和夜晚。",
    analysis: {
      hook: "把“住一晚”转译成“给自己一个归心的晚上”。",
      structure: "先讲情绪，再讲院落、房间、私汤、细节服务。",
      emotion: "安静、安全、回到自然、被温柔接住。",
      adapt: "非常适合璞墅汤泉民宿和漫心酒店的双产品线内容。",
      risk: "汤泉、房型、配套需以素材库为准，不能自行编造数量与服务。",
      originality: "借鉴“疗愈归处”的情绪入口，具体内容只能使用璞墅汤泉民宿真实权益。"
    }
  },
  {
    id: "hot-4",
    platform: "抖音",
    title: "带孩子看一场会发光的自然课",
    sourceUrl: "https://www.douyin.com/video/mock-insect-museum",
    parseStatus: "解析成功",
    author: "亲子自然志",
    time: "06-13 11:05",
    metrics: "赞 2.4w · 评 528 · 转 907",
    tags: ["亲子", "研学", "虫博馆"],
    fit: "中",
    image: "./assets/insect-museum.png",
    summary:
      "亲子科普内容以夜游、昆虫和互动展为卖点，适合暑期研学传播。",
    visualStyle: "亲子研学短视频：孩子视角、展陈特写、暗场亮点和家长收获字幕组合。",
    analysis: {
      hook: "把昆虫博物馆包装成“孩子会主动问问题的自然课堂”。",
      structure: "孩子视角开场，家长决策补充安全、距离和收获。",
      emotion: "好奇、惊喜、陪伴、自然启蒙。",
      adapt: "可围绕自然界虫博馆、夜行性昆虫探索和长城脚下的生态场景展开。",
      risk: "需确认开放时间、展陈内容和活动安排后再发布。",
      originality: "借鉴“自然课堂”的叙事方式，用自然界虫博馆和长城脚下生态场景生成原创脚本。"
    }
  },
  {
    id: "hot-5",
    platform: "小红书",
    title: "5 公里森林徒步，不卷装备也能走进山风里",
    sourceUrl: "https://www.xiaohongshu.com/explore/mock-forest-walk",
    parseStatus: "解析成功",
    author: "轻徒步研究所",
    time: "06-12 08:52",
    metrics: "赞 9,842 · 藏 5,406 · 评 221",
    tags: ["徒步", "自然", "周边游"],
    fit: "高",
    image: "./assets/forest-trail.png",
    summary:
      "轻徒步内容强调低门槛和身心刷新，适合城市周末出逃主题。",
    visualStyle: "轻攻略图文：路线感虚线、森林背景、装备低门槛提示和餐饮住宿承接。",
    analysis: {
      hook: "“不用硬核，也能把身体还给山风”是强情绪句。",
      structure: "路线难度、沿途体验、适合人群、结束后的餐饮住宿承接。",
      emotion: "松弛、清醒、恢复能量。",
      adapt: "适合璞之谷 5 公里徒步径与大黑山森林公园联动表达。",
      risk: "路线难度、安全提醒和天气限制需要人工确认。",
      originality: "借鉴“轻徒步不硬核”的收藏价值，用璞之谷 5 公里徒步径和山谷配套承接。"
    }
  }
];

const mockMaterials = [
  {
    id: "mat-1",
    type: "品牌",
    title: "品牌核心表达",
    tags: ["本真", "疗愈", "东方山水"],
    image: "./assets/mist-valley.png",
    content:
      "璞之谷取“璞玉藏深谷，本真归自然”之意，是藏纳万物的自然之谷、治愈人心的温暖之谷、安放理想的心灵之谷。",
    recommended: true
  },
  {
    id: "mat-2",
    type: "活动",
    title: "2000㎡中心草坪与树屋区",
    tags: ["草坪", "树屋", "亲子"],
    image: "./assets/central-lawn.png",
    content:
      "中心草坪树屋区是全域度假场景纽带，可承载山野音乐会、品牌发布会、艺术沙龙、主题团建、亲水游戏与亲子互动。",
    recommended: true
  },
  {
    id: "mat-3",
    type: "住宿",
    title: "漫心度假酒店",
    tags: ["观景客房", "长城文化带", "片区标杆"],
    image: "./assets/valley-hotel.png",
    content:
      "华住集团旗下中高端标杆，长城文化带及片区唯一大型连锁度假酒店；59 间观景客房，适配情侣、家庭亲子、企业团建。",
    recommended: true
  },
  {
    id: "mat-4",
    type: "住宿",
    title: "璞墅汤泉疗愈民宿",
    tags: ["私汤", "归心", "疗愈"],
    image: "./assets/forest-path.png",
    content:
      "山景休闲聚会与身心深度疗愈两类体验，包含涵盖院落、客房配置、私汤和星空疗愈等方向。",
    recommended: true
  },
  {
    id: "mat-5",
    type: "建筑",
    title: "三胜景院士建筑",
    tags: ["人文地标", "李兴钢", "胜景几何"],
    image: "./assets/architect-landmark.png",
    content:
      "中国工程院院士、鸟巢中方总建筑师李兴钢院士“胜景几何”生动实践，包含观山、鹿鸣、醉景等人文地标体验。",
    recommended: true
  },
  {
    id: "mat-6",
    type: "景点",
    title: "自然界·虫博馆",
    tags: ["昆虫", "研学", "互动"],
    image: "./assets/insect-museum.png",
    content:
      "长城脚下的阴阳虫境，北京唯一建在自然中并与之交融的昆虫博物馆，包含万蝶舞春、夜行性昆虫探索等互动方向。",
    recommended: false
  },
  {
    id: "mat-7",
    type: "餐饮",
    title: "高巅咖啡与岳鹿山野厨房",
    tags: ["山风", "咖啡", "山野烟火气"],
    image: "./assets/mountain-table.png",
    content:
      "高巅咖啡位于近 200㎡无界空间，是长城脚下的精神驿站；岳鹿山野厨房主打养生清鲜、烹制安心、健康的山野食材。",
    recommended: true
  },
  {
    id: "mat-8",
    type: "活动",
    title: "5 公里徒步径",
    tags: ["徒步", "森林", "大黑山"],
    image: "./assets/forest-trail.png",
    content:
      "与大黑山森林公园无缝相融，林木葱郁，适合 5 公里轻度游和更远深度游的分层体验。",
    recommended: false
  }
];

const initialTopics = [
  {
    id: "topic-1",
    title: "带娃在长城脚下放电，家长也能休息的草坪周末",
    source: "爆款解析转化",
    platform: "小红书",
    audience: "亲子家庭",
    goal: "周末种草",
    hotId: "hot-1",
    materialIds: ["mat-1", "mat-2", "mat-7"],
    priority: "高",
    status: "待创作",
    plan: "06-18",
    notes: "突出低门槛、自然游戏和餐饮承接。"
  },
  {
    id: "topic-2",
    title: "长城脚下喝一杯不加糖的山风咖啡",
    source: "运营想法",
    platform: "抖音",
    audience: "年轻情侣",
    goal: "品牌曝光",
    hotId: "hot-2",
    materialIds: ["mat-1", "mat-7"],
    priority: "中",
    status: "待评估",
    plan: "06-20",
    notes: "适合 15 秒氛围短视频。"
  },
  {
    id: "topic-3",
    title: "住进山谷私汤，把紧绷的一周慢慢放下",
    source: "活动计划",
    platform: "小红书",
    audience: "城市白领",
    goal: "住宿转化",
    hotId: "hot-3",
    materialIds: ["mat-1", "mat-4"],
    priority: "高",
    status: "已生成",
    plan: "06-21",
    notes: "需要确认房态与汤泉权益。"
  }
];

const initialDrafts = [
  {
    id: "draft-1",
    topicId: "topic-3",
    platform: "小红书",
    title: "北京周边的山谷私汤，把一周的紧绷慢慢放下",
    body:
      "如果最近总觉得需要一个安静的夜晚，可以把周末交给璞之谷。\n\n这里在黄花城水长城脚下，山风、树影和汤泉把节奏慢慢放低。璞墅汤泉疗愈民宿适合想要私密休息的人，山景院落、私汤和夜晚的安静感，会让一次短住更像一次身心归位。\n\n发布前建议补充：当日房态、汤泉开放安排与预订方式。",
    hashtags: ["北京周边游", "山谷民宿", "私汤民宿", "璞之谷", "水长城"],
    imageSuggestions: ["首图使用森林晨雾或院落私汤", "第二张展示房间与窗外山景", "结尾放交通与预约信息"],
    status: "草稿",
    updatedAt: "今天 08:42"
  }
];

const state = {
  loggedIn: false,
  authChecking: true,
  loginError: "",
  route: "dashboard",
  hotFilter: "全部",
  viralLink: "https://www.xiaohongshu.com/explore/mock-puzhigu-family-lawn",
  analyzing: false,
  materialFilter: "全部",
  selectedHotspotId: "hot-1",
  selectedTopicId: "topic-1",
  selectedDraftId: "draft-1",
  hotPanel: false,
  materialPanel: false,
  topicPanel: false,
  outputTab: "titles",
  generator: {
    topicId: "topic-1",
    platform: "小红书",
    style: "自然种草",
    wordCount: "700",
    emphasize: "中心草坪、树屋、山野餐饮、轻松亲子周末",
    avoid: "不要编造门票价格、不要承诺人少、不要直接搬运爆款原文或原图",
    materialIds: ["mat-1", "mat-2", "mat-7"]
  },
  generating: false,
  generatedDraft: null,
  topics: [...initialTopics],
  materials: [...mockMaterials],
  hotspots: [...mockHotspots],
  drafts: [...initialDrafts],
  toast: ""
};

function getHotspot(id) {
  return state.hotspots.find((item) => item.id === id);
}

function getMaterial(id) {
  return state.materials.find((item) => item.id === id);
}

function getTopic(id) {
  return state.topics.find((item) => item.id === id);
}

function getDraft(id) {
  return state.drafts.find((item) => item.id === id);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function tagsHtml(tags = []) {
  return tags.map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`).join("");
}

function setToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(setToast.timer);
  setToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function render() {
  if (state.authChecking) {
    app.innerHTML = `
      <main class="login-screen">
        <section class="login-visual">
          <div class="login-copy">
            <span class="badge dark">景区 AI 内容生产工作台</span>
            <h1>正在进入璞之谷内容工作台</h1>
            <p>正在确认内部账号会话。</p>
          </div>
        </section>
      </main>
    `;
    return;
  }
  app.innerHTML = state.loggedIn ? renderShell() : renderLogin();
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "请求失败");
  }
  return data;
}

async function checkSession() {
  try {
    const data = await requestJson("/api/auth/me");
    state.loggedIn = Boolean(data.authenticated);
  } catch {
    state.loggedIn = false;
  } finally {
    state.authChecking = false;
    render();
  }
}

async function login() {
  const account = document.querySelector("#account")?.value.trim();
  const password = document.querySelector("#password")?.value || "";

  state.loginError = "";
  render();

  try {
    await requestJson("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ account, password })
    });
    state.loggedIn = true;
    state.loginError = "";
    render();
  } catch (error) {
    state.loggedIn = false;
    state.loginError = error.message || "登录失败";
    render();
  }
}

async function logout() {
  await requestJson("/api/auth/logout", { method: "POST" }).catch(() => {});
  state.loggedIn = false;
  render();
}

function renderLogin() {
  return `
    <main class="login-screen">
      <section class="login-visual">
        <div class="login-copy">
          <span class="badge dark">景区 AI 内容生产工作台</span>
          <h1>粘贴爆款链接，生成璞之谷原创方案</h1>
          <p>面向景区运营人员的轻量原型：拆解爆款结构与视觉风格，再结合本景区特色生成原创宣传文案和配图方案。</p>
        </div>
      </section>
      <section class="login-panel">
        <div class="login-box">
          <div class="brand-lockup">
            <div class="brand-mark">璞</div>
            <div>
              <strong>璞之谷</strong>
              <span>AI Content Studio Prototype</span>
            </div>
          </div>
          <div class="field">
            <label for="account">内部账号</label>
            <input class="input" id="account" value="operation@puzhigu" />
          </div>
          <div class="field">
            <label for="password">密码</label>
            <input class="input" id="password" type="password" value="prototype" />
          </div>
          ${state.loginError ? `<p style="margin: 0 0 12px; color: #9f2a1d; font-size: 13px;">${escapeHtml(state.loginError)}</p>` : ""}
          <button class="btn primary" data-action="login" style="width: 100%">进入工作台</button>
          <p style="margin: 16px 0 0; color: var(--muted); font-size: 12px; line-height: 1.6;">当前为前端 Prototype：链接解析、爆款拆解和原创生成均为本地模拟。</p>
        </div>
      </section>
    </main>
  `;
}

function renderShell() {
  const route = routes.find((item) => item.id === state.route);
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-mark">璞</div>
          <div>
            <strong>璞之谷</strong>
            <span>AI 内容生产台</span>
          </div>
        </div>
        <nav class="nav">
          ${routes
            .map(
              (item) => `
                <button class="nav-btn ${state.route === item.id ? "active" : ""}" data-route="${item.id}">
                  <span>${item.label}</span>
                  <span>${state.route === item.id ? "·" : ""}</span>
                </button>
              `
            )
            .join("")}
        </nav>
        <div class="sidebar-note">
          <strong>V1 边界</strong>
          <p>只模拟爆款链接解析、结构拆解和原创生成；不自动发布、不接真实平台、不接真实模型。</p>
        </div>
      </aside>
      <main class="main">
        <div class="topbar">
          <div>
            <h2>${route?.label ?? "工作台"}</h2>
            <p>${routeDescription(state.route)}</p>
          </div>
          <div class="top-actions">
            <span class="mock-pill">Prototype / Mock Data</span>
            <button class="btn ghost" data-action="logout">退出</button>
          </div>
        </div>
        ${renderRoute()}
      </main>
      ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
    </div>
  `;
}

function routeDescription(route) {
  const map = {
    dashboard: "粘贴爆款链接，查看结构、视觉风格和景区映射。",
    materials: "维护璞之谷自己的事实素材、业态卖点和品牌语气。",
    generator: "基于爆款拆解和景区素材生成原创内容方案。",
    drafts: "保存、编辑、复制和标记最终稿。"
  };
  return map[route] || "";
}

function renderRoute() {
  const map = {
    dashboard: renderDashboard,
    hotspots: renderHotspots,
    materials: renderMaterials,
    topics: renderTopics,
    generator: renderGenerator,
    drafts: renderDrafts,
    settings: renderSettings
  };
  return (map[state.route] || renderDashboard)();
}

function renderDashboard() {
  const selectedHot = getHotspot(state.selectedHotspotId) || state.hotspots[0];
  return `
    <section class="link-hero">
      <div class="link-hero-copy">
        <span class="badge dark">爆款链接解析</span>
        <h1>粘贴小红书 / 抖音爆款链接，生成璞之谷原创内容方向</h1>
        <p>系统会模拟拆解标题公式、内容节奏、情绪钩子和视觉风格，再映射到璞之谷真实素材。</p>
      </div>
      <div class="link-composer">
        <label for="viral-link">爆款内容链接</label>
        <div class="url-input-row">
          <input class="input" id="viral-link" data-field="viralLink" value="${escapeHtml(state.viralLink)}" />
          <button class="btn primary" data-action="analyze-link">${state.analyzing ? "解析中..." : "解析爆款链接"}</button>
        </div>
        <div class="item-meta" style="margin-top: 10px;">
          <span class="badge">${escapeHtml(selectedHot.platform)}</span>
          <span>${escapeHtml(selectedHot.parseStatus || "解析成功")}</span>
          <span>${escapeHtml(selectedHot.metrics)}</span>
        </div>
      </div>
    </section>

    <section class="process-steps">
      ${renderProcessStep("1", "解析爆款", "识别平台、标题、互动数据和内容摘要")}
      ${renderProcessStep("2", "拆解方法", "提取 Hook、结构、情绪和视觉风格")}
      ${renderProcessStep("3", "映射景区", "匹配璞之谷素材与可拍摄场景")}
      ${renderProcessStep("4", "原创生成", "产出标题、正文、配图方案和分镜")}
    </section>

    <section class="section analysis-layout">
      <div class="panel pad reference-panel">
        <div class="section-head">
          <div>
            <h3>当前爆款参考</h3>
            <p>${escapeHtml(selectedHot.sourceUrl || state.viralLink)}</p>
          </div>
          <button class="btn secondary" data-action="use-reference">用它生成原创方案</button>
        </div>
        <img class="detail-image" src="${selectedHot.image}" alt="${escapeHtml(selectedHot.title)}" />
        <h4>${escapeHtml(selectedHot.title)}</h4>
        <p>${escapeHtml(selectedHot.summary)}</p>
      </div>
      <div class="analysis-grid">
        ${renderInsightCard("爆款结构", selectedHot.analysis.hook, selectedHot.analysis.structure)}
        ${renderInsightCard("视觉风格", selectedHot.visualStyle, "只借鉴构图、节奏和图文顺序，不使用原作者素材。")}
        ${renderInsightCard("璞之谷映射", selectedHot.analysis.adapt, selectedHot.analysis.originality)}
        ${renderInsightCard("发布边界", selectedHot.analysis.risk, "AI 初稿发布前必须确认事实、活动、价格和版权风险。")}
      </div>
    </section>

    <section class="section compact-grid">
      <div class="panel pad">
        <div class="section-head">
          <div>
            <h3>最近爆款样本</h3>
            <p>点击切换参考内容</p>
          </div>
        </div>
        <div class="list compact-list">
          ${state.hotspots.slice(0, 4).map(renderHotspotListItem).join("")}
        </div>
      </div>
      <div class="panel pad">
        <div class="section-head">
          <div>
            <h3>最近成稿</h3>
            <p>生成后会沉淀在这里</p>
          </div>
          <button class="btn small" data-route="drafts">查看</button>
        </div>
        ${state.drafts.slice(0, 2).map(renderDraftPreview).join("")}
      </div>
    </section>
  `;
}

function renderProcessStep(num, title, body) {
  return `
    <div class="step-card">
      <span>${num}</span>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(body)}</p>
    </div>
  `;
}

function renderInsightCard(title, primary, secondary) {
  return `
    <article class="insight-card">
      <span class="badge">${escapeHtml(title)}</span>
      <strong>${escapeHtml(primary)}</strong>
      <p>${escapeHtml(secondary)}</p>
    </article>
  `;
}

function renderMiniStat(label, value, hint) {
  return `
    <div class="panel pad">
      <p>${escapeHtml(label)}</p>
      <div class="metric-row" style="margin-top: 8px;"><strong>${value}</strong><span>${escapeHtml(hint)}</span></div>
    </div>
  `;
}

function renderHotspots() {
  const filtered = state.hotspots.filter((item) => {
    if (state.hotFilter === "全部") return true;
    if (state.hotFilter === "高适配") return item.fit === "高";
    return item.platform === state.hotFilter || item.tags.includes(state.hotFilter);
  });
  const selected = getHotspot(state.selectedHotspotId) || filtered[0] || state.hotspots[0];
  return `
    <div class="section-head">
      <div class="filters">
        ${hotspotFilters
          .map(
            (filter) => `<button class="chip ${state.hotFilter === filter ? "active" : ""}" data-action="hot-filter" data-value="${filter}">${filter}</button>`
          )
          .join("")}
      </div>
      <div class="row-actions">
        <button class="btn" data-action="toggle-hot-panel">${state.hotPanel ? "收起录入" : "录入爆款样本"}</button>
        <button class="btn secondary" data-action="import-demo">导入表格样例</button>
      </div>
    </div>
    ${state.hotPanel ? renderHotspotForm() : ""}
    <section class="split">
      <div class="panel pad">
        <div class="section-head">
          <div>
            <h3>爆款样本</h3>
            <p>${filtered.length} 条 mock 样本</p>
          </div>
        </div>
        <div class="list">
          ${filtered.map(renderHotspotListItem).join("")}
        </div>
      </div>
      <aside class="panel pad detail">
        ${selected ? renderHotspotDetail(selected) : renderEmpty("还没有可查看的爆款样本", "请先粘贴或录入一条爆款链接。")}
      </aside>
    </section>
  `;
}

function renderHotspotListItem(item) {
  return `
    <div class="list-item clickable ${state.selectedHotspotId === item.id ? "selected" : ""}" data-hot="${item.id}">
      <div>
        <div class="item-title" style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <span>${escapeHtml(item.title)}</span>
          <button class="btn small" data-action="delete-hotspot" data-hot="${item.id}">删除</button>
        </div>
        <div class="item-meta">
          <span>${escapeHtml(item.platform)}</span>
          <span>${escapeHtml(item.time)}</span>
          <span>${escapeHtml(item.metrics)}</span>
          <span class="badge ${item.fit === "高" ? "gold" : ""}">${item.fit}适配</span>
          <span class="badge">${item.tags[0]}</span>
        </div>
      </div>
    </div>
  `;
}

function renderHotspotDetail(item) {
  return `
    <img class="detail-image" src="${item.image}" alt="${escapeHtml(item.title)}" />
    <div class="item-meta">${tagsHtml(item.tags)}</div>
    <h3 style="margin: 12px 0 8px;">${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.summary)}</p>
    <div class="analysis-list">
      <div class="analysis-item"><strong>标题 / Hook</strong><span>${escapeHtml(item.analysis.hook)}</span></div>
      <div class="analysis-item"><strong>内容结构</strong><span>${escapeHtml(item.analysis.structure)}</span></div>
      <div class="analysis-item"><strong>情绪价值</strong><span>${escapeHtml(item.analysis.emotion)}</span></div>
      <div class="analysis-item"><strong>璞之谷适配</strong><span>${escapeHtml(item.analysis.adapt)}</span></div>
      <div class="analysis-item"><strong>避免风险</strong><span>${escapeHtml(item.analysis.risk)}</span></div>
    </div>
    <div class="row-actions" style="margin-top: 16px;">
      <button class="btn primary" data-action="make-topic" data-hot="${item.id}">生成原创方案</button>
      <button class="btn" data-action="delete-hotspot" data-hot="${item.id}">删除样本</button>
      <button class="btn secondary" data-route="generator">进入生成</button>
    </div>
  `;
}

function renderHotspotForm() {
  return `
    <div class="drawer">
      <div class="form-grid">
        <div class="field">
          <label>标题</label>
          <input class="input" id="new-hot-title" value="端午后错峰进山，长城脚下的一天慢下来" />
        </div>
        <div class="field">
          <label>平台</label>
          <select class="select" id="new-hot-platform">
            ${platformOptions.map((item) => `<option>${item}</option>`).join("")}
          </select>
        </div>
        <div class="field wide">
          <label>内容摘要</label>
          <textarea class="textarea" id="new-hot-summary">运营手动补充的爆款摘要：错峰、自然、长城脚下、轻度假。</textarea>
        </div>
      </div>
      <div class="row-actions">
        <button class="btn primary" data-action="add-hotspot">保存样本</button>
        <button class="btn ghost" data-action="toggle-hot-panel">取消</button>
      </div>
    </div>
  `;
}

function renderMaterials() {
  const filtered = state.materials.filter((item) => state.materialFilter === "全部" || item.type === state.materialFilter);
  return `
    <div class="section-head">
      <div class="filters">
        ${materialTypes
          .map(
            (type) => `<button class="chip ${state.materialFilter === type ? "active" : ""}" data-action="material-filter" data-value="${type}">${type}</button>`
          )
          .join("")}
      </div>
      <button class="btn" data-action="toggle-material-panel">${state.materialPanel ? "收起新增" : "新增素材"}</button>
    </div>
    ${state.materialPanel ? renderMaterialForm() : ""}
    <section class="grid cols-3">
      ${filtered.map(renderMaterialCard).join("")}
    </section>
  `;
}

function renderMaterialCard(item) {
  const selected = state.generator.materialIds.includes(item.id);
  return `
    <article class="card ${selected ? "selected" : ""}">
      <img class="thumb" src="${item.image}" alt="${escapeHtml(item.title)}" />
      <div class="card-body">
        <div class="item-meta">
          <span class="badge ${item.recommended ? "gold" : ""}">${item.type}</span>
          ${item.recommended ? `<span class="badge">推荐引用</span>` : ""}
        </div>
        <h4 style="margin-top: 10px;">${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.content)}</p>
        <div class="item-meta" style="margin-top: 12px;">${tagsHtml(item.tags)}</div>
        <div class="row-actions" style="margin-top: 14px;">
          <button class="btn small ${selected ? "secondary" : ""}" data-action="toggle-material" data-material="${item.id}">
            ${selected ? "已加入生成" : "加入生成"}
          </button>
          <button class="btn small" data-action="delete-material" data-material="${item.id}">删除</button>
        </div>
      </div>
    </article>
  `;
}

function renderMaterialForm() {
  return `
    <div class="drawer">
      <div class="form-grid">
        <div class="field">
          <label>素材名称</label>
          <input class="input" id="new-mat-title" value="夏季山谷夜游活动" />
        </div>
        <div class="field">
          <label>类型</label>
          <select class="select" id="new-mat-type">
            ${materialTypes.filter((item) => item !== "全部").map((item) => `<option>${item}</option>`).join("")}
          </select>
        </div>
        <div class="field wide">
          <label>素材描述</label>
          <textarea class="textarea" id="new-mat-content">适合暑期夜游、亲子自然观察和轻研学内容，发布前需确认开放时间。</textarea>
        </div>
      </div>
      <div class="row-actions">
        <button class="btn primary" data-action="add-material">保存素材</button>
        <button class="btn ghost" data-action="toggle-material-panel">取消</button>
      </div>
    </div>
  `;
}

function renderTopics() {
  return `
    <div class="section-head">
      <div>
        <h3>选题状态</h3>
        <p>从爆款拆解、运营想法或已有成稿沉淀下一次创作</p>
      </div>
      <button class="btn" data-action="toggle-topic-panel">${state.topicPanel ? "收起创建" : "创建选题"}</button>
    </div>
    ${state.topicPanel ? renderTopicForm() : ""}
    <section class="status-board">
      ${topicStatuses
        .map((status) => {
          const items = state.topics.filter((topic) => topic.status === status);
          return `
            <div class="status-lane">
              <div class="lane-head"><strong>${status}</strong><span class="badge">${items.length}</span></div>
              ${items.map(renderTopicCard).join("") || `<p style="font-size: 13px;">暂无选题</p>`}
            </div>
          `;
        })
        .join("")}
    </section>
    ${renderTopicDetail()}
  `;
}

function renderTopicCard(topic) {
  return `
    <article class="topic-card ${state.selectedTopicId === topic.id ? "selected" : ""}" data-topic="${topic.id}">
      <strong>${escapeHtml(topic.title)}</strong>
      <div class="item-meta">
        <span>${escapeHtml(topic.platform)}</span>
        <span>${escapeHtml(topic.audience)}</span>
        <span class="badge ${topic.priority === "高" ? "gold" : ""}">${escapeHtml(topic.priority)}</span>
      </div>
      <p>${escapeHtml(topic.notes)}</p>
    </article>
  `;
}

function renderTopicDetail() {
  const topic = getTopic(state.selectedTopicId);
  if (!topic) return "";
  const hot = getHotspot(topic.hotId);
  const materials = topic.materialIds.map(getMaterial).filter(Boolean);
  return `
    <section class="section panel pad">
      <div class="section-head">
        <div>
          <h3>${escapeHtml(topic.title)}</h3>
          <p>${escapeHtml(topic.source)} · ${escapeHtml(topic.goal)} · 计划 ${escapeHtml(topic.plan)}</p>
        </div>
        <div class="row-actions">
          <button class="btn secondary" data-action="prepare-generator" data-topic="${topic.id}">进入原创生成</button>
          <button class="btn" data-action="advance-topic" data-topic="${topic.id}">推进状态</button>
        </div>
      </div>
      <div class="grid cols-3">
        <div>
          <h4>目标平台</h4>
          <p>${escapeHtml(topic.platform)}</p>
        </div>
        <div>
          <h4>目标人群</h4>
          <p>${escapeHtml(topic.audience)}</p>
        </div>
        <div>
          <h4>优先级</h4>
          <p>${escapeHtml(topic.priority)}</p>
        </div>
      </div>
      <div class="section grid cols-2">
        <div>
          <h4>关联爆款</h4>
          <p>${hot ? escapeHtml(hot.title) : "无"}</p>
        </div>
        <div>
          <h4>引用素材</h4>
          <p>${materials.map((item) => item.title).join("、") || "未选择"}</p>
        </div>
      </div>
    </section>
  `;
}

function renderTopicForm() {
  return `
    <div class="drawer">
      <div class="form-grid">
        <div class="field wide">
          <label>选题标题</label>
          <input class="input" id="new-topic-title" value="端午后错峰进山，给自己一个不赶路的山谷下午" />
        </div>
        <div class="field">
          <label>目标平台</label>
          <select class="select" id="new-topic-platform">
            ${platformOptions.map((item) => `<option>${item}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>目标人群</label>
          <input class="input" id="new-topic-audience" value="北京周边自驾游客" />
        </div>
      </div>
      <div class="row-actions">
        <button class="btn primary" data-action="add-topic">保存选题</button>
        <button class="btn ghost" data-action="toggle-topic-panel">取消</button>
      </div>
    </div>
  `;
}

function renderGenerator() {
  const topic = getTopic(state.generator.topicId) || state.topics[0];
  const selectedHot = getHotspot(topic?.hotId) || getHotspot(state.selectedHotspotId) || state.hotspots[0];
  if (topic && state.generator.topicId !== topic.id) state.generator.topicId = topic.id;
  return `
    <section class="generator-layout">
      <div class="panel pad">
        <div class="section-head">
          <div>
            <h3>原创生成输入</h3>
            <p>基于当前爆款拆解和璞之谷素材生成</p>
          </div>
        </div>
        <div class="control-stack">
          <div class="reference-summary">
            <span class="badge gold">参考爆款</span>
            <strong>${escapeHtml(selectedHot.title)}</strong>
            <p>${escapeHtml(selectedHot.analysis.hook)}</p>
          </div>
          <div class="field">
            <label>原创方向</label>
            <select class="select" data-gen-field="topicId">
              ${state.topics.map((item) => `<option value="${item.id}" ${state.generator.topicId === item.id ? "selected" : ""}>${escapeHtml(item.title)}</option>`).join("")}
            </select>
          </div>
          <div class="form-grid">
            <div class="field">
              <label>平台</label>
              <select class="select" data-gen-field="platform">
                ${platformOptions.map((item) => `<option ${state.generator.platform === item ? "selected" : ""}>${item}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label>风格</label>
              <select class="select" data-gen-field="style">
                ${styleOptions.map((item) => `<option ${state.generator.style === item ? "selected" : ""}>${item}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label>需要强调的景区特色</label>
            <textarea class="textarea" data-gen-field="emphasize">${escapeHtml(state.generator.emphasize)}</textarea>
          </div>
          <div class="field">
            <label>原创边界 / 风险约束</label>
            <textarea class="textarea" data-gen-field="avoid">${escapeHtml(state.generator.avoid)}</textarea>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 800;">引用素材</label>
            <div class="list">
              ${state.materials
                .map(
                  (item) => `
                    <label class="material-check">
                      <input type="checkbox" data-action="check-material" data-material="${item.id}" ${state.generator.materialIds.includes(item.id) ? "checked" : ""} />
                      <span>
                        <strong>${escapeHtml(item.title)}</strong>
                        <span style="display: block; margin-top: 4px; color: var(--muted); font-size: 12px;">${escapeHtml(item.type)} · ${item.tags.join(" / ")}</span>
                      </span>
                    </label>
                  `
                )
                .join("")}
            </div>
          </div>
          <button class="btn primary" data-action="generate" ${state.generating ? "disabled" : ""}>
            ${state.generating ? "生成中..." : "生成原创内容方案"}
          </button>
        </div>
      </div>
      <div class="panel pad output">
        ${state.generatedDraft ? renderGeneratedOutput() : renderEmpty("等待生成", "确认参考爆款、平台和素材后，点击生成原创内容方案。")}
      </div>
    </section>
  `;
}

function renderGeneratedOutput() {
  const draft = state.generatedDraft;
  return `
    <div class="section-head">
      <div>
        <h3>${escapeHtml(draft.topicTitle)}</h3>
        <p>${escapeHtml(draft.platform)} · ${escapeHtml(draft.style)} · 原创初稿，发布前需人工确认</p>
      </div>
      <div class="row-actions">
        <button class="btn secondary" data-action="save-draft">保存成稿</button>
        <button class="btn" data-action="copy-draft">复制正文</button>
      </div>
    </div>
    <div class="copy-line">
      <span>引用素材：${draft.materials.map((item) => item.title).join("、")}</span>
      <span class="badge gold">Mock Original Output</span>
    </div>
    <div class="tabs">
      ${[
        ["titles", "标题"],
        ["body", "正文"],
        ["visual", "配图方案"],
        ["video", "分镜"],
        ["originality", "原创说明"]
      ]
        .map((tab) => `<button class="tab ${state.outputTab === tab[0] ? "active" : ""}" data-action="tab" data-value="${tab[0]}">${tab[1]}</button>`)
        .join("")}
    </div>
    ${renderOutputTab(draft)}
    <div class="risk">${escapeHtml(draft.risk)}</div>
  `;
}

function renderOutputTab(draft) {
  if (state.outputTab === "titles") {
    return `
      <div class="title-list">
        ${draft.titles.map((title) => `<div class="title-option">${escapeHtml(title)}</div>`).join("")}
      </div>
      <div class="row-actions" style="margin-top: 14px;">
        <button class="btn small" data-action="reroll-title">重新生成标题</button>
      </div>
    `;
  }
  if (state.outputTab === "visual") {
    return `
      <div class="suggestion-grid">
        ${draft.images.map((item) => `<div class="card"><div class="card-body"><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.desc)}</p></div></div>`).join("")}
      </div>
    `;
  }
  if (state.outputTab === "video") {
    return `
      <div class="list">
        ${draft.video.map((item) => `<div class="analysis-item"><strong>${escapeHtml(item.scene)}</strong><span>${escapeHtml(item.desc)}</span></div>`).join("")}
      </div>
    `;
  }
  if (state.outputTab === "originality") {
    return `
      <div class="analysis-list">
        <div class="analysis-item"><strong>借鉴了什么</strong><span>${escapeHtml(draft.referenceMethod)}</span></div>
        <div class="analysis-item"><strong>原创在哪里</strong><span>${escapeHtml(draft.originality)}</span></div>
        <div class="analysis-item"><strong>不能直接使用</strong><span>不得复制原爆款的原文、独特句式、作者图片或视频画面；配图应使用璞之谷自有素材或重新拍摄。</span></div>
      </div>
    `;
  }
  return `<div class="draft-body">${escapeHtml(draft.body)}</div><div class="item-meta" style="margin-top: 14px;">${tagsHtml(draft.hashtags)}</div>`;
}

function renderDrafts() {
  const selected = getDraft(state.selectedDraftId) || state.drafts[0];
  return `
    <section class="split">
      <div class="panel pad">
        <div class="section-head">
          <div>
            <h3>成稿列表</h3>
            <p>${state.drafts.length} 条本地 mock 成稿</p>
          </div>
        </div>
        <div class="list">
          ${state.drafts.map(renderDraftListItem).join("") || renderEmpty("暂无成稿", "请先到原创生成页保存一版初稿。")}
        </div>
      </div>
      <aside class="panel pad detail">
        ${selected ? renderDraftEditor(selected) : renderEmpty("暂无可编辑成稿", "保存初稿后会出现在这里。")}
      </aside>
    </section>
  `;
}

function renderDraftPreview(draft) {
  return `
    <article class="card" style="margin-bottom: 12px;">
      <div class="card-body">
        <div class="item-meta"><span class="badge">${escapeHtml(draft.platform)}</span><span>${escapeHtml(draft.updatedAt)}</span></div>
        <h4 style="margin-top: 10px;">${escapeHtml(draft.title)}</h4>
        <p>${escapeHtml(draft.body.slice(0, 88))}...</p>
      </div>
    </article>
  `;
}

function renderDraftListItem(draft) {
  return `
    <div class="list-item clickable ${state.selectedDraftId === draft.id ? "selected" : ""}" data-draft="${draft.id}">
      <div>
        <div class="item-title">${escapeHtml(draft.title)}</div>
        <div class="item-meta">
          <span>${escapeHtml(draft.platform)}</span>
          <span>${escapeHtml(draft.updatedAt)}</span>
          <span class="badge">${escapeHtml(draft.status)}</span>
        </div>
      </div>
      <div class="row-actions">
        <button class="btn small" data-action="copy-selected-draft" data-draft="${draft.id}">复制</button>
        <button class="btn small" data-action="delete-draft" data-draft="${draft.id}">删除</button>
      </div>
    </div>
  `;
}

function renderDraftEditor(draft) {
  return `
    <div class="section-head">
      <div>
        <h3>编辑成稿</h3>
        <p>${escapeHtml(draft.platform)} · ${escapeHtml(draft.status)}</p>
      </div>
      <div class="row-actions">
        <button class="btn secondary" data-action="mark-published" data-draft="${draft.id}">标记已发布</button>
        <button class="btn" data-action="copy-selected-draft" data-draft="${draft.id}">复制全文</button>
        <button class="btn" data-action="delete-draft" data-draft="${draft.id}">删除成稿</button>
      </div>
    </div>
    <div class="field">
      <label>标题</label>
      <input class="input" data-draft-field="title" data-draft-id="${draft.id}" value="${escapeHtml(draft.title)}" />
    </div>
    <div class="field">
      <label>正文</label>
      <textarea class="textarea" style="min-height: 260px;" data-draft-field="body" data-draft-id="${draft.id}">${escapeHtml(draft.body)}</textarea>
    </div>
    <div class="field">
      <label>话题标签</label>
      <input class="input" data-draft-field="hashtags" data-draft-id="${draft.id}" value="${escapeHtml(draft.hashtags.join("，"))}" />
    </div>
    <div class="field">
      <label>配图方案</label>
      <textarea class="textarea" data-draft-field="imageSuggestions" data-draft-id="${draft.id}">${escapeHtml(draft.imageSuggestions.join("\n"))}</textarea>
    </div>
  `;
}

function renderSettings() {
  return `
    <section class="panel pad">
      <div class="settings-row">
        <div>
          <h4>品牌语气</h4>
          <p>用于生成时约束文案气质</p>
        </div>
        <textarea class="textarea">本真、自然、温暖、安静、有东方山水意境；避免过度营销和夸张承诺。</textarea>
      </div>
      <div class="settings-row">
        <div>
          <h4>禁用表达</h4>
          <p>发布前仍需人工确认</p>
        </div>
        <textarea class="textarea">全网第一、绝对最好、永久免费、保证人少、必打卡、官方未确认价格与开放时间。</textarea>
      </div>
      <div class="settings-row">
        <div>
          <h4>模型配置</h4>
          <p>Prototype 中不调用真实接口</p>
        </div>
        <div class="grid cols-2">
          <div class="field">
            <label>供应商</label>
            <input class="input" value="Mock LLM Provider" />
          </div>
          <div class="field">
            <label>默认模型</label>
            <input class="input" value="mock-copywriter-v1" />
          </div>
          <div class="field wide">
            <label>API Key</label>
            <input class="input" value="未接入真实密钥" />
          </div>
        </div>
      </div>
      <div class="settings-row">
        <div>
          <h4>素材源</h4>
          <p>未来可替换为后台接口</p>
        </div>
        <div class="image-band">
          <img src="./assets/central-lawn.png" alt="中心草坪" />
          <div class="stacked">
            <img src="./assets/insect-museum.png" alt="虫博馆" />
            <img src="./assets/mountain-table.png" alt="山野餐饮" />
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderEmpty(title, body) {
  return `
    <div class="empty-state">
      <div>
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(body)}</span>
      </div>
    </div>
  `;
}

function makeTopicFromHotspot(hotId) {
  const hot = getHotspot(hotId);
  if (!hot) return;
  const topic = {
    id: `topic-${Date.now()}`,
    title: hot.title.replace("北京周边 1.5h，", "").replace("，风一吹就像进了电影", ""),
    source: "爆款解析转化",
    platform: hot.platform,
    audience: hot.tags.includes("亲子") ? "亲子家庭" : hot.tags.includes("民宿") ? "城市白领" : "周边自驾游客",
    goal: hot.tags.includes("民宿") ? "住宿转化" : "内容种草",
    hotId: hot.id,
    materialIds: Array.from(
      new Set(["mat-1", ...state.materials.filter((item) => item.recommended).slice(0, 2).map((item) => item.id)])
    ),
    priority: hot.fit === "高" ? "高" : "中",
    status: "待创作",
    plan: "06-22",
    notes: hot.analysis.adapt
  };
  state.topics.unshift(topic);
  state.selectedTopicId = topic.id;
  state.generator.topicId = topic.id;
  state.generator.platform = topic.platform;
  state.generator.materialIds = topic.materialIds;
  state.generator.emphasize = topic.notes;
  state.route = "generator";
  state.generatedDraft = null;
  setToast("已带入原创生成");
}

function prepareGenerator(topicId) {
  const topic = getTopic(topicId);
  if (!topic) return;
  state.selectedTopicId = topic.id;
  state.generator.topicId = topic.id;
  state.generator.platform = topic.platform;
  state.generator.materialIds = [...topic.materialIds];
  state.generator.emphasize = topic.notes;
  state.route = "generator";
  state.generatedDraft = null;
  render();
}

function buildGeneratedDraft() {
  const topic = getTopic(state.generator.topicId) || state.topics[0];
  const hot = getHotspot(topic?.hotId) || getHotspot(state.selectedHotspotId) || state.hotspots[0];
  const materials = state.generator.materialIds.map(getMaterial).filter(Boolean);
  const materialNames = materials.map((item) => item.title);
  const platform = state.generator.platform;
  const style = state.generator.style;
  const mainScene = materialNames[1] || materialNames[0] || "璞之谷山谷场景";
  return {
    topicId: topic.id,
    topicTitle: topic.title,
    platform,
    style,
    materials,
    titles: [
      `北京周边的山谷周末，把身体还给自然`,
      `藏在水长城脚下的${mainScene}，适合慢下来的一天`,
      `不赶路的周末，就去璞之谷听山风`,
      `带上家人进山，把一整天交给草木和长城`,
      `这不是普通周边游，是一次山谷里的归心`
    ],
    body:
      `如果想找一个离城市不远、但能让节奏真正慢下来的地方，可以把这次选题放在璞之谷。\n\n` +
      `它在北京怀柔黄花城水长城景区旁，山谷、栗林、溪流和远山构成了天然的度假背景。围绕“${topic.title}”，内容可以先从一个具体感受切入：风从山谷里吹过来，孩子在草坪上奔跑，大人终于不用赶行程。\n\n` +
      `这次建议重点引用：${materialNames.join("、") || "品牌基础素材"}。\n\n` +
      `文案结构可以是：借鉴参考爆款里的情绪入口和内容节奏，再用璞之谷自己的真实场景承接，例如中心草坪、树屋、山野餐饮、院士建筑或汤泉疗愈。最后用收藏、预约或周末出行提醒作为 CTA。\n\n` +
      `发布前请人工确认开放时间、价格、活动安排和具体服务权益。`,
    hashtags:
      platform === "抖音"
        ? ["北京周边游", "水长城", "周末去哪儿", "山谷度假", "璞之谷"]
        : ["北京周边游", "小红书旅行", "亲子周末", "森林疗愈", "水长城", "璞之谷"],
    images: [
      { title: "首图 / 封面", desc: "使用晨雾森林或长城远山图，保留大面积留白，标题控制在 12 字以内。" },
      { title: "场景图", desc: "补充中心草坪、树屋或餐饮照片，让用户看到可到达、可体验的具体空间。" },
      { title: "细节图", desc: "拍摄手部、餐桌、树影、路牌、咖啡杯等细节，增强山谷生活感。" },
      { title: "信息图", desc: "最后一张放交通、适合人群、建议停留时长和发布前确认后的活动信息。" }
    ],
    video: [
      { scene: "0-3 秒", desc: "远山、长城或森林光影开场，字幕直接抛出周末逃离感。" },
      { scene: "3-8 秒", desc: "切换草坪、树屋、咖啡或汤泉等核心场景，镜头保持慢节奏。" },
      { scene: "8-15 秒", desc: "用人物背影、亲子互动或餐桌烟火气收束，最后给出收藏提醒。" }
    ],
    referenceMethod: `${hot.platform} 参考样本提供了“${hot.analysis.hook}”的入口，以及“${hot.analysis.structure}”的内容节奏。`,
    originality: `${hot.analysis.originality || "生成内容围绕璞之谷真实场景重新组织，不复制参考内容原文。"} 配图方案全部指向璞之谷自有素材或重新拍摄。`,
    risk:
      `AI 初稿仅基于前端 mock 素材生成。涉及门票、开放时间、活动排期、房态、价格和平台敏感表达，需要运营人员发布前确认。`
  };
}

function analyzeViralLink() {
  const value = document.querySelector("#viral-link")?.value?.trim() || state.viralLink;
  state.viralLink = value;
  state.analyzing = true;
  render();
  window.setTimeout(() => {
    const lower = value.toLowerCase();
    let matched = state.hotspots[0];
    if (lower.includes("douyin") || lower.includes("iesdouyin")) {
      matched = state.hotspots.find((item) => item.platform === "抖音") || matched;
    } else if (lower.includes("spring") || lower.includes("hotel") || lower.includes("民宿")) {
      matched = state.hotspots.find((item) => item.tags.includes("民宿")) || matched;
    } else if (lower.includes("walk") || lower.includes("trail") || lower.includes("徒步")) {
      matched = state.hotspots.find((item) => item.tags.includes("徒步")) || matched;
    }
    matched.sourceUrl = value;
    matched.parseStatus = lower.includes("private") ? "需人工补充" : "解析成功";
    state.selectedHotspotId = matched.id;
    state.analyzing = false;
    render();
    setToast("已完成 mock 解析");
  }, 650);
}

function saveGeneratedDraft() {
  const generated = state.generatedDraft;
  if (!generated) return;
  const draft = {
    id: `draft-${Date.now()}`,
    topicId: generated.topicId,
    platform: generated.platform,
    title: generated.titles[0],
    body: generated.body,
    hashtags: generated.hashtags,
    imageSuggestions: generated.images.map((item) => `${item.title}：${item.desc}`),
    status: "草稿",
    updatedAt: "刚刚"
  };
  state.drafts.unshift(draft);
  state.selectedDraftId = draft.id;
  const topic = getTopic(generated.topicId);
  if (topic) topic.status = "已生成";
  state.route = "drafts";
  setToast("已保存为成稿");
}

function deleteHotspot(id) {
  const exists = getHotspot(id);
  if (!exists) return;
  if (state.hotspots.length <= 1) {
    setToast("至少保留一条爆款样本");
    return;
  }

  state.hotspots = state.hotspots.filter((item) => item.id !== id);
  state.topics = state.topics.filter((topic) => topic.hotId !== id);

  if (state.selectedHotspotId === id) {
    state.selectedHotspotId = state.hotspots[0]?.id || "";
  }
  if (!getTopic(state.selectedTopicId)) {
    state.selectedTopicId = state.topics[0]?.id || "";
  }
  if (!getTopic(state.generator.topicId)) {
    state.generator.topicId = state.topics[0]?.id || "";
  }

  render();
  setToast("爆款样本已删除");
}

function deleteDraft(id) {
  const exists = getDraft(id);
  if (!exists) return;

  state.drafts = state.drafts.filter((draft) => draft.id !== id);
  if (state.selectedDraftId === id) {
    state.selectedDraftId = state.drafts[0]?.id || "";
  }

  render();
  setToast("成稿已删除");
}

function deleteMaterial(id) {
  const exists = getMaterial(id);
  if (!exists) return;
  if (state.materials.length <= 1) {
    setToast("至少保留一条景区素材");
    return;
  }

  state.materials = state.materials.filter((material) => material.id !== id);
  state.generator.materialIds = state.generator.materialIds.filter((materialId) => materialId !== id);
  state.topics = state.topics.map((topic) => ({
    ...topic,
    materialIds: topic.materialIds.filter((materialId) => materialId !== id)
  }));

  render();
  setToast("景区素材已删除");
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
  setToast("已复制到剪贴板");
}

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    state.route = routeButton.dataset.route;
    render();
    return;
  }

  const hotItem = event.target.closest("[data-hot]");
  if (hotItem && !event.target.closest("[data-action]")) {
    state.selectedHotspotId = hotItem.dataset.hot;
    if (hotItem.dataset.routeAfter) state.route = hotItem.dataset.routeAfter;
    render();
    return;
  }

  const topicItem = event.target.closest("[data-topic]");
  if (topicItem && !event.target.closest("[data-action]")) {
    state.selectedTopicId = topicItem.dataset.topic;
    if (topicItem.dataset.routeAfter) state.route = topicItem.dataset.routeAfter;
    render();
    return;
  }

  const draftItem = event.target.closest("[data-draft]");
  if (draftItem && !event.target.closest("[data-action]")) {
    state.selectedDraftId = draftItem.dataset.draft;
    render();
    return;
  }

  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;
  const action = actionEl.dataset.action;

  if (action === "login") {
    login();
    return;
  }
  if (action === "logout") {
    logout();
    return;
  }
  if (action === "analyze-link") {
    analyzeViralLink();
  }
  if (action === "use-reference") {
    makeTopicFromHotspot(state.selectedHotspotId);
  }
  if (action === "hot-filter") {
    state.hotFilter = actionEl.dataset.value;
    render();
  }
  if (action === "material-filter") {
    state.materialFilter = actionEl.dataset.value;
    render();
  }
  if (action === "toggle-hot-panel") {
    state.hotPanel = !state.hotPanel;
    render();
  }
  if (action === "toggle-material-panel") {
    state.materialPanel = !state.materialPanel;
    render();
  }
  if (action === "toggle-topic-panel") {
    state.topicPanel = !state.topicPanel;
    render();
  }
  if (action === "import-demo") {
    setToast("已模拟导入 5 条爆款样本");
  }
  if (action === "add-hotspot") {
    const title = document.querySelector("#new-hot-title")?.value || "新爆款样本";
    const platform = document.querySelector("#new-hot-platform")?.value || "小红书";
    const summary = document.querySelector("#new-hot-summary")?.value || "";
    const item = {
      id: `hot-${Date.now()}`,
      platform,
      title,
      author: "运营录入",
      time: "刚刚",
      metrics: "手动录入",
      tags: ["人工录入", "高适配"],
      fit: "高",
      image: "./assets/mist-valley.png",
      summary,
      analysis: {
        hook: "从用户的周末出逃情绪切入。",
        structure: "先讲场景，再讲璞之谷可承接素材。",
        emotion: "安静、轻松、自然恢复。",
        adapt: "适合结合品牌核心表达和近期活动素材生成。",
        risk: "人工录入内容需确认来源合规。"
      }
    };
    state.hotspots.unshift(item);
    state.selectedHotspotId = item.id;
    state.hotPanel = false;
    setToast("爆款样本已保存");
  }
  if (action === "make-topic") {
    makeTopicFromHotspot(actionEl.dataset.hot || state.selectedHotspotId);
  }
  if (action === "delete-hotspot") {
    deleteHotspot(actionEl.dataset.hot);
    return;
  }
  if (action === "toggle-material") {
    const id = actionEl.dataset.material;
    const exists = state.generator.materialIds.includes(id);
    state.generator.materialIds = exists
      ? state.generator.materialIds.filter((item) => item !== id)
      : [...state.generator.materialIds, id];
    render();
  }
  if (action === "delete-material") {
    deleteMaterial(actionEl.dataset.material);
    return;
  }
  if (action === "add-material") {
    const title = document.querySelector("#new-mat-title")?.value || "新素材";
    const type = document.querySelector("#new-mat-type")?.value || "活动";
    const content = document.querySelector("#new-mat-content")?.value || "";
    const material = {
      id: `mat-${Date.now()}`,
      type,
      title,
      tags: ["运营新增"],
      image: "./assets/forest-path.png",
      content,
      recommended: false
    };
    state.materials.unshift(material);
    state.materialPanel = false;
    setToast("素材已保存");
  }
  if (action === "add-topic") {
    const topic = {
      id: `topic-${Date.now()}`,
      title: document.querySelector("#new-topic-title")?.value || "新选题",
      source: "人工创建",
      platform: document.querySelector("#new-topic-platform")?.value || "小红书",
      audience: document.querySelector("#new-topic-audience")?.value || "周边游客",
      goal: "内容种草",
      hotId: state.selectedHotspotId,
      materialIds: state.generator.materialIds.slice(0, 3),
      priority: "中",
      status: "待评估",
      plan: "06-24",
      notes: "人工创建选题，后续可补充爆款参考和素材。"
    };
    state.topics.unshift(topic);
    state.selectedTopicId = topic.id;
    state.topicPanel = false;
    setToast("选题已创建");
  }
  if (action === "prepare-generator") {
    prepareGenerator(actionEl.dataset.topic);
  }
  if (action === "advance-topic") {
    const topic = getTopic(actionEl.dataset.topic);
    if (topic) {
      const index = topicStatuses.indexOf(topic.status);
      topic.status = topicStatuses[Math.min(index + 1, topicStatuses.length - 1)];
      render();
    }
  }
  if (action === "check-material") {
    const id = actionEl.dataset.material;
    const checked = actionEl.checked;
    state.generator.materialIds = checked
      ? Array.from(new Set([...state.generator.materialIds, id]))
      : state.generator.materialIds.filter((item) => item !== id);
  }
  if (action === "generate") {
    state.generating = true;
    state.generatedDraft = null;
    render();
    window.setTimeout(() => {
      state.generatedDraft = buildGeneratedDraft();
      state.generating = false;
      state.outputTab = "titles";
      render();
      setToast("已生成原创方案");
    }, 700);
  }
  if (action === "tab") {
    state.outputTab = actionEl.dataset.value;
    render();
  }
  if (action === "reroll-title" && state.generatedDraft) {
    const extra = `把周末交给璞之谷，去长城脚下慢慢呼吸`;
    state.generatedDraft.titles = [extra, ...state.generatedDraft.titles.slice(0, 4)];
    render();
  }
  if (action === "save-draft") {
    saveGeneratedDraft();
  }
  if (action === "copy-draft") {
    copyText(state.generatedDraft?.body || "");
  }
  if (action === "copy-selected-draft") {
    const draft = getDraft(actionEl.dataset.draft);
    if (draft) copyText(`${draft.title}\n\n${draft.body}\n\n${draft.hashtags.map((item) => `#${item}`).join(" ")}`);
  }
  if (action === "delete-draft") {
    deleteDraft(actionEl.dataset.draft);
    return;
  }
  if (action === "mark-published") {
    const draft = getDraft(actionEl.dataset.draft);
    if (draft) {
      draft.status = "已发布";
      draft.updatedAt = "刚刚";
      render();
      setToast("已标记发布状态");
    }
  }
});

document.addEventListener("change", (event) => {
  const genField = event.target.closest("[data-gen-field]");
  if (genField) {
    const field = genField.dataset.genField;
    state.generator[field] = genField.value;
    if (field === "topicId") {
      const topic = getTopic(genField.value);
      if (topic) {
        state.generator.platform = topic.platform;
        state.generator.materialIds = [...topic.materialIds];
        state.generator.emphasize = topic.notes;
      }
    }
    render();
  }
});

document.addEventListener("input", (event) => {
  const stateField = event.target.closest("[data-field]");
  if (stateField) {
    state[stateField.dataset.field] = stateField.value;
  }
  const genField = event.target.closest("[data-gen-field]");
  if (genField) {
    state.generator[genField.dataset.genField] = genField.value;
  }
  const draftField = event.target.closest("[data-draft-field]");
  if (draftField) {
    const draft = getDraft(draftField.dataset.draftId);
    if (!draft) return;
    const field = draftField.dataset.draftField;
    if (field === "hashtags") {
      draft.hashtags = draftField.value.split(/[，,\s]+/).filter(Boolean);
    } else if (field === "imageSuggestions") {
      draft.imageSuggestions = draftField.value.split("\n").filter(Boolean);
    } else {
      draft[field] = draftField.value;
    }
    draft.updatedAt = "刚刚";
  }
});

checkSession();
