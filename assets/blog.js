(function () {
  "use strict";

  const listSection = document.getElementById("blogListSection");
  const heroSection  = document.getElementById("blog-home");
  const list = document.getElementById("blogList");

  const postView    = document.getElementById("blogPostView");
  const postTitle   = document.getElementById("blogPostTitle");
  const postMeta    = document.getElementById("blogPostMeta");
  const postContent = document.getElementById("blogPostContent");
  const postFilename = document.getElementById("blogPostFilename");
  const backBtn      = document.getElementById("blogPostBack");

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
          <a class="blog-list-link" href="#post/${post.id}" data-id="${post.id}">
            <span class="blog-list-title">${post.title}</span>
            <span class="blog-list-date" style="color:${DATE_COLORS[i % DATE_COLORS.length]}">${formatDate(post.date)}</span>
          </a>
        </li>
      `)
      .join("");
  }

  function pauseBackgroundEffects() {
    const cosmos = document.getElementById("cosmos-canvas");
    if (cosmos) cosmos.style.display = "none";
  }
  function resumeBackgroundEffects() {
    const cosmos = document.getElementById("cosmos-canvas");
    if (cosmos) cosmos.style.display = "";
  }

  function openPost(id, { pushHash = true } = {}) {
    const post = sortedPosts.find((p) => p.id === id);
    if (!post) { closePost({ replaceHash: true }); return; }

    const mins = readingTime(post.content);
    postTitle.textContent = post.title;
    postMeta.textContent = `${formatDate(post.date)} · ~${mins} min read · ${post.tags.map((t) => "#" + t).join("  ")}`;
    postContent.innerHTML = post.content;
    postFilename.textContent = post.filename;
    document.title = post.title + " — Toshit Pandey";

    heroSection.hidden = true;
    listSection.hidden = true;
    postView.hidden = false;
    pauseBackgroundEffects();

    if (pushHash) {
      history.pushState({ postId: id }, "", "#post/" + id);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    backBtn.focus();
  }

  function closePost({ pushHash = true, replaceHash = false } = {}) {
    postView.hidden = true;
    heroSection.hidden = false;
    listSection.hidden = false;
    resumeBackgroundEffects();
    document.title = "Blog — Toshit Pandey";

    if (replaceHash) {
      history.replaceState({}, "", "blog.html");
    } else if (pushHash && location.hash) {
      history.pushState({}, "", "blog.html");
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function routeFromHash() {
    const m = /^#post\/(.+)$/.exec(location.hash);
    if (m) openPost(decodeURIComponent(m[1]), { pushHash: false });
    else closePost({ pushHash: false });
  }

  list.addEventListener("click", (e) => {
    const link = e.target.closest(".blog-list-link");
    if (!link) return;
    e.preventDefault();
    openPost(link.dataset.id);
  });

  backBtn.addEventListener("click", () => closePost());

  window.addEventListener("popstate", routeFromHash);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !postView.hidden) closePost();
  });

  renderList();
  routeFromHash();
})();