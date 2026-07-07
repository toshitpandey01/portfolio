# Toshit Pandey — Portfolio

A production-ready, fully responsive personal portfolio for an ML Engineer & Data Scientist.
Pure HTML / CSS / JS — no build step, no framework, no dependencies.

---

## 📂 Project Structure

```
portfolio/
├── index.html              ← the page
├── assets/
│   ├── styles.css          ← all styling
│   ├── main.js             ← all interactivity (canvases, form, cursor, etc.)
│   └── resume.pdf          ← ⭐ DROP YOUR CV HERE
├── robots.txt
├── sitemap.xml
├── .gitignore
└── README.md
```

---

## ✨ What's New (Latest Update)

- ✅ **Personal Blog section removed** — cleaner, more focused project grid.
- ✅ **Updated skill percentages** — scikit-learn / ML Pipelines (75%), Streamlit / Flask (75%), Microsoft Office Suite (80%).
- ✅ **Refreshed About section** — reflects MCA-graduate status with a recruiter-friendly tone.
- ✅ **Full responsive overhaul** — verified on desktop, laptop, tablet, Android, iPhone (incl. iPhone SE) and landscape.
- ✅ **Performance improvements** — canvas animations pause when off-screen; `will-change` hints; throttled matrix rain; deferred JS.
- ✅ **Official GitHub logo** — replaced the octopus emoji with the official GitHub Octocat SVG in every location.
- ✅ **Accessibility** — semantic HTML, ARIA labels, skip-to-content link, keyboard-friendly focus rings, progress-bar roles, higher-contrast muted color.
- ✅ **Code cleanup** — fixed malformed footer markup and removed unused CSS/HTML for the blog card.

---

## 📄 Updating Your CV / Resume

The CV button **auto-detects** your resume file. Just **drop your PDF into the `assets/` folder** with any of these names:

| Filename                  | Priority |
|---------------------------|----------|
| `assets/resume.pdf`       | 1 (recommended) |
| `assets/cv.pdf`           | 2 |
| `assets/Toshit_Resume.pdf`| 3 |
| `assets/Toshit-Resume.pdf`| 4 |
| `assets/Toshit Resume.pdf`| 5 |

The first one found is linked automatically — **no code changes needed**. Just replace the file and redeploy. ✨

> **Tip:** Use `assets/resume.pdf` and overwrite it every time you update your resume. Git history will keep older versions.

---

## 🚀 Running Locally

Open `index.html` directly in a browser **or** spin up a tiny local server (recommended, because the CV auto-detection uses `fetch`):

```bash
# Python 3
python3 -m http.server 8000

# Node
npx serve .
```

Then visit <http://localhost:8000>.

---

## 🌍 Deployment

### **Vercel** (recommended)
```bash
npm i -g vercel
vercel
```
Or push to GitHub → import the repo on [vercel.com](https://vercel.com).

### **Netlify**
Drag-and-drop the entire `portfolio/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect via GitHub.

### **GitHub Pages**
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/toshitpandey01/portfolio.git
git push -u origin main
```
Then in GitHub → **Settings → Pages → Source: Deploy from branch → main → /(root)**.

---

## ✉️ Wiring up the Contact Form

The form ships with a friendly local-only acknowledgement. To receive real emails:

1. Sign up for free at <https://formspree.io>
2. Create a new form → copy your form ID (e.g. `xyzabcde`)
3. In `index.html`, find:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
4. Replace `YOUR_FORM_ID` with yours. Done — the form now sends real emails via AJAX without leaving the page.

Other supported services (same drop-in pattern): **Web3Forms**, **Getform**, **Netlify Forms** (just add `netlify` attribute).

---

## 🎨 Customisation Cheatsheet

| What to change            | Where                                          |
|---------------------------|------------------------------------------------|
| Colors / theme            | `assets/styles.css` → `:root` tokens at the top |
| Hero text / tagline       | `index.html` → `#home` section                  |
| Typewriter phrases        | `assets/main.js` → `phrases` array in the typewriter block |
| Project cards             | `index.html` → `<article class="project-card">` |
| Skills + percentages      | `index.html` → `#skills` section + `data-w` + `aria-valuenow` |
| Skill graph nodes         | `assets/main.js` → `labels` array in the skillGraph block |
| Social links              | `index.html` → `.contact-socials` block         |

---

## ✅ Pre-Deploy Checklist

- [ ] Drop your real resume into `assets/resume.pdf`
- [ ] Replace `YOUR_FORM_ID` in the contact form
- [ ] Update social URLs (LinkedIn, GitHub) if needed
- [ ] Update `sitemap.xml` and the `og:url` once you have your domain
- [ ] Test on phone (DevTools → mobile mode, or real device)

---

## ♿ Accessibility Features

- Skip-to-content link (visible on `Tab`)
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Proper heading hierarchy (`h1` → `h2` → `h3`)
- `aria-label` / `aria-labelledby` on all sections & interactive elements
- `role="progressbar"` with `aria-valuenow` on skill bars
- Keyboard-visible focus rings on all interactive elements
- `prefers-reduced-motion` respected — animations disabled when requested
- iOS `font-size: 16px` on inputs (prevents auto-zoom)
- High-contrast muted color for WCAG AA compliance

---

## 🛠️ Tech

- HTML5 / CSS3 / Vanilla JS (ES2020+)
- Canvas API (5 animated canvases, paused off-screen)
- IntersectionObserver for scroll reveals + animation pausing
- Google Fonts: Space Grotesk, Inter, Space Mono
- Zero external JS dependencies

---

## 📱 Responsive Breakpoints

| Breakpoint | Target Devices |
|------------|----------------|
| `>1400px`  | Ultra-wide monitors |
| `>960px`   | Desktop / laptop |
| `≤960px`   | Tablet portrait, small laptop |
| `≤720px`   | Large phone / small tablet |
| `≤600px`   | Standard phone |
| `≤400px`   | iPhone SE, small Android |
| Landscape < 500px height | Landscape phones |

All layouts prevent horizontal scrolling and use `clamp()` for fluid typography.

---

Made with ♥ by Toshit Pandey.
