/**
 * 站点配置文件
 * 修改下面的内容来换成你们自己的信息
 */

// 时光轴主题定义（正序故事线仍可复用主题色）
const THEMES = {
    campus: {
        key: "campus",
        label: "校园",
        emoji: "🏫",
        color: "#5b7cfa",
        glow: "rgba(91, 124, 250, 0.28)",
        desc: "在上海理工大学的青涩时光"
    },
    island: {
        key: "island",
        label: "海岛",
        emoji: "🌊",
        color: "#3ec2d1",
        glow: "rgba(62, 194, 209, 0.28)",
        desc: "花鸟岛的海风与日出"
    },
    disney: {
        key: "disney",
        label: "游乐场",
        emoji: "🏰",
        color: "#e66ef7",
        glow: "rgba(230, 110, 247, 0.28)",
        desc: "迪士尼乐园的童话梦"
    },
    sakura: {
        key: "sakura",
        label: "公园",
        emoji: "🌸",
        color: "#ff9ec8",
        glow: "rgba(255, 158, 200, 0.28)",
        desc: "樱花园里的春日浪漫"
    },
    tianzifang: {
        key: "tianzifang",
        label: "田子坊",
        emoji: "🏮",
        color: "#ff9f5a",
        glow: "rgba(255, 159, 90, 0.28)",
        desc: "田子坊的夜色与咖啡香"
    },
    graduation: {
        key: "graduation",
        label: "毕业",
        emoji: "🎓",
        color: "#4a6fa5",
        glow: "rgba(74, 111, 165, 0.28)",
        desc: "她的大学生涯，也有我的名字"
    },
    confession: {
        key: "confession",
        label: "告白",
        emoji: "💌",
        color: "#e74c3c",
        glow: "rgba(231, 76, 60, 0.28)",
        desc: "那句酝酿很久的'我喜欢你'"
    },
    zoo: {
        key: "zoo",
        label: "动物园",
        emoji: "🦒",
        color: "#70a83b",
        glow: "rgba(112, 168, 59, 0.28)",
        desc: "和小动物们一起见证的快乐"
    },
    aquarium: {
        key: "aquarium",
        label: "水族馆",
        emoji: "🐠",
        color: "#1e88e5",
        glow: "rgba(30, 136, 229, 0.28)",
        desc: "蓝色水里游动的光和影"
    },
    farmstay: {
        key: "farmstay",
        label: "农家乐",
        emoji: "🌾",
        color: "#c9a227",
        glow: "rgba(201, 162, 39, 0.28)",
        desc: "柴火饭和摘草莓的午后"
    },
    fireworks: {
        key: "fireworks",
        label: "烟花",
        emoji: "🎆",
        color: "#9b59b6",
        glow: "rgba(155, 89, 182, 0.28)",
        desc: "夜空里炸开的浪漫"
    },
    talkshow: {
        key: "talkshow",
        label: "脱口秀",
        emoji: "🎤",
        color: "#c0392b",
        glow: "rgba(192, 57, 43, 0.28)",
        desc: "舞台灯光下的放声大笑"
    },
    disneyGarden: {
        key: "disneyGarden",
        label: "迪士尼的花园",
        emoji: "🌹",
        color: "#e91e63",
        glow: "rgba(233, 30, 99, 0.28)",
        desc: "城堡旁盛开的玫瑰"
    }
};

