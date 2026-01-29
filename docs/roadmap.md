# 🗺️ Project Roadmap: Subprocess Hub

> **The Pitch:** A catalog of subprocesses. That's it. No AI. No blockchain. Just a catalog.
> **The Goal:** Browse like Netflix. Drop it in. Done.
> **The Infrastructure:** Zero Backend. GitHub is the database.

---

## 🛠 Technical Architecture

### Core Stack (Latest Versions)
* **Repo:** Monorepo (pnpm workspaces + Turborepo 2.x)
* **Framework:** Astro 5.0+ (Static Site Generation)
* **Language:** TypeScript 5.x (Strict Mode)
* **Styling:** Tailwind CSS 3.4+ (or v4 if stable)
* **Linting/Formatting:** Biome (Unified tool replacing ESLint/Prettier)
* **BPMN Engine:** `bpmn-js` (mature library for interactive view) + `bpmn-to-image` (puppeteer wrapper for build-time thumbnails)
* **Interactivity:** GitHub Discussions API (via Giscus)
* **Search:** Pagefind (Static indexing)

### Non-Functional Requirements (NFRs)
1.  **Super Fast:** Zero JS on listing pages. Pre-rendered SVGs.
2.  **SEO:** Sitemap, JSON-LD Schema, OpenGraph images.
3.  **A11y:** Keyboard navigation, proper ARIA labels for diagrams.
4.  **i18n:** English (default), German (de), Spanish (es).

---

## 📦 Part 1: Foundation & Monorepo Setup

**Objective:** Establish a strict, centralized development environment.

### Phase 1.1: Workspace Initialization
- [x] **Init:** Run `pnpm init` and `git init`.
- [x] **Workspace Config:** Create `pnpm-workspace.yaml`:
  ```yaml
  packages:
    - "apps/*"
    - "packages/*"
  ```
- [x] **Turborepo:** Install `turbo` globally and at root. Create `turbo.json`.
  - [x] Define pipeline: `build`, `dev`, `check`, `lint`, `format`.
  - [x] Configure output caching (e.g., `dist/**`, `.astro/**`).

### Phase 1.2: Root Tooling (The "Control Tower")
*Strategy: All devDependencies live in the root `package.json` (`pnpm add -w -D`). Apps only contain runtime deps.*

- [x] **Install Global Deps:**
  `pnpm add -w -D typescript @biomejs/biome astro @astrojs/check`
- [x] **Biome Config:** Create `biome.json` at root.
  - [x] Enable `linter`, `formatter`, `organizeImports`.
  - [x] Set strict rules (no `any`, no unused vars).
- [x] **TypeScript Config:** Create `tsconfig.json` at root.
  - [x] `strict: true`
  - [x] `verbatimModuleSyntax: true`
  - [x] `skipLibCheck: true`
- [x] **Root Scripts:** Add these EXACT commands to root `package.json` to check everything from the top level:
  - [x] `"dev"`: `turbo run dev`
  - [x] `"build"`: `turbo run build`
  - [x] `"lint"`: `turbo run lint`
  - [x] `"format"`: `turbo run format`
  - [x] `"check"`: `turbo run check` (Runs `astro check` + `tsc`)
  - [x] `"validate"`: `pnpm run lint && pnpm run format && pnpm run check && pnpm run build`

---

## 🎨 Part 2: Layout & Discovery Experience

**Objective:** "Find the right recipe in seconds."

### Phase 2.1: Navigation Architecture
- [x] **Command Palette (Cmd+K):**
  - [x] Implement a global search modal (e.g., using `kbar` or custom dialog).
  - [x] Index: Process Titles, Tags, IDs.
- [x] **Faceted Sidebar:**
  - [x] Permanent left sidebar on desktop (collapsible on mobile).
  - [x] **Facets:**
    - *Category:* Finance, HR, Tech.
    - *Complexity:* Green (Simple), Yellow (Moderate), Red (Complex).
    - *Elements:* "Contains User Task", "Contains Service Task".
- [x] **The "Netflix" Grid:**
  - [x] Main view displays cards with **Static SVG Previews** (not loaded JS engines).
  - [x] Hover effects play a small CSS animation or show metadata.

### Phase 2.2: Design System
- [x] **Tailwind Config:**
  - [x] Define semantic colors: `bg-canvas`, `text-primary`, `border-muted`.
  - [x] Typography: `IBM Plex Sans` (UI) + `JetBrains Mono` (Code).
