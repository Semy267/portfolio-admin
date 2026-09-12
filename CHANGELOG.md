# Changelog

all notable changes to this project will be documented in this file.

# [1.5.2] - 2026-09-11

- (refactor) - Standardized all project mutations and queries to TanStack React Query hooks (`useCreateProject`, `useUploadEpub`, `useUpdateProject`, `useGetChapterPreview`, `useRecompileProject`) and removed deprecated `projectService` object.
- (refactor) - Centralized global loading, toast notifications, and query invalidation using custom `MutationCache` and `mutation.meta` across all services (`projectService`, `glossaryService`, `jobService`, `revisionService`, `extractionService`), removing redundant `useQueryClient` and `toast` calls from UI components.

# [1.5.1] - 2026-09-11

- (docs) - Added backend security hardening specification and implementation plan covering brute force, JWT verification, and SQL/upload protections.
- (docs) - Added Telegram bot command menu (setMyCommands) and interactive inline keyboard button project list specification.
- (chore) - Applied database migration 0012 and consolidated production project ownership under Super Admin.

# [1.5.0] - 2026-09-10

- (docs) - Added neo-brutalist full frontend redesign specification covering design tokens, landing page layout, and phased implementation plan.
- (docs) - Completed Section 3 design spec covering all interior pages: Project List, Project Detail, Chunk Editor, Demo Banner, Settings, Glossary.
- (feat) - Phase 1 Design System: rewrote globals.css with paper/charcoal tokens, always-black borders, grid background for light/dark, shadow-hard utility classes.
- (feat) - Phase 1 Design System: switched to Space Grotesk (Google Fonts) + Geist Mono, updated layout.tsx font stack.
- (feat) - Phase 1 Design System: rewrote button.tsx with brutalist variants (no radius, 2px border, hard shadow lift effect) and added lime/yellow new variants.
- (feat) - Phase 2 Landing Page: redesigned landing page `/` with 5 neo-brutalist sections, EPUB illustration, interactive bilingual preview, 6 alternating feature cards, and bottom CTA banner.
- (feat) - Phase 2 Navbar & Dialogs: brutalist navbar with monospace uppercase links, hard-shadow role badges (lime superadmin, yellow guest), and brutalist login dialog & demo banner.
- (feat) - Phase 3 Interior Pages: redesigned `/projects` (Project List) with flat 4-column stats strip, brutalist filter tabs, and new ProjectCard with shadow-hard lift effect.
- (feat) - Phase 3 Interior Pages: redesigned `/projects/[id]` (Project Detail) with flat 3-column metadata strip, brutalist translation controls, 14px progress bar, token analytics, and table-style chapter list.
- (feat) - Phase 3 Interior Pages: redesigned `/projects/[id]/chapters/[chapterId]` (Chunk Editor) with side-by-side editorial layout, revision audit dialog, and visual reader.
- (feat) - Phase 3 Interior Pages: redesigned `/projects/[id]/settings`, `/projects/[id]/glossary`, and `/projects/new` with monospace labels, 2px solid borders, and brutalist tables.

# [1.4.1] - 2026-09-08

- (fix) - Ensured guest mode defaults to true for any non-superadmin visitor and added double-guarded 10 MB client & server file upload validation.
- (feat) - Added active guest demo translation notification and IProject type extensions.

# [1.4.0] - 2026-09-08

- (feat) - Integrated Better Auth (`better-auth`) on Next.js with PostgreSQL adapter, email/password credentials, and anonymous plugin.
- (feat) - Superadmin vs Guest Demo Mode: Portfolio visitors enjoy frictionless anonymous demo access with 5,000 char translation limit & 24h retention banner. Superadmins can log in for unlimited full novel translation.
- (feat) - Added LoginDialog, DemoBanner, and dynamic Navbar role indicators.

# [1.3.2] - 2026-09-08

- (chore) - Bumped Next.js and `@next/eslint-plugin-next` to `15.3.9` to resolve Vercel security vulnerability advisory.

# [1.3.1] - 2026-09-04

- (fix) - Resolved theme toggle view-transition blink and white flash bug: synchronized DOM class mutation before snapshot capture, updated React state with `flushSync`, configured `mix-blend-mode: normal`, and implemented clean single-layer circular reveal with `forwards` fill mode.

# [1.3.0] - 2026-09-04

- (feat) - Sleek Glassmorphism Landing Page at root `/` with interactive bilingual reader showcase, core features grid, and glass stat cards.
- (feat) - Upgraded Projects Page `/projects` with live stats summary bar, search filter, and status tabs.
- (feat) - Upgraded ProjectCard with frosted glass containers, pulsing status badges, and direct EPUB download.
- (fix) - Real-time reactive download button availability: eliminates manual page refresh upon job completion via active polling and status transition effects.
- (fix) - Semantic theme colors audit: replaced hardcoded dark/zinc colors in glossary import dialog, error banners, and controls for 100% dark/light mode consistency.

# [1.2.0] - 2026-09-04

