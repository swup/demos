// @ts-check

/**
 * Minimal static server using ES modules.
 * - Lists only visible (non-dot) directories if no index.html is present
 * - Serves static files directly
 *
 * Usage: node server.mjs
 */

import http from 'http';
import { readdir, stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { extname, join } from 'path';
import { parse } from 'url';

const port = 3000;

/**
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('http').ServerResponse} ServerResponse
 */

/**
 * Returns MIME type based on file extension.
 * @param {string} ext
 * @returns {string}
 */
function getMime(ext) {
  return {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
  }[ext] || 'application/octet-stream';
}

/**
 * Generates an HTML list of directory links.
 * @param {string[]} dirs
 * @param {string} baseUrl
 * @returns {string}
 */
function renderDirectoryList(dirs, baseUrl = '/') {
  const items = dirs.map(name => {
    const href = `${baseUrl}${name}/`.replace(/\/+/g, '/');
    return `<li><a href="${href}">${name}/</a></li>`;
  }).join('\n');

  return `<!DOCTYPE html>
  <html>
    <head><meta charset="utf-8"><title>Index of ${baseUrl}</title></head>
    <body>
      <h1>Index of ${baseUrl}</h1>
      <ul>${items}</ul>
    </body>
  </html>`;
}

/**
 * Handles static file serving and directory listing.
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const handler = async (req, res) => {
  const parsedUrl = parse(req.url || '/');
  const decodedPath = decodeURIComponent(parsedUrl.pathname || '/');
  const basePath = process.cwd();
  const fullPath = join(basePath, decodedPath);

  try {
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      const entries = await readdir(fullPath, { withFileTypes: true });

      const hasIndexHtml = entries.some(
        (entry) => entry.isFile() && entry.name.toLowerCase() === 'index.html'
      );

      if (hasIndexHtml) {
        const indexPath = join(fullPath, 'index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        createReadStream(indexPath).pipe(res);
        return;
      }

      const visibleDirs = entries
        .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
        .map((d) => d.name);

      const html = renderDirectoryList(
        visibleDirs,
        decodedPath.endsWith('/') ? decodedPath : decodedPath + '/'
      );
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }

    // Serve file directly
    const ext = extname(fullPath);
    res.writeHead(200, { 'Content-Type': getMime(ext) });
    createReadStream(fullPath).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
};

http.createServer(handler).listen(port, () => {
  console.log(`Serving ${process.cwd()} on http://localhost:${port}`);
});
