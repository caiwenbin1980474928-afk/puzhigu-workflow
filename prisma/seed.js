const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

const json = (value) => JSON.stringify(value);
const hashPassword = (password) => {
  const iterations = 100000;
  const salt = "puzhigu-prototype-salt";
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
  return `pbkdf2$${iterations}$${salt}$${hash}`;
};

const viralReferences = [
  {
    id: "hot-1",
    platform: "小红书",
    title: "北京周边 1.5h，藏进山谷里的亲子草坪周末",
    sourceUrl: "https://www.xiaohongshu.com/explore/mock-puzhigu-family-lawn",
    parseStatus: "解析成功",
    authorName: "山里周末计划",
    metricsText: "赞 1.8w · 藏 9,420 · 评 386",
    time: "今天 09:20",
    tags: ["亲子", "草坪", "周末", "高适配"],
    fitLevel: "高",
    coverImageUrl: "./assets/central-lawn.png",
    summary: "以周末亲子轻度假为入口，强调大草坪、树屋、自然游戏和不费力的出行体验。",
    visualStyle: "清新自然图文：首图大草坪 + 人物背影，正文用清单节奏，图片顺序从全景到亲子互动再到餐饮承接。",
    analysis: {
      hook: "把“北京周边不累的亲子度假”作为强入口，降低决策成本。",
      structure: "距离与场景先行，随后列出草坪、树屋、拍照、餐饮四个可感知体验。",
      emotion: "轻松、被照顾、孩子放电、家长也能休息。",
      scenicFit: "适合改写为璞之谷 2000㎡中心草坪、树屋区、亲水游戏和山野餐饮组合选题。",
      riskNotes: "不要照搬原笔记具体路线、价格和“隐藏宝藏”等夸张表达。",
      originalityBoundary: "借鉴“低门槛亲子周末”的结构，用璞之谷真实草坪、树屋、山野餐饮重写内容。"
    }
  },
  {
    id: "hot-2",
    platform: "抖音",
    title: "长城脚下的咖啡馆，风一吹就像进了电影",
    sourceUrl: "https://www.douyin.com/video/mock-greatwall-cafe",
    parseStatus: "解析成功",
    authorName: "北京取景地",
    metricsText: "赞 5.2w · 评 1,104 · 转 2,088",
    time: "昨天 18:42",
    tags: ["咖啡", "打卡", "长城", "美食"],
    fitLevel: "高",
    coverImageUrl: "./assets/mountain-table.png",
    summary: "用短视频镜头表现长城、山风、咖啡和花草，适合做视觉氛围型内容。",
    visualStyle: "氛围短视频：远山建立场、咖啡杯近景、花草摇晃和慢推镜头，字幕短、画面留白多。",
    analysis: {
      hook: "第一秒直接给长城脚下的空间反差，抓住“城市人逃离感”。",
      structure: "镜头从远山切到咖啡，再切花草、露台、手部动作，节奏很轻。",
      emotion: "松弛、治愈、值得专程去一趟。",
      scenicFit: "可结合高巅咖啡、岳鹿山野厨房和山谷景观做抖音分镜。",
      riskNotes: "视频脚本中避免承诺“人少”“包场”等不可控体验。",
      originalityBoundary: "借鉴“长城脚下的松弛感”，用高巅咖啡、岳鹿山野厨房和璞之谷山风重新组织镜头。"
    }
  },
  {
    id: "hot-3",
    platform: "小红书",
    title: "不只是民宿，是能把人慢慢安静下来的山野汤泉",
    sourceUrl: "https://www.xiaohongshu.com/explore/mock-valley-hot-spring",
    parseStatus: "需人工补充",
    authorName: "温泉地图",
    metricsText: "赞 7,620 · 藏 3,180 · 评 142",
    time: "06-14 20:16",
    tags: ["民宿", "汤泉", "疗愈", "高适配"],
    fitLevel: "高",
    coverImageUrl: "./assets/valley-hotel.png",
    summary: "把住宿从“房型卖点”转成“疗愈归处”，突出私汤、山景和身心放松。",
    visualStyle: "治愈民宿图文：封面聚焦窗外山景或汤泉水汽，正文先讲情绪，再讲房间、院落和夜晚。",
    analysis: {
      hook: "把“住一晚”转译成“给自己一个归心的晚上”。",
      structure: "先讲情绪，再讲院落、房间、私汤、细节服务。",
      emotion: "安静、安全、回到自然、被温柔接住。",
      scenicFit: "非常适合璞墅汤泉民宿和漫心酒店的双产品线内容。",
      riskNotes: "汤泉、房型、配套需以素材库为准，不能自行编造数量与服务。",
      originalityBoundary: "借鉴“疗愈归处”的情绪入口，具体内容只能使用璞墅汤泉民宿真实权益。"
    }
  },
  {
    id: "hot-4",
    platform: "抖音",
    title: "带孩子看一场会发光的自然课",
    sourceUrl: "https://www.douyin.com/video/mock-insect-museum",
    parseStatus: "解析成功",
    authorName: "亲子自然志",
    metricsText: "赞 2.4w · 评 528 · 转 907",
    time: "06-13 11:05",
    tags: ["亲子", "研学", "虫博馆"],
    fitLevel: "中",
    coverImageUrl: "./assets/insect-museum.png",
    summary: "亲子科普内容以夜游、昆虫和互动展为卖点，适合暑期研学传播。",
    visualStyle: "亲子研学短视频：孩子视角、展陈特写、暗场亮点和家长收获字幕组合。",
    analysis: {
      hook: "把昆虫博物馆包装成“孩子会主动问问题的自然课堂”。",
      structure: "孩子视角开场，家长决策补充安全、距离和收获。",
      emotion: "好奇、惊喜、陪伴、自然启蒙。",
      scenicFit: "可围绕自然界虫博馆、夜行性昆虫探索和长城脚下的生态场景展开。",
      riskNotes: "需确认开放时间、展陈内容和活动安排后再发布。",
      originalityBoundary: "借鉴“自然课堂”的叙事方式，用自然界虫博馆和长城脚下生态场景生成原创脚本。"
    }
  },
  {
    id: "hot-5",
    platform: "小红书",
    title: "5 公里森林徒步，不卷装备也能走进山风里",
    sourceUrl: "https://www.xiaohongshu.com/explore/mock-forest-walk",
    parseStatus: "解析成功",
    authorName: "轻徒步研究所",
    metricsText: "赞 9,842 · 藏 5,406 · 评 221",
    time: "06-12 08:52",
    tags: ["徒步", "自然", "周边游"],
    fitLevel: "高",
    coverImageUrl: "./assets/forest-trail.png",
    summary: "轻徒步内容强调低门槛和身心刷新，适合城市周末出逃主题。",
    visualStyle: "轻攻略图文：路线感虚线、森林背景、装备低门槛提示和餐饮住宿承接。",
    analysis: {
      hook: "“不用硬核，也能把身体还给山风”是强情绪句。",
      structure: "路线难度、沿途体验、适合人群、结束后的餐饮住宿承接。",
      emotion: "松弛、清醒、恢复能量。",
      scenicFit: "适合璞之谷 5 公里徒步径与大黑山森林公园联动表达。",
      riskNotes: "路线难度、安全提醒和天气限制需要人工确认。",
      originalityBoundary: "借鉴“轻徒步不硬核”的收藏价值，用璞之谷 5 公里徒步径和山谷配套承接。"
    }
  }
];

