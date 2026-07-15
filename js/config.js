/**
 * 站点配置文件
 * 修改下面的内容来换成你们自己的信息
 */

// 时光轴主题定义
// 每个主题对应一种氛围、配色和装饰
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
    startDate: "2026-03-17",

    // 首屏照片墙使用的照片
    // 把照片放到 images/ 文件夹，然后在这里添加
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
    // 方式一：只配一首背景音乐，填写字符串路径，例如：audio/our_song.mp3
    // 方式二：分别配置普通页和生日页的音乐
      music: {
          main: "audio/beauty_and_the_beast.mp3",
          birthday: "audio/blessing_world_edition.mp3"
      },
    // 把 mp3 放到 audio/ 文件夹，不配置或留空时，音乐按钮会自动隐藏
    // music: "",

    // 双面情书（可选）
    // fromMe：你写给 TA 的情书；fromYou：TA 写给你的情书
    // title 是标题，content 是正文，支持换行 \n
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

    // 恋爱时光轴：每一件小事都可以图文并茂
    // theme 从 THEMES 中选取：campus / island / disney / sakura / tianzifang / graduation
    // img 可以是单张图片路径，也可以是多张图片的数组
    memories: [
        {
            date: "2026-04-25",
            title: "她把我写进了毕业论文致谢",
            desc: "本论文是在导师赵海燕老师的悉心指导下完成的，本文作者在此谨表示衷心的感谢。\n也感谢我的父母以及朋友，在毕业这一年期间遇到的所有帮助过我的人，每一次的失败都是为了筑起更强的自己。\n最后，要特别感谢我的男朋友。缘分让我们从人海中的陌生人，因相似的三观与契合的性格相识、相知，最终走到彼此身边。你见过我的脆弱，理解我的困境，在每一次抉择的路口，都给出我理性的建议。你的偏爱让我有了对抗世界的底气，你的坚守让我相信，好的爱情是彼此成就、共同成长。山水一程，三生有幸，往后岁月，愿与你携手奔赴更辽阔的远方。",
            img: "images/IMG_20260425_150600.jpg",
            theme: "graduation"
        },
        {
            date: "2020-05-20",
            title: "我们在一起了",
            desc: "那天阳光很好，你说愿意陪我走下去。",
            img: "images/IMG_20260228_150029.jpg",
            theme: "campus"
        },
        {
            date: "2021-02-14",
            title: "第一个情人节",
            desc: "一起吃了火锅，收到了你写的小卡片。",
            img: ["images/IMG_20260307_165005.jpg"],
            theme: "campus"
        },
        {
            date: "2022-07-08",
            title: "花鸟岛看日出",
            desc: "凌晨四点爬起来，海风吹得有点冷，但你的手心很暖。",
            img: "images/IMG_20260314_154756.jpg",
            theme: "island"
        },
        {
            date: "2023-04-15",
            title: "迪士尼烟花夜",
            desc: "城堡前的烟花绽放时，你偷偷在我耳边说 wishes come true。",
            img: "images/IMG_20260314_182751.jpg",
            theme: "disney"
        },
        {
            date: "2023-03-25",
            title: "樱花树下的约定",
            desc: "花瓣落在你的发梢上，那一刻觉得春天特别温柔。",
            img: "images/IMG_20260328_211151.jpg",
            theme: "sakura"
        },
        {
            date: "2024-01-12",
            title: "田子坊的咖啡",
            desc: "小巷子里找了一家咖啡馆，聊了一下午的未来。",
            img: "images/IMG_20260328_213159.jpg",
            theme: "tianzifang"
        }
    ],

    // 足迹地图：长三角回忆地标
    // city: 地标完整名称
    // shortName: 短名称
    // date: 回忆时间
    // lat / lng: 真实地理经纬度
    // icon: 标记图标
    // photos: 该地点的回忆照片数组（可选）
    footprints: [
        {
            city: "无锡市 · 鼋头渚樱花园",
            shortName: "无锡",
            date: "2023-04",
            lat: 31.48,
            lng: 120.22,
            icon: "🌸",
            photos: ["images/IMG_20260228_150029.jpg"]
        },
        {
            city: "青浦区 · 现在住的地方",
            shortName: "青浦",
            date: "2024-08",
            lat: 31.15,
            lng: 121.12,
            icon: "🏠",
            photos: ["images/IMG_20260307_165005.jpg"]
        },
        {
            city: "松江区 · 辰山植物园",
            shortName: "松江",
            date: "2025-03",
            lat: 31.03,
            lng: 121.23,
            icon: "🌿",
            photos: ["images/IMG_20260314_154756.jpg"]
        },
        {
            city: "静安区 · 静安大悦城",
            shortName: "静安",
            date: "2025-10",
            lat: 31.23,
            lng: 121.45,
            icon: "🎡",
            photos: ["images/IMG_20260314_182751.jpg"]
        },
        {
            city: "杨浦区 · 上海理工大学",
            shortName: "杨浦",
            date: "2026-06",
            lat: 31.27,
            lng: 121.52,
            icon: "📚",
            photos: ["images/IMG_20260328_211151.jpg"]
        },
        {
            city: "嵊泗县 · 花鸟岛",
            shortName: "花鸟岛",
            date: "2022-07",
            lat: 30.85,
            lng: 122.67,
            icon: "🌊",
            photos: ["images/IMG_20260314_154756.jpg"]
        }
    ],

    // 她对我的意义：用几个小标题，写下她在你生命里的分量
    // 这些内容会逐张卡片呈现，建议写得真实、具体
    meaningToMe: [
        {
            title: "第一次见你时",
            content: "（在这里写下你初见她时的心情，比如：那天阳光很好，你笑着走过来，我突然就不知道该怎么说话了。）"
        },
        {
            title: "最让我心动的瞬间",
            content: "（写下某一个让你特别心动的时刻，比如：你睡着时皱着眉，我悄悄帮你把头发别到耳后。）"
        },
        {
            title: "我最感谢你的三件事",
            content: "（写下她让你感动或改变的三件事，比如：谢谢你愿意听我讲无聊的废话，谢谢你总是把西瓜最甜的心留给我。）"
        },
        {
            title: "和你在一起之后，我学会了",
            content: "（写下她带给你的成长，比如：学会了细心，学会了表达，学会了把一个人放进未来的计划里。）"
        }
    ],

    // 生日专属页配置
    birthday: {
        // 蛋糕上方的小字
        pretitle: "致我 23 岁的女孩",
        // 大标题，可以改成她的名字
        title: "生日快乐",
        // 蛋糕下方的提示
        subtitle: "愿你眼里有星河，笑里有清风",
        // 蜡烛全部熄灭后，给你的话（支持换行 \n）
        message: "23 岁的你，比星光更温柔，比时间更珍贵。\n谢谢你出现在我的生命里，让我的每一天都有了期待。\n愿你新的一岁，被偏爱、被理解、被全世界的温柔以待。\n我会一直在你身边，陪你把每一个平凡的日子，都过成值得纪念的仪式。",
        // 蜡烛全部熄灭后，蛋糕下方显示的文案
        afterBlowHint: "✨ 愿望已送达星空 ✨"
    },

    // 未来约定：可以勾选的心愿清单
    futurePromises: [
        { text: "明年一起去一个没去过的地方旅行" },
        { text: "一起看一场跨年烟花" },
        { text: "学做一道她爱吃的菜" },
        { text: "去海边看一次完整的日出" },
        { text: "养一盆只属于我们的植物" },
        { text: "陪她过很多个生日" }
    ]
};
