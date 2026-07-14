(function () {
  "use strict";

  const list = document.getElementById("blogList");
  const modalBackdrop = document.getElementById("blogModalBackdrop");
  const modalBody = document.getElementById("blogModalBody");
  const modalClose = document.getElementById("blogModalClose");

  const DATE_COLORS = ["var(--cyan)", "#f5a623", "#fb7185", "#a78bfa"];

  const sortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  function formatDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function readingTime(html) {
    const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }

  function renderList() {
    list.innerHTML = sortedPosts
      .map((post, i) => `
        <li class="blog-list-item">
          <a class="blog-list-link" href="#" data-id="${post.id}">
            <span class="blog-list-title">${post.title}</span>
            <span class="blog-list-date" style="color:${DATE_COLORS[i % DATE_COLORS.length]}">${formatDate(post.date)}</span>
          </a>
        </li>
      `)
      .join("");

    list.querySelectorAll(".blog-list-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openPost(link.dataset.id);
      });
    });
  }

  function openPost(id) {
    const post = sortedPosts.find((p) => p.id === id);
    if (!post) return;
    const mins = readingTime(post.content);
    modalBody.innerHTML = `
      <h1 class="blog-modal-title">${post.title}</h1>
      <div class="blog-modal-meta">${formatDate(post.date)} · ~${mins} min read · ${post.tags.map((t) => "#" + t).join("  ")}</div>
      <div class="blog-modal-content">${post.content}</div>
    `;
    document.getElementById("blogModalFilename").textContent = post.filename;
    modalBackdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    pauseBackgroundEffects();
    modalClose.focus();
  }

  function closePost() {
    modalBackdrop.classList.remove("is-open");
    document.body.style.overflow = "";
    resumeBackgroundEffects();
  }

  // The site's animated starfield (cosmos-canvas) and custom cursor keep
  // running behind the modal's blur, which is expensive to composite every
  // frame and makes the pointer feel laggy while reading. Pause/hide both
  // for as long as the modal stays open, and restore them on close.
  function pauseBackgroundEffects() {
    const cosmos = document.getElementById("cosmos-canvas");
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (cosmos) cosmos.style.display = "none";
    if (dot) dot.style.display = "none";
    if (ring) ring.style.display = "none";
  }
  function resumeBackgroundEffects() {
    const cosmos = document.getElementById("cosmos-canvas");
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (cosmos) cosmos.style.display = "";
    if (dot) dot.style.display = "";
    if (ring) ring.style.display = "";
  }

  modalClose.addEventListener("click", closePost);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closePost();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) closePost();
  });

  renderList();
})();