const scenicMaterials = [
  {
    id: "mat-1",
    type: "品牌",
    title: "品牌核心表达",
    tags: ["本真", "疗愈", "东方山水"],
    imageUrl: "./assets/mist-valley.png",
    content: "璞之谷取“璞玉藏深谷，本真归自然”之意，是藏纳万物的自然之谷、治愈人心的温暖之谷、安放理想的心灵之谷。",
    isRecommended: true
  },
  {
    id: "mat-2",
    type: "活动",
    title: "2000㎡中心草坪与树屋区",
    tags: ["草坪", "树屋", "亲子"],
    imageUrl: "./assets/central-lawn.png",
    content: "中心草坪树屋区是全域度假场景纽带，可承载山野音乐会、品牌发布会、艺术沙龙、主题团建、亲水游戏与亲子互动。",
    isRecommended: true
  },
  {
    id: "mat-3",
    type: "住宿",
    title: "漫心度假酒店",
    tags: ["观景客房", "长城文化带", "片区标杆"],
    imageUrl: "./assets/valley-hotel.png",
    content: "华住集团旗下中高端标杆，长城文化带及片区唯一大型连锁度假酒店；59 间观景客房，适配情侣、家庭亲子、企业团建。",
    isRecommended: true
  },
  {
    id: "mat-4",
    type: "住宿",
    title: "璞墅汤泉疗愈民宿",
    tags: ["私汤", "归心", "疗愈"],
    imageUrl: "./assets/forest-path.png",
    content: "山景休闲聚会与身心深度疗愈两类体验，包含涵盖院落、客房配置、私汤和星空疗愈等方向。",
    isRecommended: true
  },
  {
    id: "mat-5",
    type: "建筑",
    title: "三胜景院士建筑",
    tags: ["人文地标", "李兴钢", "胜景几何"],
    imageUrl: "./assets/architect-landmark.png",
    content: "中国工程院院士、鸟巢中方总建筑师李兴钢院士“胜景几何”生动实践，包含观山、鹿鸣、醉景等人文地标体验。",
    isRecommended: true
  },
  {
    id: "mat-6",
    type: "景点",
    title: "自然界·虫博馆",
    tags: ["昆虫", "研学", "互动"],
    imageUrl: "./assets/insect-museum.png",
    content: "长城脚下的阴阳虫境，北京唯一建在自然中并与之交融的昆虫博物馆，包含万蝶舞春、夜行性昆虫探索等互动方向。",
    isRecommended: false
  },
  {
    id: "mat-7",
    type: "餐饮",
    title: "高巅咖啡与岳鹿山野厨房",
    tags: ["山风", "咖啡", "山野烟火气"],
    imageUrl: "./assets/mountain-table.png",
    content: "高巅咖啡位于近 200㎡无界空间，是长城脚下的精神驿站；岳鹿山野厨房主打养生清鲜、烹制安心、健康的山野食材。",
    isRecommended: true
  },
  {
    id: "mat-8",
    type: "活动",
    title: "5 公里徒步径",
    tags: ["徒步", "森林", "大黑山"],
    imageUrl: "./assets/forest-trail.png",
    content: "与大黑山森林公园无缝相融，林木葱郁，适合 5 公里轻度游和更远深度游的分层体验。",
    isRecommended: false
  }
];

