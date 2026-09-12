# EPUB.ai — Neo-Brutalist Full Frontend Redesign

**Date:** 2026-09-10
**Branch:** `feat/auth-guest-demo`
**Status:** Spec approved (Section 1 & 2), Section 3+ TBD
**Scope:** Full frontend — landing page + all interior pages

---

## Background

Current design is a dark SaaS/AI dashboard (glassmorphism, navy bg, soft rounded cards).
Goal: transform into a **brutalist digital publishing tool** — "a printed book collided with a developer tool."

Persona: serious readers, translators, publishers who want technical credibility and editorial character — not another generic AI wrapper.

---

## Decisions Made

| Question                | Decision                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Dark mode               | **Keep and redesign** — light = paper, dark = charcoal. Same accent palette.                          |
| Interior pages scope    | **Full brutalist ALL pages** — project list, detail, chapter editor, chunk editor, settings, glossary |
| Font stack              | **Space Grotesk** (heading/body) + **Geist Mono** (technical)                                         |
| Implementation approach | **Design System First** — tokens then globals.css then pages one by one                               |

---

## Section 1: Design System Tokens

### Color Palette

| CSS Variable               | Light Value | Dark Value | Purpose                      |
| -------------------------- | ----------- | ---------- | ---------------------------- |
| `--background`             | `#F3F0E8`   | `#141414`  | Paper / Charcoal base        |
| `--foreground`             | `#0A0A0A`   | `#F0EDE5`  | Primary text                 |
| `--card`                   | `#FAFAF7`   | `#1C1C1C`  | Card surface                 |
| `--card-foreground`        | `#0A0A0A`   | `#F0EDE5`  | Card text                    |
| `--popover`                | `#FAFAF7`   | `#1C1C1C`  | Popover surface              |
| `--popover-foreground`     | `#0A0A0A`   | `#F0EDE5`  | Popover text                 |
| `--border`                 | `#0A0A0A`   | `#0A0A0A`  | Always black — brutal rule   |
| `--primary`                | `#1D4ED8`   | `#3B82F6`  | Electric Blue — CTA          |
| `--primary-foreground`     | `#FFFFFF`   | `#FFFFFF`  | White on blue                |
| `--secondary`              | `#E8E4D8`   | `#2A2A2A`  | Soft paper / dark surface    |
| `--secondary-foreground`   | `#0A0A0A`   | `#F0EDE5`  | Secondary text               |
| `--muted`                  | `#E8E4D8`   | `#2A2A2A`  | Muted background             |
| `--muted-foreground`       | `#525252`   | `#A3A3A3`  | Muted text                   |
| `--accent`                 | `#84CC16`   | `#A3E635`  | Acid/Lime Green — AI/Success |
| `--accent-foreground`      | `#0A0A0A`   | `#0A0A0A`  | Black on lime                |
| `--accent-yellow`          | `#EAB308`   | `#FDE047`  | Yellow — badge/highlight     |
| `--accent-coral`           | `#EF4444`   | `#F87171`  | Coral/Red — warning/danger   |
| `--input`                  | `#E8E4D8`   | `#2A2A2A`  | Input background             |
| `--destructive`            | `#EF4444`   | `#F87171`  | Destructive actions          |
| `--destructive-foreground` | `#FFFFFF`   | `#0A0A0A`  | Destructive text             |

### Typography

```
Display/Heading:  Space Grotesk, 700-800 weight, often UPPERCASE
Body:             Space Grotesk, 400-500 weight
Technical/Mono:   Geist Mono (status, token count, source info)
```

**Import:** Space Grotesk from Google Fonts via `next/font/google` in `layout.tsx`.
Geist Mono stays as local font (`GeistMonoVF.woff`).

### Spacing and Shape Rules (Brutalist)

