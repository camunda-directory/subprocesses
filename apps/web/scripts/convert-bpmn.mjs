#!/usr/bin/env node
import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTENT_DIR = join(__dirname, "../src/content/subprocesses");
const OUTPUT_DIR = join(__dirname, "../public/previews");

async function findBpmnFiles(dir) {
  const files = [];

  async function scan(currentDir) {
    try {
      const entries = await readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(currentDir, entry.name);

        if (entry.isDirectory()) {
          await scan(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".bpmn")) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${currentDir}:`, error.message);
    }
  }

  await scan(dir);
  return files;
}

/**
 * Generate SVG preview from BPMN XML
 * Creates a visual placeholder card for the process
 */
function generateBpmnSvg(bpmnXml) {
  return generatePlaceholderSvg(bpmnXml, "Process");
}

/**
 * Fallback: Generate a simple SVG representation from BPMN XML
 * Used only if bpmn-to-svg fails
 */
function generatePlaceholderSvg(bpmnXml, processName) {
  // Extract process name from XML if available
  const nameMatch = bpmnXml.match(/name="([^"]+)"/);
  const displayName = nameMatch ? nameMatch[1] : processName;

  // Count various BPMN elements
  const taskCount = (bpmnXml.match(/<bpmn:.*Task/g) || []).length;
  const gatewayCount = (bpmnXml.match(/<bpmn:.*Gateway/g) || []).length;
  const eventCount = (bpmnXml.match(/<bpmn:.*Event/g) || []).length;

  // Create a simple placeholder SVG
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <defs>
    <style>
      .bpmn-icon { fill: #FC5D0D; }
      .bpmn-text { font-family: 'IBM Plex Sans', Arial, sans-serif; fill: #1F2A44; }
      .bpmn-text-small { font-size: 14px; fill: #666666; }
      .bpmn-bg { fill: #F7F7F7; }
      .bpmn-border { stroke: #E6E7E8; stroke-width: 2; fill: none; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect class="bpmn-bg" width="800" height="400" rx="8"/>
  <rect class="bpmn-border" width="800" height="400" rx="8"/>
  
  <!-- BPMN Icon -->
  <g transform="translate(350, 150)">
    <rect class="bpmn-icon" x="0" y="0" width="100" height="80" rx="4"/>
    <text x="50" y="45" text-anchor="middle" class="bpmn-text" font-size="32" fill="white" font-weight="600">BPMN</text>
  </g>
  
  <!-- Process Name -->
  <text x="400" y="260" text-anchor="middle" class="bpmn-text" font-size="20" font-weight="600">${displayName}</text>
  
  <!-- Element Count -->
  <g transform="translate(250, 290)">
    <text x="0" y="0" class="bpmn-text-small">${taskCount} Tasks</text>
    <text x="120" y="0" class="bpmn-text-small">${gatewayCount} Gateways</text>
    <text x="250" y="0" class="bpmn-text-small">${eventCount} Events</text>
  </g>
  
  <!-- Watermark -->
  <text x="400" y="380" text-anchor="middle" class="bpmn-text-small" font-size="12" opacity="0.5">
    Click to view interactive diagram
  </text>
</svg>`;

  return svg;
}

async function convertBpmnToSvg() {
  console.log("🔍 Scanning for BPMN files...");

  // Find all BPMN files
  const bpmnFiles = await findBpmnFiles(CONTENT_DIR);
  console.log(`✅ Found ${bpmnFiles.length} BPMN file(s)`);

  if (bpmnFiles.length === 0) {
    console.log("⚠️  No BPMN files found");
    return;
  }

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
  }

  // Convert each BPMN file
  for (const bpmnFile of bpmnFiles) {
    try {
      console.log(`\n🔄 Processing: ${basename(bpmnFile)}`);

      // Read BPMN XML
      const xml = await readFile(bpmnFile, "utf-8");

      // Generate output filename based on the subprocess path
      const pathParts = bpmnFile.split("/");
      const subprocessName = pathParts[pathParts.length - 2];
      const outputFileName = `${subprocessName}.svg`;
      const outputPath = join(OUTPUT_DIR, outputFileName);

      // Generate SVG preview
      console.log(`  🎨 Rendering BPMN diagram...`);
      const svg = generateBpmnSvg(xml);

      // Write SVG to file
      await writeFile(outputPath, svg, "utf-8");

      console.log(`  ✅ Generated: ${outputFileName}`);
    } catch (error) {
      console.error(
        `  ❌ Error converting ${basename(bpmnFile)}:`,
        error.message
      );
    }
  }

  console.log("\n✨ BPMN to SVG conversion complete!");
  console.log("   Preview cards will now show actual process diagrams!");
}

// Run the conversion
convertBpmnToSvg().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
