# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A digital platform for the 緯華化梅小區【一的力量】(The Power of One) book club: a React web reader/audio player, a LINE chat bot, and a PDF text-extraction script. All user-facing content is Traditional Chinese (zh-TW) — write UI strings, bot replies, and docs in zh-TW.

Fixed schedule that is hardcoded across modules: **每週三、六 20:00–20:45** (read 20:00–20:30, discuss 20:30–20:45), six chapters total, held in the 緯華化梅小區祭壇 LINE group.

## Repository layout

Three independent modules with **no root package.json and no monorepo tooling** — each is installed and run from its own directory.

| Directory | Stack | Purpose |
|---|---|---|
| `web/` | Vite 8 + React 19, vanilla CSS | Single-page reader, audio player, notes, countdown |
| `line-bot/` | Express 4 + `@line/bot-sdk` v8 (CommonJS) | Keyword-reply webhook bot |
| `scripts/` | Python + `pypdf` | PDF → text extraction |
| `docs/` | PDFs + Markdown | Source content (book chapters, pastor messages) |

## Commands

```bash
# web (dev server on :5173)
cd web && npm install && npm run dev
npm run build          # vite build
npm run lint           # oxlint — the only linter in the repo
npm run preview

# line-bot (webhook on :3000)
cd line-bot && npm install
cp .env.example .env   # then fill LINE_CHANNEL_ACCESS_TOKEN + LINE_CHANNEL_SECRET
npm run dev            # nodemon
npm start              # node index.js
ngrok http 3000        # expose /webhook to LINE Developers Console

# scripts (defaults: docs/第一章.pdf → docs/第一章_text.txt)
pip install -r scripts/requirements.txt
python scripts/extract_pdf.py [input.pdf] [output.txt]
```

There are **no tests and no test framework** in any module. Don't tell the user tests pass; there are none to run.

## Architecture

### `web/` is a public marketing/reference site, not a reader

The site is deliberately **not** a place to read the book. It publishes only content the 小區 owns: original 導讀, discussion questions, schedule, and book metadata. See "Copyright boundary" below — this constraint drives the whole design.

### Content lives in `web/src/content.js`, not in JSX

All site copy — book metadata, chapter list, 導讀, question bank, verses, FAQ — is exported as plain data from `web/src/content.js`. `App.jsx` only renders it. **Edit content there; don't inline strings into JSX.**

### `web/src/App.jsx`

One `App()` component, no router, no state manager. Structure:

- An `Icons` object of inline SVG components at the top.
- Six tabs switched by a single `activeTab` string, declared in the `TABS` array: `home`, `book`, `club`, `reading`, `discuss`, `faq`.
- Feature state is grouped by comment banners (`// --- COUNTDOWN TIMER ---`, `// --- CHAPTER PROGRESS ---`, etc.). Follow those banners when adding features.

Persistence is **localStorage only — there is no backend**. The single key is `chapter_progress` (an array of completed chapter numbers). It loads on mount behind a `progressLoaded` guard, then a separate `useEffect` writes on change — the guard exists so the initial empty array can't clobber saved progress before the load runs.

`toggleChapter` **must** use the functional updater form (`setDone(prev => ...)`). Reading the `done` variable directly loses writes when two clicks land in one React batch — this was a real bug, don't reintroduce it.

The countdown scans forward up to 7 days for the next Wed(3)/Sat(6) at 20:00, and treats 20:00–20:45 on those days as "in meeting".

### `scripts/extract_pdf.py` is now orphaned

It still emits `--- PAGE {n} ---` headers into `docs/第一章_text.txt`, but **nothing consumes that output any more** — the web reader that used to parse it was removed. Keep it for internal reference only; its output must not be republished.

### Styling