```css
--border-width: 2px --border-heavy: 3px /* CTA box, major sections */
  --shadow-hard: 4px 4px 0 #0a0a0a --shadow-hard-lg: 6px 6px 0 #0a0a0a
  --shadow-hard-xl: 8px 8px 0 #0a0a0a --radius: 0px /* DEFAULT — no radius */
  --radius-sm: 4px /* optional, sparingly */;
```

**Grid background:**

```css
/* Light mode */
background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 31px,
    rgba(0, 0, 0, 0.04) 31px,
    rgba(0, 0, 0, 0.04) 32px
  ), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(
        0,
        0,
        0,
        0.04
      ) 31px, rgba(0, 0, 0, 0.04) 32px);

/* Dark mode: same pattern with rgba(255,255,255,0.05) */
```

### Button Variants

| Variant             | Appearance                                                        |
| ------------------- | ----------------------------------------------------------------- |
| `default` (primary) | bg blue `#1D4ED8`, border 2px black, shadow-hard, text WHITE CAPS |
| `outline`           | bg transparent, border 2px black, shadow-hard on hover            |
| `ghost`             | no border, no shadow, underline on hover                          |
| `lime`              | bg lime `#84CC16`, border 2px black, shadow-hard, text black      |
| `yellow`            | bg yellow `#EAB308`, border 2px black, text black                 |
| `destructive`       | bg coral `#EF4444`, border 2px black, text white                  |

All buttons: `border-radius: 0`, `font-weight: 700`, `letter-spacing: 0.05em`, `text-transform: uppercase`.

---

## Section 2: Landing Page (/)

### Navbar

```
[EPUB.ai]    PROJECTS   NEW TRANSLATION   FEATURES
                              [WORKSPACE ->]  [SUPERADMIN | Logout]  [theme]
```

- `background: var(--background)` — no blur, no glassmorphism
- `border-bottom: 2px solid var(--border)`
- Logo: `EPUB` bold Space Grotesk + `.ai` in primary blue
- Nav links: UPPERCASE, font-mono, text-sm
- CTA `WORKSPACE`: primary button style
- Role badge Superadmin: pill bg lime, border 2px black
- Role badge Guest: pill bg yellow, border 2px black
- Theme toggle: minimal icon button, stays

### Hero Section

**Layout:** Two-column on desktop (left: text/CTA, right: EPUB illustration)

**Left column:**

- Label: `// EPUB TRANSLATION ENGINE` — Geist Mono, lime/accent color, small
- H1: `TRANSLATE ENTIRE / EPUB BOOKS` — Space Grotesk 800, ~80-96px desktop, UPPERCASE, line-height 1.0
- Highlight block: `WITHOUT BREAKING FORMAT` — full-width child div, bg-primary, color white, border 2px black
- Subtext: regular weight ~16px, muted foreground
- CTAs:
  - `[START TRANSLATING ->]` — primary button (blue, hard shadow)
  - `[EXPLORE WORKSPACE]` — outline button (black border, hard shadow on hover)
- Stat strip: 3 items (`100% XML`, `0-TOKEN RECOMPILE`, `DUAL MEMORY`) separated by `border-right: 2px solid black`, no card wrapper

**Right column:**

- EPUB book illustration: geometric box 140x180px, `border: 3px solid black`, `box-shadow: 8px 8px 0 #0A0A0A`, rotate `-2deg`
- Text `EPUB` inside box, bold mono
- Sticker `FORMAT SAFE` below/overlapping: yellow bg, border 2px black, rotate `+3deg`
- Floating asterisk star decorative element (lime) near top-right

### Bilingual Demo Section

**Header:**

- `HUMAN-GRADE BILINGUAL PRECISION` — bold, left-aligned, Space Grotesk, large
- Sticker `ACCURATE. NATURAL. READABLE.` — top-right corner, border 2px black, rotate `-3deg`, yellow bg

**Tab selector:**

- `border: 2px solid black`, inline-flex, no radius
- Active tab: `bg-primary text-white`
- Inactive: bg transparent, hover bg secondary

**Panel:**

