window.onload = () => {
    // DOM Elements
    const progress = document.querySelector(".progress");
    const percentage = document.querySelector(".percent");
    const loading = document.getElementById("loading");
    const appContainer = document.querySelector(".app-container");

    const step1 = document.getElementById("step1");
    const stepMoments = document.getElementById("stepMoments");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");

    const btnOpenIntro = document.getElementById("btnOpenIntro");
    const envelope = document.getElementById("envelope");
    const typewriterText = document.getElementById("typewriterText");
    const clickToSkip = document.getElementById("clickToSkip");
    const letterActions = document.getElementById("letterActions");

    // Moments Elements
    const momentBadge = document.getElementById("momentBadge");
    const momentTitle = document.getElementById("momentTitle");
    const momentImg = document.getElementById("momentImg");
    const momentCaption = document.getElementById("momentCaption");
    const momentText = document.getElementById("momentText");
    const momentContent = document.getElementById("momentContent");
    const btnPrevMoment = document.getElementById("btnPrevMoment");
    const btnNextMoment = document.getElementById("btnNextMoment");
    const nextBtnText = document.getElementById("nextBtnText");
    const dots = document.querySelectorAll(".moments-dots .dot");

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

    // Data Các Khoảnh Khắc Kỷ Niệm
    const momentsData = [
        {
            title: "Lần Đầu Tiên... 🌸",
            img: "images/0bfc32c3-3cb8-40a9-95ee-343e0bb2cc23.jpg",
            caption: "Khoảnh khắc bắt đầu 🌸",
            text: "Nhớ những ngày đầu tiên, từng tin nhắn hay câu chào của chị đều khiến em mỉm cười suốt cả ngày. Sự dịu dàng ấy thật sự đã để lại ấn tượng đặc biệt trong lòng em..."
        },
        {
            title: "Những Niềm Vui Bình Dị... ✨",
            img: "images/0bfc32c3-3cb8-40a9-95ee-343e0bb2cc23.jpg",
            caption: "Nụ cười bình yên ✨",
            text: "Có những câu chuyện dường như rất nhỏ nhặt, nhưng mỗi khi chia sẻ cùng chị, chúng lại trở thành những khoảnh khắc vô cùng ý nghĩa và ấm áp."
        },
        {
            title: "Những Đêm Trò Chuyện... 🌙",
            img: "images/0bfc32c3-3cb8-40a9-95ee-343e0bb2cc23.jpg",
            caption: "Thời gian trôi thật nhanh... 🌙",
            text: "Những cuộc trò chuyện kéo dài đến muộn, nơi em cảm nhận được sự lắng nghe, thấu hiểu và chân thành dịu dàng nhất từ chị."
        },
        {
            title: "Cảm Ơn Vì Chị Đã Đến... 💖",
            img: "images/0bfc32c3-3cb8-40a9-95ee-343e0bb2cc23.jpg",
            caption: "Trân trọng từng giây phút 💖",
            text: "Và điều tuyệt vời nhất là được biết chị, được quan tâm và đồng hành cùng chị qua từng ngày. Em đã chuẩn bị 1 bức thư bí mật dành riêng cho chị bên trong nè..."
        }
    ];

    let currentMomentIndex = 0;

    // Update Moment UI
    function renderMoment(index) {
        const data = momentsData[index];
        momentContent.style.opacity = "0";
        momentContent.style.transform = "translateY(10px)";

        setTimeout(() => {
            momentBadge.textContent = `Khoảnh khắc 0${index + 1} / 0${momentsData.length}`;
            momentTitle.textContent = data.title;
            momentImg.src = data.img;
            momentCaption.textContent = data.caption;
            momentText.textContent = data.text;

            // Dots update
            dots.forEach((dot, i) => {
                if (i === index) dot.classList.add("active");
                else dot.classList.remove("active");
            });

            // Prev button visibility
            if (index === 0) {
                btnPrevMoment.classList.add("hidden");
            } else {
                btnPrevMoment.classList.remove("hidden");
            }

            // Next button text
            if (index === momentsData.length - 1) {
                nextBtnText.textContent = "Mở bức thư bí mật 💌";
            } else {
                nextBtnText.textContent = "Khoảnh khắc tiếp ➡️";
            }

            momentContent.style.opacity = "1";
            momentContent.style.transform = "translateY(0)";
        }, 250);
    }

    btnNextMoment.addEventListener("click", () => {
        if (currentMomentIndex < momentsData.length - 1) {
            currentMomentIndex++;
            renderMoment(currentMomentIndex);
        } else {
            // Chuyển sang Phong Bì Thư 3D
            switchStep(stepMoments, step2);
        }
    });

    btnPrevMoment.addEventListener("click", () => {
        if (currentMomentIndex > 0) {
            currentMomentIndex--;
            renderMoment(currentMomentIndex);
        }
    });

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

    // Tự động phát nhạc ở lượt tương tác đầu tiên
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

    // Bấm "Khám phá khoảnh khắc" từ Step 1 sang StepMoments
    btnOpenIntro.addEventListener("click", () => {
        currentMomentIndex = 0;
        renderMoment(0);
        switchStep(step1, stepMoments);
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

    // Gửi lời nhắn qua Web3Forms về Gmail
    btnSendReply.addEventListener("click", () => {
        const text = replyText.value.trim();
        if (!text) {
            showToast("Chị chưa nhập lời nhắn nè! ❤️");
            return;
        }

        btnSendReply.disabled = true;
        btnSendReply.textContent = "Đang gửi...";

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: "16bf4287-76ad-426b-a1c7-de972544f945",
                subject: "💌 Lời nhắn mới từ web A Letter For You!",
                from_name: "Lá Thư Của Chị 🌸",
                message: text
            })
        })
        .then(res => res.json())
        .then(data => {
            replyModal.classList.add("hidden-modal");
            replyText.value = "";
            btnSendReply.disabled = false;
            btnSendReply.textContent = "Gửi lời nhắn ✨";
            showToast("❤️ Lời nhắn đã được gửi tới Gmail của bạn!");

            // Bắn pháo hoa tim rực rỡ
            for (let i = 0; i < 25; i++) {
                createFloatingHeartParticle(window.innerWidth / 2, window.innerHeight / 2);
            }
        })
        .catch(err => {
            replyModal.classList.add("hidden-modal");
            replyText.value = "";
            btnSendReply.disabled = false;
            btnSendReply.textContent = "Gửi lời nhắn ✨";
            showToast("❤️ Lời nhắn đã được gửi tới Gmail của bạn!");
        });
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
