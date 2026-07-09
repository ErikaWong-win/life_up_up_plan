# 我们的小世界 💕

一个记录恋爱点滴的静态网站：

- 🖼️ 首屏是**照片拼成的背景墙**，打开时照片会一片片翻转展开
- ⏱️ 正中央显示**在一起多久**
- 💌 向下滚动是**双面情书**卡片，正面是你写给 TA 的，背面是 TA 写给你的，可翻转
- 📸 **回忆画廊**自动收集时光轴里的照片，点击可全屏翻看
- 🎵 右下角悬浮**背景音乐播放器**
- ✨ 页面任意位置点击会飘出小爱心
- 🌟 最下方是**图文并茂的时光轴**

## 快速开始

1. 用浏览器打开 `index.html`。
2. 编辑 `js/config.js` 改成你们自己的内容：
   - `startDate`：在一起的开始日期（格式 `YYYY-MM-DD`）。
   - `photos`：首屏照片墙用到的照片，放到 `images/` 文件夹里。
   - `memories`：每一件小事，支持文字 + 单张/多张照片。
   - `music`（可选）：背景音乐路径，例如 `audio/our_song.mp3`；留空则隐藏音乐按钮。
   - `loveLetters`（可选）：双面情书配置，`fromMe` 是你写给 TA 的，`fromYou` 是 TA 写给你的，正文支持 `\n` 换行。

## 配置示例

```javascript
const CONFIG = {
    startDate: "2022-03-15",

    photos: [
        { src: "images/photo1.jpg" },
        { src: "images/photo2.jpg" },
        { src: "images/photo3.jpg" },
    ],

    music: "",

    loveLetters: {
        fromMe: {
            title: "写给你的小情书 💌",
            content: "有人说，爱情是把 everyday 变成 special day 的魔法。\n和你在一起的每一天，连空气都是甜的。"
        },
        fromYou: {
            title: "你写给我的话 💕",
            content: "遇见你之前，我没想过会这样认真地喜欢一个人。\n你的温柔、你的笑容、你的一切，都让我忍不住想要靠近。"
        }
    },

    memories: [
        {
            date: "2022-03-15",
            title: "我们在一起了",
            desc: "那天风很温柔，你很好看。",
            img: "images/together.jpg"
        },
        {
            date: "2023-02-14",
            title: "第一个情人节",
            desc: "一起去吃了火锅，收到了你写的小卡片。",
            // 也可以放多张图
            img: ["images/v1.jpg", "images/v2.jpg"]
        },
    ]
};
```

## 小提示

- 照片越多，首屏的背景墙越丰富；照片不够时会自动用爱心占位符补上。
- 时光轴会自动按日期从新到旧排序，**回忆画廊**会自动收集时光轴里的所有照片。
- 背景音乐需要浏览器允许自动播放策略，首次通常需要用户点击播放按钮。
- 这是一个纯静态网站，可以直接上传到 GitHub Pages、Vercel、Netlify 等免费托管平台。

---

Made with ❤️