- Outer box: `border: 2px solid black`, `box-shadow: 6px 6px 0 #0A0A0A`
- Two columns split by `border-right: 2px solid black`
- Column headers: `SOURCE / ENGLISH` and `AI TRANSLATION / INDONESIAN` — Geist Mono UPPERCASE, bg secondary, border-bottom 2px black
- `VERIFIED` badge on right header: bg lime, border 2px black, slight rotate
- Glossary terms: inline pill, border 2px black, bold mono

### Feature Cards (Built for Serious Readers)

**Section header:**

```
BUILT FOR
SERIOUS READERS
& PUBLISHERS
```

Space Grotesk 800, 48-60px, left-aligned, UPPERCASE.

**Card grid:** 3 columns, 2 rows (6 cards)

| Card | Title                            | Background             |
| ---- | -------------------------------- | ---------------------- |
| 1    | BYOK & LOCAL LLM FREEDOM         | white/paper            |
| 2    | DUAL TRANSLATION MEMORY          | lime                   |
| 3    | CAT STANDARDS (TBX & TMX)        | white/paper            |
| 4    | BILINGUAL POST-EDITOR & AUDIT    | yellow                 |
| 5    | SELECTIVE CHAPTER RE-TRANSLATION | white/paper            |
| 6    | INTEGRITY & REFUSAL SAFETY       | coral/red (text white) |

**Each card:**

- `border: 2px solid black`
- `box-shadow: 4px 4px 0 #0A0A0A`
- `border-radius: 0`
- Icon: h-12 w-12, color black (white on dark bg cards)
- Title: UPPERCASE, Space Grotesk 700
- Body: regular weight, muted
- Heights not forced equal — content-driven

### How It Works

**Section header:** `HOW IT WORKS` — same large bold style

**Layout:** Vertical stack with connecting arrows

```
01                        <- 120px bold, opacity 0.12, decorative
───────────────────────────────────────
UPLOAD EPUB
Drop your file. System parses spine, chapters, token estimate.

             v

02
───────────────────────────────────────
AI TRANSLATION + MEMORY
Streams chunk-by-chunk with TM enforcement and live progress.

             v

03
───────────────────────────────────────
DOWNLOAD
Publication-ready EPUB, 100% format intact.
```

- Numbers `01/02/03`: Space Grotesk 800, font-size 120px, opacity 0.12
- Horizontal rule: `border-top: 2px solid black`, full-width
- Step title: 24px, Space Grotesk 700, UPPERCASE
- Step body: regular, muted, 14px

### CTA Section (Bottom)

```
+----------------------------------------------------------+
|                                                          |  border: 3px solid black
|  READY TO TRANSLATE                                      |  box-shadow: 8px 8px 0 #0A0A0A
|  YOUR FIRST BOOK?                                        |
|                                                          |
|  [CREATE NEW PROJECT ->]     [GO TO WORKSPACE]           |
|                                                          |
|                                                EPUB.ai   |  <- watermark, mono, opacity 0.06
+----------------------------------------------------------+
```

- Outer box: `border: 3px solid black`, `box-shadow: 8px 8px 0 #0A0A0A`
- H2: Space Grotesk 800, 48px, UPPERCASE
- `CREATE NEW PROJECT ->`: primary button (blue)
- `GO TO WORKSPACE`: outline button
- `EPUB.ai` watermark: bottom-right, font-size 64px, opacity 0.06, Geist Mono

---

## Section 3: Interior Pages

### Project List (`/projects`)

**Page header:**

```
TRANSLATION           [14 BOOKS]
PROJECTS
                                   [+ NEW BOOK ->]
```

Space Grotesk 800, large. Book count: pill with border 2px black, bg secondary.
CTA button top-right: primary blue.

**Stats strip** (flat, no card wrapper — 4 columns separated by `border-right: 2px solid black`):

```
■ 14 TOTAL   |   ■ 8 COMPLETED   |   ◆ 2 IN PROGRESS   |   ○ 4 DRAFT
```