const contentDirections = [
  {
    id: "topic-1",
    title: "带娃在长城脚下放电，家长也能休息的草坪周末",
    sourceType: "爆款解析转化",
    targetPlatform: "小红书",
    targetAudience: "亲子家庭",
    contentGoal: "周末种草",
    viralReferenceId: "hot-1",
    materialIds: ["mat-1", "mat-2", "mat-7"],
    originalDirection: "突出低门槛、自然游戏和餐饮承接。",
    status: "待创作"
  },
  {
    id: "topic-2",
    title: "长城脚下喝一杯不加糖的山风咖啡",
    sourceType: "运营想法",
    targetPlatform: "抖音",
    targetAudience: "年轻情侣",
    contentGoal: "品牌曝光",
    viralReferenceId: "hot-2",
    materialIds: ["mat-1", "mat-7"],
    originalDirection: "适合 15 秒氛围短视频。",
    status: "待评估"
  },
  {
    id: "topic-3",
    title: "住进山谷私汤，把紧绷的一周慢慢放下",
    sourceType: "活动计划",
    targetPlatform: "小红书",
    targetAudience: "城市白领",
    contentGoal: "住宿转化",
    viralReferenceId: "hot-3",
    materialIds: ["mat-1", "mat-4"],
    originalDirection: "需要确认房态与汤泉权益。",
    status: "已生成"
  }
];

const drafts = [
  {
    id: "draft-1",
    contentDirectionId: "topic-3",
    viralReferenceId: "hot-3",
    platform: "小红书",
    title: "北京周边的山谷私汤，把一周的紧绷慢慢放下",
    body:
      "如果最近总觉得需要一个安静的夜晚，可以把周末交给璞之谷。\n\n这里在黄花城水长城脚下，山风、树影和汤泉把节奏慢慢放低。璞墅汤泉疗愈民宿适合想要私密休息的人，山景院落、私汤和夜晚的安静感，会让一次短住更像一次身心归位。\n\n发布前建议补充：当日房态、汤泉开放安排与预订方式。",
    hashtags: ["北京周边游", "山谷民宿", "私汤民宿", "璞之谷", "水长城"],
    imageSuggestions: ["首图使用森林晨雾或院落私汤", "第二张展示房间与窗外山景", "结尾放交通与预约信息"],
    status: "草稿"
  }
];

async function seedUsers() {
  await prisma.user.upsert({
    where: { account: "operation@puzhigu" },
    update: {
      passwordHash: hashPassword("prototype"),
      displayName: "璞之谷运营",
      role: "operator",
      isActive: true
    },
    create: {
      account: "operation@puzhigu",
      passwordHash: hashPassword("prototype"),
      displayName: "璞之谷运营",
      role: "operator"
    }
  });
}

