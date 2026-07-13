/**
 * 核心脚本：照片墙、倒计时、时光轴、梦幻粒子
 */
(function () {
    const photoWall = document.getElementById("photoWall");
    const startDateText = document.getElementById("startDateText");
    const timeline = document.getElementById("timeline");

    // 显示开始日期
    startDateText.textContent = CONFIG.startDate;

    // ==================== 全屏星空与流星雨（Canvas）====================
    function initStarfield() {
        const canvas = document.getElementById("starfield");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width, height;
        let stars = [];
        let meteors = [];
        let bgCanvas = null;
        let lastMeteorTime = 0;
        let nextMeteorDelay = 0;
        let activeGlowColor = { r: 25, g: 55, b: 95, a: 0.35 };
        let targetGlowColor = { ...activeGlowColor };

        function parseRgba(rgba) {
            const m = rgba.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/);
            if (!m) return { r: 25, g: 55, b: 95, a: 0.35 };
            return {
                r: parseFloat(m[1]),
                g: parseFloat(m[2]),
                b: parseFloat(m[3]),
                a: m[4] !== undefined ? parseFloat(m[4]) : 1
            };
        }

        function lerpColor(current, target, factor) {
            return {
                r: current.r + (target.r - current.r) * factor,
                g: current.g + (target.g - current.g) * factor,
                b: current.b + (target.b - current.b) * factor,
                a: current.a + (target.a - current.a) * factor
            };
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            createBackground();
            initStars();
        }

        // 预先绘制深邃夜空背景，避免每帧重绘渐变
        function createBackground() {
            bgCanvas = document.createElement("canvas");
            bgCanvas.width = width;
            bgCanvas.height = height;
            const bgCtx = bgCanvas.getContext("2d");

            const gradient = bgCtx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, "#0b1526");      // 深普鲁士蓝
            gradient.addColorStop(0.45, "#08101e");   // 藏蓝
            gradient.addColorStop(1, "#050a12");      // 几乎墨黑
            bgCtx.fillStyle = gradient;
            bgCtx.fillRect(0, 0, width, height);

            // 顶部微微的 atmospheric glow，让天空不那么平
            const glow = bgCtx.createRadialGradient(width * 0.5, 0, 0, width * 0.5, height * 0.2, height * 0.8);
            glow.addColorStop(0, "rgba(25, 55, 95, 0.35)");
            glow.addColorStop(0.5, "rgba(15, 35, 65, 0.12)");
            glow.addColorStop(1, "rgba(5, 10, 18, 0)");
            bgCtx.fillStyle = glow;
            bgCtx.fillRect(0, 0, width, height);
        }

        function initStars() {
            stars = [];
            // 大量细小星星：根据屏幕面积，约每 900 像素一颗
            const count = Math.floor((width * height) / 900);
            const colors = [
                { r: 255, g: 255, b: 255 }, // 纯白
                { r: 220, g: 235, b: 255 }, // 淡蓝白
                { r: 255, g: 250, b: 230 }  // 极浅金色
            ];

            for (let i = 0; i < count; i++) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.3 + 0.25, // 针尖般到略大
                    baseAlpha: Math.random() * 0.35 + 0.25,
                    color: color,
                    twinkleSpeed: Math.random() * 0.015 + 0.003, // 极慢闪烁
                    twinkleOffset: Math.random() * Math.PI * 2,
                    twinkle: Math.random() > 0.75 // 只有少数星星会闪烁
                });
            }
        }

        function createMeteor() {
            // 主要角度 30 度，少数略有偏差
            const baseAngle = 30;
            const angleVariation = (Math.random() - 0.5) * 14; // ±7 度
            const angleDeg = baseAngle + angleVariation;
            const angleRad = (angleDeg * Math.PI) / 180;

            // 速度：有的快有的慢，2.5 ~ 8 px/frame
            const speed = Math.random() * 5.5 + 2.5;

            // 拖尾长度随速度变化：快的短促，慢的悠长
            const length = Math.random() * 80 + 80 + speed * 10; // 80 ~ 200px+

            // 起始位置：在画布上方或右方外侧，确保完整划过大半个屏幕
            let x, y;
            if (Math.random() > 0.3) {
                // 从顶部偏右进入
                x = Math.random() * width * 0.8 + width * 0.2;
                y = -length - Math.random() * 150;
            } else {
                // 从右侧进入
                x = width + length + Math.random() * 200;
                y = Math.random() * height * 0.5;
            }

            return {
                x,
                y,
                vx: -Math.cos(angleRad) * speed,
                vy: Math.sin(angleRad) * speed,
                length,
                width: Math.random() * 1.2 + 0.8,
                angleRad,
                opacity: Math.random() * 0.25 + 0.55,
                headSize: Math.random() * 0.9 + 1.0,
                life: 0
            };
        }

        function spawnMeteor(timestamp) {
            if (timestamp - lastMeteorTime < nextMeteorDelay) return;
            lastMeteorTime = timestamp;
            nextMeteorDelay = Math.random() * 3000 + 2000; // 2~5 秒
            meteors.push(createMeteor());
        }

        function drawStar(star, time) {
            let alpha = star.baseAlpha;
            if (star.twinkle) {
                alpha += Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.12;
                alpha = Math.max(0.08, Math.min(0.9, alpha));
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha})`;
            ctx.fill();
        }

        function drawMeteor(meteor) {
            // 尾巴终点 = 头部沿反方向延伸
            const tailEndX = meteor.x + Math.cos(meteor.angleRad) * meteor.length;
            const tailEndY = meteor.y - Math.sin(meteor.angleRad) * meteor.length;

            const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailEndX, tailEndY);
            // 头部：暖白/柔和金色
            gradient.addColorStop(0, `rgba(255, 252, 235, ${meteor.opacity})`);
            gradient.addColorStop(0.15, `rgba(255, 245, 210, ${meteor.opacity * 0.9})`);
            gradient.addColorStop(0.45, `rgba(255, 235, 190, ${meteor.opacity * 0.45})`);
            gradient.addColorStop(1, "rgba(255, 230, 170, 0)");

            ctx.save();
            ctx.lineCap = "round";
            ctx.lineWidth = meteor.width;
            ctx.strokeStyle = gradient;
            ctx.shadowBlur = 6;
            ctx.shadowColor = "rgba(255, 235, 180, 0.25)";
            ctx.beginPath();
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(tailEndX, tailEndY);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // 头部：柔和金色或暖白光点
            ctx.beginPath();
            ctx.arc(meteor.x, meteor.y, meteor.headSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 250, 230, ${meteor.opacity + 0.2})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(255, 230, 160, 0.5)";
            ctx.fill();
            ctx.restore();
        }

        function updateMeteors() {
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.life++;

                // 完全划出屏幕后移除
                if (m.x < -m.length * 1.5 || m.y > height + m.length * 1.5) {
                    meteors.splice(i, 1);
                }
            }
        }

        let time = 0;
        function animate(timestamp) {
            time++;

            // 绘制背景
            if (bgCanvas) {
                ctx.drawImage(bgCanvas, 0, 0);
            }

            // 根据当前主题平滑过渡顶部光晕
            activeGlowColor = lerpColor(activeGlowColor, targetGlowColor, 0.04);
            const glowRgba = `rgba(${Math.round(activeGlowColor.r)}, ${Math.round(activeGlowColor.g)}, ${Math.round(activeGlowColor.b)}, ${activeGlowColor.a.toFixed(3)})`;
            const themeGlow = ctx.createRadialGradient(width * 0.5, height * 0.05, 0, width * 0.5, height * 0.18, height * 0.55);
            themeGlow.addColorStop(0, glowRgba);
            themeGlow.addColorStop(1, "rgba(5, 10, 18, 0)");
            ctx.fillStyle = themeGlow;
            ctx.fillRect(0, 0, width, height);

            // 画静态星星
            for (const star of stars) {
                drawStar(star, time);
            }

            // 生成并画流星
            spawnMeteor(timestamp);
            for (const meteor of meteors) {
                drawMeteor(meteor);
            }
            updateMeteors();

            requestAnimationFrame(animate);
        }

        // 暴露给主题切换器，用于动态改变星空顶部光晕
        window.setThemeGlow = function (color) {
            if (color) targetGlowColor = parseRgba(color);
        };

        window.addEventListener("resize", resize);
        resize();
        requestAnimationFrame(animate);
    }

    // ==================== 照片墙 ====================
    function renderWall() {
        const photos = Array.isArray(CONFIG.photos) ? CONFIG.photos : [];
        const totalPhotos = photos.length;

        // 根据屏幕尺寸计算所需格子数：每个格子约 200px，覆盖约 1.5 倍视口即可
        // 避免固定 36 个导致首屏一次性加载过多大图
        const cellSize = window.innerWidth <= 720 ? 90 : 200;
        const cols = Math.max(3, Math.ceil(window.innerWidth / cellSize));
        const rows = Math.max(3, Math.ceil(window.innerHeight / cellSize * 1.5));
        const WALL_CELLS = Math.min(24, cols * rows);

        photoWall.innerHTML = "";

        // 先创建空占位格子，减轻首帧 DOM 压力
        const cells = [];
        for (let i = 0; i < WALL_CELLS; i++) {
            const photo = totalPhotos > 0 ? photos[i % totalPhotos] : null;
            const delay = (i * 0.05).toFixed(2);
            const cell = document.createElement("div");
            cell.className = "wall-cell flip-in";
            cell.style.animationDelay = `${delay}s`;

            if (!photo || !photo.src) {
                cell.classList.add("placeholder");
                cell.innerHTML = "<span>💕</span>";
            }

            photoWall.appendChild(cell);
            cells.push({ cell, photo, index: i });
        }

        // 没有照片时直接结束
        if (totalPhotos === 0) return;

        // 优先使用缩略图，没有缩略图才用原图
        function pickSrc(photo) {
            return photo.thumb || photo.src;
        }

        // 为每个格子加载图片；首屏直接加载，首屏外用 IntersectionObserver 延迟加载
        const eagerCount = Math.min(WALL_CELLS, Math.ceil(cols * rows * 0.6));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const { cell, photo } = entry.target._wallData;
                if (cell.querySelector("img")) return;

                const img = document.createElement("img");
                img.src = pickSrc(photo);
                img.alt = "回忆";
                img.decoding = "async";
                img.loading = "lazy";
                cell.appendChild(img);
                observer.unobserve(cell);
            });
        }, { rootMargin: "200px 0px 200px 0px", threshold: 0 });

        cells.forEach(({ cell, photo, index }) => {
            if (!photo || !photo.src) return;

            cell._wallData = { cell, photo };

            if (index < eagerCount) {
                const img = document.createElement("img");
                img.src = pickSrc(photo);
                img.alt = "回忆";
                img.decoding = "async";
                img.loading = index < 6 ? "eager" : "lazy";
                cell.appendChild(img);
            } else {
                observer.observe(cell);
            }
        });
    }

    // ==================== 倒计时 ====================
    function updateCounter() {
        const start = new Date(CONFIG.startDate + "T00:00:00");
        const now = new Date();

        if (isNaN(start.getTime())) {
            console.error("开始日期格式错误，请使用 YYYY-MM-DD");
            return;
        }

        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();
        let hours = now.getHours() - start.getHours();
        let minutes = now.getMinutes() - start.getMinutes();
        let seconds = now.getSeconds() - start.getSeconds();

        if (seconds < 0) { seconds += 60; minutes -= 1; }
        if (minutes < 0) { minutes += 60; hours -= 1; }
        if (hours < 0) { hours += 24; days -= 1; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months -= 1;
        }
        if (months < 0) { months += 12; years -= 1; }

        document.getElementById("years").textContent = years;
        document.getElementById("months").textContent = months;
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    setInterval(updateCounter, 1000);
    updateCounter();

    // ==================== 时光轴 ====================
    function renderImages(img) {
        if (!img) {
            return `<div class="img-placeholder">🌟</div>`;
        }

        if (Array.isArray(img)) {
            return img.map(src => `
                <img src="${src}" alt="回忆" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('fallback')">
            `).join("");
        }

        return `<img src="${img}" alt="回忆" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'img-placeholder\'>🌟</div>'">`;
    }

    function renderThemeChapter(themeKey, theme) {
        return `
            <section class="theme-chapter" data-theme="${themeKey}">
                <div class="chapter-glow"></div>
                <div class="chapter-content">
                    <div class="chapter-icon">${theme.emoji}</div>
                    <h3>${theme.label}</h3>
                    <p>${theme.desc}</p>
                </div>
            </section>
        `;
    }

    function renderTimeline() {
        const memories = Array.isArray(CONFIG.memories) ? CONFIG.memories : [];

        if (memories.length === 0) {
            timeline.innerHTML = `
                <ul class="timeline">
                    <li class="timeline-item visible">
                        <div class="timeline-img"><div class="img-placeholder">📝</div></div>
                        <div class="timeline-text">
                            <span class="date">现在</span>
                            <h3>写下你们的第一件小事</h3>
                            <p>在 js/config.js 的 memories 里添加日期、标题、描述和照片，时光轴就会图文并茂地展示出来。</p>
                        </div>
                    </li>
                </ul>
            `;
            return;
        }

        const sorted = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));
        let currentTheme = null;
        let html = "";

        sorted.forEach((item, index) => {
            const themeKey = (item.theme && THEMES[item.theme]) ? item.theme : "campus";
            const theme = THEMES[themeKey];

            // 每次主题切换时：结束上一个 <ul>，插入章节分隔页，开始新的 <ul>
            if (themeKey !== currentTheme) {
                if (currentTheme !== null) {
                    html += "</ul>";
                }
                currentTheme = themeKey;
                html += renderThemeChapter(themeKey, theme);
                html += `<ul class="timeline" data-theme="${themeKey}">`;
            }

            html += `
                <li class="timeline-item" data-theme="${themeKey}">
                    <div class="timeline-img">${renderImages(item.img)}</div>
                    <div class="timeline-text">
                        <span class="theme-badge" data-theme="${themeKey}">${theme.emoji} ${theme.label}</span>
                        <span class="date">${item.date}</span>
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                </li>
            `;
        });

        // 关闭最后一个 <ul>
        if (currentTheme !== null) {
            html += "</ul>";
        }

        timeline.innerHTML = html;
    }

    // ==================== 滚动淡入动画 ====================
    function observeTimeline() {
        const items = document.querySelectorAll(".timeline-item");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

        items.forEach(item => observer.observe(item));
    }

    // ==================== 主题切换与过渡动画 ====================
    function initThemeObserver() {
        const chapters = document.querySelectorAll(".theme-chapter");
        if (chapters.length === 0) return;

        let lastActiveKey = null;

        const observer = new IntersectionObserver((entries) => {
            // 取当前进入视口最靠上的章节作为激活主题
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visible.length > 0) {
                const activeKey = visible[0].target.dataset.theme;
                const activeChapter = visible[0].target;

                if (activeKey !== lastActiveKey) {
                    document.body.dataset.activeTheme = activeKey;
                    lastActiveKey = activeKey;

                    // 给刚激活的章节加一个短暂脉冲，强化“进入新主题”的感知
                    activeChapter.classList.remove("switching");
                    void activeChapter.offsetWidth; // 强制重绘，让动画可复用
                    activeChapter.classList.add("switching");
                    setTimeout(() => activeChapter.classList.remove("switching"), 900);
                }

                const theme = THEMES[activeKey];
                if (theme && typeof window.setThemeGlow === "function") {
                    window.setThemeGlow(theme.glow);
                }
            }
        }, { threshold: 0.35, rootMargin: "-20% 0px -50% 0px" });

        chapters.forEach(ch => observer.observe(ch));

        // 章节进入视口时的淡入动画
        const entranceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    entranceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        chapters.forEach(ch => entranceObserver.observe(ch));

        // 初始化第一个主题
        const first = chapters[0];
        if (first) {
            const key = first.dataset.theme;
            document.body.dataset.activeTheme = key;
            lastActiveKey = key;
            first.classList.add("visible");
            const theme = THEMES[key];
            if (theme && typeof window.setThemeGlow === "function") {
                window.setThemeGlow(theme.glow);
            }
        }
    }

    // 平滑滚动到时光轴
    function initScrollHint() {
        const hint = document.querySelector(".scroll-hint");
        if (!hint) return;
        hint.addEventListener("click", () => {
            document.querySelector(".timeline-section").scrollIntoView({ behavior: "smooth" });
        });
    }

    // ==================== 顶部滚动进度条 ====================
    function initScrollProgress() {
        const bar = document.getElementById("scrollProgress");
        if (!bar) return;
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = `${progress}%`;
        });
    }

    // ==================== 恋爱数据统计 ====================
    function initStats() {
        const section = document.getElementById("statsSection");
        if (!section) return;

        const start = new Date(CONFIG.startDate + "T00:00:00");
        const now = new Date();
        const diffMs = now - start;
        const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

        const photos = Array.isArray(CONFIG.photos) ? CONFIG.photos.length : 0;
        const memories = Array.isArray(CONFIG.memories) ? CONFIG.memories.length : 0;
        // 心动瞬间：按在一起天数 × 每天 3 次估算，也可以自己改
        const heartbeats = totalDays * 3 + memories * 10;

        const targets = {
            days: totalDays,
            photos: photos,
            memories: memories,
            heartbeat: heartbeats
        };

        // 设置最终值到 data-value，方便后续动画读取
        section.querySelectorAll(".stat-number").forEach(el => {
            const key = el.dataset.target;
            if (targets[key] !== undefined) {
                el.dataset.value = targets[key];
            }
        });

        // 滚动到区域时执行计数动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll(".stat-number").forEach(el => {
                        const target = parseInt(el.dataset.value, 10) || 0;
                        animateNumber(el, target, 1500);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });

        observer.observe(section);
    }

    function animateNumber(el, target, duration) {
        const start = performance.now();
        const from = 0;

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(from + (target - from) * eased);
            el.textContent = current.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(step);
    }

    // ==================== 下一个纪念日倒计时 ====================
    function initAnniversaryCountdown() {
        const labelEl = document.getElementById("anniversaryLabel");
        const dateEl = document.getElementById("anniversaryDate");
        if (!labelEl || !dateEl) return;

        const start = new Date(CONFIG.startDate + "T00:00:00");
        const now = new Date();

        // 找到下一个有意义的纪念日：周年、100天、520天、1314天
        const milestones = [];
        const totalDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

        // 下一个周年
        const years = Math.floor(totalDays / 365);
        const nextYearDate = new Date(start);
        nextYearDate.setFullYear(start.getFullYear() + years + 1);
        milestones.push({ name: `${years + 1} 周年纪念日`, date: nextYearDate });

        // 100 天倍数（100, 200, 300...）
        const nextHundred = Math.ceil((totalDays + 1) / 100) * 100;
        const hundredDate = new Date(start.getTime() + nextHundred * 24 * 60 * 60 * 1000);
        milestones.push({ name: `第 ${nextHundred} 天`, date: hundredDate });

        // 520 天
        if (totalDays < 520) {
            milestones.push({ name: "第 520 天", date: new Date(start.getTime() + 520 * 24 * 60 * 60 * 1000) });
        }

        // 1314 天
        if (totalDays < 1314) {
            milestones.push({ name: "第 1314 天", date: new Date(start.getTime() + 1314 * 24 * 60 * 60 * 1000) });
        }

        // 情人节（每年 2 月 14）
        let valentine = new Date(now.getFullYear(), 1, 14);
        if (valentine <= now) {
            valentine = new Date(now.getFullYear() + 1, 1, 14);
        }
        milestones.push({ name: "情人节", date: valentine });

        // 取最近的未来纪念日
        const future = milestones
            .filter(m => m.date > now)
            .sort((a, b) => a.date - b.date);

        const next = future.length > 0 ? future[0] : { name: "明天", date: new Date(now.getTime() + 24 * 60 * 60 * 1000) };

        labelEl.textContent = `距离我们的 ${next.name}还有`;
        dateEl.textContent = `纪念日：${next.date.toLocaleDateString("zh-CN")}`;

        function updateCountdown() {
            const current = new Date();
            const diff = next.date - current;

            if (diff <= 0) {
                document.getElementById("annDays").textContent = "0";
                document.getElementById("annHours").textContent = "00";
                document.getElementById("annMinutes").textContent = "00";
                document.getElementById("annSeconds").textContent = "00";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById("annDays").textContent = days;
            document.getElementById("annHours").textContent = String(hours).padStart(2, "0");
            document.getElementById("annMinutes").textContent = String(minutes).padStart(2, "0");
            document.getElementById("annSeconds").textContent = String(seconds).padStart(2, "0");
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ==================== 双面情书打字机 ====================
    const typewriterTimers = {};
    const typewriterDone = { front: false, back: false };

    function initLoveLetter() {
        const card = document.getElementById("loveLetterCard");
        const titleFront = document.getElementById("loveLetterTitleFront");
        const contentFront = document.getElementById("loveLetterContentFront");
        const titleBack = document.getElementById("loveLetterTitleBack");
        const contentBack = document.getElementById("loveLetterContentBack");
        const flipToBack = document.getElementById("flipToBack");
        const flipToFront = document.getElementById("flipToFront");
        const replayFront = document.getElementById("replayFront");
        const replayBack = document.getElementById("replayBack");

        if (!card || !titleFront || !contentFront) return;

        // 兼容旧配置：如果只有 loveLetter，则两面显示同一封
        const letters = CONFIG.loveLetters || {
            fromMe: CONFIG.loveLetter || { title: "", content: "" },
            fromYou: CONFIG.loveLetter || { title: "", content: "" }
        };
        const frontLetter = letters.fromMe || { title: "", content: "" };
        const backLetter = letters.fromYou || { title: "", content: "" };

        titleFront.textContent = frontLetter.title || "";
        titleBack.textContent = backLetter.title || "";

        function typeText(side, text, el) {
            if (typewriterTimers[side]) clearInterval(typewriterTimers[side]);
            el.textContent = "";
            el.classList.remove("done");
            typewriterDone[side] = false;
            let index = 0;
            typewriterTimers[side] = setInterval(() => {
                if (index < text.length) {
                    el.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typewriterTimers[side]);
                    el.classList.add("done");
                    typewriterDone[side] = true;
                }
            }, 55);
        }

        function showFace(face) {
            const isBack = face === "back";
            card.classList.toggle("flipped", isBack);

            // 翻到背面时，如果背面情书还没打过字，开始打字
            if (isBack && !typewriterDone.back && backLetter.content) {
                setTimeout(() => typeText("back", backLetter.content, contentBack), 450);
            }
        }

        flipToBack.addEventListener("click", () => showFace("back"));
        flipToFront.addEventListener("click", () => showFace("front"));

        replayFront.addEventListener("click", () => {
            if (frontLetter.content) typeText("front", frontLetter.content, contentFront);
        });
        replayBack.addEventListener("click", () => {
            if (backLetter.content) typeText("back", backLetter.content, contentBack);
        });

        // 首屏翻转动画基本结束后，开始打正面情书
        if (frontLetter.content) {
            setTimeout(() => typeText("front", frontLetter.content, contentFront), 1800);
        }
    }

    // ==================== 回忆画廊 ====================
    const galleryImages = [];

    function collectGalleryImages() {
        galleryImages.length = 0;
        const memories = Array.isArray(CONFIG.memories) ? CONFIG.memories : [];
        memories.forEach(item => {
            if (!item.img) return;
            if (Array.isArray(item.img)) {
                item.img.forEach(src => galleryImages.push({ src, title: item.title, date: item.date }));
            } else {
                galleryImages.push({ src: item.img, title: item.title, date: item.date });
            }
        });
    }

    function renderGallery() {
        const grid = document.getElementById("galleryGrid");
        if (!grid) return;

        collectGalleryImages();
        if (galleryImages.length === 0) {
            grid.innerHTML = `<div class="gallery-item visible" style="grid-column: 1 / -1; display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#e0c3fc,#fbc2eb);color:#fff;">在 config.js 的 memories 里添加照片，这里会自动生成画廊 💕</div>`;
            return;
        }

        grid.innerHTML = galleryImages.map((item, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${item.src}" alt="${item.title || "回忆"}" loading="lazy">
            </div>
        `).join("");

        observeGallery();
        initLightbox();
    }

    function observeGallery() {
        const items = document.querySelectorAll(".gallery-item");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

        items.forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.05}s`;
            observer.observe(item);
        });
    }

    // ==================== 灯箱 ====================
    let currentLightboxIndex = 0;

    function initLightbox() {
        const lightbox = document.getElementById("lightbox");
        const img = document.getElementById("lightboxImg");
        const closeBtn = document.getElementById("lightboxClose");
        const prevBtn = document.getElementById("lightboxPrev");
        const nextBtn = document.getElementById("lightboxNext");
        if (!lightbox || !img) return;

        document.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", () => {
                currentLightboxIndex = parseInt(item.dataset.index, 10);
                openLightbox();
            });
        });

        function openLightbox() {
            if (galleryImages.length === 0) return;
            img.src = galleryImages[currentLightboxIndex].src;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function closeLightbox() {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        }

        function showPrev() {
            currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
            img.src = galleryImages[currentLightboxIndex].src;
        }

        function showNext() {
            currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
            img.src = galleryImages[currentLightboxIndex].src;
        }

        closeBtn.addEventListener("click", closeLightbox);
        prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });
        nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        });
    }

    // ==================== 她对我的意义 ====================
    function initMeaningSection() {
        const section = document.getElementById("meaningSection");
        const grid = document.getElementById("meaningGrid");
        if (!section || !grid) return;

        const items = Array.isArray(CONFIG.meaningToMe) ? CONFIG.meaningToMe : [];
        if (items.length === 0) {
            section.style.display = "none";
            return;
        }

        grid.innerHTML = items.map((item, index) => `
            <div class="meaning-card" style="transition-delay: ${index * 0.12}s">
                <h3>${item.title || ""}</h3>
                <p>${item.content || ""}</p>
            </div>
        `).join("");

        const cards = grid.querySelectorAll(".meaning-card");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        cards.forEach(card => observer.observe(card));
    }

    // ==================== 生日过渡页 ====================
    function initBirthdayTransition() {
        const section = document.getElementById("birthdayTransition");
        if (!section) return;

        const content = section.querySelector(".transition-content");
        if (!content) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });

        observer.observe(content);
    }

    // ==================== 生日专属页 ====================
    function initBirthdaySection() {
        const section = document.getElementById("birthdaySection");
        if (!section) return;

        const birthdayConfig = CONFIG.birthday || {};

        // 应用配置文案
        const pretitle = document.getElementById("birthdayPretitle");
        const title = document.getElementById("birthdayTitle");
        const subtitle = document.getElementById("birthdaySubtitle");
        const cakeHint = document.getElementById("cakeHint");

        if (pretitle) pretitle.textContent = birthdayConfig.pretitle || "给最特别的你";
        if (title) title.textContent = birthdayConfig.title || "生日快乐";
        if (subtitle) subtitle.textContent = birthdayConfig.subtitle || "点击蜡烛，一起许愿吧";

        // 生日页进入视口时添加 visible 类，触发标题入场动画
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        sectionObserver.observe(section);

        // 蜡烛交互
        const candles = section.querySelectorAll(".candle");
        const cakeContainer = document.getElementById("cakeContainer");
        const birthdayMessage = document.getElementById("birthdayMessage");
        const typewriter = document.getElementById("birthdayTypewriter");
        let extinguishedCount = 0;
        let messageTyped = false;

        function typeBirthdayMessage(text) {
            if (!typewriter) return;
            typewriter.textContent = "";
            typewriter.classList.remove("done");
            let index = 0;
            const timer = setInterval(() => {
                if (index < text.length) {
                    typewriter.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(timer);
                    typewriter.classList.add("done");
                }
            }, 55);
        }

        function onAllCandlesOut() {
            if (cakeContainer) cakeContainer.classList.add("all-out");
            if (cakeHint) cakeHint.textContent = birthdayConfig.afterBlowHint || "愿望已实现 ✨";

            // 显示祝福语
            if (birthdayMessage && !messageTyped) {
                messageTyped = true;
                birthdayMessage.classList.add("show");
                if (birthdayConfig.message) {
                    setTimeout(() => typeBirthdayMessage(birthdayConfig.message), 400);
                }
            }

            // 触发烟花
            if (typeof window.startBirthdayFireworks === "function") {
                window.startBirthdayFireworks();
            }

            // 生日页音乐切换
            if (typeof window.switchBirthdayMusic === "function") {
                window.switchBirthdayMusic();
            }
        }

        candles.forEach(candle => {
            candle.addEventListener("click", () => {
                if (candle.classList.contains("extinguished")) return;
                candle.classList.add("extinguished");
                extinguishedCount++;
                if (extinguishedCount >= candles.length) {
                    setTimeout(onAllCandlesOut, 500);
                }
            });
        });
    }

    // ==================== 烟花画布 ====================
    function initFireworks() {
        const canvas = document.getElementById("fireworks");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width, height;
        let particles = [];
        let running = false;
        let animationId = null;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        function createParticle(x, y, color) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            return {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.008,
                color,
                size: Math.random() * 2.5 + 1
            };
        }

        function explode(x, y) {
            const colors = ["#ffcc4d", "#e66ef7", "#ff9ec8", "#8fd3f4", "#ff9f5a", "#ffffff"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const count = Math.floor(Math.random() * 30 + 40);
            for (let i = 0; i < count; i++) {
                particles.push(createParticle(x, y, color));
            }
        }

        function animate() {
            if (!running && particles.length === 0) {
                cancelAnimationFrame(animationId);
                animationId = null;
                ctx.clearRect(0, 0, width, height);
                return;
            }

            // 拖尾效果
            ctx.fillStyle = "rgba(26, 18, 37, 0.15)";
            ctx.fillRect(0, 0, width, height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08; // 重力
                p.vx *= 0.98;
                p.vy *= 0.98;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animate);
        }

        function launchFirework() {
            if (!running) return;
            const x = Math.random() * width * 0.8 + width * 0.1;
            const y = Math.random() * height * 0.4 + height * 0.1;
            explode(x, y);
        }

        window.startBirthdayFireworks = function () {
            running = true;
            if (!animationId) animate();

            // 连续放多轮烟花
            let bursts = 0;
            const maxBursts = 8;
            const interval = setInterval(() => {
                launchFirework();
                bursts++;
                if (bursts >= maxBursts) {
                    clearInterval(interval);
                    // 再放最后一轮后停止生成
                    setTimeout(() => { running = false; }, 2500);
                }
            }, 400);
        };

        window.stopBirthdayFireworks = function () {
            running = false;
        };

        window.addEventListener("resize", resize);
        resize();
    }

    // ==================== 未来约定 ====================
    function initFutureSection() {
        const section = document.getElementById("futureSection");
        const grid = document.getElementById("futureGrid");
        const milestoneEl = document.getElementById("nextMilestone");
        if (!section || !grid) return;

        const promises = Array.isArray(CONFIG.futurePromises) ? CONFIG.futurePromises : [];
        if (promises.length === 0) {
            section.style.display = "none";
            return;
        }

        grid.innerHTML = promises.map((item, index) => `
            <div class="future-item ${item.checked ? "checked" : ""}" data-index="${index}" style="transition-delay: ${index * 0.08}s">
                <span class="checkbox">✓</span>
                <p>${item.text || ""}</p>
            </div>
        `).join("");

        // 点击切换勾选状态
        grid.querySelectorAll(".future-item").forEach(el => {
            el.addEventListener("click", () => {
                el.classList.toggle("checked");
                const index = parseInt(el.dataset.index, 10);
                if (CONFIG.futurePromises[index]) {
                    CONFIG.futurePromises[index].checked = el.classList.contains("checked");
                }
            });
        });

        // 入场动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        grid.querySelectorAll(".future-item").forEach(item => observer.observe(item));

        // 下一个重要日子倒计时（下一个生日）
        if (milestoneEl) {
            const now = new Date();
            const currentYear = now.getFullYear();
            const birthday = new Date(CONFIG.startDate + "T00:00:00");
            let nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
            if (nextBirthday <= now) {
                nextBirthday = new Date(currentYear + 1, birthday.getMonth(), birthday.getDate());
            }

            const diffDays = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
            milestoneEl.innerHTML = `
                <h3>距离她的下一个生日还有</h3>
                <p>${diffDays} 天</p>
            `;
            observer.observe(milestoneEl);
        }
    }

    // ==================== 背景音乐播放器 ====================
    function initMusicPlayer() {
        const btn = document.getElementById("musicPlayer");
        const audio = document.getElementById("bgMusic");
        if (!btn || !audio) return;

        // 兼容旧配置：字符串形式；新配置：对象 { main, birthday }
        let mainSrc = "";
        let birthdaySrc = "";
        if (typeof CONFIG.music === "string") {
            mainSrc = CONFIG.music;
        } else if (CONFIG.music && typeof CONFIG.music === "object") {
            mainSrc = CONFIG.music.main || "";
            birthdaySrc = CONFIG.music.birthday || "";
        }

        if (!mainSrc && !birthdaySrc) {
            btn.classList.add("hidden");
            return;
        }

        audio.src = mainSrc || birthdaySrc;
        let isPlaying = false;
        let currentSrc = audio.src;
        let birthdayMode = false;

        function play() {
            audio.play().then(() => {
                btn.classList.add("playing");
                isPlaying = true;
            }).catch(err => {
                console.warn("音乐自动播放被阻止，请点击按钮手动播放", err);
            });
        }

        function switchTo(src) {
            if (!src || currentSrc === src) return;
            const wasPlaying = isPlaying;
            audio.src = src;
            currentSrc = src;
            if (wasPlaying) {
                play();
            }
        }

        btn.addEventListener("click", () => {
            if (isPlaying) {
                audio.pause();
                btn.classList.remove("playing");
                isPlaying = false;
            } else {
                play();
            }
        });

        audio.addEventListener("ended", () => {
            isPlaying = false;
            btn.classList.remove("playing");
        });

        // 暴露给生日页：切换到生日音乐
        window.switchBirthdayMusic = function () {
            if (birthdayMode) return;
            birthdayMode = true;
            if (birthdaySrc) {
                switchTo(birthdaySrc);
            }
        };

        // 离开生日页时切回主音乐（可选）
        window.switchMainMusic = function () {
            if (!birthdayMode) return;
            birthdayMode = false;
            if (mainSrc) {
                switchTo(mainSrc);
            }
        };
    }

    // ==================== 点击飘爱心 ====================
    function initClickHearts() {
        const hearts = ["💕", "💖", "💗", "💓", "🌟", "✨"];
        document.addEventListener("click", (e) => {
            // 避免点击按钮、链接、画廊时触发
            if (e.target.closest("button, a, .gallery-item, .lightbox-nav, .lightbox-close")) return;

            const heart = document.createElement("span");
            heart.className = "click-heart";
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${e.clientX}px`;
            heart.style.top = `${e.clientY}px`;
            heart.style.setProperty("--tx", `${(Math.random() - 0.5) * 60}px`);
            heart.style.setProperty("--rot", `${(Math.random() - 0.5) * 40}deg`);
            heart.style.fontSize = `${Math.random() * 0.8 + 1}rem`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1200);
        });
    }

    // ==================== 初始化 ====================
    initStarfield();
    renderWall();
    renderGallery();
    renderTimeline();
    observeTimeline();
    initThemeObserver();
    initScrollHint();
    initScrollProgress();
    initStats();
    initAnniversaryCountdown();
    initLoveLetter();
    initMeaningSection();
    initBirthdayTransition();
    initBirthdaySection();
    initFireworks();
    initFutureSection();
    initMusicPlayer();
    initClickHearts();
})();
