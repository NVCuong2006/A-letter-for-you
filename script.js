window.onload = () => {
    // DOM Elements
    const progress = document.querySelector(".progress");
    const percentage = document.querySelector(".percent");
    const loading = document.getElementById("loading");
    const appContainer = document.querySelector(".app-container");

    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");

    const btnOpenIntro = document.getElementById("btnOpenIntro");
    const envelope = document.getElementById("envelope");
    const typewriterText = document.getElementById("typewriterText");
    const clickToSkip = document.getElementById("clickToSkip");
    const letterActions = document.getElementById("letterActions");

    const btnHeart = document.getElementById("btnHeart");
    const heartCount = document.getElementById("heartCount");
    const btnReply = document.getElementById("btnReply");
    const btnReplay = document.getElementById("btnReplay");

    const replyModal = document.getElementById("replyModal");
    const closeModal = document.getElementById("closeModal");
    const btnSendReply = document.getElementById("btnSendReply");
    const replyText = document.getElementById("replyText");
    const toast = document.getElementById("toast");

    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");

    let countHearts = 0;
    let isMusicPlaying = false;

    // -------------------------------------------------------------
    // 1. Quản lý Âm Nhạc
    // -------------------------------------------------------------
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove("playing");
            isMusicPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                isMusicPlaying = true;
            }).catch(e => console.log("Audio play blocked", e));
        }
    }

    musicToggle.addEventListener("click", toggleMusic);

    // Tự động phát nhạc ở lượt tương tác đầu tiên nếu trình duyệt chặn autostart
    document.body.addEventListener("click", () => {
        if (!isMusicPlaying && bgMusic.paused) {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                isMusicPlaying = true;
            }).catch(() => {});
        }
    }, { once: true });

    // -------------------------------------------------------------
    // 2. Loading Counter
    // -------------------------------------------------------------
    let percent = 0;
    const interval = setInterval(() => {
        percent += 2;
        if (percent > 100) percent = 100;

        progress.style.width = percent + "%";
        percentage.textContent = percent + "%";

        if (percent >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loading.style.opacity = "0";
                setTimeout(() => {
                    loading.style.display = "none";
                    appContainer.classList.remove("hidden");
                }, 400);
            }, 300);
        }
    }, 25);

    // -------------------------------------------------------------
    // 3. Chuyển Cảnh
    // -------------------------------------------------------------
    function switchStep(fromStep, toStep) {
        fromStep.classList.remove("active");
        setTimeout(() => {
            fromStep.style.display = "none";
            toStep.style.display = "flex";
            setTimeout(() => {
                toStep.classList.add("active");
            }, 50);
        }, 400);
    }

    // Bấm "Bấm để mở thư" từ Step 1 sang Step 2
    btnOpenIntro.addEventListener("click", () => {
        switchStep(step1, step2);
    });

    // Mở Phong Bì 3D từ Step 2 sang Step 3
    let isEnvelopeOpened = false;
    envelope.addEventListener("click", () => {
        if (isEnvelopeOpened) return;
        isEnvelopeOpened = true;

        envelope.classList.add("open");

        setTimeout(() => {
            switchStep(step2, step3);
            setTimeout(() => {
                startTypewriter();
            }, 500);
        }, 1200);
    });

    // -------------------------------------------------------------
    // 4. Hiệu Ứng Gõ Chữ (Typewriter Effect)
    // -------------------------------------------------------------
    const letterMessage = `Chị à,

Có những điều nếu không nói ra, có lẽ cứ mãi ngập ngừng trong lòng... Thế nên em mới mượn trang web nho nhỏ này để gửi gắm tất cả những suy nghĩ chân thành nhất của em tới chị.

Cảm ơn chị vì đã luôn xuất hiện dịu dàng, mang lại cho em những niềm vui ngọt ngào và những khoảnh khắc thật bình yên. Mọi phút giây ở bên chị hay đơn giản là được trò chuyện cùng chị đều khiến em cảm thấy rất đặc biệt.

Em hy vọng rằng dù ngày mai có bận rộn thế nào, chị cũng luôn mỉm cười và cảm nhận được rằng luôn có một người sẵn sàng lắng nghe, quan tâm và đồng hành cùng chị.

Chúc chị một ngày thật nhiều niềm vui và luôn rực rỡ như những điều tuyệt vời nhất! ❤️`;

    let typeIndex = 0;
    let typeTimer = null;
    let isTypingFinished = false;

    function startTypewriter() {
        typewriterText.textContent = "";
        typeIndex = 0;
        isTypingFinished = false;
        letterActions.classList.add("hidden-actions");
        clickToSkip.style.display = "block";

        function type() {
            if (typeIndex < letterMessage.length) {
                typewriterText.textContent += letterMessage.charAt(typeIndex);
                typeIndex++;
                typeTimer = setTimeout(type, 45);
            } else {
                finishTypewriter();
            }
        }
        type();
    }

    function finishTypewriter() {
        clearTimeout(typeTimer);
        typewriterText.textContent = letterMessage;
        isTypingFinished = true;
        clickToSkip.style.display = "none";
        letterActions.classList.remove("hidden-actions");
    }

    // Bấm vào văn bản để hiện nhanh toàn bộ
    typewriterText.parentElement.addEventListener("click", () => {
        if (!isTypingFinished) {
            finishTypewriter();
        }
    });

    // -------------------------------------------------------------
    // 5. Nút Tương Tác & Phản Hồi
    // -------------------------------------------------------------
    // Thả Tim
    btnHeart.addEventListener("click", (e) => {
        countHearts++;
        heartCount.textContent = countHearts;

        // Bắn tim rực rỡ từ vị trí con trỏ
        for (let i = 0; i < 8; i++) {
            createFloatingHeartParticle(e.clientX, e.clientY);
        }
    });

    // Mở Modal Nhắn Lại
    btnReply.addEventListener("click", () => {
        replyModal.classList.remove("hidden-modal");
    });

    closeModal.addEventListener("click", () => {
        replyModal.classList.add("hidden-modal");
    });

    replyModal.addEventListener("click", (e) => {
        if (e.target === replyModal) {
            replyModal.classList.add("hidden-modal");
        }
    });

    btnSendReply.addEventListener("click", () => {
        const text = replyText.value.trim();
        if (!text) {
            showToast("Chị chưa nhập lời nhắn nè! ❤️");
            return;
        }

        btnSendReply.disabled = true;
        btnSendReply.textContent = "Đang gửi...";

        // Tạo form HTML động để gửi đi 100% không bị vướng CORS browser
        const form = document.createElement("form");
        form.action = "https://formsubmit.co/nghiemvietcuong4@gmail.com";
        form.method = "POST";
        form.target = "_blank"; // Mở tab xác nhận ngầm

        const inputMsg = document.createElement("input");
        inputMsg.type = "hidden";
        inputMsg.name = "Lời nhắn từ chị";
        inputMsg.value = text;

        const inputSubject = document.createElement("input");
        inputSubject.type = "hidden";
        inputSubject.name = "_subject";
        inputSubject.value = "💌 Lời nhắn mới từ web A Letter For You!";

        const inputCaptcha = document.createElement("input");
        inputCaptcha.type = "hidden";
        inputCaptcha.name = "_captcha";
        inputCaptcha.value = "false";

        form.appendChild(inputMsg);
        form.appendChild(inputSubject);
        form.appendChild(inputCaptcha);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        setTimeout(() => {
            replyModal.classList.add("hidden-modal");
            replyText.value = "";
            btnSendReply.disabled = false;
            btnSendReply.textContent = "Gửi lời nhắn ✨";
            showToast("❤️ Lời nhắn đã được gửi! Bạn kiểm tra Gmail nhé!");

            // Bắn pháo hoa tim rực rỡ
            for (let i = 0; i < 20; i++) {
                createFloatingHeartParticle(window.innerWidth / 2, window.innerHeight / 2);
            }
        }, 500);
    });

    // Đọc Lại Từ Đầu
    btnReplay.addEventListener("click", () => {
        isEnvelopeOpened = false;
        envelope.classList.remove("open");
        switchStep(step3, step1);
    });

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.remove("hidden-toast");
        setTimeout(() => {
            toast.classList.add("hidden-toast");
        }, 3000);
    }

    // -------------------------------------------------------------
    // 6. Canvas Hạt Trái Tim Bay Background (Particle Engine)
    // -------------------------------------------------------------
    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
    });

    const particles = [];
    const heartColors = ["#e58580", "#f4a261", "#e76f51", "#e8998d", "#d4af37"];

    class Particle {
        constructor(x, y, isBurst = false) {
            this.x = x || Math.random() * width;
            this.y = y || height + 20;
            this.size = Math.random() * 14 + 10;
            this.speedY = isBurst ? (Math.random() - 0.5) * 6 : -(Math.random() * 1.5 + 0.8);
            this.speedX = isBurst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 1.2;
            this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
            this.opacity = Math.random() * 0.7 + 0.3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            this.opacity -= 0.005;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px sans-serif`;
            ctx.fillText("❤️", 0, 0);
            ctx.restore();
        }
    }

    function createFloatingHeartParticle(x, y) {
        particles.push(new Particle(x, y, true));
    }

    // Tự sinh hạt rải rác ở nền
    setInterval(() => {
        if (particles.length < 35) {
            particles.push(new Particle());
        }
    }, 400);

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].opacity <= 0 || particles[i].y < -30) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
};