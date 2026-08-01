This file lives outside `reflections/` on purpose, so the glob never picks it up.

To add reflection 2, copy the block below into a new file:

    src/content/reflections/02-your-slug-here.md

The number prefix sets the entry number shown in the index. Everything else —
sorting, reading time, the card, the detail page, prev/next navigation — is
derived automatically. Nothing else in the project needs to change.

---

```markdown
---
title: "Reflection 2: Your Title Here"
slug: "your-slug-here"
date: "2026-08-15"
course: "Information Assurance and Security"
tags: ["First Tag", "Second Tag"]
summary: "One or two sentences shown on the home page card."
---

Your reflection starts here.

## A section heading

Body copy. **Bold**, *italic*, `inline code`, and [links](https://example.com)
are all styled.

### A subsection

- Bulleted lists
- Get an accent rule instead of a bullet

1. Numbered lists
2. Get a mono numeral

> Blockquotes get a rule in the accent colour.

---

A horizontal rule renders as a centred break mark.
```

## Field notes

| Field     | Required | Notes                                                   |
| --------- | -------- | ------------------------------------------------------- |
| `title`   | yes      | Shown on the card and as the page heading                |
| `slug`    | yes      | The URL: `/reflections/<slug>`. Keep it unique.          |
| `date`    | yes      | `YYYY-MM-DD`. Sorting is newest first.                   |
| `course`  | no       | Shown in the eyebrow above the title                     |
| `tags`    | no       | `["a", "b"]` — a plain inline array                      |
| `summary` | no       | The teaser on the index                                  |

Reading time is computed from the body at 200 words per minute; don't set it
by hand.
