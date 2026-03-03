import fs from 'fs';
import path from 'path';

// A simple script to generate sitemap.xml for the Vite app
const baseUrl = 'https://devscript.me';

// We'll read the tools from the compiled/transpiled code or just use a regex on the source file
const toolsFile = fs.readFileSync(path.resolve('src/data/tools.ts'), 'utf-8');

// Extract tool IDs using regex
const idRegex = /id:\s*['"]([^'"]+)['"]/g;
const toolSlugs = [];
let match;
while ((match = idRegex.exec(toolsFile)) !== null) {
  toolSlugs.push(match[1]);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${toolSlugs.map(slug => `  <url>
    <loc>${baseUrl}/tools/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
