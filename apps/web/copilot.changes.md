# Changes Made

## Fix: Add missing tslib dependency

- Added `tslib` as a dependency in [apps/web/package.json](package.json)
- Reasoning: The build was failing because `react-remove-scroll` (a transitive dependency of `cmdk` used for the CommandPalette component) requires `tslib` but it wasn't being resolved by Vite/Rollup during the build process
- This is a common issue with pnpm's strict dependency resolution - transitive dependencies that aren't properly declared need to be explicitly added

## Fix: Remove non-existent bpmn-to-svg package

- Removed `bpmn-to-svg` from devDependencies in [apps/web/package.json](package.json)
- Updated [apps/web/scripts/convert-bpmn.mjs](scripts/convert-bpmn.mjs) to use the placeholder SVG generator directly
- Reasoning: The `bpmn-to-svg` package does not exist on npm (404 error). The script already had a working fallback `generatePlaceholderSvg` function that creates a visual preview card for BPMN processes