Numbers: Geist Mono 800, 36px. Labels: UPPERCASE, 11px, muted. Entire strip has `border-top: 2px black` and `border-bottom: 2px black`.

**Search + Filter bar:**

- Input: `border: 2px solid black`, `border-radius: 0`, full-width left
- Filter tabs right: `border: 2px solid black`, inline-flex, no radius
- Active tab: `bg-foreground text-background`
- Inactive: transparent, hover bg-secondary

**Project Card redesign:**

```
+------------------------------------------------------+
| [BOOK] FANTASY EPIC: THE LAST EMPIRE  [COMPLETED ●]  |  border 2px, shadow 4px 4px 0 black
|        the-last-empire.epub                          |
+------------------------------------------------------+
| EN -> ID                        FULL-DOC MODE        |  border-top 2px black
+------------------------------------------------------+
| Sep 8, 2026                [v EPUB]   [DETAIL ->]    |  border-top 2px black
+------------------------------------------------------+
```

- `border: 2px solid black`, `box-shadow: 4px 4px 0 #0A0A0A`, `border-radius: 0`
- Status badges: solid color (no transparency) — lime=COMPLETED, blue=TRANSLATING, yellow=QUEUED, coral=FAILED, secondary=DRAFT/READY
- Hover: `box-shadow: 6px 6px 0 #0A0A0A` + `translate(-2px, -2px)` lift effect
- Divider rows: `border-top: 2px solid black`
- Download button: lime variant. Detail button: outline.

**Empty state:**

- Box `border: 2px dashed black`, centered, icon large, Space Grotesk bold message
- CTA: primary button

---

### Project Detail (`/projects/[id]`)

**Back link:** `← BACK TO PROJECTS` — mono uppercase, muted, no decoration.

**Project header:**

```
■ FANTASY EPIC:                        [TRANSLATING ◉]
  THE LAST EMPIRE
  the-last-empire.epub

  [TRANSLATION MEMORY]   [GLOSSARY ->]   [SETTINGS ->]
```

H1: Space Grotesk 800, large. Filename: Geist Mono, muted small.
Action buttons: outline style, border 2px black.
Status badge: solid color pill, border 2px black.

**Metadata strip** (flat, 3 columns, `border: 2px solid black` as outer wrapper, `border-right: 2px solid black` as dividers):

```
+------------------+------------------+------------------+
| EN -> ID         | 8 / 24 CHAPTERS  | FULL-DOC         |
| LANGUAGE PAIR    | CHAPTER PROGRESS | SUBMIT MODE      |
+------------------+------------------+------------------+
```

Labels: Geist Mono UPPERCASE 11px. Values: Space Grotesk 700 18px.

**Translation Controls panel:**

```
+----------------------------------------------------------+
| TRANSLATION CONTROLS                                     |  border 2px black
|                                                          |
| [▶ START TRANSLATION]   [■ CANCEL]   [↓ DOWNLOAD EPUB]  |
|                                                          |
| [████████████████░░░░░░░░░░░░░░]  67%                   |  progress bar
| PROCESSING CHAPTER 8 OF 24  —  stage label mono         |
|                                                          |
| INPUT: 1,240  |  OUTPUT: 982  |  CACHED: 258            |  stat strip
+----------------------------------------------------------+
```

- Outer box: `border: 2px solid black`, `box-shadow: 4px 4px 0 #0A0A0A`
- Progress bar track: `bg-secondary`, `border: 1px solid black`, height 14px, `border-radius: 0`
- Progress fill: `bg-primary` (blue), or lime when COMPLETED
- Percentage: Geist Mono bold, right-aligned
- Token stat strip: 3 cols, `border-right: 2px solid black`, Geist Mono

**Chapter list** (table-style):

