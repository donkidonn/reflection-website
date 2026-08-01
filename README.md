# Reflection Archive — Donald Lee Novo

A static reflection journal. Vite + React + Tailwind CSS v4, no backend, no
database, no auth, no storage. Content is markdown files compiled into the
bundle at build time.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the built output
```

## Add a reflection

Create one file in `src/content/reflections/`:

```
src/content/reflections/02-threat-modeling.md
```

```markdown
---
title: "Reflection 1: The CIA Triad and Security Principles"
slug: "cia-triad-and-security-principles"
date: "2026-08-01"
course: "CIT.017 - A"
tags: ["CIA Triad", "Security Principles", "Fundamentals"]
summary: "What I learned about the three properties every secure system needs, and why security is a design constraint rather than a final checklist."
---

Body copy here.

```

That's the whole step. The index entry, the URL at `/reflections/<slug>`,
reading time, sort position, and prev/next links on the neighbouring
reflections are all derived. No file needs to be registered anywhere.

- The **number prefix** on the filename (`02-`) is the entry number shown in the
  index. Files without one fall back to their chronological position.
- **Sorting** is by `date`, newest first.
- **Reading time** is computed from the body at 200 wpm — don't set it by hand.
- `src/content/TEMPLATE.md` has a copyable block and a field reference. It sits
  outside `reflections/` so the glob doesn't pick it up.

## How content loads

`src/lib/reflections.js` globs the markdown at build time:

```js
import.meta.glob('../content/reflections/*.md', { query: '?raw', eager: true })
```

Frontmatter is parsed by a small hand-rolled parser in the same file. This is
deliberate: `gray-matter` pulls in a Node `Buffer` polyfill and breaks in the
browser. The parser handles quoted and bare strings, inline arrays
(`["a", "b"]`), CRLF line endings, and files with no frontmatter at all.

## Deploy to Vercel

Import the repo — Vercel detects Vite and needs no configuration. Build command
`npm run build`, output directory `dist`.

`vercel.json` adds an SPA rewrite so that loading or refreshing
`/reflections/<slug>` directly serves `index.html` instead of a 404.

## Design notes

The palette is a near-black ground (`#0B0D10`), warm off-white text
(`#EDEAE3`), and a single accent — an iron-oxide stamp red (`#CE4B39`) used only
for rules, entry numbers, list marks, and focus states.

Three typefaces, each with one job: **Bodoni Moda** for display only, at sizes
large enough to carry its stroke contrast; **Source Serif 4** for body copy at
~70 characters per line; **IBM Plex Mono** for numbers, dates, and labels.

The masthead is the inside of a security envelope — the irregular tint pattern
printed in privacy envelopes so contents can't be read through the paper, with
an address window punched through it. It's in `src/components/SecurityTint.jsx`
and reused at smaller scale on the 404 page.

## Structure

```
src/
  lib/reflections.js        frontmatter parser, sorting, reading time, neighbours
  components/
    SecurityTint.jsx        the envelope tint pattern
    Markdown.jsx            react-markdown + remark-gfm with styled elements
    usePageTitle.js
  pages/
    Home.jsx                masthead + entry register
    Reflection.jsx          article, metadata, prev/next
    NotFound.jsx
  content/
    reflections/*.md        one file per reflection
    TEMPLATE.md             not globbed; reference only
```
