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
        label: "小资都市",
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
        { src: "images/IMG_20260505_162350.jpg", thumb: "images/thumbs/IMG_20260505_162350.jpg" },
        { src: "images/IMG_20260505_162351_1.jpg", thumb: "images/thumbs/IMG_20260505_162351_1.jpg" },
        { src: "images/IMG_20260505_162529.jpg", thumb: "images/thumbs/IMG_20260505_162529.jpg" },
        { src: "images/IMG_20260505_162635.jpg", thumb: "images/thumbs/IMG_20260505_162635.jpg" },
        { src: "images/IMG_20260505_163003.jpg", thumb: "images/thumbs/IMG_20260505_163003.jpg" },
        { src: "images/IMG_20260505_171140.jpg", thumb: "images/thumbs/IMG_20260505_171140.jpg" },
        { src: "images/IMG_20260505_172925.jpg", thumb: "images/thumbs/IMG_20260505_172925.jpg" },
        { src: "images/IMG_20260505_180710.jpg", thumb: "images/thumbs/IMG_20260505_180710.jpg" },
        { src: "images/IMG_20260505_211633.jpg", thumb: "images/thumbs/IMG_20260505_211633.jpg" },
        { src: "images/IMG_20260505_213656.jpg", thumb: "images/thumbs/IMG_20260505_213656.jpg" },
        { src: "images/IMG_20260506_110921.jpg", thumb: "images/thumbs/IMG_20260506_110921.jpg" },
        { src: "images/IMG_20260506_111137.jpg", thumb: "images/thumbs/IMG_20260506_111137.jpg" },
        { src: "images/IMG_20260506_122547.jpg", thumb: "images/thumbs/IMG_20260506_122547.jpg" },
        { src: "images/IMG_20260506_123818.jpg", thumb: "images/thumbs/IMG_20260506_123818.jpg" },
        { src: "images/IMG_20260506_132335_1.jpg", thumb: "images/thumbs/IMG_20260506_132335_1.jpg" },
        { src: "images/IMG_20260506_150437.jpg", thumb: "images/thumbs/IMG_20260506_150437.jpg" },
        { src: "images/IMG_20260506_150445.jpg", thumb: "images/thumbs/IMG_20260506_150445.jpg" },
        { src: "images/IMG_20260506_171313.jpg", thumb: "images/thumbs/IMG_20260506_171313.jpg" },
        { src: "images/IMG_20260506_181749.jpg", thumb: "images/thumbs/IMG_20260506_181749.jpg" },
        { src: "images/IMG_20260516_151157.jpg", thumb: "images/thumbs/IMG_20260516_151157.jpg" },
        { src: "images/IMG_20260516_184953.jpg", thumb: "images/thumbs/IMG_20260516_184953.jpg" },
        { src: "images/IMG_20260517_003347.jpg", thumb: "images/thumbs/IMG_20260517_003347.jpg" },
        { src: "images/IMG_20260529_110646.jpg", thumb: "images/thumbs/IMG_20260529_110646.jpg" },
        { src: "images/IMG_20260529_140734_1.jpg", thumb: "images/thumbs/IMG_20260529_140734_1.jpg" },
        { src: "images/IMG_20260529_153108.jpg", thumb: "images/thumbs/IMG_20260529_153108.jpg" },
        { src: "images/IMG_20260529_160811.jpg", thumb: "images/thumbs/IMG_20260529_160811.jpg" },
        { src: "images/IMG_20260529_160934.jpg", thumb: "images/thumbs/IMG_20260529_160934.jpg" },
        { src: "images/IMG_20260529_162004.jpg", thumb: "images/thumbs/IMG_20260529_162004.jpg" },
        { src: "images/IMG_20260529_163039.jpg", thumb: "images/thumbs/IMG_20260529_163039.jpg" },
        { src: "images/IMG_20260530_165642.jpg", thumb: "images/thumbs/IMG_20260530_165642.jpg" },
        { src: "images/IMG_20260530_170905.jpg", thumb: "images/thumbs/IMG_20260530_170905.jpg" },
        { src: "images/IMG_20260530_180237.jpg", thumb: "images/thumbs/IMG_20260530_180237.jpg" },
        { src: "images/IMG_20260530_180823.jpg", thumb: "images/thumbs/IMG_20260530_180823.jpg" },
        { src: "images/IMG_20260530_184130.jpg", thumb: "images/thumbs/IMG_20260530_184130.jpg" },
        { src: "images/IMG_20260614_151720.jpg", thumb: "images/thumbs/IMG_20260614_151720.jpg" },
        { src: "images/MVIMG_20260411_183512.jpg", thumb: "images/thumbs/MVIMG_20260411_183512.jpg" },
        { src: "images/MVIMG_20260411_193138.jpg", thumb: "images/thumbs/MVIMG_20260411_193138.jpg" },
        { src: "images/MVIMG_20260529_164510.jpg", thumb: "images/thumbs/MVIMG_20260529_164510.jpg" },
        { src: "images/mmexport1775126466854.jpg", thumb: "images/thumbs/mmexport1775126466854.jpg" },
        { src: "images/mmexport1781863937125.jpg", thumb: "images/thumbs/mmexport1781863937125.jpg" },
    ],

    // 背景音乐（可选）
    music: {
        main: "audio/beauty_and_the_beast.mp3",
        birthday: "audio/blessing_world_edition.mp3"
    },

    // 双面情书（可选）
    loveLetters: {
        fromMe: {
            title: "写给你的小情书",
            content: "有人说，爱情是把 everyday 变成 special day 的魔法。\n和你在一起的每一天，连空气都是甜的。\n谢谢你，成为我生命里最温柔的那道光。"
        },
        fromYou: {
            title: "你写给我的话",
            content: "遇见你之前，我没想过会这样认真地喜欢一个人。\n你的温柔、你的笑容、你的一切，都让我忍不住想要靠近。\n未来的路，我也想和你一起慢慢走。"
        }
    },

    // 恋爱故事时间轴（正序叙事）
    // 你可以按真实经历修改日期、标题、描述和照片
    story: [
        {
            date: "2026-02-28",
            title: "顾村公园 · 第一次出去玩",
            desc: "那天我们去顾村公园赏樱。阳光很好，风也温柔，我就是在那天开始，对你有了不一样的感觉。",
            img: "images/IMG_20260228_150029.jpg",
            theme: "sakura"
        },
        {
            date: "2026-03-07",
            title: "上海理工大学 · 怦然心动",
            desc: "你骑着小电驴载我畅游校园，我坐在后座，看着你飞扬的发梢，心跳得有点快。最后给你拍的那张照片，我一直留着。",
            img: "images/IMG_20260307_165005.jpg",
            theme: "campus"
        },
        {
            date: "2026-03-13",
            title: "正式告白",
            desc: "那天我告白得磕磕绊绊，准备好的话讲了一半就忘了，手心全是汗。但你说愿意的那一刻，我觉得全世界都亮了一下。",
            img: "images/IMG_20260314_151609.jpg",
            theme: "sakura"
        },
        {
            date: "2026-03-14",
            title: "辰山植物园 · 樱花初开",
            desc: "在一起的第一天，我们就去了辰山植物园。樱花刚开，你在樱花树下的样子，真的很美。",
            img: "images/IMG_20260314_154756.jpg",
            theme: "sakura"
        },
        {
            date: "2026-03-21",
            title: "上海动物园",
            desc: "我们一起去看了大熊猫和各种小动物，你比小孩子还兴奋。",
            img: "images/IMG_20260328_142819.jpg",
            theme: "campus"
        },
        {
            date: "2026-03-28",
            title: "水族馆",
            desc: "蓝色的水里游着鱼，你眼睛里也像是盛了一片海。",
            img: "images/IMG_20260328_143034.jpg",
            theme: "campus"
        },
        {
            date: "2026-04-05",
            title: "田子坊",
            desc: "在小巷子里乱逛，找了一家咖啡馆坐下，聊了一下午的未来。",
            img: "images/MVIMG_20260411_183512.jpg",
            theme: "tianzifang"
        },
        {
            date: "2026-04-01",
            title: "无锡鼋头渚 · 漫天樱花",
            desc: "那是最棒的一次赏樱。漫天的樱花树下，我们拍出了好多好看的照片，风一吹，花瓣落了你满身。",
            img: "images/IMG_20260401_150906.jpg",
            theme: "sakura"
        },
        {
            date: "2026-05-01",
            title: "露营",
            desc: "第一次一起露营，晚上躺在草地上看星星，你说希望时间能停在那一天。",
            img: "images/IMG_20260501_162444.jpg",
            theme: "island"
        },
        {
            date: "2026-05-03",
            title: "农家乐",
            desc: "去乡下摘了草莓，吃了柴火饭，你笑得像个小太阳。",
            img: "images/IMG_20260505_162002.jpg",
            theme: "tianzifang"
        },
        {
            date: "2026-05-05",
            title: "开卡丁车",
            desc: "你戴上头盔的样子特别帅，虽然开得很慢，但冲线的时候比谁都开心。",
            img: "images/IMG_20260505_171140.jpg",
            theme: "disney"
        },
        {
            date: "2026-05-06",
            title: "脱口秀",
            desc: "我们一起看了人生中第一场脱口秀，你笑得眼泪都出来了。",
            img: "images/IMG_20260506_110921.jpg",
            theme: "tianzifang"
        },
        {
            date: "2026-05-13",
            title: "迪士尼 · 两天一晚",
            desc: `这是我们第一次出远门。我送了你一封信，和一幅用你照片拼成的拼图。你哭了，说："我就知道我没选错。"`,
            img: "images/IMG_20260505_213656.jpg",
            theme: "disney"
        },
        {
            date: "2026-05-29",
            title: "花鸟岛 · 第一次正式旅行",
            desc: "那边太美了，蓝天白云，海风吹着你的草帽。你站在海边，我觉得画面就该停在那里。",
            img: "images/IMG_20260529_110646.jpg",
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
            photos: ["images/IMG_20260328_142819.jpg"]
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
            photos: ["images/MVIMG_20260411_183512.jpg"]
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
            title: "第一次见你时",
            content: "会议室里你认真回答问题的样子，让我记住了好久。那时候还不知道，这个女孩后来会住进我心里。"
        },
        {
            title: "最让我心动的瞬间",
            content: "不是某个特定的场景，而是每次你望向我时，眼睛里那种毫无保留的信任。"
        },
        {
            title: "我最感谢你的三件事",
            content: `谢谢你愿意坐我的小电驴后座，谢谢你说"我就知道我没选错"，谢谢你让我知道被一个人坚定地选择是什么感觉。`
        },
        {
            title: "和你在一起之后，我学会了",
            content: "学会了把一个人放进未来的计划里，学会了细心，也学会了原来爱情真的可以把 everyday 变成 special day。"
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
        letter: `亲爱的宝宝：\n\n今天是你的生日，我坐在电脑前想给你写点什么，却发现所有文字都太轻。\n\n我想起迪士尼那晚，你抱着拼图哭着说"我就知道我没选错"，其实我更想告诉你，我也一样。从顾村公园到辰山植物园，从无锡的樱花到花鸟岛的海风，每一次和你出门，我都偷偷觉得幸运。\n\n你总说自己不够完美，但在我眼里，你认真吃饭的样子、打游戏输了皱眉的样子、半夜迷迷糊糊说梦话的样子，全都很好。\n\n新的一岁，愿你继续被这个世界温柔以待。如果生活偶尔不够温柔，那就换我来。\n\n生日快乐，我的女孩。\n\n永远爱你的我`,
        // 信件署名
        letterSignature: "永远爱你的我",
        // 蜡烛全部熄灭后，蛋糕下方显示的文案
        afterBlowHint: "✨ 愿望已送达星空 ✨"
    },

    // 那些被记录的里程碑：她已经为我做过的、让我感动的事
    milestones: [
        {
            icon: "🎓",
            title: "毕业论文致谢里，有我的名字",
            desc: "她把我写进了毕业论文致谢。那段话很长，但我读了很多遍。",
            quote: "本论文是在导师赵海燕老师的悉心指导下完成的，本文作者在此谨表示衷心的感谢。\n也感谢我的父母以及朋友，在毕业这一年期间遇到的所有帮助过我的人，每一次的失败都是为了筑起更强的自己。\n最后，要特别感谢我的男朋友。缘分让我们从人海中的陌生人，因相似的三观与契合的性格相识、相知，最终走到彼此身边。你见过我的脆弱，理解我的困境，在每一次抉择的路口，都给出我理性的建议。你的偏爱让我有了对抗世界的底气，你的坚守让我相信，好的爱情是彼此成就、共同成长。山水一程，三生有幸，往后岁月，愿与你携手奔赴更辽阔的远方。",
            img: "images/IMG_20260425_150600.jpg"
        },
        {
            icon: "🧵",
            title: "她亲手做的礼物",
            desc: "她花了很多时间，为我做了一件手工。每一个细节里都是心意。",
            img: null
        },
        {
            icon: "💌",
            title: "一叠小卡片",
            desc: "她给我写了很多张小卡片，每一张我都留着。",
            img: null
        }
    ]
};
