/**
 * 站点配置文件
 * 修改下面的内容来换成你们自己的信息
 */
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
    // 把 mp3 放到 audio/ 文件夹，然后填写路径，例如：audio/our_song.mp3
    // 不配置或留空时，音乐按钮会自动隐藏
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
    // img 可以是单张图片路径，也可以是多张图片的数组
    memories: [
        {
            date: "2020-05-20",
            title: "我们在一起了",
            desc: "那天阳光很好，你说愿意陪我走下去。",
            img: "images/single_red.jpg"
        },
        {
            date: "2021-02-14",
            title: "第一个情人节",
            desc: "一起吃了火锅，收到了你写的小卡片。",
            img: ["images/single_blue.jpg"]
        },
    ]
};
