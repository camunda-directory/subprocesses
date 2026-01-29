# BPMN Subprocess Content

## Important: Content Source

This directory contains BPMN subprocess content that is **built into the static site at build time**. 

### How Content Works

1. **Build Time Loading**: Astro Content Collections load all processes from this directory during `pnpm run build`
2. **Static Site Generation**: Each process gets a pre-rendered static HTML page
3. **No Runtime Fetching**: The app does NOT fetch content from GitHub at runtime - it's already baked into the HTML

### Adding New Processes

**Option 1: Direct PR to This Repository**
1. Fork `urbanisierung/subprocess-directory` 
2. Add your process to `apps/web/src/content/subprocesses/en/{process-name}/`
3. Include `data.json` and `process.bpmn`
4. Submit PR to this repository
5. After merge, site rebuilds automatically

**Option 2: Submit to Public Content Repository (Recommended)**
1. Submit processes to `camunda-directory/subprocesses` (the public content repository)
2. Content from that repository should be synced to this build repository
3. Site rebuilds with new content

### Content Structure

```
en/
  your-process-name/
    data.json       # Metadata (title, description, tags, complexity, author, published)
    process.bpmn    # BPMN XML diagram
```

### Syncing Content

If you've added content to `camunda-directory/subprocesses` but it's not appearing:
- The content needs to be synced/copied to this repository's content directory
- Consider setting up automated syncing via GitHub Actions
- Or manually copy/sync the content folders between repositories

### Schema

See `apps/web/src/content/config.ts` for the data.json schema requirements.