```
+----+----+-----------------------+----------------+------------+
| CB | #  | TITLE                 | STATUS         | ACTION     |
+====+====+=======================+================+============+
| □  | 01 | Prologue              | [COMPLETED]    | [VIEW ->]  |
| □  | 02 | The First Gate        | [COMPLETED]    | [VIEW ->]  |
| □  | 03 | Beyond the Wall       | [TRANSLATING]  | [VIEW ->]  |
| □  | 04 | The Reckoning         | [PENDING]      | [VIEW ->]  |
+----+----+-----------------------+----------------+------------+
```

- Outer: `border: 2px solid black`
- Header row: `bg-foreground text-background`, Geist Mono UPPERCASE
- Each row: `border-bottom: 1px solid black`
- Status badges: solid color pills, no transparency
- Checkbox column for multi-select re-translation
- Re-translate selected button below table: primary or lime

---

### Chunk Editor (`/projects/[id]/chapters/[chapterId]`)

**Breadcrumb:** `← FANTASY EPIC / CHAPTER 3 — THE FIRST GATE` — mono, muted.

**Action bar:**

```
[↓ DOWNLOAD EPUB]   [RECOMPILE PROJECT ->]
```

Buttons: primary + outline, top-right.

**Side-by-side editorial panel:**

```
+----------------------------------+----------------------------------+
| SOURCE                           | TRANSLATION                      |  border 2px, shadow 6px
| ENGLISH                          | INDONESIAN             [✎ EDIT]  |  border-right 2px
+----------------------------------+----------------------------------+
| "The moonlight poured through    | "Cahaya rembulan menembus       |  chunk #001 [HISTORY]
| the broken stained-glass         | jendela kaca patri yang retak   |
| window..."                       | itu..."                         |
+----------------------------------+----------------------------------+
| "A faint crimson aura pulsed..." | "Aura merah tipis berdenyut..." |  chunk #002
|                                  |   [EDITING — bg yellow subtle]  |  [✓ SAVE] [✕]
|                                  | +------------------------------+ |
|                                  | | textarea edit here           | |
|                                  | +------------------------------+ |
|                                  | COMMENT: ______________________ |
+----------------------------------+----------------------------------+
```

- Outer panel: `border: 2px solid black`, `box-shadow: 6px 6px 0 #0A0A0A`
- Column headers: Geist Mono UPPERCASE, `bg-secondary`, `border-bottom: 2px solid black`
- Divider: `border-right: 2px solid black`
- Each chunk row: `border-bottom: 2px solid black`
- Hover row: `bg-secondary`
- Active edit row right column: `bg-accent-yellow/20` (subtle yellow tint)
- `[✓ SAVE]`: lime button. `[✕]`: outline/coral.
- Textarea: `border: 2px solid black`, `border-radius: 0`
- `[HISTORY]`: ghost button, opens revision history dialog

**Revision History Dialog:**

- `border: 2px solid black`, `box-shadow: 6px 6px 0 #0A0A0A`
- List of revisions: date (mono), comment, text — separated by `border-bottom: 1px black`
- Active revision: `bg-lime/20` highlight

---

### Demo Banner (Guest Mode)

```
+------------------------------------------------------------------+
| DEMO MODE  —  Portfolio demo. Projects auto-delete in 24h.       |  bg accent-yellow
| Character limit: 5,000 chars.        [LOGIN AS SUPERADMIN ->]   |  border-bottom 2px black
+------------------------------------------------------------------+
```

- `background: var(--accent-yellow)` (bright yellow)
- `border-bottom: 2px solid black`
- `box-shadow: 0 4px 0 #0A0A0A` (downward shadow only)
- Text: Space Grotesk 700, UPPERCASE, black
- CTA: outline button, border 2px black, black text

---

### Settings Page (`/projects/[id]/settings`)

Layout: single column, `max-width: 640px`. Sections separated by `border-top: 2px solid black`.

**Each field:**

