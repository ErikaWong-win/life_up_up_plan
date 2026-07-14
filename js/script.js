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
        let activeGlowColor = { r: 90, g: 80, b: 75, a: 0.22 };
        let targetGlowColor = { ...activeGlowColor };

        function parseRgba(rgba) {
            const m = rgba.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/);
            if (!m) return { r: 90, g: 80, b: 75, a: 0.22 };
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
            glow.addColorStop(0, "rgba(80, 70, 65, 0.22)");
            glow.addColorStop(0.5, "rgba(60, 55, 55, 0.08)");
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
            activeGlowColor = lerpColor(activeGlowColor, targetGlowColor, 0.025);
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

        // 根据屏幕尺寸计算所需格子数
        // PC 端使用 200px 基准格子，覆盖约 1.5 倍视口高度，确保铺满面
        const cellSize = window.innerWidth <= 720 ? 90 : 200;
        const cols = Math.max(3, Math.ceil(window.innerWidth / cellSize));
        const rows = Math.max(3, Math.ceil(window.innerHeight / cellSize * 1.5));
        // PC 端放开上限，避免大屏幕上出现空白；移动端控制数量保证性能
        const maxCells = window.innerWidth <= 720 ? 48 : 240;
        const WALL_CELLS = Math.min(cols * rows, maxCells);

        photoWall.innerHTML = "";

        // 先创建空占位格子，减轻首帧 DOM 压力
        const cells = [];
        for (let i = 0; i < WALL_CELLS; i++) {
            const photo = totalPhotos > 0 ? photos[i % totalPhotos] : null;
            // 动画延迟按行列位置计算，避免大数量时尾部延迟过长
            const row = Math.floor(i / cols);
            const col = i % cols;
            const delay = Math.min((row + col) * 0.04, 1.5).toFixed(2);
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
        const eagerCount = Math.min(WALL_CELLS, Math.ceil(cols * Math.ceil(window.innerHeight / cellSize) * 0.75));
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
                img.loading = index < 9 ? "eager" : "lazy";
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
            }, 70);
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
                item.img.forEach(src => galleryImages.push({ src, title: item.title, date: item.date, source: "memory" }));
            } else {
                galleryImages.push({ src: item.img, title: item.title, date: item.date, source: "memory" });
            }
        });

        const footprints = Array.isArray(CONFIG.footprints) ? CONFIG.footprints : [];
        footprints.forEach(item => {
            if (!Array.isArray(item.photos)) return;
            item.photos.forEach(src => galleryImages.push({ src, title: item.city, date: item.date, source: "footprint", city: item.city }));
        });
    }

    function renderGallery() {
        const grid = document.getElementById("galleryGrid");
        if (!grid) return;

        const memoryImages = galleryImages.filter(item => item.source === "memory");
        if (memoryImages.length === 0) {
            grid.innerHTML = `<div class="gallery-item visible" style="grid-column: 1 / -1; display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#e0c3fc,#fbc2eb);color:#fff;">在 config.js 的 memories 里添加照片，这里会自动生成画廊 💕</div>`;
            return;
        }

        grid.innerHTML = galleryImages.map((item, index) => {
            if (item.source !== "memory") return "";
            return `
                <div class="gallery-item" data-index="${index}">
                    <img src="${item.src}" alt="${item.title || "回忆"}" loading="lazy">
                </div>
            `;
        }).join("");

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

    function openLightbox() {
        const lightbox = document.getElementById("lightbox");
        const img = document.getElementById("lightboxImg");
        if (galleryImages.length === 0 || !lightbox || !img) return;
        img.src = galleryImages[currentLightboxIndex].src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        const lightbox = document.getElementById("lightbox");
        if (!lightbox) return;
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    function showLightboxPrev() {
        const img = document.getElementById("lightboxImg");
        if (!img || galleryImages.length === 0) return;
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
        img.src = galleryImages[currentLightboxIndex].src;
    }

    function showLightboxNext() {
        const img = document.getElementById("lightboxImg");
        if (!img || galleryImages.length === 0) return;
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
        img.src = galleryImages[currentLightboxIndex].src;
    }

    function initLightbox() {
        const lightbox = document.getElementById("lightbox");
        const closeBtn = document.getElementById("lightboxClose");
        const prevBtn = document.getElementById("lightboxPrev");
        const nextBtn = document.getElementById("lightboxNext");
        if (!lightbox) return;

        document.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", () => {
                currentLightboxIndex = parseInt(item.dataset.index, 10);
                openLightbox();
            });
        });

        if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
        if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showLightboxPrev(); });
        if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showLightboxNext(); });
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showLightboxPrev();
            if (e.key === "ArrowRight") showLightboxNext();
        });
    }

    // ==================== 足迹地图（真实长三角手绘地图） ====================
    function renderFootprintMap() {
        const section = document.getElementById("footprintSection");
        const mapWrap = document.getElementById("handdrawnMap");
        const markersEl = document.getElementById("mapMarkers");
        const tooltip = document.getElementById("mapTooltip");
        const legendEl = document.getElementById("footprintLegend");
        if (!section || !mapWrap || !markersEl || !tooltip || !legendEl) return;

        const footprints = Array.isArray(CONFIG.footprints) ? CONFIG.footprints : [];
        if (footprints.length === 0) {
            section.style.display = "none";
            return;
        }

        const viewBoxWidth = 800;
        const viewBoxHeight = 600;
        const minLng = 119.0;
        const maxLng = 122.3;
        const minLat = 30.0;
        const maxLat = 32.5;

        function lngToX(lng) {
            return ((lng - minLng) / (maxLng - minLng)) * viewBoxWidth;
        }

        function latToY(lat) {
            return viewBoxHeight - ((lat - minLat) / (maxLat - minLat)) * viewBoxHeight;
        }

        // 可爱装饰符号定义
        const defs = `
            <defs>
                <filter id="handDrawn" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
                </filter>
                <symbol id="mapHeart" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </symbol>
                <symbol id="mapStar" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </symbol>
                <symbol id="mapSparkle" viewBox="0 0 24 24">
                    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
                </symbol>
            </defs>
        `;

        // 经纬网格
        let gridLines = "";
        for (let i = 1; i < 8; i++) {
            const x = (viewBoxWidth / 8) * i;
            gridLines += `<line class="map-grid" x1="${x}" y1="0" x2="${x}" y2="${viewBoxHeight}" />`;
        }
        for (let i = 1; i < 6; i++) {
            const y = (viewBoxHeight / 6) * i;
            gridLines += `<line class="map-grid" x1="0" y1="${y}" x2="${viewBoxWidth}" y2="${y}" />`;
        }

        // 真实长三角地理轮廓（高精度、可爱装饰）
        const landPaths = `
            <g class="map-land">
                <!-- 陆地背景 -->
                <path class="landmass" d="M 120 260 C 170 235, 240 218, 310 212 C 380 206, 450 218, 505 232 C 550 243, 585 230, 620 210 C 655 190, 680 172, 715 168 C 750 164, 775 185, 785 215 C 792 250, 788 290, 780 325 C 770 370, 748 410, 715 445 C 675 485, 625 510, 570 518 C 510 526, 450 520, 400 505 C 350 490, 310 465, 280 435 C 250 405, 230 375, 215 350 C 195 318, 175 295, 150 280 C 135 270, 125 265, 120 260 Z" />
                <!-- 海岸线 -->
                <path class="coast" d="M 120 260 C 170 235, 240 218, 310 212 C 380 206, 450 218, 505 232 C 550 243, 585 230, 620 210 C 655 190, 680 172, 715 168 C 750 164, 775 185, 785 215 C 792 250, 788 290, 780 325 C 770 370, 748 410, 715 445 C 675 485, 625 510, 570 518 C 510 526, 450 520, 400 505 C 350 490, 310 465, 280 435 C 250 405, 230 375, 215 350 C 195 318, 175 295, 150 280 C 135 270, 125 265, 120 260" />
                <!-- 长江 -->
                <path class="river" d="M 115 248 C 180 244, 260 240, 340 236 C 420 232, 500 225, 565 210 C 630 195, 685 182, 720 188 C 750 193, 770 208, 780 228 C 787 248, 790 270, 788 292" />
                <!-- 长江南支 -->
                <path class="river" d="M 545 210 C 580 220, 620 228, 655 238 C 685 248, 710 260, 730 275" />
                <!-- 太湖 -->
                <path class="taihu" d="M 255 305 C 285 292, 320 288, 350 295 C 380 302, 398 322, 402 348 C 405 375, 392 398, 370 410 C 342 423, 308 423, 285 414 C 262 404, 248 382, 245 360 C 242 335, 248 315, 255 305 Z" />
                <!-- 崇明岛 -->
                <path class="chongming" d="M 545 175 C 585 166, 630 164, 660 169 C 678 172, 684 188, 678 203 C 662 214, 630 218, 600 216 C 578 214, 558 208, 550 196 C 546 186, 545 180, 545 175 Z" />
                <!-- 黄浦江 -->
                <path class="huangpu" d="M 470 460 C 500 438, 535 414, 575 392 C 605 375, 628 358, 642 340 C 655 322, 665 305, 670 285 C 675 270, 675 255, 670 240" />
                <!-- 东海小岛 -->
                <path class="island" d="M 705 340 C 712 337, 720 339, 724 344 C 728 350, 724 356, 716 358 C 708 359, 702 355, 700 350 C 699 345, 701 342, 705 340 Z" />
                <path class="island" d="M 735 300 C 742 298, 750 300, 752 306 C 754 312, 750 317, 743 318 C 736 318, 731 314, 730 309 C 729 304, 731 301, 735 300 Z" />
            </g>
            <g class="map-decorations">
                <!-- 海面上的可爱装饰 -->
                <use class="deco-heart" href="#mapHeart" x="700" y="70" width="16" height="16" style="animation-delay: 0s" />
                <use class="deco-heart" href="#mapHeart" x="760" y="140" width="14" height="14" style="animation-delay: 1.2s" />
                <use class="deco-heart" href="#mapHeart" x="670" y="110" width="12" height="12" style="animation-delay: 2.4s" />
                <use class="deco-star" href="#mapStar" x="730" y="55" width="12" height="12" style="animation-delay: 0.5s" />
                <use class="deco-star" href="#mapStar" x="690" y="150" width="10" height="10" style="animation-delay: 1.7s" />
                <use class="deco-sparkle" href="#mapSparkle" x="750" y="90" width="10" height="10" style="animation-delay: 0.8s" />
                <!-- 指南针 -->
                <g class="map-compass" transform="translate(720, 80)">
                    <circle cx="20" cy="20" r="18" />
                    <path d="M20 6 L24 20 L20 34 L16 20 Z" />
                    <text x="20" y="4" text-anchor="middle" font-size="8" fill="#C9A689">N</text>
                </g>
            </g>
            <g class="map-labels">
                <text class="map-label" x="315" y="365" text-anchor="middle">太湖</text>
                <text class="map-label" x="605" y="192" text-anchor="middle">崇明岛</text>
                <text class="map-label" x="750" y="265" text-anchor="middle" transform="rotate(30, 750, 265)">长江口</text>
                <text class="map-label" x="655" y="285" text-anchor="middle">上海</text>
            </g>
        `;

        const baseSvg = mapWrap.querySelector(".map-base");
        if (baseSvg) {
            baseSvg.innerHTML = `${defs}${gridLines}${landPaths}`;
        }

        // 轨迹线：按顺序连接真实坐标
        const routePoints = footprints.map(f => ({
            x: lngToX(f.lng),
            y: latToY(f.lat)
        }));

        let routeD = "";
        routePoints.forEach((p, i) => {
            if (i === 0) {
                routeD += `M ${p.x} ${p.y}`;
            } else {
                const prev = routePoints[i - 1];
                const cp1x = prev.x + (p.x - prev.x) * 0.35 + (Math.random() - 0.5) * 12;
                const cp1y = prev.y + (p.y - prev.y) * 0.35 + (Math.random() - 0.5) * 12;
                const cp2x = prev.x + (p.x - prev.x) * 0.65 + (Math.random() - 0.5) * 12;
                const cp2y = prev.y + (p.y - prev.y) * 0.65 + (Math.random() - 0.5) * 12;
                routeD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
            }
        });

        const routeSvg = mapWrap.querySelector(".map-route");
        if (routeSvg) {
            const routeHearts = routePoints.map((p, i) => `
                <use class="route-heart" href="#mapHeart" x="${p.x - 5}" y="${p.y - 5}" width="10" height="10" style="animation-delay: ${i * 0.4}s" />
            `).join("");
            routeSvg.innerHTML = `<path class="route-line" d="${routeD}" />${routeHearts}`;
        }

        // 地标标记（按真实经纬度百分比定位）
        const iconColors = {
            "🌸": "#ff85a2",
            "🏠": "#f1c40f",
            "🌿": "#7cb342",
            "🎡": "#e74c3c",
            "📚": "#5b7cfa"
        };

        markersEl.innerHTML = footprints.map((f, i) => {
            const color = iconColors[f.icon] || "#e06c9f";
            const left = ((f.lng - minLng) / (maxLng - minLng)) * 100;
            const top = 100 - ((f.lat - minLat) / (maxLat - minLat)) * 100;
            const isCurrent = i === footprints.length - 1;
            return `
                <div class="map-marker ${isCurrent ? 'current' : ''}" data-index="${i}" style="left: ${left}%; top: ${top}%; color: ${color};" role="button" aria-label="${f.city}">
                    <span class="marker-pulse"></span>
                    ${isCurrent ? '<span class="marker-star">✨</span>' : ''}
                    <span class="marker-icon">${f.icon}</span>
                </div>
            `;
        }).join("");

        // 底部图例
        legendEl.innerHTML = footprints.map((f, i) => `
            <span class="legend-item" data-index="${i}">
                <span class="legend-icon">${f.icon}</span>
                <span>${f.shortName || f.city}</span>
            </span>
        `).join("");

        // Tooltip 交互
        let activeMarker = null;

        function showTooltip(marker, data) {
            const rect = marker.getBoundingClientRect();
            const wrapRect = mapWrap.getBoundingClientRect();
            const nameEl = tooltip.querySelector(".tooltip-name");
            const timeEl = tooltip.querySelector(".tooltip-time");
            if (nameEl) nameEl.textContent = data.city;
            if (timeEl) timeEl.textContent = `回忆时间：${data.date}`;

            const left = rect.left - wrapRect.left + rect.width / 2;
            const top = rect.top - wrapRect.top - 8;
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            tooltip.classList.add("visible");

            if (activeMarker) activeMarker.classList.remove("active");
            marker.classList.add("active");
            activeMarker = marker;
        }

        function hideTooltip() {
            tooltip.classList.remove("visible");
            if (activeMarker) {
                activeMarker.classList.remove("active");
                activeMarker = null;
            }
        }

        markersEl.querySelectorAll(".map-marker").forEach((marker, i) => {
            marker.addEventListener("mouseenter", () => showTooltip(marker, footprints[i]));
            marker.addEventListener("mouseleave", () => {
                if (!marker.classList.contains("locked")) hideTooltip();
            });
            marker.addEventListener("click", (e) => {
                e.stopPropagation();
                const isLocked = marker.classList.contains("locked");
                markersEl.querySelectorAll(".map-marker.locked").forEach(m => m.classList.remove("locked"));
                if (!isLocked) {
                    marker.classList.add("locked");
                    showTooltip(marker, footprints[i]);
                } else {
                    hideTooltip();
                }
            });
        });

        legendEl.querySelectorAll(".legend-item").forEach((item, i) => {
            item.addEventListener("click", () => {
                const marker = markersEl.querySelector(`.map-marker[data-index="${i}"]`);
                if (marker) {
                    markersEl.querySelectorAll(".map-marker.locked").forEach(m => m.classList.remove("locked"));
                    marker.classList.add("locked");
                    showTooltip(marker, footprints[i]);
                }
            });
        });

        mapWrap.addEventListener("click", (e) => {
            if (!e.target.closest(".map-marker") && !e.target.closest(".footprint-legend")) {
                markersEl.querySelectorAll(".map-marker.locked").forEach(m => m.classList.remove("locked"));
                hideTooltip();
            }
        });

        // 卡片入场动画
        const card = section.querySelector(".footprint-card");
        if (card) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
            observer.observe(card);
        }
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

        if (pretitle) pretitle.textContent = birthdayConfig.pretitle || "致我 23 岁的女孩";
        if (title) {
            // 保持 span 包裹的结构
            const chars = (birthdayConfig.title || "生日快乐").split("");
            title.innerHTML = chars.map(ch => `<span>${ch}</span>`).join("");
        }
        if (subtitle) subtitle.textContent = birthdayConfig.subtitle || "愿你眼里有星河，笑里有清风";

        // ==================== 星空背景生成 ====================
        const starsContainer = document.getElementById("birthdayStars");
        const stardustContainer = document.getElementById("stardustContainer");

        function createStars() {
            if (!starsContainer) return;
            const count = Math.min(120, Math.floor(window.innerWidth / 12));
            starsContainer.innerHTML = "";
            for (let i = 0; i < count; i++) {
                const star = document.createElement("div");
                star.className = "star";
                const size = Math.random() * 2.5 + 0.5;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
                star.style.setProperty("--opacity", `${Math.random() * 0.5 + 0.3}`);
                star.style.animationDelay = `${Math.random() * 3}s`;
                starsContainer.appendChild(star);
            }
        }

        function createStardust() {
            if (!stardustContainer) return;
            stardustContainer.innerHTML = "";
            const count = 24;
            for (let i = 0; i < count; i++) {
                const dust = document.createElement("div");
                dust.className = "dust";
                const size = Math.random() * 4 + 2;
                dust.style.width = `${size}px`;
                dust.style.height = `${size}px`;
                dust.style.left = `${Math.random() * 100}%`;
                dust.style.top = `${Math.random() * 100}%`;
                dust.style.setProperty("--duration", `${Math.random() * 4 + 4}s`);
                dust.style.setProperty("--opacity", `${Math.random() * 0.4 + 0.2}`);
                dust.style.setProperty("--tx", `${(Math.random() - 0.5) * 40}px`);
                dust.style.setProperty("--ty", `${(Math.random() - 0.5) * 60 - 20}px`);
                dust.style.animationDelay = `${Math.random() * 4}s`;
                stardustContainer.appendChild(dust);
            }
        }

        createStars();
        createStardust();
        window.addEventListener("resize", () => {
            createStars();
        });

        // ==================== 流星画布 ====================
        const meteorCanvas = document.getElementById("birthdayMeteors");
        if (meteorCanvas) {
            const mctx = meteorCanvas.getContext("2d");
            let mWidth, mHeight;
            let meteors = [];

            function resizeMeteor() {
                mWidth = section.offsetWidth;
                mHeight = section.offsetHeight;
                meteorCanvas.width = mWidth;
                meteorCanvas.height = mHeight;
            }

            function createMeteor() {
                const x = Math.random() * mWidth;
                const y = Math.random() * mHeight * 0.4;
                const length = Math.random() * 80 + 40;
                const speed = Math.random() * 3 + 2;
                const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
                meteors.push({ x, y, length, speed, angle, alpha: 1 });
            }

            function drawMeteors() {
                mctx.clearRect(0, 0, mWidth, mHeight);
                for (let i = meteors.length - 1; i >= 0; i--) {
                    const m = meteors[i];
                    const tailX = m.x - Math.cos(m.angle) * m.length;
                    const tailY = m.y - Math.sin(m.angle) * m.length;
                    const grad = mctx.createLinearGradient(m.x, m.y, tailX, tailY);
                    grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
                    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
                    mctx.strokeStyle = grad;
                    mctx.lineWidth = 2;
                    mctx.beginPath();
                    mctx.moveTo(m.x, m.y);
                    mctx.lineTo(tailX, tailY);
                    mctx.stroke();

                    m.x += Math.cos(m.angle) * m.speed;
                    m.y += Math.sin(m.angle) * m.speed;
                    m.alpha -= 0.008;

                    if (m.x > mWidth + m.length || m.y > mHeight + m.length || m.alpha <= 0) {
                        meteors.splice(i, 1);
                    }
                }
                requestAnimationFrame(drawMeteors);
            }

            resizeMeteor();
            drawMeteors();
            setInterval(() => {
                if (Math.random() > 0.6) createMeteor();
            }, 2000);
            window.addEventListener("resize", resizeMeteor);
        }

        // ==================== 生日页进入视口动画 + 音乐切换 ====================
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    if (typeof window.switchBirthdayMusic === "function") {
                        window.switchBirthdayMusic();
                    }
                } else {
                    if (typeof window.switchMainMusic === "function") {
                        window.switchMainMusic();
                    }
                }
            });
        }, { threshold: 0.25 });

        sectionObserver.observe(section);

        // ==================== 蜡烛交互 ====================
        const candles = section.querySelectorAll(".candle");
        const cakeContainer = document.getElementById("cakeContainer");
        const birthdayMessage = document.getElementById("birthdayMessage");
        const typewriter = document.getElementById("birthdayTypewriter");
        const smokeContainer = document.getElementById("smokeContainer");
        const wishDelivered = document.getElementById("wishDelivered");
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
            }, 70);
        }

        function createSmoke(candleEl) {
            if (!smokeContainer) return;
            const rect = candleEl.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const x = rect.left - sectionRect.left + rect.width / 2;
            const y = rect.top - sectionRect.top;

            for (let i = 0; i < 6; i++) {
                const smoke = document.createElement("div");
                smoke.className = "smoke";
                smoke.style.left = `${x + (Math.random() - 0.5) * 10}px`;
                smoke.style.top = `${y}px`;
                smoke.style.setProperty("--dx", `${(Math.random() - 0.5) * 30}px`);
                smoke.style.animationDelay = `${i * 0.08}s`;
                smokeContainer.appendChild(smoke);
                setTimeout(() => smoke.remove(), 1600);
            }
        }

        function createSparkleBurst(x, y) {
            if (!stardustContainer) return;
            for (let i = 0; i < 16; i++) {
                const spark = document.createElement("div");
                spark.className = "dust";
                const size = Math.random() * 5 + 3;
                spark.style.width = `${size}px`;
                spark.style.height = `${size}px`;
                spark.style.left = `${x}px`;
                spark.style.top = `${y}px`;
                const angle = (Math.PI * 2 / 16) * i + Math.random() * 0.3;
                const dist = Math.random() * 80 + 40;
                spark.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
                spark.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
                spark.style.setProperty("--duration", "1.2s");
                spark.style.setProperty("--opacity", "1");
                spark.style.animation = "dustFloat 1.2s ease-out forwards";
                stardustContainer.appendChild(spark);
                setTimeout(() => spark.remove(), 1200);
            }
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

            // 显示“愿望已送达”
            if (wishDelivered) {
                setTimeout(() => wishDelivered.classList.add("show"), 1200);
            }

            // 触发烟花
            if (typeof window.startBirthdayFireworks === "function") {
                window.startBirthdayFireworks();
            }
        }

        candles.forEach(candle => {
            candle.addEventListener("click", () => {
                if (candle.classList.contains("extinguished")) return;
                candle.classList.add("extinguished");
                createSmoke(candle);

                const rect = candle.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();
                createSparkleBurst(
                    rect.left - sectionRect.left + rect.width / 2,
                    rect.top - sectionRect.top
                );

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

        audio.loop = true;

        let isPlaying = false;
        let currentSrc = "";
        let birthdayMode = false;
        let autoPlayFired = false;

        function updateButtonState() {
            if (isPlaying) {
                btn.classList.add("playing");
            } else {
                btn.classList.remove("playing");
            }
        }

        function play() {
            if (!audio.src) return;
            audio.play().then(() => {
                isPlaying = true;
                updateButtonState();
            }).catch(err => {
                // 浏览器自动播放策略阻止，静默处理，等待用户交互后再试
                isPlaying = false;
                updateButtonState();
                console.warn("音乐自动播放被阻止，将在首次交互后尝试播放", err);
            });
        }

        function switchTo(src) {
            if (!src || currentSrc === src) return;
            audio.src = src;
            currentSrc = src;
            play();
        }

        function initMainMusic() {
            if (mainSrc) {
                audio.src = mainSrc;
                currentSrc = mainSrc;
                play();
            } else if (birthdaySrc) {
                audio.src = birthdaySrc;
                currentSrc = birthdaySrc;
                play();
            }
        }

        // 首次用户交互时尝试自动播放（用于绕过浏览器自动播放限制）
        function tryAutoPlayOnInteraction() {
            if (autoPlayFired) return;
            autoPlayFired = true;
            if (!isPlaying) {
                initMainMusic();
            }
        }

        // 监听各类首次用户交互，只触发一次
        const interactionEvents = ["click", "touchstart", "scroll", "keydown"];
        interactionEvents.forEach(evt => {
            document.addEventListener(evt, tryAutoPlayOnInteraction, { once: true, passive: true });
        });

        // 页面加载后立刻尝试播放主音乐
        initMainMusic();

        btn.addEventListener("click", () => {
            if (isPlaying) {
                audio.pause();
            } else {
                play();
            }
        });

        audio.addEventListener("play", () => {
            isPlaying = true;
            updateButtonState();
        });

        audio.addEventListener("pause", () => {
            isPlaying = false;
            updateButtonState();
        });

        audio.addEventListener("ended", () => {
            isPlaying = false;
            updateButtonState();
        });

        // 暴露给生日页：切换到生日音乐
        window.switchBirthdayMusic = function () {
            if (birthdayMode) return;
            birthdayMode = true;
            if (birthdaySrc) {
                switchTo(birthdaySrc);
            }
        };

        // 离开生日页时切回主音乐
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
        const hearts = ["💕", "💖"];
        document.addEventListener("click", (e) => {
            // 避免点击按钮、链接、画廊时触发
            if (e.target.closest("button, a, .gallery-item, .lightbox-nav, .lightbox-close")) return;

            const heart = document.createElement("span");
            heart.className = "click-heart";
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${e.clientX}px`;
            heart.style.top = `${e.clientY}px`;
            heart.style.setProperty("--tx", `${(Math.random() - 0.5) * 40}px`);
            heart.style.setProperty("--rot", `${(Math.random() - 0.5) * 30}deg`);
            heart.style.fontSize = `${Math.random() * 0.6 + 0.9}rem`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1200);
        });
    }

    // ==================== 初始化 ====================
    initStarfield();
    renderWall();
    collectGalleryImages();
    renderGallery();
    renderFootprintMap();
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
