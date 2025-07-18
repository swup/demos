// @ts-check

/**
 * Generate an index.html file that links to all visible subdirectories
 * in the current working directory.
 *
 * Usage: node build.mjs
 */

import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * Gets visible (non-dot) directories in the current working directory.
 * @returns {Promise<string[]>}
 */
async function getVisibleDirectories() {
  const entries = await readdir(process.cwd(), { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => entry.name);
}

/**
 * Generates the HTML for the index file.
 * @param {string[]} dirs
 * @returns {string}
 */
function generateHtml(dirs) {
  const listItems = dirs.map(dir => {
    const href = `./${dir}/`;
    return `<li><h2><a href="${href}">${dir}</a></h2></li>`;
  }).join('\n');

  return /*html*/`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Demos: Index</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="layout">
    <header class="header">
      <a href="https://swup.js.org" target="_blank" class="logo">Swup Demo</a>
    </header>
    <main id="swup" class="transition-main">
      <h1>Demos</h1>
      <ul>
        ${listItems}
      </ul>
    </main>
  </div>
</body>
</html>`;
}

/**
 * Main function: generates and writes index.html
 */
async function main() {
  const dirs = await getVisibleDirectories();
  const html = generateHtml(dirs);
  const outPath = join(process.cwd(), 'index.html');

  await writeFile(outPath, html, 'utf8');
  console.log(`✅ index.html created with ${dirs.length} directories.`);
}

main().catch(err => {
  console.error('❌ Failed to build index.html:', err);
  process.exit(1);
});