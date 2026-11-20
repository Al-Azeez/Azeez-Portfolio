/* ==========================================================================
   ABDUL AZEEZ — PORTFOLIO INTERACTIVITY, DYNAMIC COLOR SHIFT & RENDER ENGINE
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rootEl = document.documentElement;

  /* ------------------------------------------------------------------------
     0. TOAST NOTIFICATION HELPER
     ------------------------------------------------------------------------ */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 4200);
  }

  /* ------------------------------------------------------------------------
     1. THEME TOGGLE (Dark Default + Light Mode) & DYNAMIC COLOR-CHANGING ACCENTS
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    rootEl.setAttribute("data-theme", theme);
    localStorage.setItem("aa-portfolio-theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      themeToggleBtn.innerHTML = theme === "dark"
        ? '<i data-lucide="sun" width="18" height="18"></i>'
        : '<i data-lucide="moon" width="18" height="18"></i>';
      refreshIcons();
    }
  }

  applyTheme(localStorage.getItem("aa-portfolio-theme") || "dark");

  themeToggleBtn?.addEventListener("click", () => {
    const next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // Dynamic Color-Changing Accent Palettes
  const ACCENT_PALETTES = [
    { name: "Electric Blue", primary: "#3B82F6", secondary: "#8B5CF6", cyan: "#06B6D4" },
    { name: "Cyber Violet",  primary: "#8B5CF6", secondary: "#EC4899", cyan: "#38BDF8" },
    { name: "Emerald Cyan",  primary: "#10B981", secondary: "#06B6D4", cyan: "#3B82F6" },
    { name: "Solar Gold",    primary: "#F59E0B", secondary: "#EC4899", cyan: "#06B6D4" }
  ];

  let paletteIndex = 0;
  let autoCycle = !prefersReducedMotion;
  let cycleInterval = null;
  const colorCycleBtn = document.getElementById("color-cycle-btn");
  const colorCycleLabel = document.getElementById("color-cycle-label");

  function applyAccentPalette(idx) {
    const p = ACCENT_PALETTES[idx % ACCENT_PALETTES.length];
    rootEl.style.setProperty("--accent-primary", p.primary);
    rootEl.style.setProperty("--accent-secondary", p.secondary);
    rootEl.style.setProperty("--accent-cyan", p.cyan);
    if (colorCycleLabel) {
      colorCycleLabel.textContent = autoCycle ? "Auto Colors" : p.name;
    }
  }

  function startAutoColorShift() {
    clearInterval(cycleInterval);
    if (!autoCycle || prefersReducedMotion) return;
    cycleInterval = setInterval(() => {
      paletteIndex = (paletteIndex + 1) % ACCENT_PALETTES.length;
      applyAccentPalette(paletteIndex);
    }, 5500);
  }

  colorCycleBtn?.addEventListener("click", () => {
    paletteIndex = (paletteIndex + 1) % ACCENT_PALETTES.length;
    autoCycle = false;
    clearInterval(cycleInterval);
    applyAccentPalette(paletteIndex);
    showToast(`Accent theme switched to ${ACCENT_PALETTES[paletteIndex].name}`);
  });

  applyAccentPalette(0);
  startAutoColorShift();

  /* ------------------------------------------------------------------------
     2. STICKY NAVBAR, SCROLL PROGRESS BAR & ACTIVE SECTION SPY
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById("navbar");
  const scrollBar = document.getElementById("scroll-progress");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle("scrolled", y > 16);
    if (scrollBar) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, (y / docH) * 100) : 0;
      scrollBar.style.width = pct + "%";
    }
  }, { passive: true });

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link[data-section]");
    if (!sections.length || !navLinks.length) return;

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((l) => l.classList.toggle("active", l.dataset.section === id));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((sec) => spy.observe(sec));
  }

  /* ------------------------------------------------------------------------
     3. HERO ROTATING ROLES & COLOR-SHIFTING PARTICLE CANVAS
     ------------------------------------------------------------------------ */
  function initRotatingRoles() {
    const el = document.getElementById("rotating-role-text");
    if (!el) return;
    const roles = PORTFOLIO_DATA.profile.rotatingRoles;
    if (prefersReducedMotion) {
      el.textContent = roles[0];
      return;
    }

    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 54);
      } else {
        charIdx--;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 28);
      }
    }
    tick();
  }

  function initHeroParticles() {
    const canvas = document.getElementById("hero-particles");
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const count = Math.min(54, Math.floor(width / 25));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      r: Math.random() * 1.9 + 0.8
    }));

    window.addEventListener("resize", () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    let hue = 215;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      hue = (hue + 0.14) % 360;
      const isLight = rootEl.getAttribute("data-theme") === "light";
      const dotColor = `hsla(${hue}, 85%, ${isLight ? 48 : 62}%, ${isLight ? 0.45 : 0.58})`;
      const lineColor = `hsla(${(hue + 30) % 360}, 85%, ${isLight ? 48 : 60}%, ${isLight ? 0.11 : 0.14})`;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ------------------------------------------------------------------------
     4. PROJECT VISUAL SVG GENERATOR
     ------------------------------------------------------------------------ */
  function buildProjectSVG(project) {
    const c = project.accent;
    if (project.visualType === "blockchain") {
      return `
        <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${project.title} preview">
          <defs><linearGradient id="bg-bc" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0B1224"/><stop offset="100%" stop-color="#111C38"/></linearGradient></defs>
          <rect width="640" height="360" fill="url(#bg-bc)"/>
          <g stroke="${c}" stroke-opacity="0.38" stroke-width="2">
            <line x1="130" y1="180" x2="275" y2="115"/><line x1="130" y1="180" x2="275" y2="245"/>
            <line x1="275" y1="115" x2="435" y2="175"/><line x1="275" y1="245" x2="435" y2="175"/>
            <line x1="435" y1="175" x2="545" y2="120" stroke="#EF4444" stroke-dasharray="6 4"/>
          </g>
          <g fill="#0F172A" stroke="${c}" stroke-width="2">
            <rect x="65" y="150" width="110" height="60" rx="10"/><rect x="225" y="85" width="110" height="60" rx="10"/>
            <rect x="225" y="215" width="110" height="60" rx="10"/><rect x="380" y="145" width="115" height="60" rx="10" stroke="#06B6D4"/>
            <rect x="495" y="90" width="105" height="58" rx="10" stroke="#EF4444"/>
          </g>
          <g fill="#E2E8F0" font-family="monospace" font-size="11" text-anchor="middle">
            <text x="120" y="176">0x7aF...91c</text><text x="120" y="194" fill="#94A3B8">Wallet A</text>
            <text x="280" y="111">0x3bE...42d</text><text x="280" y="129" fill="#94A3B8">Hop Node</text>
            <text x="280" y="241">0x9cA...18e</text><text x="280" y="259" fill="#94A3B8">Mixer Cluster</text>
            <text x="437" y="171">ML Risk Engine</text><text x="437" y="189" fill="#06B6D4">Explainable</text>
            <text x="547" y="116" fill="#FCA5A5">Alert Flagged</text><text x="547" y="133" fill="#EF4444">High Anomaly</text>
          </g>
          <text x="28" y="38" fill="#64748B" font-family="monospace" font-size="12">CHAINFORENSICS // BLOCKCHAIN INVESTIGATION GRAPH</text>
        </svg>`;
    }
    if (project.visualType === "security") {
      return `
        <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${project.title} preview">
          <rect width="640" height="360" fill="#091522"/>
          <rect x="44" y="54" width="552" height="252" rx="14" fill="#0F1D32" stroke="${c}" stroke-opacity="0.35"/>
          <rect x="72" y="88" width="496" height="44" rx="8" fill="#08101E" stroke="#334155"/>
          <text x="90" y="115" fill="#94A3B8" font-family="monospace" font-size="13">https://verify-account-login-security[.]example/auth</text>
          <rect x="478" y="96" width="80" height="28" rx="6" fill="${c}"/>
          <text x="518" y="114" fill="#08101E" font-family="sans-serif" font-weight="700" font-size="12" text-anchor="middle">SCAN</text>
          <rect x="72" y="156" width="236" height="120" rx="10" fill="#13233C" stroke="#EF4444" stroke-opacity="0.5"/>
          <text x="92" y="186" fill="#FCA5A5" font-family="monospace" font-size="12">THREAT ANALYSIS</text>
          <text x="92" y="216" fill="#F8FAFC" font-family="sans-serif" font-weight="700" font-size="20">Phishing Risk Detected</text>
          <text x="92" y="244" fill="#94A3B8" font-family="sans-serif" font-size="12">Domain entropy + URL structure flags</text>
          <rect x="332" y="156" width="236" height="120" rx="10" fill="#13233C" stroke="${c}" stroke-opacity="0.4"/>
          <text x="352" y="186" fill="#67E8F9" font-family="monospace" font-size="12">SECURITY AWARENESS</text>
          <text x="352" y="216" fill="#F8FAFC" font-family="sans-serif" font-weight="700" font-size="18">Report &amp; Educate</text>
          <text x="352" y="244" fill="#94A3B8" font-family="sans-serif" font-size="12">FastAPI ML URL Classification</text>
          <text x="44" y="38" fill="#64748B" font-family="monospace" font-size="12">PHISHX AI // URL THREAT SCANNER</text>
        </svg>`;
    }
    if (project.visualType === "agri") {
      return `
        <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${project.title} preview">
          <rect width="640" height="360" fill="#081A18"/>
          <rect x="44" y="56" width="248" height="248" rx="14" fill="#0E2623" stroke="${c}" stroke-opacity="0.45"/>
          <path d="M168 106 C215 128, 224 198, 168 256 C112 198, 121 128, 168 106 Z" fill="${c}" fill-opacity="0.22" stroke="${c}" stroke-width="2.5"/>
          <line x1="168" y1="115" x2="168" y2="250" stroke="${c}" stroke-width="2"/>
          <rect x="94" y="158" width="148" height="2" fill="#34D399" opacity="0.8"/>
          <text x="168" y="286" fill="#A7F3D0" font-family="monospace" font-size="11" text-anchor="middle">VISION SCAN ACTIVE</text>
          <rect x="316" y="56" width="280" height="248" rx="14" fill="#0F1F2E" stroke="#1E3A5F"/>
          <text x="340" y="92" fill="#34D399" font-family="monospace" font-size="12">DIAGNOSTIC OUTPUT</text>
          <text x="340" y="124" fill="#F8FAFC" font-family="sans-serif" font-weight="700" font-size="19">Leaf Disease Detection</text>
          <rect x="340" y="148" width="232" height="12" rx="6" fill="#1E293B"/>
          <rect x="340" y="148" width="194" height="12" rx="6" fill="${c}"/>
          <text x="340" y="182" fill="#94A3B8" font-family="monospace" font-size="11">CONFIDENCE REPORTING</text>
          <rect x="340" y="204" width="232" height="76" rx="8" fill="#132A2E" stroke="${c}" stroke-opacity="0.3"/>
          <text x="356" y="230" fill="#E2E8F0" font-family="sans-serif" font-weight="600" font-size="13">Prevention Guidance</text>
          <text x="356" y="252" fill="#94A3B8" font-family="sans-serif" font-size="12">Targeted treatment &amp; crop care steps</text>
          <text x="44" y="38" fill="#64748B" font-family="monospace" font-size="12">CROPSHIELD-AI // AGRI VISION PIPELINE</text>
        </svg>`;
    }
    if (project.visualType === "civic") {
      return `
        <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${project.title} preview">
          <rect width="640" height="360" fill="#100D24"/>
          <rect x="44" y="56" width="552" height="248" rx="14" fill="#161433" stroke="${c}" stroke-opacity="0.4"/>
          <text x="72" y="92" fill="#C4B5FD" font-family="monospace" font-size="12">CIVIC INCIDENT QUEUE — ADMIN REVIEW</text>
          <rect x="72" y="112" width="496" height="48" rx="8" fill="#1E1B4B"/>
          <circle cx="98" cy="136" r="8" fill="#F59E0B"/>
          <text x="120" y="141" fill="#F8FAFC" font-family="sans-serif" font-size="13" font-weight="600">Garbage Complaint #1042 — Ward 14 Collection Pending</text>
          <rect x="478" y="124" width="76" height="24" rx="12" fill="rgba(245,158,11,0.2)"/>
          <text x="516" y="140" fill="#FBBF24" font-family="monospace" font-size="11" text-anchor="middle">REVIEW</text>
          <rect x="72" y="172" width="496" height="48" rx="8" fill="#1E1B4B"/>
          <circle cx="98" cy="196" r="8" fill="#10B981"/>
          <text x="120" y="201" fill="#F8FAFC" font-family="sans-serif" font-size="13" font-weight="600">Sanitation Incident #1039 — Verified &amp; Cleared</text>
          <rect x="478" y="184" width="76" height="24" rx="12" fill="rgba(16,185,129,0.2)"/>
          <text x="516" y="200" fill="#34D399" font-family="monospace" font-size="11" text-anchor="middle">RESOLVED</text>
          <rect x="72" y="232" width="496" height="48" rx="8" fill="#1E1B4B"/>
          <circle cx="98" cy="256" r="8" fill="${c}"/>
          <text x="120" y="261" fill="#F8FAFC" font-family="sans-serif" font-size="13" font-weight="600">Citizen Report #1045 — Assigned to Municipal Crew</text>
          <rect x="478" y="244" width="76" height="24" rx="12" fill="rgba(139,92,246,0.25)"/>
          <text x="516" y="260" fill="#C4B5FD" font-family="monospace" font-size="11" text-anchor="middle">ACTIVE</text>
          <text x="44" y="38" fill="#64748B" font-family="monospace" font-size="12">CIVICTRUST // MERN STACK CIVIC PORTAL</text>
        </svg>`;
    }
    return `
      <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${project.title} preview">
        <rect width="640" height="360" fill="#14110B"/>
        <rect x="44" y="56" width="260" height="248" rx="14" fill="#1E1912" stroke="${c}" stroke-opacity="0.45"/>
        <text x="72" y="92" fill="#FBBF24" font-family="monospace" font-size="12">BARCODE SCANNER</text>
        <g fill="#F8FAFC" opacity="0.88">
          <rect x="86" y="116" width="6" height="90"/><rect x="98" y="116" width="12" height="90"/>
          <rect x="116" y="116" width="4" height="90"/><rect x="128" y="116" width="10" height="90"/>
          <rect x="146" y="116" width="6" height="90"/><rect x="160" y="116" width="14" height="90"/>
          <rect x="182" y="116" width="5" height="90"/><rect x="195" y="116" width="11" height="90"/>
          <rect x="214" y="116" width="6" height="90"/><rect x="228" y="116" width="12" height="90"/>
        </g>
        <line x1="72" y1="162" x2="276" y2="162" stroke="#10B981" stroke-width="2.5"/>
        <text x="174" y="242" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">SKU-890123456789</text>
        <rect x="328" y="56" width="268" height="248" rx="14" fill="#171C28" stroke="#334155"/>
        <text x="352" y="92" fill="#34D399" font-family="monospace" font-size="12">SELF-CHECKOUT — DEPLOYED</text>
        <rect x="352" y="112" width="220" height="36" rx="7" fill="#1E293B"/>
        <text x="366" y="135" fill="#F8FAFC" font-family="sans-serif" font-size="12">Scanned Items -> Cart API</text>
        <rect x="352" y="160" width="220" height="36" rx="7" fill="#1E293B"/>
        <text x="366" y="183" fill="#F8FAFC" font-family="sans-serif" font-size="12">Django REST Payment Flow</text>
        <rect x="352" y="220" width="220" height="44" rx="9" fill="#10B981"/>
        <text x="462" y="247" fill="#062016" font-family="sans-serif" font-weight="800" font-size="13" text-anchor="middle">LIVE &amp; DEPLOYED</text>
        <text x="44" y="38" fill="#64748B" font-family="monospace" font-size="12">QUICKCHECKOUT // DJANGO + REACT</text>
      </svg>`;
  }

  /* ------------------------------------------------------------------------
     5. RENDER SECTIONS FROM PORTFOLIO_DATA
     ------------------------------------------------------------------------ */
  function renderAbout() {
    const proseEl = document.getElementById("about-prose");
    if (proseEl) {
      proseEl.innerHTML = PORTFOLIO_DATA.profile.introParagraphs
        .map((p) => `<p>${p}</p>`)
        .join("");
    }
  }

  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;
    grid.innerHTML = PORTFOLIO_DATA.skills.map((cat, i) => `
      <div class="skill-category-card reveal" style="transition-delay:${i * 70}ms;">
        <div class="skill-cat-head">
          <div class="skill-cat-icon"><i data-lucide="${cat.icon}" width="20" height="20"></i></div>
          <h3 class="skill-cat-title">${cat.category}</h3>
        </div>
        <div class="skill-pills">
          ${cat.items.map((item) => `
            <span class="skill-pill">
              <span class="skill-dot"></span>
              ${item}
            </span>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderProjects(filter = "All") {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const list = filter === "All"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === filter);

    grid.innerHTML = list.map((p, i) => {
      const liveBtnHtml = p.liveUrl
        ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
             <i data-lucide="external-link" width="15" height="15"></i> Live Demo
           </a>`
        : `<button type="button" class="btn btn-primary btn-sm" data-missing-live="${p.title}">
             <i data-lucide="external-link" width="15" height="15"></i> Live Demo
           </button>`;

      return `
        <article class="project-card tilt-card reveal" style="transition-delay:${i * 80}ms;">
          <div class="project-visual">
            ${buildProjectSVG(p)}
            <span class="project-status-badge badge-live">${p.status}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-summary">${p.shortExplanation}</p>
            <div class="project-problem"><strong>Problem:</strong> ${p.problemSolved}</div>
            <ul class="project-features">
              ${p.features.map((f) => `<li>${f}</li>`).join("")}
            </ul>
            <div class="tech-stack-row">
              ${p.stack.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
            </div>
            <div class="project-actions">
              ${liveBtnHtml}
              ${p.githubUrl ? `
                <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                  <i data-lucide="github" width="15" height="15"></i> GitHub Repo
                </a>` : `
                <a href="${PORTFOLIO_DATA.profile.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" title="View Abdul Azeez's GitHub Profile">
                  <i data-lucide="github" width="15" height="15"></i> GitHub Profile
                </a>`}
              <button type="button" class="btn btn-ghost btn-sm" data-open-project="${p.id}">
                <i data-lucide="info" width="15" height="15"></i> Details
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-open-project]").forEach((btn) => {
      btn.addEventListener("click", () => openProjectModal(btn.dataset.openProject));
    });
    grid.querySelectorAll("[data-missing-live]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast(`Paste your deployed ${btn.dataset.missingLive} URL into liveUrl inside js/data.js to open it here.`);
      });
    });

    refreshIcons();
    observeReveals();
    initTiltCards();
  }

  function initProjectFilters() {
    const tabs = document.querySelectorAll(".filter-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderProjects(tab.dataset.filter);
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. LIGHTBOX COLLECTION REGISTRY (Certificates & Photos)
     ------------------------------------------------------------------------ */
  let lightboxItems = [];
  let currentLbIndex = 0;
  let currentZoom = 1;

  function registerLightboxItem(item) {
    const idx = lightboxItems.length;
    lightboxItems.push(item);
    return idx;
  }

  function renderHackathons() {
    const featuredEl = document.getElementById("hackathon-featured");
    const timelineEl = document.getElementById("hackathon-timeline");
    if (!featuredEl || !timelineEl) return;

    const featured = PORTFOLIO_DATA.hackathons.find((h) => h.isFeaturedAward);
    const others = PORTFOLIO_DATA.hackathons.filter((h) => !h.isFeaturedAward);

    if (featured) {
      const startIdx = lightboxItems.length;
      const certCardsHtml = featured.certificates.map((cert) => {
        const idx = registerLightboxItem({
          src: cert.image,
          title: cert.title,
          subtitle: `${cert.organization} • ${cert.date} — ${cert.description}`,
          isPhoto: false
        });
        return `
          <div class="cert-thumb-box" data-open-lb="${idx}" role="button" tabindex="0" aria-label="View ${cert.title}">
            <div class="cert-thumb-frame">
              <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
            </div>
            <div class="cert-thumb-caption">
              <div class="cert-thumb-head">
                <span>${cert.type}</span>
                <i data-lucide="maximize-2" width="14" height="14"></i>
              </div>
              <p class="cert-short-desc">${cert.description}</p>
            </div>
          </div>
        `;
      }).join("");

      featuredEl.innerHTML = `
        <div class="hackathon-featured reveal">
          <div class="badge-row">
            <span class="award-ribbon">
              <i data-lucide="trophy" width="15" height="15"></i>
              Major Award-Winning Achievement
            </span>
            <span class="badge-pill badge-solo">
              <i data-lucide="user-check" width="13" height="13"></i>
              ${featured.soloLabel}
            </span>
          </div>
          <h3 style="font-size:1.75rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:6px;">${featured.title}</h3>
          <div class="meta-row">
            <span><i data-lucide="award" width="15" height="15"></i> 2nd Prize — AI &amp; Software</span>
            <span><i data-lucide="calendar" width="15" height="15"></i> ${featured.date}</span>
            <span><i data-lucide="building-2" width="15" height="15"></i> ${featured.organization}</span>
          </div>
          <p style="color:var(--text-secondary);margin-bottom:16px;max-width:860px;">${featured.details}</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <button type="button" class="btn btn-primary btn-sm" data-open-lb="${startIdx}">
              <i data-lucide="eye" width="15" height="15"></i> View Certificate of Merit
            </button>
            <button type="button" class="btn btn-secondary btn-sm" data-open-lb="${startIdx + 1}">
              <i data-lucide="file-badge" width="15" height="15"></i> View Participation Certificate
            </button>
            <button type="button" class="btn btn-secondary btn-sm" data-open-lb="${startIdx + 2}">
              <i data-lucide="award" width="15" height="15"></i> View Appreciation Certificate
            </button>
          </div>
          <div class="featured-hack-certs">${certCardsHtml}</div>
        </div>
      `;
    }

    timelineEl.innerHTML = others.map((h, i) => {
      const cert = h.certificates[0];
      const idx = registerLightboxItem({
        src: cert.image,
        title: cert.title,
        subtitle: `${cert.organization}${cert.date ? " • " + cert.date : ""} — ${cert.description}`,
        isPhoto: false
      });

      return `
        <div class="timeline-item ${h.highlightRank ? "highlight-rank" : ""} reveal" style="transition-delay:${i * 75}ms;">
          <div>
            <div class="badge-row">
              <span class="badge-pill ${h.badgeClass} hackathon-result-badge ${h.id === "hackx-2026" || h.id === "kalachakra-techsurge-2k26" ? "hackathon-accent-badge" : ""}">
                <i data-lucide="sparkles" width="15" height="15"></i>
                ${h.type}
              </span>
              <span class="badge-pill badge-solo hackathon-solo-badge">
                <i data-lucide="user-check" width="15" height="15"></i>
                ${h.soloLabel}
              </span>
            </div>
            <h3 style="font-size:1.22rem;font-weight:800;">${h.title}</h3>
            <div class="meta-row">
              <span><i data-lucide="building-2" width="14" height="14"></i> ${h.organization}</span>
              ${h.date ? `<span><i data-lucide="calendar" width="14" height="14"></i> ${h.date}</span>` : ""}
            </div>
            <p style="color:var(--text-secondary);font-size:0.94rem;">${h.summary}</p>
            <p class="cert-short-desc" style="margin-top:8px;">${cert.description}</p>
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:10px;">
              <button type="button" class="expand-btn" style="margin-top:0;" data-toggle-detail="${h.id}" aria-expanded="false">
                <span>More details</span> <i data-lucide="chevron-down" width="15" height="15"></i>
              </button>
            </div>
            <div class="expand-details" id="detail-${h.id}">${h.details}</div>
          </div>
          <div class="cert-thumb-box" data-open-lb="${idx}" role="button" tabindex="0" aria-label="View ${cert.title}">
            <div class="cert-thumb-frame">
              <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
            </div>
            <div class="cert-thumb-caption">
              <div class="cert-thumb-head">
                <span>View Certificate</span>
                <i data-lucide="maximize-2" width="14" height="14"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    timelineEl.querySelectorAll("[data-toggle-detail]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = document.getElementById("detail-" + btn.dataset.toggleDetail);
        if (!panel) return;
        const open = panel.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
        btn.querySelector("span").textContent = open ? "Hide details" : "More details";
      });
    });
  }

  function renderCertGallery(containerId, items, isAward = false) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = items.map((c, i) => {
      const idx = registerLightboxItem({
        src: c.image,
        title: c.title,
        subtitle: `${c.organization}${c.date ? " • " + c.date : ""} — ${c.description}`,
        isPhoto: false
      });

      return `
        <article class="cert-card ${isAward ? "award-card" : ""} reveal" style="transition-delay:${i * 70}ms;">
          <div class="cert-card-media" data-open-lb="${idx}" role="button" tabindex="0" aria-label="Enlarge ${c.title}">
            <img src="${c.image}" alt="${c.title} — ${c.organization}" loading="lazy" />
          </div>
          <div class="cert-card-body">
            <div>
              <span class="badge-pill ${c.badgeClass}">
                <i data-lucide="${isAward ? "trophy" : "badge-check"}" width="13" height="13"></i>
                ${c.type}
              </span>
            </div>
            <h4 class="cert-card-title">${c.title}</h4>
            <p class="cert-card-org">${c.organization}</p>
            ${c.date ? `<p class="cert-card-date">${c.date}</p>` : ""}
            <p class="cert-card-explain">${c.description}</p>
            <div class="cert-card-footer">
              <button type="button" class="btn btn-secondary btn-sm" style="width:100%;" data-open-lb="${idx}">
                <i data-lucide="eye" width="15" height="15"></i> View Certificate
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderDriveCredentials() {
    const grid = document.getElementById("drive-credentials-grid");
    if (!grid) return;

    grid.innerHTML = PORTFOLIO_DATA.driveCredentials.map((c, i) => {
      const idx = registerLightboxItem({
        src: c.image,
        title: c.title,
        subtitle: `${c.organization}${c.date ? " • " + c.date : ""} — ${c.description}`,
        isPhoto: false
      });
      const originalUrl = c.driveUrl || c.image;

      return `
        <article class="cert-card reveal" style="transition-delay:${i * 75}ms;">
          <div class="cert-card-media" data-open-lb="${idx}" role="button" tabindex="0" aria-label="Enlarge ${c.title}">
            <img src="${c.image}" alt="${c.title}" loading="lazy" />
          </div>
          <div class="cert-card-body">
            <div>
              <span class="badge-pill ${c.badgeClass}">
                <i data-lucide="award" width="13" height="13"></i>
                ${c.type}
              </span>
            </div>
            <h4 class="cert-card-title">${c.title}</h4>
            <p class="cert-card-org">${c.organization}</p>
            ${c.date ? `<p class="cert-card-date">${c.date}</p>` : ""}
            <p class="cert-card-explain">${c.description}</p>
            <div class="cert-card-footer">
              <a href="${originalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="width:100%;">
                <i data-lucide="external-link" width="15" height="15"></i> View Original Certificate
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderMoments() {
    const grid = document.getElementById("moments-grid");
    if (!grid) return;

    grid.innerHTML = PORTFOLIO_DATA.momentsOfAchievement.map((m, i) => {
      const idx = registerLightboxItem({
        src: m.image,
        title: m.title,
        subtitle: `${m.caption} (${m.date})`,
        isPhoto: true
      });
      return `
        <figure class="moment-card reveal" style="transition-delay:${i * 70}ms;" data-open-lb="${idx}" role="button" tabindex="0" aria-label="View photo: ${m.title}">
          <div class="moment-photo-wrap">
            <img src="${m.image}" alt="${m.title}" loading="lazy" />
          </div>
          <figcaption class="moment-caption">
            <h4>${m.title}</h4>
            <p>${m.caption}</p>
          </figcaption>
        </figure>
      `;
    }).join("");
  }

  function renderEducation() {
    const grid = document.getElementById("education-grid");
    if (!grid) return;

    grid.innerHTML = PORTFOLIO_DATA.education.map((e, i) => `
      <div class="edu-card reveal" style="transition-delay:${i * 80}ms;">
        <div class="edu-year">${e.period}</div>
        <h3 class="edu-degree">${e.degree}</h3>
        <p class="edu-school">${e.institution}</p>
        <div class="edu-stats">
          ${e.stats.map((s) => `<div class="edu-stat-chip">${s.label}: <span>${s.value}</span></div>`).join("")}
        </div>
      </div>
    `).join("");
  }

  /* ------------------------------------------------------------------------
     7. PROJECT DETAILS MODAL
     ------------------------------------------------------------------------ */
  const projectModal = document.getElementById("project-modal");
  const projectModalBody = document.getElementById("project-modal-body");

  function openProjectModal(projectId) {
    const p = PORTFOLIO_DATA.projects.find((item) => item.id === projectId);
    if (!p || !projectModal || !projectModalBody) return;

    projectModalBody.innerHTML = `
      <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border-subtle);margin-bottom:20px;">
        ${buildProjectSVG(p)}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
        <h3 style="font-size:1.6rem;font-weight:800;">${p.title}</h3>
        <span class="badge-pill badge-solo">${p.status}</span>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:16px;">${p.shortExplanation}</p>
      <div class="project-problem" style="margin-bottom:18px;">
        <strong>Problem Solved:</strong> ${p.problemSolved}
      </div>
      <h4 style="font-size:0.95rem;font-weight:700;margin-bottom:10px;">Key Features</h4>
      <ul class="project-features" style="margin-bottom:18px;">
        ${p.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
      <h4 style="font-size:0.95rem;font-weight:700;margin-bottom:10px;">Technology Stack</h4>
      <div class="tech-stack-row" style="margin-bottom:22px;">
        ${p.stack.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i data-lucide="external-link" width="15" height="15"></i> Open Live Demo</a>` : `<button type="button" class="btn btn-primary btn-sm" id="modal-missing-live"><i data-lucide="external-link" width="15" height="15"></i> Live Demo (Add URL in data.js)</button>`}
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm"><i data-lucide="github" width="15" height="15"></i> View GitHub Repository</a>` : `<a href="${PORTFOLIO_DATA.profile.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm"><i data-lucide="github" width="15" height="15"></i> GitHub Profile</a>`}
      </div>
    `;
    projectModal.classList.add("open");
    document.body.style.overflow = "hidden";
    document.getElementById("modal-missing-live")?.addEventListener("click", () => {
      showToast(`Paste your deployed ${p.title} URL into liveUrl inside js/data.js.`);
    });
    refreshIcons();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ------------------------------------------------------------------------
     8. FULL-SCREEN CERTIFICATE & PHOTO LIGHTBOX
     ------------------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbWrap = document.getElementById("lightbox-img-wrap");
  const lbTitle = document.getElementById("lightbox-title");
  const lbSubtitle = document.getElementById("lightbox-subtitle");
  const lbCounter = document.getElementById("lightbox-counter");

  function updateLightboxView() {
    const item = lightboxItems[currentLbIndex];
    if (!item || !lbImg) return;
    lbImg.src = item.src;
    lbImg.alt = item.title;
    lbTitle.textContent = item.title;
    lbSubtitle.textContent = item.subtitle;
    lbCounter.textContent = `${currentLbIndex + 1} / ${lightboxItems.length}`;
    lbWrap.classList.toggle("photo-mode", Boolean(item.isPhoto));
    setZoom(1);
  }

  function setZoom(level) {
    currentZoom = Math.max(1, Math.min(2.5, level));
    if (lbWrap) lbWrap.style.transform = `scale(${currentZoom})`;
  }

  function openLightbox(index) {
    if (!lightbox || index < 0 || index >= lightboxItems.length) return;
    currentLbIndex = index;
    updateLightboxView();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    if (!lightboxItems.length) return;
    currentLbIndex = (currentLbIndex + delta + lightboxItems.length) % lightboxItems.length;
    updateLightboxView();
  }

  function bindLightboxTriggers() {
    document.querySelectorAll("[data-open-lb]").forEach((el) => {
      const handler = () => openLightbox(Number(el.dataset.openLb));
      el.addEventListener("click", handler);
      if (el.tagName !== "BUTTON") {
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handler();
          }
        });
      }
    });
  }

  document.getElementById("lb-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lb-prev")?.addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lb-next")?.addEventListener("click", () => stepLightbox(1));
  document.getElementById("lb-zoom-in")?.addEventListener("click", () => setZoom(currentZoom + 0.35));
  document.getElementById("lb-zoom-out")?.addEventListener("click", () => setZoom(currentZoom - 0.35));
  document.getElementById("lb-zoom-reset")?.addEventListener("click", () => setZoom(1));
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.id === "lightbox-stage") closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox?.classList.contains("open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "+" || e.key === "=") setZoom(currentZoom + 0.35);
      if (e.key === "-") setZoom(currentZoom - 0.35);
    } else if (projectModal?.classList.contains("open") && e.key === "Escape") {
      closeProjectModal();
    } else if (resumeModal?.classList.contains("open") && e.key === "Escape") {
      closeResumeModal();
    }
  });

  /* ------------------------------------------------------------------------
     9. RESUME MODAL
     ------------------------------------------------------------------------ */
  const resumeModal = document.getElementById("resume-modal");
  const resumeBtn = document.getElementById("download-resume-btn");

  function openResumeModal() {
    if (PORTFOLIO_DATA.profile.resumeUrl) {
      window.open(PORTFOLIO_DATA.profile.resumeUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (resumeModal) {
      resumeModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  resumeBtn?.addEventListener("click", openResumeModal);
  document.getElementById("resume-modal-close")?.addEventListener("click", closeResumeModal);
  document.getElementById("print-resume-btn")?.addEventListener("click", () => window.print());
  resumeModal?.addEventListener("click", (e) => { if (e.target === resumeModal) closeResumeModal(); });
  document.getElementById("project-modal-close")?.addEventListener("click", closeProjectModal);
  projectModal?.addEventListener("click", (e) => { if (e.target === projectModal) closeProjectModal(); });

  /* ------------------------------------------------------------------------
     10. CONTACT LINKS & FORM VALIDATION
     ------------------------------------------------------------------------ */
  function initContact() {
    const emailDisplay = document.getElementById("contact-email-display");
    const emailLink = document.getElementById("contact-email-link");

    if (PORTFOLIO_DATA.profile.email) {
      emailDisplay.textContent = PORTFOLIO_DATA.profile.email;
      emailLink.href = `mailto:${PORTFOLIO_DATA.profile.email}`;
    } else {
      emailDisplay.textContent = "Configure in js/data.js";
      emailLink.href = "#contact-form";
    }

    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const fields = [
        { id: "cf-name", check: (v) => v.trim().length >= 2 },
        { id: "cf-email", check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
        { id: "cf-subject", check: (v) => v.trim().length >= 3 },
        { id: "cf-message", check: (v) => v.trim().length >= 10 }
      ];

      fields.forEach(({ id, check }) => {
        const input = document.getElementById(id);
        const err = document.getElementById(id + "-error");
        const ok = check(input.value);
        err.classList.toggle("visible", !ok);
        if (!ok) valid = false;
      });

      if (!valid) return;

      const payload = {
        name: document.getElementById("cf-name").value.trim(),
        email: document.getElementById("cf-email").value.trim(),
        subject: document.getElementById("cf-subject").value.trim(),
        message: document.getElementById("cf-message").value.trim()
      };

      const emailBody = `From: ${payload.name} (${payload.email})\n\n${payload.message}`;
      const mailto = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.assign(mailto);
      feedback.className = "form-feedback info";
      feedback.textContent = "Your email app should open with the message ready. Send it there to complete delivery.";
    });
  }

  /* ------------------------------------------------------------------------
     11. SCROLL REVEAL, MAGNETIC BUTTONS, SPOTLIGHT & 3D TILT
     ------------------------------------------------------------------------ */
  function observeReveals() {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach((el) => obs.observe(el));
  }

  function initMagneticButtons() {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  function initSpotlightCards() {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".glass-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  function initTiltCards() {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateY(-5px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /* ------------------------------------------------------------------------
     INIT ALL
     ------------------------------------------------------------------------ */
  renderAbout();
  renderSkills();
  renderProjects("All");
  initProjectFilters();
  renderHackathons();
  renderCertGallery("certifications-grid", PORTFOLIO_DATA.certifications, false);
  renderCertGallery("academic-awards-grid", PORTFOLIO_DATA.academicAwards, true);
  renderDriveCredentials();
  renderMoments();
  renderEducation();
  bindLightboxTriggers();
  initContact();
  initRotatingRoles();
  initHeroParticles();
  initScrollSpy();
  initMagneticButtons();
  initSpotlightCards();
  initTiltCards();
  refreshIcons();
  observeReveals();
})();
