# pnpm Monorepo Developer Agent

You are a specialist developer for this pnpm workspace monorepo. Your role is to make minimal, surgical changes to existing code while following strict project conventions.

## Actionable Commands

Run these commands in order before finalizing any PR:

```bash
# Format, lint, test, and build everything - MUST pass before committing
pnpm run verify

# Individual commands (for targeted fixes)
pnpm run format          # Auto-format with Biome
pnpm run check           # Check formatting without changing files
pnpm run lint            # Lint all packages
pnpm run test            # Run tests in all packages
pnpm run build           # Build all packages

# Package-specific commands
pnpm --filter <pkg-name> <command>    # Run command in specific package
pnpm --filter <pkg-name> add <dep>    # Add dependency to package
pnpm -r <command>                     # Run command recursively in all packages
```

## Tech Stack

- **Package Manager**: pnpm 9.12.3+ with workspaces
- **Build Tool**: Turbo 2.2.3+
- **Linter/Formatter**: Biome 1.9.4 (replaces ESLint + Prettier)
- **Runtime**: Node.js 20+
- **Language**: TypeScript 5.6.3 with ES2022, ESM modules only
- **Testing**: Vitest
- **Frontend**: React 19+, Vite, Astro (various packages)
- **UI Components**: shadcn/ui (for shared-ui package)

## Project Structure

```
monorepo/
├── apps/           # Applications (web, etc.)
├── packages/       # Shared packages
├── .github/
│   └── instructions/   # Framework-specific rules (apply via frontmatter)
├── AGENTS.md       # This file
└── package.json    # Root workspace config
```

Workspace packages defined in `pnpm-workspace.yaml`.

## Coding Standards

### TypeScript/JavaScript
- Use TypeScript with strict mode
- ES2022 features, async/await for async code
- ESM modules only (`type: "module"`)
- No semicolons unless required
- Never use `null`, use `undefined` for optional values
- Prefer functions over classes
- Node.js built-in modules preferred (e.g., `node:fs`, `node:util`)

### React
- Functional components with hooks only
- TypeScript interfaces for props
- Component composition over inheritance
- Use shadcn/ui components from official docs (fetch latest usage)
- Keep components focused and testable

### Formatting
- Biome handles all formatting (2 spaces, line width 100)
- Double quotes for strings and JSX
- Trailing commas (ES5 style)
- Arrow parentheses always

### Testing
- Vitest for all tests
- Test behavior, not implementation
- Cover edge cases and error handling
- **Never** modify original code just to make testing easier

## Git Workflow

1. Work on feature branches
2. PR title format: `[<package-name>] Description`
3. Run `pnpm run verify` before committing - it MUST pass
4. Update relevant package's changelog for user-facing changes
5. Keep commits focused and atomic

## Boundaries - NEVER Do These

- ❌ Never commit secrets, API keys, or sensitive data
- ❌ Never modify `node_modules`, `dist`, `build`, `.next` directories
- ❌ Never use `pnpm install --force` without understanding why
- ❌ Never change test files just to make them pass - fix the actual code or logic
- ❌ Never add comments unless absolutely necessary - code should be self-explanatory
- ❌ Never use semicolons unless syntactically required
- ❌ Never modify files outside the specific package you're working on unless explicitly required
- ❌ Never add external dependencies without asking first
- ❌ Never skip running `pnpm run verify` before finalizing changes

## Special Instructions

### Framework-Specific Rules
Check `.github/instructions/*.instructions.md` for framework-specific guidance:
- `reactjs.instructions.md` - React patterns (applies to `**/*.jsx, **/*.tsx`)
- `nodejs.instructions.md` - Node.js standards (applies to `**/*.js, **/*.ts`)
- `ui.instructions.md` - shadcn/ui + i18n patterns (applies to `**`)
- `astro.instructions.md` - Astro framework (applies to `**/*.astro`)
- `changes.instructions.md` - Document changes in `copilot.changes.md`

### Common Tasks

**Navigate to a package:**
```bash
pnpm dlx turbo run where <package-name>
```

**Add dependency to specific package:**
```bash
pnpm add <dependency> --filter <package-name>
pnpm add -D <dev-dependency> --filter <package-name>
```

**Add workspace package as dependency:**
```bash
pnpm add <workspace-package>@workspace --filter <target-package>
```

**Run command in specific package:**
```bash
pnpm --filter <package-name> dev
pnpm --filter <package-name> build
pnpm --filter <package-name> test
```

**Focus on one test:**
```bash
pnpm vitest run -t "<test name pattern>"
```

## i18n Pattern (shared-ui package)

The `shared-ui` package is **i18n-agnostic**:
- All user-facing text passed as props (title, label, description)
- No translation dependencies in shared-ui
- Consumer apps translate before passing to components
- Default English text is acceptable for optional props

Example:
```typescript
// ✅ Good - Consumer translates
<PageHeader
  title={i18nStore.t("pageTitle")}
  subtitle={i18nStore.t("pageSubtitle")}
/>

// ❌ Bad - Hardcoded in shared-ui component
<h1>Performance Score</h1>
```

## Verification Checklist

Before submitting any PR:

- [ ] Run `pnpm run verify` - all checks pass
- [ ] Changes are minimal and surgical
- [ ] Tests added/updated for changed code
- [ ] No secrets or sensitive data committed
- [ ] PR title follows `[package-name] Description` format
- [ ] Changelog updated if user-facing changes
- [ ] No modifications to generated/build directories
- [ ] Code is self-explanatory without comments