const CONFIG = {
    // 在一起的开始日期，格式：YYYY-MM-DD
    // 你提到 3 月 13 日正式告白并被接受，所以改为这一天
    startDate: "2026-03-13",

    // 首屏照片墙使用的照片
    photos: [
        { src: "images/IMG_20260228_150029.jpg", thumb: "images/thumbs/IMG_20260228_150029.jpg" },
        { src: "images/IMG_20260307_165005.jpg", thumb: "images/thumbs/IMG_20260307_165005.jpg" },
        { src: "images/IMG_20260314_151609.jpg", thumb: "images/thumbs/IMG_20260314_151609.jpg" },
        { src: "images/IMG_20260314_153548.jpg", thumb: "images/thumbs/IMG_20260314_153548.jpg" },
        { src: "images/IMG_20260314_154756.jpg", thumb: "images/thumbs/IMG_20260314_154756.jpg" },
        { src: "images/IMG_20260314_160030.jpg", thumb: "images/thumbs/IMG_20260314_160030.jpg" },
        { src: "images/IMG_20260314_182751.jpg", thumb: "images/thumbs/IMG_20260314_182751.jpg" },
        { src: "images/IMG_20260328_142819.jpg", thumb: "images/thumbs/IMG_20260328_142819.jpg" },
        { src: "images/IMG_20260328_143034.jpg", thumb: "images/thumbs/IMG_20260328_143034.jpg" },
        { src: "images/IMG_20260328_143040.jpg", thumb: "images/thumbs/IMG_20260328_143040.jpg" },
        { src: "images/IMG_20260328_211151.jpg", thumb: "images/thumbs/IMG_20260328_211151.jpg" },
        { src: "images/IMG_20260328_213159.jpg", thumb: "images/thumbs/IMG_20260328_213159.jpg" },
        { src: "images/IMG_20260328_213458.jpg", thumb: "images/thumbs/IMG_20260328_213458.jpg" },
        { src: "images/IMG_20260401_150906.jpg", thumb: "images/thumbs/IMG_20260401_150906.jpg" },
        { src: "images/IMG_20260401_150907.jpg", thumb: "images/thumbs/IMG_20260401_150907.jpg" },
        { src: "images/IMG_20260401_152116.jpg", thumb: "images/thumbs/IMG_20260401_152116.jpg" },
        { src: "images/IMG_20260401_152131.jpg", thumb: "images/thumbs/IMG_20260401_152131.jpg" },
        { src: "images/IMG_20260401_152305.jpg", thumb: "images/thumbs/IMG_20260401_152305.jpg" },
        { src: "images/IMG_20260401_152315.jpg", thumb: "images/thumbs/IMG_20260401_152315.jpg" },
        { src: "images/IMG_20260401_154136.jpg", thumb: "images/thumbs/IMG_20260401_154136.jpg" },
        { src: "images/IMG_20260401_154457.jpg", thumb: "images/thumbs/IMG_20260401_154457.jpg" },
        { src: "images/IMG_20260401_155024.jpg", thumb: "images/thumbs/IMG_20260401_155024.jpg" },
        { src: "images/IMG_20260401_170337.jpg", thumb: "images/thumbs/IMG_20260401_170337.jpg" },
        { src: "images/IMG_20260401_172642.jpg", thumb: "images/thumbs/IMG_20260401_172642.jpg" },
        { src: "images/IMG_20260401_172814.jpg", thumb: "images/thumbs/IMG_20260401_172814.jpg" },
        { src: "images/IMG_20260411_130728.jpg", thumb: "images/thumbs/IMG_20260411_130728.jpg" },
        { src: "images/IMG_20260418_153214.jpg", thumb: "images/thumbs/IMG_20260418_153214.jpg" },
        { src: "images/IMG_20260418_172059.jpg", thumb: "images/thumbs/IMG_20260418_172059.jpg" },
        { src: "images/IMG_20260425_150600.jpg", thumb: "images/thumbs/IMG_20260425_150600.jpg" },
        { src: "images/IMG_20260425_151211.jpg", thumb: "images/thumbs/IMG_20260425_151211.jpg" },
        { src: "images/IMG_20260425_151642.jpg", thumb: "images/thumbs/IMG_20260425_151642.jpg" },
        { src: "images/IMG_20260425_152640.jpg", thumb: "images/thumbs/IMG_20260425_152640.jpg" },
        { src: "images/IMG_20260425_155441.jpg", thumb: "images/thumbs/IMG_20260425_155441.jpg" },
        { src: "images/IMG_20260425_155926.jpg", thumb: "images/thumbs/IMG_20260425_155926.jpg" },
        { src: "images/IMG_20260425_162109.jpg", thumb: "images/thumbs/IMG_20260425_162109.jpg" },
        { src: "images/IMG_20260425_183654.jpg", thumb: "images/thumbs/IMG_20260425_183654.jpg" },
        { src: "images/IMG_20260501_162444.jpg", thumb: "images/thumbs/IMG_20260501_162444.jpg" },
        { src: "images/IMG_20260501_211441.jpg", thumb: "images/thumbs/IMG_20260501_211441.jpg" },
        { src: "images/IMG_20260505_162002.jpg", thumb: "images/thumbs/IMG_20260505_162002.jpg" },

    ],

    // 背景音乐（可选）
    music: {
        main: "audio/beauty_and_the_beast.mp3",
        birthday: "audio/blessing_world_edition.mp3"
    },

    // 双面情书（可选）
    // 支持多封信，按数组顺序展示
    loveLetters: [
        {
            title: "写给你的小情书",
            date: "2026-05-20",
            from: "我",
            to: "宝宝",
            content: "和你在一起的每个普通日子，都成了好日子。\n谢谢你愿意和我一起过。",
            signature: "周蕊蕊头号粉丝",
            seal: "💌"
        },
        {
            title: "你写给我的话",
            date: "2026-05-20",
            from: "宝宝",
            to: "我",
            content: "散步，吹风，看日落。\n这些在遇上你之前。\n叫做\n走路，刮风，和天要黑了。",
            signature: "周蕊蕊",
            seal: "💕"
        }
    ],

    // 恋爱故事时间轴（正序叙事）
    // 你可以按真实经历修改日期、标题、描述和照片
    // img 支持单张图片字符串，或多张图片数组（最多展示 4 张，超出会自动截断）
    story: [
        {
            date: "2026-02-28",
            title: "老板，我们一起出去玩吧！",
            desc: "那天是2月的最后一天，天气还很冷，但是春天的感觉已经很近了，我们说着要去赏花，其实也只是对着几株樱花树拍了几张简单的照片，回去翻看，照片其实算不上多惊艳，但那天躺在野餐垫上、和你有一搭没一搭聊着天的我，心里好像被种下了什么似的。</br>后来才明白，那种下的，是所有故事的开始。",
            img: "images/IMG_20260228_150029.jpg",
            theme: "sakura"
        },
        {
            date: "2026-03-07",
            title: "-关公的脸为什么是红的？</br>-他急眼了！",
            desc: "那是我第一次来上理，红砖构造的教会风格建筑可真漂亮。彼时正值初春，你我所拍照的那片草坪还是一片枯黄，你和我说，等到了夏天我们要再来一趟，届时肯定会有一抹迷人的绿色风景。听你这样讲着，忽然觉得一股暖意涌上心头</br>p.s. 宝宝你的小电驴驾驶技术真不错，好几个颠簸的路段你都给我拉住了，后面我要重点学习",
            img: "images/IMG_20260307_165005.jpg",
            theme: "campus"
        },
        {
            date: "2026-03-13",
            title: "其实有一句话我想对你说...",
            desc: "那天我告白得磕磕绊绊，准备好的话讲了一半就忘了，手心全是汗。但你说愿意试试的那一刻，我就暗自下决心：绝对不会让你后悔。",
            img: "images/4c3b5dfdb6d8f5b158061e509831c605.jpg",
            theme: "confession"
        },
        {
            date: "2026-03-14",
            title: "我想紧握你的手",
            desc: "至于为什么提前告白，是因为我想在樱花树下，以你男朋友的身份，和你一起欣赏这美丽的春色。春天真美好啊，仿佛一切的温暖走向了我们，那天我十分害羞，怕着急牵你的手让你不喜欢，没想到你最后主动牵起了我的手，让我受宠若惊。",
            img: ["images/IMG_20260314_153548.jpg","images/IMG_20260314_182751.jpg"],
            theme: "sakura"
        },
        {
            date: "2026-03-21",
            title: "谁会在逛动物园时讨论鸭子的一百种做法啊",
            desc: "正常人逛动物园：好美丽/可爱的动物宝宝呀</br>我们：湖里游的鸭子怎么做才好吃，感谢你的认可by李斌",
            img: ["images/zoo1.jpg","images/zoo2.jpg","images/zoo3.jpg","images/zoo4.jpg"],
            theme: "zoo"
        },
        {
            date: "2026-03-28",
            title: "想成为长生不老的水母",
            desc: "永远和你在一起！",
            img: ["images/IMG_20260328_142819.jpg","images/IMG_20260328_143034.jpg","images/IMG_20260328_143040.jpg"],
            theme: "aquarium"
        },
        {
            date: "2026-03-28",
            title: "循此苦旅，终抵群星",
            desc: "希望我们去看更广阔的世界，而不是困在鸡毛蒜皮的小事里</br>愿我们的血脉永远鼓动，旅途永远坦荡",
            img:["images/tz1.jpg","images/tz2.jpg"],
            theme: "tianzifang"
        },
        {
            date: "2026-04-01",
            title: "樱花飞舞时",
            desc: "那是最棒的一次赏樱。漫天的樱花树下，我们拍出了好多好看的照片，风一吹，花瓣落了你满身。",
            img: "images/IMG_20260401_172642.jpg",
            theme: "sakura"
        },
        {
            date: "2026-04-05",
            title: "韭菜不是这样割的！",
            desc: "可是我们都花了钱啊为什么不让我们快乐割韭菜呜呜呜",
            img: ["images/farming1.jpg","images/farming2.jpg"],
            theme: "farmstay"
        },
      {
            date: "2026-04-11",
            title: "红红火火恍恍惚惚",
            desc: "在南京路甩一碗米线，看一场脱口秀，太chill啦",
            img: ["images/talkshow1.jpg","images/talkshow2.jpg"],
            theme: "talkshow"
        },
        {
            date: "2026-05-01",
            title: "我有一顶小帽子",
            desc: "戴着麦秸帽子的你，仿若摇曳的金盏花般",
            img: "images/hat.jpg",
            theme: "disney"
        },
        {
            date: "2026-05-06",
            title: "每个人都想成为公主，那为什么不能是我呢",
            desc: "周蕊蕊陛下抵达了她忠实的迪士尼城堡",
            img: ["images/disney.jpg","images/thumbs/IMG_20260506_150445.jpg","images/thumbs/IMG_20260505_180710.jpg","images/thumbs/IMG_20260505_172925.jpg"],
            theme: "disney"
        },
        {
            date: "2026-05-06",
            title: "朝向一朵花的盛开",
            desc: "向着光的方向，我们自由且茁壮地成长着",
            img: "images/thumbs/IMG_20260505_162529.jpg",
            theme: "disneyGarden"
        },
        {
            date: "2026-05-06",
            title: "烟花易逝，人情长存",
            desc: "对我来说，真正的烟花是你眼瞳中的光亮",
            img: ["images/thumbs/IMG_20260505_213656.jpg","images/firework2.jpg","images/firework3.jpg"],
            theme: "fireworks"
        },
        {
            date: "2026-05-29",
            title: "让我们前往山海之间",
            desc: "那边太美了，蓝天白云，海风吹着你的草帽。你站在海边，我觉得画面就该停在那里。",
            img: ["images/island1.jpg","images/island2.jpg","images/island3.jpg","images/island4.jpg"],
            theme: "island"
        }
    ],

    // 足迹地图：按时间顺序排列的回忆地标
    footprints: [
        {
            city: "宝山区 · 顾村公园",
            shortName: "顾村公园",
            date: "2026-02",
            lat: 31.32,
            lng: 121.38,
            icon: "🌸",
            photos: ["images/IMG_20260228_150029.jpg"]
        },
        {
            city: "杨浦区 · 上海理工大学",
            shortName: "上海理工",
            date: "2026-03",
            lat: 31.27,
            lng: 121.52,
            icon: "📚",
            photos: ["images/IMG_20260307_165005.jpg"]
        },
        {
            city: "松江区 · 辰山植物园",
            shortName: "辰山植物园",
            date: "2026-03",
            lat: 31.03,
            lng: 121.23,
            icon: "🌿",
            photos: ["images/IMG_20260314_154756.jpg"]
        },
        {
            city: "长宁区 · 上海动物园",
            shortName: "上海动物园",
            date: "2026-03",
            lat: 31.19,
            lng: 121.36,
            icon: "🦁",
            photos: ["images/zoo3.jpg"]
        },
        {
            city: "浦东新区 · 上海海洋水族馆",
            shortName: "水族馆",
            date: "2026-03",
            lat: 31.24,
            lng: 121.50,
            icon: "🐠",
            photos: ["images/IMG_20260328_143034.jpg"]
        },
        {
            city: "黄浦区 · 田子坊",
            shortName: "田子坊",
            date: "2026-04",
            lat: 31.21,
            lng: 121.47,
            icon: "🏮",
            photos: ["images/thumbs/IMG_20260328_211151.jpg"]
        },
        {
            city: "无锡市 · 鼋头渚樱花园",
            shortName: "无锡",
            date: "2026-04",
            lat: 31.48,
            lng: 120.22,
            icon: "🌸",
            photos: ["images/IMG_20260401_150906.jpg"]
        },
        {
            city: "浦东新区 · 上海迪士尼乐园",
            shortName: "迪士尼",
            date: "2026-05",
            lat: 31.14,
            lng: 121.66,
            icon: "🏰",
            photos: ["images/IMG_20260505_213656.jpg"]
        },
        {
            city: "嵊泗县 · 花鸟岛",
            shortName: "花鸟岛",
            date: "2026-05",
            lat: 30.85,
            lng: 122.67,
            icon: "🌊",
            photos: ["images/IMG_20260529_110646.jpg"]
        }
    ],

    // 那些让我心动的瞬间：照片墙 + 文字卡片
    heartbeatMoments: [
        {
            img: "images/IMG_20260307_165005.jpg",
            text: "你骑着小电驴载我穿过校园，风把你的头发吹起来，那一刻我觉得心动有了具体的形状。"
        },
        {
            img: "images/IMG_20260314_154756.jpg",
            text: "辰山植物园的樱花刚开，你站在树下抬头看，阳光落在你脸上，我突然就明白了什么叫温柔。"
        },
        {
            img: "images/IMG_20260401_150906.jpg",
            text: "无锡鼋头渚漫天樱花，你回头对我笑，我觉得全世界都在给我们让路。"
        },
        {
            img: "images/IMG_20260505_213656.jpg",
            text: "迪士尼城堡前的烟花亮起来，你转头看我的眼神，比烟花还亮。"
        },
        {
            img: "images/IMG_20260529_110646.jpg",
            text: "花鸟岛的海边，你的草帽被风吹得轻轻晃动，蓝天、白云和你，那一刻我想把时间暂停。"
        }
    ],

    // 她对我的意义
    meaningToMe: [
        {
            title: "你是我的小朋友",
            content: "是我在辰山植物园不敢牵手的那一个。是我开车时偷偷捏我手臂、轻轻咬一口的那一个。是答辩前焦虑、搬家后觉得孤单、需要我推着轮椅才能走完迪士尼的那一个。在你面前，我可以是大人；但在我面前，你永远可以做孩子。"
        },
        {
            title: "你是认定我的人",
            content: "你把我写进论文致谢，那是我这辈子收到过最重的情书。你在迪士尼那晚流着泪说“我就知道我没选错”。你在我被过去的声音纠缠时，不问缘由地站在我身边。被你认定，是我最大的底气。"
        },
        {
            title: "你是与我并肩前行的人",
            content: "从实习生到产品经理，从校园到职场，从两个人各自为战，到一起规划租房、跳槽和未来。我们是恋人，也是职场上彼此最懂的同行。你懂我的纠结，我也懂你的倔强。我们不是在各自的世界里努力，而是在同一个方向上并肩。"
        },
        {
            title: "你是给我家的温度的人",
            content: "是在大学路的面包店给你买隔天早饭，是在青浦帮你挑那个70平米的小窝，是花鸟岛的灯塔和海浪，是下班后一起散过的步、吃过的宵夜、吐槽过的奇葩室友。遇见你之后我才明白，家不是一个地方，是有你在的那个空间。"
        }
    ],

    // 生日专属页配置
    birthday: {
        // 蛋糕上方的小字
        pretitle: "致我 23 岁的女孩",
        // 大标题
        title: "生日快乐",
        // 蛋糕下方的提示
        subtitle: "愿你眼里有星河，笑里有清风",
        // 蜡烛全部熄灭后，简短祝福语（保留原有打字机效果）
        message: "23 岁的你，比星光更温柔，比时间更珍贵。\n谢谢你出现在我的生命里，让我的每一天都有了期待。",
        // 手写信件内容（吹完蜡烛后展开）
        letter: `亲爱的宝宝：\n\n今天是你的生日，我坐在电脑前想给你写点什么，却发现所有文字都太轻。\n\n我想起迪士尼那晚，你抱着拼图对我说"我就知道我没选错"，其实我更想告诉你，我也一样。从顾村公园到辰山植物园，从无锡的樱花到花鸟岛的海风，每一次和你出门，我都偷偷觉得幸运。\n\n你总说自己不够完美，但在我眼里，你认真吃饭的样子、工作学习累了皱眉的样子、懒懒地躺在床上的样子，全都很好。\n\n新的一岁，愿你继续被这个世界温柔以待。如果生活偶尔不够温柔，那就换我来。\n\n生日快乐，我的女孩。\n\n永远爱你的我`,
        // 信件署名
        letterSignature: "永远爱你的我",
        // 蜡烛全部熄灭后，蛋糕下方显示的文案
        afterBlowHint: "✨ May all the good things come to you✨"
    },

    // 那些被记录的里程碑：她已经为我做过的、让我感动的事
    milestones: [
        {
            icon: "🎓",
            title: "毕业论文致谢里，有我的名字",
            desc: "你把我写进了毕业论文致谢。那段话很长，但我读了很多遍。",
            quote: "本论文是在导师赵海燕老师的悉心指导下完成的，本文作者在此谨表示衷心的感谢。\n也感谢我的父母以及朋友，在毕业这一年期间遇到的所有帮助过我的人，每一次的失败都是为了筑起更强的自己。\n最后，要特别感谢我的男朋友。缘分让我们从人海中的陌生人，因相似的三观与契合的性格相识、相知，最终走到彼此身边。你见过我的脆弱，理解我的困境，在每一次抉择的路口，都给出我理性的建议。你的偏爱让我有了对抗世界的底气，你的坚守让我相信，好的爱情是彼此成就、共同成长。山水一程，三生有幸，往后岁月，愿与你携手奔赴更辽阔的远方。",
            img: "images/grauate.jpg"
        },
        {
            icon: "🌹",
            title: "幸福是一朵永不凋零的花",
            desc: "你花了很多时间，为我做了好多手工，写了好多卡片",
            quote:"你花了很多时间，为我折纸、画画、写卡片。这些看似小小的手工，填满了我生活中所有可能的空隙。如果说程序员的浪漫是写代码，那我的浪漫，就是一遍遍地翻看你留下的这些印记。纸会泛黄，但被你在意过的感觉，永远崭新。",
            img: "images/flower.jpg"
        },
        {
            icon: "💌",
            title: "最初的情书",
            desc: "我收到的第一份情书，一直在我书桌上最显眼的位置",
            quote:"你写给我的第一张卡片，我放在书桌上最显眼的位置。后来你又写了很多，每一张我都收着。再后来，你把我的名字写进了毕业论文致谢——那是我这辈子，收到过最重的情书。从一张卡片，到一篇致谢，你一步步，把我写进了你的人生里.",
            img: "images/lovecard.jpg"
        }
    ],

    // GitHub 仓库与共同维护邀请
    github: {
        // 项目仓库地址，留空则不显示"查看仓库"按钮
        repoUrl: "https://github.com/ErikaWong-win/ErikaWong-win.github.io.git",
        // commit 信息里显示的名字
        authorName: "你",
        coAuthorName: "她",
        // 自定义 commit 主题
        commitMessage: "feat: invite you to co-maintain our story"
    }
};
