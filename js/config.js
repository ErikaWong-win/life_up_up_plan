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
    }
};

const CONFIG = {
    // 在一起的开始日期，格式：YYYY-MM-DD
    startDate: "2026-03-17",

    // 首屏照片墙使用的照片
    // 把照片放到 images/ 文件夹，然后在这里添加
    photos: [
        { src: "images/single_blue.jpg" },
        { src: "images/single_red.jpg" },
        { src: "images/together.jpg" },
    ],

    // 背景音乐（可选）
    // 方式一：只配一首背景音乐，填写字符串路径，例如：audio/our_song.mp3
    // 方式二：分别配置普通页和生日页的音乐
    //   music: {
    //       main: "audio/our_song.mp3",
    //       birthday: "audio/happy_birthday.mp3"
    //   }
    // 把 mp3 放到 audio/ 文件夹，不配置或留空时，音乐按钮会自动隐藏
    music: "",

    // 双面情书（可选）
    // fromMe：你写给 TA 的情书；fromYou：TA 写给你的情书
    // title 是标题，content 是正文，支持换行 \n
    loveLetters: {
        fromMe: {
            title: "写给你的小情书 💌",
            content: "有人说，爱情是把 everyday 变成 special day 的魔法。\n和你在一起的每一天，连空气都是甜的。\n谢谢你，成为我生命里最温柔的那道光。"
        },
        fromYou: {
            title: "你写给我的话 💕",
            content: "遇见你之前，我没想过会这样认真地喜欢一个人。\n你的温柔、你的笑容、你的一切，都让我忍不住想要靠近。\n未来的路，我也想和你一起慢慢走。"
        }
    },

    // 恋爱时光轴：每一件小事都可以图文并茂
    // theme 从 THEMES 中选取：campus / island / disney / sakura / tianzifang
    // img 可以是单张图片路径，也可以是多张图片的数组
    memories: [
        {
            date: "2020-05-20",
            title: "我们在一起了",
            desc: "那天阳光很好，你说愿意陪我走下去。",
            img: "images/single_red.jpg",
            theme: "campus"
        },
        {
            date: "2021-02-14",
            title: "第一个情人节",
            desc: "一起吃了火锅，收到了你写的小卡片。",
            img: ["images/single_blue.jpg"],
            theme: "campus"
        },
        {
            date: "2022-07-08",
            title: "花鸟岛看日出",
            desc: "凌晨四点爬起来，海风吹得有点冷，但你的手心很暖。",
            img: "images/together.jpg",
            theme: "island"
        },
        {
            date: "2023-04-15",
            title: "迪士尼烟花夜",
            desc: "城堡前的烟花绽放时，你偷偷在我耳边说 wishes come true。",
            img: "images/together.jpg",
            theme: "disney"
        },
        {
            date: "2023-03-25",
            title: "樱花树下的约定",
            desc: "花瓣落在你的发梢上，那一刻觉得春天特别温柔。",
            img: "images/single_red.jpg",
            theme: "sakura"
        },
        {
            date: "2024-01-12",
            title: "田子坊的咖啡",
            desc: "小巷子里找了一家咖啡馆，聊了一下午的未来。",
            img: "images/single_blue.jpg",
            theme: "tianzifang"
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
        pretitle: "给最特别的你",
        // 大标题，可以改成她的名字
        title: "生日快乐",
        // 蛋糕下方的提示
        subtitle: "点击蜡烛，一起许愿吧",
        // 蜡烛全部熄灭后，给你的话（支持换行 \n）
        message: "（在这里写下你的生日祝福。\n比如：谢谢你出现在我的生命里，让我的每一天都变得值得期待。\n愿你新的一岁，比从前更快乐，更自由，更被爱。\n我会一直在你身边。）",
        // 蜡烛全部熄灭后，蛋糕下方显示的文案
        afterBlowHint: "愿望已实现 ✨"
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
