---
applyTo: "**"
---

# shadcn/ui & i18n Instructions

## shadcn/ui Components

**Always fetch latest docs:** https://ui.shadcn.com/docs

- shadcn components are installed as source code (read, modify, extend directly)
- Check official docs for current install commands and usage patterns
- Follow accessibility and composition best practices from docs

## i18n Pattern (shared-ui package)

The `shared-ui` package is **i18n-agnostic**:

✅ **DO**:
- Accept all user-facing text as props (title, label, description)
- Let consumer apps handle translation
- Provide clear prop names

❌ **DON'T**:
- Import translation libraries in shared-ui
- Implement translation logic in components
- Hardcode English strings (except in examples/stories)

**Example:**
```typescript
// ✅ Good - Consumer translates
<PageHeader
  title={i18nStore.t("pageTitle")}
  subtitle={i18nStore.t("pageSubtitle")}
/>

// ❌ Bad - Hardcoded in shared-ui
function MetricsCard() {
  return <h3>Performance Score</h3>
}

// ✅ Good - Text as prop
interface MetricsCardProps {
  title: string
  value: number
}
```
