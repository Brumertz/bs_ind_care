# AGENTS.md

## What this is

Static one-page marketing site for BS IND CARE® (Spanish copy, `lang="es"`). No framework, no `package.json`, no bundler. Do not add tooling or dependencies unless asked.

- `index.html` — the entire page (~1060 lines). Tailwind is loaded via **CDN**, with the theme (brand colors, fonts) configured in an inline `tailwind.config` script in `<head>`.
- `styles.css` — design system: `:root` tokens (brand palette, shadows, transitions), navbar, carousel, form, toast, `.reveal` animations.
- `main.js` — all vanilla JS, initialized on `DOMContentLoaded`: navbar scroll, mobile menu, carousel, contact form validation + submit, toast, reveal-on-scroll, smooth scroll, char counter. **Edit this file directly** — there is no TypeScript source or compilation step.
- `test.js` — dependency-free test suite (**run with `node test.js`**, Node ≥14, exits 1 on failure).
- `README.md` — current project documentation. Caveat: its repo-structure tree still lists deleted files (`walkthrough.md`, `INFORME_PRE_LANZAMIENTO.md`).
- `assets/images/` — media. Only a subset is referenced; some filenames contain typos (`Prodcut9.jpg`, `prouct8.jpg`) — don't "fix" or reference them casually.

## Commands

```bash
node test.js          # verify changes — 78 tests, must end at 0 FAILED
python -m http.server 3000   # or: npx serve .  (optional; opening index.html directly also works)
```

There is no lint/typecheck/build. `node test.js` is the verification step after any edit.

## Traps

- **Brand colors are defined in three places**: the inline `tailwind.config` in `index.html` `<head>`, the `:root` variables in `styles.css`, **and** the hardcoded hex list in `test.js` (`brandColors`). Changing a color without updating all three fails the suite.
- **`main.js` is tightly coupled to `index.html` by element IDs** (`#navbar`, `#hamburger`, `#mobile-menu`, `#carouselTrack`, `#carouselDots`, `#carouselPrev/Next`, `#contactForm`, `#fieldName/#fieldEmail/#fieldMessage`, `#error*`, `#web3formsKey`, `#charCounter`, `#submitBtn`, `#btnText`, `#btnLoader`, `#toast`, `#toastTitle/#toastMsg/#toastIcon`). Renaming an ID requires updating `index.html`, `main.js`, **and the `requiredIds` list in `test.js`**. `main.js` bails silently if an element is missing.
- **`test.js` encodes invariants the HTML must keep**: exactly one `<h1>`, `lang="es"`, title >20 chars, meta description ≥50 chars, `og:title/og:description/og:image`, LCP `preload` with `fetchpriority="high"`, every `wa.me` link containing `573165305071`, ≥2 `.carousel-slide` elements, and presence of classes `.mobile-nav-link` and `.reveal`. Violating any of these breaks the suite even if the page still works.
- **`test.js` duplicates the form validation logic** (name/email/message rules) instead of importing it from `main.js`. If you change validation rules in `main.js`, mirror the change in `test.js` or the tests test stale behavior.
- **Tests are generated dynamically**: referenced `assets/...` files and `wa.me` links each get their own test, so adding/removing one changes the total count (the "78" in docs may drift — that's fine).
- **`.reveal` starts at `opacity: 0`** (`styles.css`); only JS adding `.visible` makes it show. Any new element with class `reveal` is invisible without JS.
- **Contact form** posts to Web3Forms (`https://api.web3forms.com/submit`) using an access key hardcoded in the hidden input `#web3formsKey` in `index.html`. The `botcheck` honeypot field is intentional anti-spam — keep it.
- **WhatsApp**: every `wa.me` link uses `573165305071`. Keep all purchase/contact links consistent (enforced by tests).
- **Smooth scroll** hardcodes a `75` px navbar offset in `main.js` (`initSmoothScroll`).
- **`.gitignore` globs `*token*`, `*password*`, `*.env`** — files with those substrings in the name are silently untracked.

## Doc files (verify before trusting)

- `README.md` — current and verified (except its structure tree listing deleted files). `INFORME_TESTS.md` — test breakdown, currently 78/78 passing.
- **Brand source of truth**: `BS_IND_CARE_Manual_Maestro_Identidad_de_Marca.docx` (binary; the old `manual_extracted.txt` text version was deleted — re-extract if needed).
- `walkthrough.md` and `INFORME_PRE_LANZAMIENTO.md` were **deleted**; don't recreate or cite them. Their stale claims (a `main.ts` build, mismatched palette, WhatsApp number discrepancy) are resolved in current code.

## Conventions

- Site copy, comments, and UI strings are in **Spanish**; keep new content consistent.
- Keep `index.html`'s existing section-comment structure (`═` banner comments numbered 1–10) and semantic HTML/ARIA attributes when adding content.