- [x] **Dark Mode:** Default to Dark Mode (Developer focus). Support system toggle.

---

## ⚡ Part 3: The BPMN Engine (Performance Core)

**Objective:** Render instantly. Do not ship 5MB of JS to the listing page.

### Phase 3.1: The Build-Time Converter
- [x] **Tooling:** Install `bpmn-to-image` (Puppeteer wrapper) as a dev dependency.
- [x] **Script:** Create a pre-build script (or Astro Integration).
  - [x] **Input:** Scan `src/content/subprocesses/**/*.bpmn`.
  - [x] **Process:** Convert every `.bpmn` file to an optimized `.svg` containing the diagram.
  - [x] **Output:** Save SVGs to `public/previews/` or alongside content.
- [x] **Usage:** Listing cards strictly load the SVG via `<img>`. **Zero JS overhead.**

### Phase 3.2: The Interactive Viewer (Detail Page)
- [x] **Library:** Install `bpmn-js` (The mature standard by Camunda).
- [x] **Wrapper:** Create a React component `<BPMNViewer />`.
  - [x] **Hydration:** Use `client:only="react"` (BPMN-js relies on `window` and cannot SSR).
  - [x] **Features:** Enable Zoom, Pan, Drag canvas.
  - [x] **Read-Only:** Use `NavigatedViewer` module (lighter weight than the Modeler).

---

## 📚 Part 4: Data Layer & Content

**Objective:** Structured data for SEO and maintainability.

### Phase 4.1: Content Collections
- [x] **Schema:** Define Zod schema in `src/content/config.ts`:
  ```ts
  z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    complexity: z.enum(['low', 'mid', 'high']),
    author: z.string(), // GitHub Username
    discussionId: z.number().optional(), // For Comments mapping
    published: z.coerce.date(),
  })
  ```
- [x] **Files:** Structure: `src/content/subprocesses/[locale]/[slug]/data.json` + `process.bpmn`.

### Phase 4.2: Internationalization (i18n)
- [x] **Config:** Update `astro.config.mjs`:
  - [x] `defaultLocale: "en"`, `locales: ["en", "de", "es"]`.
  - [x] Strategy: `routing: { prefixDefaultLocale: false }`.
- [x] **UI Strings:** Create `src/i18n/ui.ts` for interface translations (Search, Download, Likes).

---

## 🔗 Part 5: Interactivity (GitHub as Backend)

**Objective:** Social features without a database.

### Phase 5.1: Giscus Integration
- [x] **Setup:** Enable Discussions on the GitHub repo. Install Giscus App.
- [x] **Component:** Create `<Comments />` wrapper.
  - [x] **Mapping:** Map URL pathname to Discussion.
  - [x] **Reactions:** Enable "Top" reactions (serves as "Likes").
  - [x] **Theme:** Sync with current Dark/Light mode automatically.

### Phase 5.2: User Actions
- [x] **Download:** Button to download raw `.bpmn` XML.
- [x] **Copy:** Button to copy XML to clipboard.
- [x] **Edit:** "Edit on GitHub" link pointing to the source file for PRs.

---

## 🔎 Part 6: Search & SEO

**Objective:** Be discoverable on Google and internally.

### Phase 6.1: Search Engine
- [ ] **Pagefind:** Install `pagefind` (Static search library).
- [ ] **Build Step:** Update build command: `astro build && pagefind --site dist`.
- [ ] **UI:** Integrate Pagefind's default UI or custom API into the Command Palette.

### Phase 6.2: SEO & Meta
- [ ] **Sitemap:** Configure `@astrojs/sitemap`.
- [ ] **Metadata:** Use `astro-seo` for title templates and canonical URLs.
- [ ] **OG Images:** Auto-generate social cards using the process title + BPMN SVG overlay.

---

## ✅ Day 1: Action Items Checklist

- [x] **Repo:** Run `pnpm init` & setup `pnpm-workspace.yaml`.
- [x] **Turbo:** Setup `turbo.json` pipeline with caching.
- [x] **Scripts:** Add `validate`, `lint`, `format` scripts to root `package.json`.
- [x] **App:** Create Astro app in `apps/web`.
- [x] **Quality:** Setup `biome.json` (strict) & `tsconfig.json`.
- [x] **Content:** Add one dummy BPMN file to `src/content/`.
- [x] **Viewer:** Create the `<BPMNViewer />` React component.
- [x] **Preview:** Write the script to convert BPMN -> SVG.
