# Subprocess Hub 🎯

> A catalog of reusable BPMN subprocesses. Browse like Netflix. Drop it in. Done.

## Overview

Subprocess Hub is a static site built with Astro that provides a catalog of BPMN subprocess templates. The project follows a "Zero Backend" philosophy, using GitHub as the database and leveraging modern web technologies for a fast, accessible user experience.

## Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo 2.x
- **Framework:** Astro 5 (Static Site Generation)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 3.4 with Camunda design system colors
- **Linting/Formatting:** Biome 1.9
- **BPMN Engine:** bpmn-js 18 for interactive diagrams
- **i18n:** Built-in Astro i18n (en, de, es)

## Project Structure

```
subprocess-directory/
├── apps/
│   └── web/              # Main Astro application
│       ├── src/
│       │   ├── components/   # React components (BPMNViewer, etc.)
│       │   ├── content/      # Content collections
│       │   │   └── subprocesses/
│       │   │       └── en/
│       │   │           └── invoice-approval/
│       │   │               ├── data.json
│       │   │               └── process.bpmn
│       │   ├── i18n/         # Translation files
│       │   ├── layouts/      # Astro layouts
│       │   └── pages/        # Routes
│       ├── astro.config.mjs
│       ├── tailwind.config.mjs
│       └── package.json
├── packages/            # Shared packages (future use)
├── docs/               # Documentation
│   ├── design.md      # Design system specification
│   └── roadmap.md     # Implementation roadmap
├── biome.json         # Linting/formatting config
├── turbo.json         # Turborepo pipeline
├── tsconfig.json      # TypeScript config
└── package.json       # Root package

```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9.12.3+

### Installation

```bash
# Install pnpm globally if not already installed
npm install -g pnpm@9.12.3

# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Run all checks (lint, format, type-check, build)
pnpm run verify
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build all packages
- `pnpm run lint` - Lint all code
- `pnpm run format` - Format all code
- `pnpm run check` - Type-check all code
- `pnpm run verify` - Run all checks and build

## Features Implemented ✅

### Part 1: Foundation & Monorepo Setup
- ✅ pnpm workspace configuration
- ✅ Turborepo pipeline with caching
- ✅ Biome linting and formatting
- ✅ TypeScript strict mode
- ✅ Root-level quality scripts

### Part 2: Design System
- ✅ Tailwind CSS with Camunda brand colors
- ✅ IBM Plex Sans and JetBrains Mono fonts
- ✅ Base layout with navigation and footer

### Part 3: BPMN Engine
- ✅ bpmn-js integration
- ✅ Interactive BPMN viewer component
- ✅ Client-side hydration with React

### Part 4: Data Layer
- ✅ Content collections with Zod schema
- ✅ i18n configuration (en, de, es)
- ✅ Translation utilities
- ✅ Example subprocess (Invoice Approval)

## Features In Progress 🔨

- Command palette search
- Static SVG preview generation
- Faceted sidebar filters
- Netflix-style grid layout
- GitHub Discussions integration (Giscus)
- Pagefind search integration
- SEO optimization

## Design System

The project follows the Camunda design system with these key colors:

- **Orangemunda** (#FC5D0D) - Primary actions
- **Spacecraft** (#F7F7F7) - Page background
- **Look Up** (#1F2A44) - Dark accents
- **Greenmunda** (#26D07C) - Success states

See [docs/design.md](docs/design.md) for complete design specifications.

## Contributing

This project is in active development. Refer to [docs/roadmap.md](docs/roadmap.md) for planned features and implementation details.

## License

ISC
