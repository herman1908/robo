// Main JavaScript untuk website Rosoft Digitalindo dengan efek dari ReactBits.dev

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Update active nav link
      document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.padding = "10px 0";
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.padding = "15px 0";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();

  // Trigger scroll animations
  animateOnScroll();
});

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Contact form submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("nama")?.value;
    const email = document.getElementById("email")?.value;
    const message = document.getElementById("pesan")?.value;

    if (!name || !email || !message) {
      showNotification("Terima Kasih! email sedang di proses untuk dikirim.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Email tidak valid!", "error");
      return;
    }

    showNotification("Pesan berhasil dikirim 🚀", "success");
    this.reset();
  });
}

// Custom carousel functionality
function initializeCarousel() {
  const carouselIndicators = document.querySelectorAll(".carousel-indicator");
  const cinematicCarousel = document.getElementById("cinematicCarousel");

  if (!cinematicCarousel) return;

  // Add click event to custom indicators
  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      // Update active indicator
      carouselIndicators.forEach((ind) => ind.classList.remove("active"));
      this.classList.add("active");

      // Move carousel to corresponding slide
      const carousel = new bootstrap.Carousel(cinematicCarousel);
      carousel.to(index);
    });
  });

  // Update indicators when carousel slides
  cinematicCarousel.addEventListener("slide.bs.carousel", function (event) {
    const activeIndex = event.to;

    carouselIndicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  });

  // Zoom effect for active carousel item
  const carouselItems = document.querySelectorAll(".carousel-item");

  cinematicCarousel.addEventListener("slid.bs.carousel", function () {
    carouselItems.forEach((item) => {
      const img = item.querySelector(".carousel-image");
      if (item.classList.contains("active")) {
        img.style.transform = "scale(1.05)";
      } else {
        img.style.transform = "scale(1)";
      }
    });
  });

  // Initialize zoom effect on page load
  const activeItem = document.querySelector(".carousel-item.active");
  if (activeItem) {
    const activeImg = activeItem.querySelector(".carousel-image");
    activeImg.style.transform = "scale(1.05)";
  }
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if element is in viewport
    if (elementPosition.top < viewportHeight - 100) {
      const delay = element.getAttribute("data-delay") || 0;

      setTimeout(() => {
        element.classList.add("animated");
      }, delay * 1000);
    }
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"} me-2"></i>
            ${message}
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

  // Add styles if not already added
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 9999;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                border-left: 4px solid #1a73e8;
            }
            .notification-success {
                border-left-color: #28a745;
            }
            .notification-error {
                border-left-color: #dc3545;
            }
            .notification-content {
                flex: 1;
                display: flex;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 16px;
                margin-left: 10px;
                transition: color 0.3s ease;
            }
            .notification-close:hover {
                color: #333;
            }
            .notification.show {
                transform: translateX(0);
            }
        `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);

  // Close button event
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
}

function initParallax() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  hero.classList.add("js-parallax");
  const bg = hero.querySelector(".hero-bg");
  const bgImg = hero.querySelector("[data-parallax-bg]");
  const tilt = hero.querySelector("#heroTilt");
  const content = hero.querySelector(".hero-content");
  const visual = hero.querySelector(".hero-visual");
  const card = hero.querySelector("#heroCard");
  const glare = hero.querySelector(".hero-card-glare");
  const spotlight = hero.querySelector(".hero-spotlight");
  const shapes = hero.querySelectorAll(".hero-shape");
  const orbs = hero.querySelectorAll(".hero-orb");
  const particles = hero.querySelector(".hero-particles");
  const chips = hero.querySelectorAll(".hero-chip");
  const rings = hero.querySelectorAll(".hero-glow-ring");
  const buttons = hero.querySelectorAll(".hero-buttons .btn");
  const isTouch = window.matchMedia("(hover: none)").matches;
  let targetScroll = 0, curScroll = 0;
  let targetMX = 0, targetMY = 0, curMX = 0, curMY = 0;
  let targetGX = 50, targetGY = 50, curGX = 50, curGY = 50;
  let heroTop = 0, heroH = 1, running = false, rafId = null;
  let mxPx = window.innerWidth / 2, myPx = window.innerHeight / 3;
  let dots = [], isHover = false, hoverT = 0, hoverC = 0;
  function cacheDots() {
    const hr = hero.getBoundingClientRect();
    dots = Array.from(hero.querySelectorAll(".hero-dot")).map((el, i) => {
      const r = el.getBoundingClientRect();
      return { el, bx: r.left - hr.left + r.width / 2, by: r.top - hr.top + r.height / 2, cx: 0, cy: 0, s: 0.22 + (i % 4) * 0.08 };
    });
  }
  function measure() {
    heroTop = hero.offsetTop;
    heroH = hero.offsetHeight || 1;
  }
  measure();
  cacheDots();
  setTimeout(cacheDots, 500);
  window.addEventListener("resize", () => { measure(); cacheDots(); });
  function start() {
    if (!running) { running = true; rafId = requestAnimationFrame(loop); }
  }
  function onScroll() {
    const y = window.pageYOffset || window.scrollY || 0;
    targetScroll = Math.max(0, y - heroTop);
    const visible = y < heroTop + heroH + 120;
    if (visible) start();
  }
  if (!isTouch) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      targetMX = (e.clientX - r.left) / r.width - 0.5;
      targetMY = (e.clientY - r.top) / r.height - 0.5;
      mxPx = e.clientX - r.left;
      myPx = e.clientY - r.top;
      isHover = true;
      hoverT = 1;
      if (card) {
        const cr = card.getBoundingClientRect();
        targetGX = Math.min(100, Math.max(0, ((e.clientX - cr.left) / (cr.width || 1)) * 100));
        targetGY = Math.min(100, Math.max(0, ((e.clientY - cr.top) / (cr.height || 1)) * 100));
      }
      start();
    });
    hero.addEventListener("mouseleave", () => {
      targetMX = 0; targetMY = 0; targetGX = 50; targetGY = 50;
      isHover = false;
      hoverT = 0;
    });
  } else if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma == null || e.beta == null) return;
      targetMX = Math.min(0.5, Math.max(-0.5, e.gamma / 45));
      targetMY = Math.min(0.5, Math.max(-0.5, (e.beta - 45) / 45));
      start();
    });
  }
  const lightning = hero.querySelector(".hero-lightning");
  const lctx = lightning ? lightning.getContext("2d") : null;
  const touches = new Map();
  let bolts = [], sparks = [], lRunning = false, lastBolt = 0, lastT = 0;
  function sizeLightning() {
    if (!lightning || !lctx) return;
    const r = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    lightning.width = Math.max(1, Math.round(r.width * dpr));
    lightning.height = Math.max(1, Math.round(r.height * dpr));
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  sizeLightning();
  window.addEventListener("resize", sizeLightning);
  function spawnBolt(x, y) {
    const n = 2 + Math.floor(Math.random() * 2);
    for (let b = 0; b < n; b++) {
      const ang = Math.random() * Math.PI * 2;
      const len = 46 + Math.random() * 90;
      const segs = 5 + Math.floor(Math.random() * 4);
      const pts = [{ x, y }];
      for (let s = 1; s <= segs; s++) {
        const t = s / segs;
        const off = (Math.random() - 0.5) * 26 * (1 - t * 0.5);
        const px = x + Math.cos(ang) * len * t + Math.cos(ang + Math.PI / 2) * off;
        const py = y + Math.sin(ang) * len * t + Math.sin(ang + Math.PI / 2) * off;
        pts.push({ x: px, y: py });
      }
      const cols = ["34,211,238", "129,140,248", "196,181,253"];
      bolts.push({ pts, life: 1, decay: 0.06 + Math.random() * 0.08, w: 0.8 + Math.random() * 1.4, col: cols[Math.floor(Math.random() * cols.length)] });
    }
    if (bolts.length > 46) bolts = bolts.slice(-46);
  }
  function burst(x, y, k) {
    for (let i = 0; i < k; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1.2 + Math.random() * 3.4;
      sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.6, life: 1, decay: 0.03 + Math.random() * 0.05 });
    }
    if (sparks.length > 160) sparks = sparks.slice(-160);
  }
  function lightStart() {
    if (!lRunning && lctx) { lRunning = true; lastT = performance.now(); requestAnimationFrame(lightLoop); }
  }
  function lightLoop(now) {
    if (!lctx) { lRunning = false; return; }
    const dt = Math.min(50, now - lastT);
    lastT = now;
    const r = hero.getBoundingClientRect();
    lctx.clearRect(0, 0, r.width, r.height);
    if (now - lastBolt > 55) {
      lastBolt = now;
      touches.forEach((p) => { spawnBolt(p.x, p.y); burst(p.x, p.y, 3); });
    }
    touches.forEach((p) => {
      const g = lctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 64);
      g.addColorStop(0, "rgba(255,255,255,0.85)");
      g.addColorStop(0.25, "rgba(34,211,238,0.5)");
      g.addColorStop(0.6, "rgba(129,140,248,0.18)");
      g.addColorStop(1, "rgba(129,140,248,0)");
      lctx.fillStyle = g;
      lctx.beginPath();
      lctx.arc(p.x, p.y, 64, 0, Math.PI * 2);
      lctx.fill();
      lctx.fillStyle = "rgba(255,255,255,0.95)";
      lctx.beginPath();
      lctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
      lctx.fill();
    });
    lctx.lineCap = "round";
    lctx.lineJoin = "round";
    bolts = bolts.filter((bt) => bt.life > 0);
    bolts.forEach((bt) => {
      bt.life -= bt.decay * (dt / 16.7);
      const a = Math.max(0, bt.life);
      lctx.shadowBlur = 14;
      lctx.shadowColor = `rgba(${bt.col},0.9)`;
      lctx.strokeStyle = `rgba(${bt.col},${(0.85 * a).toFixed(3)})`;
      lctx.lineWidth = bt.w + 1.6;
      lctx.beginPath();
      bt.pts.forEach((p, i) => { if (i === 0) lctx.moveTo(p.x, p.y); else lctx.lineTo(p.x, p.y); });
      lctx.stroke();
      lctx.shadowBlur = 0;
      lctx.strokeStyle = `rgba(255,255,255,${(0.9 * a).toFixed(3)})`;
      lctx.lineWidth = Math.max(0.6, bt.w - 0.7);
      lctx.stroke();
    });
    sparks = sparks.filter((s) => s.life > 0);
    sparks.forEach((s) => {
      s.life -= s.decay * (dt / 16.7);
      s.x += s.vx * (dt / 16.7);
      s.y += s.vy * (dt / 16.7);
      s.vy += 0.05 * (dt / 16.7);
      const a = Math.max(0, s.life);
      lctx.fillStyle = `rgba(165,243,252,${a.toFixed(3)})`;
      lctx.shadowBlur = 8;
      lctx.shadowColor = "rgba(34,211,238,0.9)";
      lctx.beginPath();
      lctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
      lctx.fill();
      lctx.shadowBlur = 0;
    });
    if (touches.size > 0 || bolts.length > 0 || sparks.length > 0) {
      requestAnimationFrame(lightLoop);
    } else {
      lRunning = false;
      if (lctx) lctx.clearRect(0, 0, r.width, r.height);
    }
  }
  function trackFinger(x, y) {
    const r = hero.getBoundingClientRect();
    mxPx = x; myPx = y;
    targetMX = x / (r.width || 1) - 0.5;
    targetMY = y / (r.height || 1) - 0.5;
    isHover = true; hoverT = 1;
    start();
  }
  hero.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
    const r = hero.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    touches.set(e.pointerId, { x, y });
    trackFinger(x, y);
    burst(x, y, 10);
    lightStart();
  }, { passive: true });
  hero.addEventListener("pointermove", (e) => {
    if (!touches.has(e.pointerId)) return;
    const r = hero.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    touches.set(e.pointerId, { x, y });
    trackFinger(x, y);
    lightStart();
  }, { passive: true });
  function endTouch(e) {
    touches.delete(e.pointerId);
    if (touches.size === 0 && isTouch) { isHover = false; hoverT = 0; }
  }
  hero.addEventListener("pointerup", endTouch, { passive: true });
  hero.addEventListener("pointercancel", endTouch, { passive: true });
  hero.addEventListener("touchmove", (e) => {
    const r = hero.getBoundingClientRect();
    const t = e.touches[0];
    if (!t) return;
    trackFinger(t.clientX - r.left, t.clientY - r.top);
    lightStart();
  }, { passive: true });
  function loop(t) {
    rafId = requestAnimationFrame(loop);
    const y = window.pageYOffset || window.scrollY || 0;
    if (y > heroTop + heroH + 200) { running = false; cancelAnimationFrame(rafId); rafId = null; return; }
    curScroll += (targetScroll - curScroll) * 0.085;
    curMX += (targetMX - curMX) * 0.065;
    curMY += (targetMY - curMY) * 0.065;
    curGX += (targetGX - curGX) * 0.12;
    curGY += (targetGY - curGY) * 0.12;
    if (Math.abs(targetScroll - curScroll) < 0.05) curScroll = targetScroll;
    const time = (t || 0) / 1000;
    const p = Math.min(curScroll / heroH, 1.4);
    const breathe = 1.18 + Math.sin(time * 0.6) * 0.015;
    if (bg) bg.style.transform = `translate3d(0, ${(curScroll * 0.22).toFixed(2)}px, -60px)`;
    if (bgImg) bgImg.style.transform = `translate3d(${(curMX * -46).toFixed(2)}px, ${(curScroll * 0.34 + curMY * -30 + Math.sin(time * 0.5) * 8).toFixed(2)}px, 0) scale(${breathe.toFixed(4)})`;
    if (spotlight) {
      spotlight.style.setProperty("--mx", mxPx.toFixed(1) + "px");
      spotlight.style.setProperty("--my", myPx.toFixed(1) + "px");
      spotlight.style.transform = `translate3d(0, ${(curScroll * 0.15).toFixed(2)}px, 0)`;
      spotlight.style.opacity = (1 - p * 0.8).toFixed(3);
    }
    if (tilt) tilt.style.transform = `rotateY(${(curMX * 7).toFixed(3)}deg) rotateX(${(-curMY * 7).toFixed(3)}deg) translate3d(0, ${(curScroll * 0.06).toFixed(2)}px, 0)`;
    shapes.forEach((el, i) => {
      const d = parseFloat(el.dataset.depth || 0.1);
      const fx = Math.sin(time * (0.7 + i * 0.18) + i * 1.7) * (10 + i * 4);
      const fy = Math.cos(time * (0.6 + i * 0.15) + i * 2.1) * (12 + i * 5);
      el.style.transform = `translate3d(${(curMX * d * 420 + fx).toFixed(2)}px, ${(curScroll * d * 2.6 + curMY * d * 420 + fy).toFixed(2)}px, ${(d * 300).toFixed(0)}px) rotate(${(curMX * 24 + Math.sin(time * 0.5 + i) * 8).toFixed(2)}deg) scale(${(1 + Math.sin(time * 0.8 + i * 2) * 0.08).toFixed(3)})`;
    });
    orbs.forEach((el, i) => {
      const d = parseFloat(el.dataset.depth || 0.1);
      const fx = Math.sin(time * 0.45 + i * 2.4) * 22;
      const fy = Math.cos(time * 0.4 + i * 1.8) * 26;
      el.style.transform = `translate3d(${(curMX * d * -520 + fx).toFixed(2)}px, ${(curScroll * d * 1.8 + curMY * d * -520 + fy).toFixed(2)}px, ${(d * 200).toFixed(0)}px) scale(${(1 + Math.sin(time * 0.55 + i) * 0.1).toFixed(3)})`;
      el.style.opacity = (0.9 - p * 0.5).toFixed(3);
    });
    hoverC += (hoverT - hoverC) * 0.06;
    if (Math.abs(hoverT - hoverC) < 0.001) hoverC = hoverT;
    if (particles) particles.style.transform = `translate3d(${(curMX * 20).toFixed(2)}px, ${(curScroll * 0.28 + curMY * 14).toFixed(2)}px, 40px)`;
    dots.forEach((d, i) => {
      const dx = mxPx - d.bx;
      const dy = myPx - d.by;
      const dist = Math.hypot(dx, dy) || 1;
      const maxPull = 130;
      let tx = dx * d.s * hoverC;
      let ty = dy * d.s * hoverC;
      const tl = Math.hypot(tx, ty);
      if (tl > maxPull) { tx = (tx / tl) * maxPull; ty = (ty / tl) * maxPull; }
      const ix = Math.sin(time * (0.9 + i * 0.12) + i * 1.3) * 12 * (1 - hoverC * 0.55);
      const iy = Math.cos(time * (0.8 + i * 0.1) + i) * 16 * (1 - hoverC * 0.55);
      d.cx += (tx + ix - d.cx) * 0.085;
      d.cy += (ty + iy - d.cy) * 0.085;
      const near = Math.max(0, 1 - Math.min(dist / 480, 1));
      const glow = hoverC * near;
      const sc = (1 + Math.sin(time * 1.4 + i * 1.7) * 0.3 + glow * 1.6 + hoverC * 0.35).toFixed(3);
      d.el.style.transform = `translate(${d.cx.toFixed(2)}px, ${d.cy.toFixed(2)}px) scale(${sc})`;
      d.el.style.opacity = (0.45 + glow * 0.55 + hoverC * 0.15).toFixed(3);
      d.el.style.background = glow > 0.35 ? "rgba(34,211,238,0.95)" : glow > 0.12 ? "rgba(129,140,248,0.9)" : "";
      d.el.style.boxShadow = `0 0 ${(8 + glow * 22).toFixed(0)}px rgba(34,211,238,${(0.4 + glow * 0.6).toFixed(3)})`;
    });
    rings.forEach((ring, i) => {
      const s = 1 + Math.sin(time * 1.1 + i * 2) * 0.06;
      ring.style.transform = `translate3d(${(curMX * (14 + i * 10)).toFixed(2)}px, ${(curMY * (14 + i * 10)).toFixed(2)}px, 0) scale(${s.toFixed(3)}) rotate(${(time * 8 + i * 40).toFixed(2)}deg)`;
    });
    if (content) {
      content.style.transform = `translate3d(${(curMX * 22 + Math.sin(time * 0.6) * 4).toFixed(2)}px, ${(curScroll * 0.14 + curMY * 14 + Math.cos(time * 0.55) * 5).toFixed(2)}px, 50px) rotateY(${(curMX * 4).toFixed(3)}deg)`;
      content.style.opacity = Math.max(0, 1 - p * 1).toFixed(3);
    }
    if (visual) {
      visual.style.transform = `translate3d(${(curMX * -38 + Math.sin(time * 0.65 + 1) * 6).toFixed(2)}px, ${(curScroll * -0.08 + curMY * -24 + Math.cos(time * 0.7) * 9).toFixed(2)}px, 90px)`;
      visual.style.opacity = Math.max(0, 1 - p * 0.75).toFixed(3);
    }
    if (card) {
      const floatY = Math.sin(time * 1.2) * 10;
      const floatR = Math.sin(time * 0.9) * 1.4;
      card.style.transform = `rotateY(${(curMX * 16).toFixed(3)}deg) rotateX(${(-curMY * 14).toFixed(3)}deg) translateZ(46px) translateY(${floatY.toFixed(2)}px) rotateZ(${floatR.toFixed(3)}deg)`;
      card.style.boxShadow = `${(-curMX * 26).toFixed(1)}px ${(22 + -curMY * 22).toFixed(1)}px 70px rgba(0,0,0,0.45), 0 0 ${(34 + Math.abs(curMX) * 40).toFixed(0)}px rgba(99,102,241,${(0.22 + Math.abs(curMX) * 0.25).toFixed(3)})`;
      card.style.setProperty("--gx", curGX.toFixed(1) + "%");
      card.style.setProperty("--gy", curGY.toFixed(1) + "%");
      const hover = Math.abs(curMX) + Math.abs(curMY) > 0.02 ? 1 : 0;
      card.style.setProperty("--glare-o", hover ? 1 : 0);
      if (glare) glare.style.opacity = hover ? 1 : 0;
    }
    chips.forEach((chip, i) => {
      const d = parseFloat(chip.dataset.depth || 0.2);
      const fx = Math.sin(time * 1.3 + i * 2.2) * 12;
      const fy = Math.cos(time * 1.15 + i * 1.6) * 14;
      chip.style.transform = `translate3d(${(curMX * d * 320 + fx).toFixed(2)}px, ${(curMY * d * 320 + fy + curScroll * -0.12).toFixed(2)}px, ${(120 + d * 300).toFixed(0)}px) rotateY(${(curMX * 18).toFixed(2)}deg) rotate(${(Math.sin(time * 0.8 + i) * 4).toFixed(2)}deg)`;
      chip.style.opacity = Math.max(0, 1 - p * 0.85).toFixed(3);
    });
    buttons.forEach((btn, i) => {
      const m = i === 0 ? 10 : 14;
      btn.style.transform = `translate3d(${(curMX * m).toFixed(2)}px, ${(curMY * m).toFixed(2)}px, 30px)`;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  start();
}

// Typing effect for hero title (optional)
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const speed = 50; // milliseconds per character

  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  // Start typing effect when hero section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        observer.disconnect();
      }
    },
    { threshold: 0.5 },
  );

  observer.observe(heroTitle);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set current year
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Initialize carousel
  initializeCarousel();

  // Update nav on initial load
  updateActiveNavLink();

  // Initialize parallax
  initParallax();

  // Initialize typing effect (optional - uncomment if needed)
  // initTypingEffect();

  // Add glow effect to primary CTA buttons
  const primaryButtons = document.querySelectorAll(".btn-primary");
  primaryButtons.forEach((btn) => {
    if (btn.textContent.includes("Konsultasi") || btn.textContent.includes("Hubungi")) {
      btn.classList.add("glow");
    }
  });

  // Add hover effects to service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
  });

  // Initialize scroll animations
  animateOnScroll();

  // Initialize portfolio modal
  initPortfolioModal();

  // Initialize portfolio toggle
  initPortfolioToggle();

  // Initialize back to top button
  initBackToTop();

  // Add click effect to social icons
  document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const rippleStyles = document.createElement("style");
  rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyles);
});

// Portfolio description toggle (Lebih Banyak / Lebih Sedikit)
function initPortfolioToggle() {
  document.querySelectorAll(".portfolio-card").forEach((card) => {
    const desc = card.querySelector(".portfolio-desc");
    const toggle = card.querySelector(".portfolio-toggle");
    if (!desc || !toggle) return;

    function checkOverflow() {
      if (desc.scrollHeight > desc.clientHeight) {
        toggle.classList.add("show");
      }
    }

    checkOverflow();

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (desc.classList.contains("expanded")) {
        desc.classList.remove("expanded");
        toggle.textContent = "Lebih Banyak...";
      } else {
        desc.classList.add("expanded");
        toggle.textContent = "Lebih Sedikit";
      }
    });
  });
}

// Portfolio modal
function initPortfolioModal() {
  const modal = document.getElementById("portfolioModal");
  const modalImg = document.getElementById("portfolioModalImg");
  const modalVideo = document.getElementById("portfolioModalVideo");
  const modalMedia = document.getElementById("portfolioModalMedia");
  const closeBtn = document.getElementById("portfolioModalClose");
  let isClosing = false;

  function getVideoSrc(imgSrc) {
    const fileName = imgSrc.split("/").pop();
    const baseName = fileName.replace(/\.[^.]+$/, "");
    return "vid/" + baseName + ".mp4";
  }

  function resetMedia() {
    modalMedia.classList.remove("playing");
    modalVideo.classList.remove("show");
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
  }

  document.querySelectorAll(".portfolio-card").forEach((card) => {
    card.addEventListener("click", function () {
      const img = this.querySelector(".portfolio-img");
      if (img) {
        resetMedia();
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalVideo.dataset.src = getVideoSrc(img.src);
        modal.style.display = "flex";
        requestAnimationFrame(() => {
          modal.classList.add("active");
        });
        document.body.style.overflow = "hidden";
      }
    });
  });

  modalMedia.addEventListener("click", function (e) {
    if (e.target.closest(".portfolio-modal-close")) return;
    if (modalMedia.classList.contains("playing")) return;
    const videoSrc = modalVideo.dataset.src;
    if (!videoSrc) return;
    modalVideo.setAttribute("src", videoSrc);
    modalVideo.load();
    modalMedia.classList.add("playing");
    modalVideo.classList.add("show");
    modalVideo.play().catch(function () {});
  });

  modalVideo.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!modalVideo.paused && !modalVideo.ended) {
      modalVideo.pause();
    } else {
      modalVideo.play().catch(function () {});
    }
  });

  modalVideo.addEventListener("ended", function () {
    resetMedia();
  });

  function closeModal() {
    if (isClosing) return;
    isClosing = true;
    resetMedia();
    modal.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(function () {
      modal.style.display = "none";
      isClosing = false;
    }, 400);
  }

  closeBtn.addEventListener("click", closeModal);
  modal.querySelector(".portfolio-modal-overlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// Back to Top button
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// WhatsApp button functionality
document.querySelectorAll('a[href*="whatsapp"]').forEach((whatsappBtn) => {
  whatsappBtn.addEventListener("click", function (e) {
    // Add analytics tracking here
    console.log("WhatsApp button clicked");

    // Optional: Add click animation
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 200);
  });
});

// Form validation helper function
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Use debounce for scroll events
window.addEventListener("scroll", debounce(animateOnScroll, 10));

// Load saved theme
// if (localStorage.getItem("theme") === "dark") {
//   document.body.classList.add("dark-mode");
//   themeSwitch.checked = true;
// } else {
//   document.body.classList.add("light-mode");
// }

// themeSwitch.addEventListener("change", () => {
//   if (themeSwitch.checked) {
//     document.body.classList.remove("light-mode");
//     document.body.classList.add("dark-mode");
//     localStorage.setItem("theme", "dark");
//   } else {
//     document.body.classList.remove("dark-mode");
//     document.body.classList.add("light-mode");
//     localStorage.setItem("theme", "light");
//   }
// });

// // Floating navbar on scroll
// window.addEventListener("scroll", () => {
//   const nav = document.querySelector(".navbar");
//   if (window.scrollY > 50) nav.classList.add("scrolled");
//   else nav.classList.remove("scrolled");
// });