`web/src/index.css` defines the whole design system as CSS custom properties on `:root` — a **Midnight & Gold** dark theme derived from the club's own poster (deep navy starfield, champagne-gold light burst). `--color-primary` is gold, `--color-secondary` is nebula blue. `web/src/App.css` consumes those tokens. **Use the variables rather than hardcoding colors**; there is no light theme. Fonts (Inter / Outfit / Noto Sans TC) load from Google Fonts in `index.html`.

Two rules that are easy to get wrong:

- **Anything sitting on a gold fill must use `var(--on-primary)`** (near-black), not `--text-primary`. White on gold fails contrast. This applies to `.btn-primary`, `.brand-mark`, `.audience li::before`, and the `.check-row.done` checkmark SVG.
- **`.home-backdrop` composition is height-driven.** The image is `background-size: cover`, so on any viewport narrower than 1.5:1 it scales to the element's height and the golden burst lands at ~50% of that height. The `height: clamp(620px, 108vh, 940px)` is tuned so the burst falls *below* the hero buttons and the title sits on dark sky — the poster's composition. Shrink that height and the burst climbs into the title and makes it unreadable.

The backdrop renders only on the `home` tab and is decorative (`aria-hidden`). Source art is `web/src/assets/hero-bg.webp` (200 KB, converted from a 2.5 MB PNG — don't ship the PNG).

### `line-bot/index.js`

A single `handleEvent` if/else chain over exact-match text. Each command accepts both a slash form and Chinese aliases: `/help`|幫助|選單, `/schedule`|時程|讀書會時間, `/chapter`|進度|第一章, `/notes`|牧師信息|信息. Unmatched text echoes back with a `/help` hint. Replies are template strings built inline — add new commands as another branch, keeping the slash + Chinese-alias pairing.

## Copyright boundary (the site is public — this matters)

`web/` is deployed publicly, so it must never serve:

- book text, chapter scans, or PDF downloads
- audio recordings of the reading sessions (derivative of the book)
- a public LINE group link (join is via a 小組長, per `CLUB.joinSteps`)

The 導讀 in `content.js` are **original writing by the 小區**, grounded in the club's own teaching material and the book's themes — they are not summaries of the book's text and must not become one. Scripture is 和合本 (public domain). The footer carries the rights notice and links to buy the book; keep both.

`web/public/chapter1.txt` was removed for this reason. Don't re-add it.

## Book facts (verified against the publisher, don't re-guess)

《「一」的力量—從你開始的福音運動》(*The Power of One: Reaching Every Person on Earth*), 比利・威爾遜 (Billy Wilson), 譯 王建玫, 台北靈糧堂出版／天恩出版發行, ISBN 9789860789836, 2026-02-11, 176 頁. Foreword by 華理克 (Rick Warren). The author is president of Oral Roberts University and global chair of **Empowered21**, whose vision — every person on earth encountering Jesus by **Pentecost 2033** (2,000 years after Acts 2) — is what the pastor letters mean by 「全球性異象行動」.

## Known gotchas

- **Two conflicting club formats exist in this repo.** `README.md` and `line-bot/index.js` say six sessions of one chapter each (Wed/Sat). The 特務J PDF describes three sessions of two chapters with in-person activities. The website follows the **six-session** format. If you touch schedule copy, check which one you mean.
- **The chapter PDF is scanned images.** `docs/第一章_text.txt` is 18 pages of `[No extractable text on this page]`. `pypdf` cannot fix this; real text needs OCR. Don't assume the extraction "just failed".
- **`.gitignore` excludes `*.pdf` and `*.mp3` repo-wide**, so the `docs/` PDFs are untracked and won't survive a fresh clone. Don't assume they're present.
- The pastor messages (`docs/牧師信息*.md`) are **internal letters** addressed to 小組家人/小組長 and are deliberately not published on the site. `line-bot/index.js` still paraphrases them in its `/notes` reply — that bot is group-internal, which is why that's acceptable.
- `README.md` still documents the old reader/audio-player app and an `assets/` directory that does not exist. It is stale.
