/**
 * 核心脚本：照片墙、倒计时、时光轴、梦幻粒子
 */
(function () {
    const photoWall = document.getElementById("photoWall");
    const startDateText = document.getElementById("startDateText");
    const timeline = document.getElementById("timeline");

    // 显示开始日期
    startDateText.textContent = CONFIG.startDate;

    // ==================== 梦幻背景 & 粒子 ====================
    function createDreamBackground() {
        const bg = document.createElement("div");
        bg.className = "dream-bg";
        document.body.insertBefore(bg, document.body.firstChild);

        const particles = document.createElement("div");
        particles.className = "particles";
        particles.id = "particles";
        document.body.insertBefore(particles, document.body.children[1]);

        const particleCount = window.matchMedia("(max-width: 720px)").matches ? 18 : 32;
        const colors = ["rgba(255,255,255,0.9)", "rgba(251,194,235,0.85)", "rgba(224,108,159,0.7)", "rgba(143,211,244,0.7)"];

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement("span");
            p.className = "particle";
            const size = Math.random() * 10 + 4;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.animationDuration = `${Math.random() * 12 + 10}s`;
            p.style.animationDelay = `${Math.random() * 8}s`;
            p.style.opacity = Math.random() * 0.6 + 0.2;
            particles.appendChild(p);
        }
    }

    // ==================== 全屏流星 ====================
    function initMeteors() {
        const container = document.getElementById("meteors");
        if (!container) return;

        const isMobile = window.matchMedia("(max-width: 720px)").matches;
        const spawnInterval = isMobile ? 2800 : 2200; // 手机端稍微稀疏一点
        const maxMeteors = isMobile ? 4 : 6;

        function createMeteor() {
            if (container.childElementCount >= maxMeteors) return;

            const meteor = document.createElement("span");
            meteor.className = "meteor";

            // 流星长度：80px ~ 220px
            const width = Math.floor(Math.random() * 140) + 80;
            meteor.style.width = `${width}px`;

            // 起始位置：主要在屏幕上方和左方区域
            const startX = Math.random() * 100; // 0% ~ 100% 左上角横向
            const startY = Math.random() * 60;  // 0% ~ 60% 左上角纵向
            meteor.style.left = `${startX}%`;
            meteor.style.top = `${startY}%`;

            // 动画时长 0.8s ~ 2s
            const duration = (Math.random() * 1.2 + 0.8).toFixed(2);
            meteor.style.animationDuration = `${duration}s`;

            // 随机延迟 0 ~ 0.3s
            meteor.style.animationDelay = `${(Math.random() * 0.3).toFixed(2)}s`;

            // 随机透明度微调
            meteor.style.opacity = Math.random() * 0.3 + 0.7;

            container.appendChild(meteor);

            // 动画结束后移除
            setTimeout(() => {
                if (meteor.parentNode === container) {
                    container.removeChild(meteor);
                }
            }, parseFloat(duration) * 1000 + 400);
        }

        // 初始先产生一颗
        setTimeout(createMeteor, 800);
        setInterval(createMeteor, spawnInterval);
    }

    // 鼠标视差：让粒子轻微跟随鼠标
    function initParallax() {
        const particles = document.getElementById("particles");
        if (!particles || window.matchMedia("(max-width: 720px)").matches) return;

        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener("mousemove", (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 20;
            targetY = (e.clientY / window.innerHeight - 0.5) * 20;
        });

        function animate() {
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;
            particles.style.transform = `translate(${currentX}px, ${currentY}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ==================== 照片墙 ====================
    function renderWall() {
        const WALL_CELLS = 36;
        const photos = Array.isArray(CONFIG.photos) ? CONFIG.photos : [];
        const totalPhotos = photos.length;
        let html = "";

        for (let i = 0; i < WALL_CELLS; i++) {
            const photo = totalPhotos > 0 ? photos[i % totalPhotos] : null;
            const delay = (i * 0.05).toFixed(2);
            if (photo && photo.src) {
                html += `
                    <div class="wall-cell flip-in" style="animation-delay: ${delay}s">
                        <img src="${photo.src}" alt="回忆" loading="${i < 12 ? "eager" : "lazy"}">
                    </div>
                `;
            } else {
                html += `<div class="wall-cell placeholder flip-in" style="animation-delay: ${delay}s"><span>💕</span></div>`;
            }
        }

        photoWall.innerHTML = html;
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

    function renderTimeline() {
        const memories = Array.isArray(CONFIG.memories) ? CONFIG.memories : [];

        if (memories.length === 0) {
            timeline.innerHTML = `
                <li class="timeline-item visible">
                    <div class="timeline-img"><div class="img-placeholder">📝</div></div>
                    <div class="timeline-text">
                        <span class="date">现在</span>
                        <h3>写下你们的第一件小事</h3>
                        <p>在 js/config.js 的 memories 里添加日期、标题、描述和照片，时光轴就会图文并茂地展示出来。</p>
                    </div>
                </li>
            `;
            return;
        }

        const sorted = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));

        timeline.innerHTML = sorted.map(item => `
            <li class="timeline-item">
                <div class="timeline-img">${renderImages(item.img)}</div>
                <div class="timeline-text">
                    <span class="date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            </li>
        `).join("");
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

    // ==================== 背景音乐播放器 ====================
    function initMusicPlayer() {
        const btn = document.getElementById("musicPlayer");
        const audio = document.getElementById("bgMusic");
        if (!btn || !audio) return;

        const musicSrc = CONFIG.music;
        if (!musicSrc) {
            btn.classList.add("hidden");
            return;
        }

        audio.src = musicSrc;
        let isPlaying = false;

        btn.addEventListener("click", () => {
            if (isPlaying) {
                audio.pause();
                btn.classList.remove("playing");
            } else {
                audio.play().then(() => {
                    btn.classList.add("playing");
                }).catch(err => {
                    console.warn("音乐自动播放被阻止，请点击按钮手动播放", err);
                });
            }
            isPlaying = !isPlaying;
        });

        audio.addEventListener("ended", () => {
            isPlaying = false;
            btn.classList.remove("playing");
        });
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
    createDreamBackground();
    initMeteors();
    renderWall();
    renderGallery();
    renderTimeline();
    observeTimeline();
    initParallax();
    initScrollHint();
    initScrollProgress();
    initLoveLetter();
    initMusicPlayer();
    initClickHearts();
})();