```
PROJECT NAME
+------------------------------------------+
| Fantasy Epic: The Last Empire            |  border 2px black, no radius
+------------------------------------------+

SOURCE LANGUAGE      TARGET LANGUAGE
+-------------------+ +-------------------+
| English       [v] | | Indonesian    [v] |  border 2px black, no radius
+-------------------+ +-------------------+
```

Labels: Geist Mono UPPERCASE 11px. Inputs/selects: `border: 2px solid black`, `border-radius: 0`.
Submit: `[SAVE SETTINGS ->]` — primary blue button.
Danger zone: `border: 2px solid var(--accent-coral)`, `box-shadow: 4px 4px 0 var(--accent-coral)`. Delete button: coral/destructive.

---

### Glossary Page (`/projects/[id]/glossary`)

**Table:**

```
+------------------------+------------------------+-----------+----------+
| TERM (SOURCE)          | TERM (TARGET)          | NOTE      | ACTION   |  bg-foreground text-background header
+========================+========================+===========+==========+
| grimoire               | grimoire               | keep EN   | [✎] [✕] |
| altar obsidian         | altar obsidian         | —         | [✎] [✕] |
+------------------------+------------------------+-----------+----------+
```

- `border: 2px solid black`, `border-collapse: collapse`
- Header row: `background: var(--foreground)`, `color: var(--background)` (inverted)
- Every `td`: `border: 1px solid black`, `padding: 8px 12px`
- Alternating rows: every other row gets `bg-secondary`
- `[✎]` edit: ghost/outline. `[✕]` delete: coral.

**Action bar above table:**

```
[+ ADD TERM]   [↑ IMPORT TBX]   [↓ EXPORT TBX]   [AI EXTRACT ->]
```

All buttons: outline style, border 2px black.

---

## Implementation Plan (Approach A — Design System First)

### Phase 1: Design System

1. Update `globals.css` — new CSS tokens, grid background, utility classes
2. Update `app/layout.tsx` — add Space Grotesk via `next/font/google`, wire font variables
3. Update `components/ui/button.tsx` — new variants (lime, yellow), remove glassmorphism
4. CSS utilities: `.shadow-hard`, `.shadow-hard-lg`, `.shadow-hard-xl`, `.border-brutal`

### Phase 2: Landing Page + Navbar

5. Rewrite `app/(root)/page.tsx` — all 5 sections
6. Rewrite `components/shared/navbar/index.tsx` — brutalist navbar, new role badges
7. Update `components/shared/auth/login-dialog.tsx` — brutalist modal style

### Phase 3: Interior Pages

8. `app/(root)/projects/page.tsx` + `project-card.tsx`
9. `app/(root)/projects/[id]/page.tsx`
10. `components/module/project/chapter-list.tsx`
11. `components/module/project/chunk-editor.tsx`
12. `components/module/project/progress-bar.tsx`
13. `components/module/project/job-controls.tsx`
14. `components/module/project/error-banner.tsx`
15. `components/module/project/token-analytics.tsx`
16. `components/module/project/tm-dialog.tsx`
17. `components/module/project/retranslate-dialog.tsx`
18. `app/(root)/projects/[id]/settings/`
19. `app/(root)/projects/[id]/glossary/`
20. `components/shared/demo-banner.tsx`

### Phase 4: Polish

21. CHANGELOG update (version bump to 1.5.0)
22. `pnpm run format`
23. Commit and push to `feat/auth-guest-demo`

---

## Open Items

- [x] Section 3 design (interior pages) — approved 2026-09-10
- [ ] Sticker exact placement — finalize during implementation
- [ ] Chapter viewer page `/projects/[id]/chapters/[chapterId]` — inherits chunk editor patterns, no separate spec needed
- [ ] `new-project` page (`/projects/new`) — form page, inherits Settings page patterns (brutal inputs, labels)

---

## Constraints

- Stay on branch `feat/auth-guest-demo`
- Do NOT merge to `main` without explicit instruction
- All commits must pass `pnpm run format` + Husky pre-commit (build check)
- Dark mode must work with new tokens — no hardcoded hex colors in JSX
