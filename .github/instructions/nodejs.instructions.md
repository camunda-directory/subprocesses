---
description: "NodeJS development standards and best practices"
applyTo: "**/*.js, **/*.ts"
---

# Node.js Development Instructions

## Core Standards

- **TypeScript**: ES2022 features, strict mode
- **Modules**: ESM only (`type: "module"`)
- **Async**: async/await (use `node:util` promisify to avoid callbacks)
- **Imports**: Node.js built-in modules preferred (`node:fs`, `node:path`, etc.)
- **Nullability**: Never use `null`, use `undefined` for optional values
- **Structure**: Prefer functions over classes

## Code Examples

**Good Async Pattern:**
```typescript
import { readFile } from "node:fs/promises"

async function loadConfig(path: string): Promise<Config> {
  const content = await readFile(path, "utf-8")
  return JSON.parse(content)
}
```

**Good Error Handling:**
```typescript
async function processData(input: string): Promise<Result | undefined> {
  try {
    const data = await fetchData(input)
    return transformData(data)
  } catch (error) {
    console.error("Failed to process data:", error)
    return undefined
  }
}
```

## Dependencies

- Ask before adding external dependencies
- Prefer Node.js built-ins when available
- Keep code simple and maintainable
