import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { buildAbsoluteUrl, publicSitemapEntries, resolveSiteUrl } from './seo.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const env = { ...loadEnv(mode, rootDir, ''), ...process.env };
const siteUrl = resolveSiteUrl(env);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicSitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${buildAbsoluteUrl(entry.path, siteUrl)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /login
Disallow: /admin
Disallow: /admin/

Sitemap: ${buildAbsoluteUrl('/sitemap.xml', siteUrl)}
`;

await mkdir(distDir, { recursive: true });
await Promise.all([
  writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8'),
]);

if (!env.VITE_SITE_URL) {
  console.warn(`[seo] VITE_SITE_URL is not set. Generated SEO assets with fallback origin: ${siteUrl}`);
}