- (feat) - Core Selective Chapter Re-translation: Non-destructive chapter re-runs with automated revision archiving, TranslationRun tracking, TM bypass controls, custom prompt instructions, and Chapter Run History audit dialog.
- (feat) - Multi-select chapter list UI with batch actions (Translate Selected, Re-translate Selected, Retry Failed), status filtering, and token usage metrics.

# [1.1.0] - 2026-09-04

- (feat) - Phase 6: Global theme consistency for dark & light modes, Bilingual Chunk Post-Editor with revision audit trail, deterministic EPUB recompile, AI terminology & character extraction dialog, CAT TBX/TMX interoperability, and semantic vector memory search.

# [1.0.0] - 2026-09-03

- (feat) - AI EPUB Translator Dashboard, Project Workspace, Chapter Previews, Glossary, and Real-time Socket.IO Integration

# [0.1.1] - 2026-01-12

- (Fix) - remove todoService
- (feat) - add react query, sonner, next theme, and update ui
- (feat) - add socket provider

# [0.1.0] - 2025-07-13

- feat: update vuln lib
- (Refactor) - Make cradio and cchecbox more flexible to customize
- (Feat) - Adding cswitcher component

# [0.1.0] - 2025-07-12

- (Style) - Reorganize global style
- (Style) - custom container class

# [0.1.0] - 2025-07-06

- (Refactor) - Update types ccarousel
- (Feat) - Adding support for pass item, render and isLoading in ccarousel (more flexible and reusable)

# [0.1.0] - 2025-07-05

- (Refactor) - Update dot and arrow variant carousel more flexible
- (Refactor) - Update types carousel

# [0.1.0] - 2025-06-28

- (Feat) - cradio and cchecbox
- (Feat) - cradio-form and ccheckbox-form
- (Refactor) - move all input field to folder form/

# [0.1.0] - 2025-06-26

- (Feat) - put dialog and drawer (become overlay wrapper)
- (Feat) - make overlay flexible
- (Style) - update ui and fix functionality both dialog and drawer
- (Refactor) - update cbutton types using buttonVariant types over write manualy
- (Style) - update name variant button and ui
- (Refactor) - remove cdialog, cdialog and dialog.module.css

# [0.1.0] - 2025-06-20

- (Feat) - CSelectMulti
- (Chore) - update react-day-picker to latest
- (Refactor) - update daypicker for more flexible
- (Fix) - update validation onChange year and mond based min and max date

# [0.1.0] - 2025-06-20

- (Chore) - update next and react to latest

# [0.1.0] - 2025-06-1

- (Feat) - show demo table
- (Feat) - formattedDate utils

# [0.1.0] - 2025-05-31

- (Fix) - carousel behavior (not show the correct index)
- (Fix) - typo disable it should be disabled on pagination

# [0.1.0] - 2025-05-30

- (Feat) - update custome input (more flexible)
- (Refactor) - update filename textarea
- (Refactor) - reorganize cdialog and cdrawer comp

# [0.1.0] - 2025-05-29

- (Feat) - custom date picker (color)
- (Feat) - custome select (more flexible)
- (Wip) - update custome input

# [0.1.0] - 2025-05-26

- (Wip) - custom date picker

# [0.1.0] - 2025-05-24

- (Wip) - custom date picker

# [0.1.0] - 2025-05-08

- (Feat) - custome popover

# [0.1.0] - 2025-05-08

### Added

- (Feat) Other variant of carousel

## [0.1.0] - 2025-04-27

### Addedd

- Textarea

## [0.1.0] - 2025-04-27

### Addedd

- Custome Dropdown

### Chore

- Install dropdown-menu
- Update color
- Update format CHANGELOG
- Update tailwindCSS to v4

## [0.1.0] - 2025-04-26

### Added

- Added `use-media` library.
- Added `useBreakpoint` hook.
- Added custom Carousel component (incomplete, but usable).
- Added Pagination component and styles.
- Added custom Select component.
- Added Tanstack Form integration.
- Added compound components.
- Moved to `pnpm`.

### Changed

- Updated `README.md`.
- Changed TS config path from `@*` to `@/`.
- Updated all component import paths.
- Renamed `useStore` to `store`.
- Updated `CButton` types to accept `title` or `children`.
- Updated project to Next.js 15.
- Updated Modal and Drawer identifiers (`modalName`, `drawerName` → `id`).
- Refactored custom Input and Select components for better reusability.
- Changed validation from `react-hook-form` to `tanstack/form`.
- Combined Dialog and Drawer components into a single import.
- Improved UI styles for Drawer, Dialog, Inputs, and Selects.
- Added Esc key and outside click to close Drawer.

### Fixed

- Fixed image export path issues.
- Resolved merge conflicts with `dev` branch.
- Fixed img path errors.
- Fixed type and key errors.
- Fixed Zod validation for empty strings.

### Refactored

- Removed TODOs from README.
- Made custom Input component reusable and standardized.
- Moved custom carousel types to `global.d.ts`.
- Updated how form errors are displayed.

### Chore

- Added Husky integration.
