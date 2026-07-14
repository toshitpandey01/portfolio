(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  /* ── Utility ─────────────────────────────────────── */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function sizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    canvas.width  = Math.floor(rect.width  * DPR);
    canvas.height = Math.floor(rect.height * DPR);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    return { w: rect.width, h: rect.height, ctx };
  }

  /* ── Footer year ─────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Mobile Nav ──────────────────────────────────── */
  const hamBtn    = document.getElementById('hamBtn');
  const mobileNav = document.getElementById('mobileNav');

  function openMob() {
    if (!mobileNav) return;
    mobileNav.removeAttribute('hidden');
    mobileNav.classList.add('open');
    hamBtn.setAttribute('aria-expanded', 'true');
    hamBtn.setAttribute('aria-label', 'Close menu');
    hamBtn.firstElementChild.textContent = '✕';
    document.body.style.overflow = 'hidden';
  }
  function closeMob() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('hidden', '');
    hamBtn.setAttribute('aria-expanded', 'false');
    hamBtn.setAttribute('aria-label', 'Open menu');
    hamBtn.firstElementChild.textContent = '☰';
    document.body.style.overflow = '';
  }
  window.closeMob = closeMob;

  if (hamBtn) {
    hamBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      isOpen ? closeMob() : openMob();
    });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) closeMob();
  });

  /* ── Nav opacity on scroll ───────────────────────── */
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    const onScroll = () => {
      if (window.scrollY > 40) navWrap.style.background = 'rgba(2,8,23,0.85)';
      else                    navWrap.style.background = 'rgba(2,8,23,0.65)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Custom cursor (desktop only) ───────────────── */
  if (!isCoarsePointer) {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    function tickRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tickRing);
    }
    requestAnimationFrame(tickRing);

    // Hover states
    const hoverables = 'a, button, input, textarea, .project-card, .about-card, .social-link, .blog-list-link, .blog-post-back';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    });
  }

  /* ── Typewriter ──────────────────────────────────── */
  const tw = document.getElementById('typewriter');
  if (tw) {
    const phrases = [
      '> building ML pipelines...',
      '> exploring data patterns...',
      '> training decision trees...',
      '> deploying with Streamlit...',
      '> learning something new...'
    ];
    let p = 0, c = 0, deleting = false;
    function typeLoop() {
      const cur = phrases[p];
      tw.textContent = cur.slice(0, c);
      if (!deleting && c < cur.length) {
        c++;
        setTimeout(typeLoop, 55);
      } else if (deleting && c > 0) {
        c--;
        setTimeout(typeLoop, 30);
      } else {
        deleting = !deleting;
        if (!deleting) p = (p + 1) % phrases.length;
        setTimeout(typeLoop, deleting ? 1400 : 350);
      }
    }
    // Note: intentionally NOT gated behind prefersReducedMotion. That flag
    // is respected for the heavier canvas/particle effects below, but a
    // number of desktop/laptop setups report prefers-reduced-motion: reduce
    // even when the person never explicitly asked for it (e.g. Windows
    // "Show animations in Windows" turned off, some remote-desktop/VM
    // display profiles). Gating this simple text swap behind that flag was
    // exactly why the typewriter looked "stuck" on the first phrase on
    // desktop/laptop while working fine on mobile.
    typeLoop();
  }

  /* ── Reveal on scroll (IntersectionObserver) ────── */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── Skill bars animate on view ─────────────────── */
  const fills = $$('.skill-fill');
  if ('IntersectionObserver' in window && fills.length) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const w = parseFloat(e.target.dataset.w || '0') * 100;
          e.target.style.width = w + '%';
          sio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(f => sio.observe(f));
  } else {
    fills.forEach(f => f.style.width = (parseFloat(f.dataset.w || '0') * 100) + '%');
  }

  /* ── Contact form ────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    const msg  = document.getElementById('formMsg');
    const btn  = form.querySelector('.form-submit');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.classList.remove('error');
      msg.textContent = '';

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        msg.classList.add('error');
        msg.textContent = 'Please fill in all fields.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.classList.add('error');
        msg.textContent = 'Please enter a valid email address.';
        return;
      }

      const usingFormspree = form.action && !form.action.includes('YOUR_FORM_ID');
      btn.disabled = true;
      const origText = btn.textContent;
      btn.textContent = 'Sending...';

      try {
        if (usingFormspree) {
          const res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          });
          if (!res.ok) throw new Error('Network');
          msg.textContent = "Thanks! Your message has been sent — I'll reply soon.";
          form.reset();
        } else {
          // Local acknowledgement fallback (until Formspree ID is set)
          await new Promise(r => setTimeout(r, 600));
          msg.textContent = "Thanks " + name + "! (Form endpoint not configured — connect Formspree to receive emails.)";
          form.reset();
        }
      } catch (err) {
        msg.classList.add('error');
        msg.textContent = 'Something went wrong. Please email me directly instead.';
      } finally {
        btn.disabled = false;
        btn.textContent = origText;
      }
    });
  }

  /* ── CV auto-detect ──────────────────────────────── */
  (async () => {
    const candidates = [
      'assets/resume.pdf',
      'assets/cv.pdf',
      'assets/Toshit_Resume.pdf',
      'assets/Toshit-Resume.pdf',
      'assets/Toshit Resume.pdf'
    ];
    let found = null;
    for (const url of candidates) {
      try {
        const r = await fetch(url, { method: 'HEAD' });
        if (r.ok) { found = url; break; }
      } catch (_) { /* ignore */ }
    }
    if (found) {
      const d = document.getElementById('cvLinkDesktop');
      const m = document.getElementById('cvLinkMobile');
      if (d) d.href = found;
      if (m) m.href = found;
    }
  })();

  /* ═══════════════════════════════════════════════════
     CANVAS ANIMATIONS
     ═══════════════════════════════════════════════════ */

  /* ── Cosmos background ──────────────────────────── */
  (function cosmos() {
    const canvas = document.getElementById('cosmos-canvas');
    if (!canvas || prefersReducedMotion) return;

    let stars = [];
    let w, h;

    function init() {
      const rect = { w: window.innerWidth, h: window.innerHeight };
      canvas.width  = rect.w * DPR;
      canvas.height = rect.h * DPR;
      canvas.style.width  = rect.w + 'px';
      canvas.style.height = rect.h + 'px';
      w = rect.w; h = rect.h;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(140, Math.floor((w * h) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.7 + 0.15,
        s: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      }));
    }

    function draw(t) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = 0.6 + Math.sin(t * 0.001 + s.phase) * 0.4;
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = Math.random() < 0.02 ? '#7c3aed' : '#e2e8f0';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    init();
    let resizeTO;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(init, 150);
    }, { passive: true });
    requestAnimationFrame(draw);
  })();

  /* ── Neural network hero ────────────────────────── */
  (function neural() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    let nodes = [], w, h, running = true;

    function init() {
      const s = sizeCanvas(canvas);
      w = s.w; h = s.h;
      const layers = [3, 5, 5, 3];
      nodes = [];
      const layerGap = w / (layers.length + 1);
      layers.forEach((count, li) => {
        for (let i = 0; i < count; i++) {
          nodes.push({
            x: layerGap * (li + 1),
            y: h * (i + 1) / (count + 1),
            layer: li,
            r: 5,
            pulse: Math.random() * Math.PI * 2
          });
        }
      });
    }

    function draw(t) {
      if (!running) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);

      // connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = 0; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.layer === a.layer + 1) {
            const flow = (Math.sin(t * 0.001 + a.pulse + b.pulse) + 1) / 2;
            ctx.strokeStyle = `rgba(124,58,237,${0.06 + flow * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // moving signal dot
            const p = (Math.sin(t * 0.0015 + a.pulse) + 1) / 2;
            const sx = a.x + (b.x - a.x) * p;
            const sy = a.y + (b.y - a.y) * p;
            ctx.fillStyle = 'rgba(6,182,212,0.7)';
            ctx.beginPath();
            ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = 1 + Math.sin(t * 0.002 + n.pulse) * 0.2;
        ctx.fillStyle = 'rgba(124,58,237,0.25)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#a78bfa';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    init();
    let resizeTO;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(init, 150);
    }, { passive: true });

    // Pause when off-screen for performance
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !running) { running = true; requestAnimationFrame(draw); }
          else if (!e.isIntersecting) { running = false; }
        });
      });
      io.observe(canvas);
    }

    if (prefersReducedMotion) {
      draw(0);
    } else {
      requestAnimationFrame(draw);
    }
  })();

  /* ── Project card mini visualisations ────────────── */
  function projVis(canvasId, kind) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    let w, h, running = true, points;

    function init() {
      const s = sizeCanvas(canvas);
      w = s.w; h = s.h;
      if (kind === 'scatter') {
        points = Array.from({ length: 24 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          c: Math.random() > 0.5 ? '#7c3aed' : '#06b6d4'
        }));
      } else if (kind === 'wave') {
        points = null;
      }
    }

    function draw(t) {
      if (!running) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);

      if (kind === 'scatter') {
        // Decision boundary (diagonal line)
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, h * 0.75);
        ctx.lineTo(w, h * 0.25);
        ctx.stroke();
        ctx.setLineDash([]);
        // points
        for (const p of points) {
          const bob = Math.sin(t * 0.002 + p.x) * 1.5;
          ctx.fillStyle = p.c;
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(p.x, p.y + bob, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else if (kind === 'wave') {
        // Weather wave: sine curves + clouds
        ctx.strokeStyle = 'rgba(6,182,212,0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = h / 2 + Math.sin(x * 0.05 + t * 0.002) * (h * 0.25);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(124,58,237,0.4)';
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = h / 2 + Math.sin(x * 0.05 + t * 0.002 + 1.5) * (h * 0.18);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Sun
        const sx = (t * 0.02) % w;
        ctx.fillStyle = 'rgba(6,182,212,0.9)';
        ctx.beginPath();
        ctx.arc(sx, h * 0.3, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    init();
    let resizeTO;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(init, 150);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !running) { running = true; requestAnimationFrame(draw); }
          else if (!e.isIntersecting) { running = false; }
        });
      });
      io.observe(canvas);
    }

    if (prefersReducedMotion) draw(0);
    else requestAnimationFrame(draw);
  }
  projVis('vis-stress',  'scatter');
  projVis('vis-weather', 'wave');

  /* ── Skill graph (radial neural viz) ─────────────── */
  (function skillGraph() {
    const canvas = document.getElementById('skill-graph');
    if (!canvas) return;

    const labels = ['Python', 'Pandas', 'scikit-learn', 'Streamlit', 'Flask', 'SQL', 'HTML/CSS', 'JS', 'MS Office'];
    let w, h, cx, cy, R, nodes = [], running = true;

    function init() {
      const s = sizeCanvas(canvas);
      w = s.w; h = s.h;
      cx = w / 2; cy = h / 2;
      R = Math.min(w, h) * 0.36;
      nodes = labels.map((label, i) => {
        const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
        return {
          label,
          x: cx + Math.cos(angle) * R,
          y: cy + Math.sin(angle) * R,
          phase: Math.random() * Math.PI * 2
        };
      });
    }

    function draw(t) {
      if (!running) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);

      // outer soft ring
      ctx.strokeStyle = 'rgba(124,58,237,0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // connections to centre
      for (const n of nodes) {
        const flow = (Math.sin(t * 0.0015 + n.phase) + 1) / 2;
        ctx.strokeStyle = `rgba(6,182,212,${0.15 + flow * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();

        // signal
        const p = (Math.sin(t * 0.0015 + n.phase) + 1) / 2;
        const sx = cx + (n.x - cx) * p;
        const sy = cy + (n.y - cy) * p;
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // centre node
      const cPulse = 1 + Math.sin(t * 0.003) * 0.15;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20 * cPulse);
      grd.addColorStop(0, 'rgba(124,58,237,0.9)');
      grd.addColorStop(1, 'rgba(124,58,237,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * cPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      // outer nodes + labels
      const fontSize = Math.max(9, Math.min(11, w / 40));
      ctx.font = `600 ${fontSize}px 'Space Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const n of nodes) {
        const pulse = 1 + Math.sin(t * 0.002 + n.phase) * 0.25;

        ctx.fillStyle = 'rgba(6,182,212,0.15)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // label positioned outward
        const ang = Math.atan2(n.y - cy, n.x - cx);
        const lx = n.x + Math.cos(ang) * 18;
        const ly = n.y + Math.sin(ang) * 18;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(n.label, lx, ly);
      }

      requestAnimationFrame(draw);
    }

    init();
    let resizeTO;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(init, 150);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !running) { running = true; requestAnimationFrame(draw); }
          else if (!e.isIntersecting) { running = false; }
        });
      });
      io.observe(canvas);
    }

    if (prefersReducedMotion) draw(0);
    else requestAnimationFrame(draw);
  })();

  /* ── Matrix rain (footer) ───────────────────────── */
  (function matrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas || prefersReducedMotion) return;

    let w, h, cols, drops, running = true;
    const chars = '01ML{}[]()<>/*+-=';

    function init() {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * DPR;
      canvas.height = rect.height * DPR;
      w = rect.width; h = rect.height;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const fs = 14;
      cols = Math.floor(w / fs);
      drops = Array.from({ length: cols }, () => Math.random() * -20);
    }

    let last = 0;
    function draw(t) {
      if (!running) return;
      if (t - last > 60) {
        last = t;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(2,8,23,0.15)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#7c3aed';
        ctx.font = '14px "Space Mono", monospace';
        for (let i = 0; i < cols; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(ch, i * 14, drops[i] * 14);
          if (drops[i] * 14 > h && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      requestAnimationFrame(draw);
    }

    init();
    let resizeTO;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(init, 150);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !running) { running = true; requestAnimationFrame(draw); }
          else if (!e.isIntersecting) { running = false; }
        });
      });
      io.observe(canvas);
    }
    requestAnimationFrame(draw);
  })();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.body.classList.add('is-hidden');
    else document.body.classList.remove('is-hidden');
  });

})();