async function seedViralReferences() {
  for (const item of viralReferences) {
    await prisma.viralReference.upsert({
      where: { id: item.id },
      update: {
        platform: item.platform,
        sourceUrl: item.sourceUrl,
        parseStatus: item.parseStatus,
        analysisStatus: "success",
        title: item.title,
        authorName: item.authorName,
        metricsJson: json({ display: item.metricsText, time: item.time }),
        summary: item.summary,
        coverImageUrl: item.coverImageUrl,
        mediaDescription: item.visualStyle,
        tagsJson: json(item.tags),
        fitLevel: item.fitLevel
      },
      create: {
        id: item.id,
        platform: item.platform,
        sourceUrl: item.sourceUrl,
        parseStatus: item.parseStatus,
        analysisStatus: "success",
        title: item.title,
        authorName: item.authorName,
        metricsJson: json({ display: item.metricsText, time: item.time }),
        summary: item.summary,
        coverImageUrl: item.coverImageUrl,
        mediaDescription: item.visualStyle,
        tagsJson: json(item.tags),
        fitLevel: item.fitLevel
      }
    });

    await prisma.viralAnalysis.upsert({
      where: { viralReferenceId: item.id },
      update: {
        hook: item.analysis.hook,
        structure: item.analysis.structure,
        emotion: item.analysis.emotion,
        visualStyle: item.visualStyle,
        scenicFit: item.analysis.scenicFit,
        originalityBoundary: item.analysis.originalityBoundary,
        riskNotes: item.analysis.riskNotes,
        analysisJson: json(item.analysis),
        provider: "mock",
        model: "prototype-seed"
      },
      create: {
        viralReferenceId: item.id,
        hook: item.analysis.hook,
        structure: item.analysis.structure,
        emotion: item.analysis.emotion,
        visualStyle: item.visualStyle,
        scenicFit: item.analysis.scenicFit,
        originalityBoundary: item.analysis.originalityBoundary,
        riskNotes: item.analysis.riskNotes,
        analysisJson: json(item.analysis),
        provider: "mock",
        model: "prototype-seed"
      }
    });
  }
}

async function seedScenicMaterials() {
  for (const item of scenicMaterials) {
    await prisma.scenicMaterial.upsert({
      where: { id: item.id },
      update: {
        type: item.type,
        title: item.title,
        content: item.content,
        tagsJson: json(item.tags),
        imageUrl: item.imageUrl,
        isRecommended: item.isRecommended,
        status: "active"
      },
      create: {
        id: item.id,
        type: item.type,
        title: item.title,
        content: item.content,
        tagsJson: json(item.tags),
        imageUrl: item.imageUrl,
        isRecommended: item.isRecommended
      }
    });
  }
}

async function seedContentDirections() {
  for (const item of contentDirections) {
    await prisma.contentDirection.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        sourceType: item.sourceType,
        targetPlatform: item.targetPlatform,
        targetAudience: item.targetAudience,
        contentGoal: item.contentGoal,
        materialIdsJson: json(item.materialIds),
        originalDirection: item.originalDirection,
        status: item.status,
        viralReferenceId: item.viralReferenceId
      },
      create: {
        id: item.id,
        title: item.title,
        sourceType: item.sourceType,
        targetPlatform: item.targetPlatform,
        targetAudience: item.targetAudience,
        contentGoal: item.contentGoal,
        materialIdsJson: json(item.materialIds),
        originalDirection: item.originalDirection,
        status: item.status,
        viralReferenceId: item.viralReferenceId
      }
    });
  }
}

async function seedDrafts() {
  for (const item of drafts) {
    await prisma.draft.upsert({
      where: { id: item.id },
      update: {
        contentDirectionId: item.contentDirectionId,
        viralReferenceId: item.viralReferenceId,
        platform: item.platform,
        title: item.title,
        body: item.body,
        hashtagsJson: json(item.hashtags),
        imageSuggestionsJson: json(item.imageSuggestions),
        status: item.status
      },
      create: {
        id: item.id,
        contentDirectionId: item.contentDirectionId,
        viralReferenceId: item.viralReferenceId,
        platform: item.platform,
        title: item.title,
        body: item.body,
        hashtagsJson: json(item.hashtags),
        imageSuggestionsJson: json(item.imageSuggestions),
        status: item.status
      }
    });

    await prisma.draftVersion.upsert({
      where: {
        draftId_version: {
          draftId: item.id,
          version: 1
        }
      },
      update: {
        title: item.title,
        body: item.body,
        outputJson: json(item)
      },
      create: {
        draftId: item.id,
        version: 1,
        title: item.title,
        body: item.body,
        outputJson: json(item)
      }
    });
  }
}

async function main() {
  await seedUsers();
  await seedViralReferences();
  await seedScenicMaterials();
  await seedContentDirections();
  await seedDrafts();

  const counts = {
    users: await prisma.user.count(),
    viralReferences: await prisma.viralReference.count(),
    viralAnalyses: await prisma.viralAnalysis.count(),
    scenicMaterials: await prisma.scenicMaterial.count(),
    contentDirections: await prisma.contentDirection.count(),
    drafts: await prisma.draft.count(),
    draftVersions: await prisma.draftVersion.count()
  };

  console.log(`Seed completed: ${JSON.stringify(counts)}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
