import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { siteConfig } from '../src/data/siteConfig.js';
import {
  buildAbsoluteUrl,
  createStructuredData,
  getDefaultSeo,
  publicSitemapEntries,
  resolveSiteUrl,
} from './seo.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const env = { ...loadEnv(mode, rootDir, ''), ...process.env };
const siteUrl = resolveSiteUrl(env);

// Generate image tags for Google Image Sitemap
const buildImageTags = () => {
  const images = siteConfig.entityImages || [];
  return images
    .map(
      (img) => `    <image:image>
      <image:loc>${buildAbsoluteUrl(img, siteUrl)}</image:loc>
      <image:title>Nguyễn Minh Diện (DevDien) - Kỹ sư Backend &amp; Content Creator</image:title>
      <image:caption>Hình ảnh hồ sơ thực tế của Nguyễn Minh Diện (DevDien) - Kỹ sư Backend tại TMA Solutions, Tốt nghiệp VKU</image:caption>
    </image:image>`,
    )
    .join('\n');
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${publicSitemapEntries
  .map((entry) => {
    const isProfile = entry.path === '/nguyen-minh-dien' || entry.path === '/about';
    const imageBlock = isProfile ? `\n${buildImageTags()}` : '';
    return `  <url>
    <loc>${buildAbsoluteUrl(entry.path, siteUrl)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${imageBlock}
  </url>`;
  })
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

// 1. Write sitemap and robots.txt
await Promise.all([
  writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8'),
]);

// 2. Pre-render static HTML for /nguyen-minh-dien and redirect for /about
try {
  const baseHtmlPath = path.join(distDir, 'index.html');
  const baseHtml = await readFile(baseHtmlPath, 'utf8');

  // Pre-rendered ProfilePage HTML
  const profileDir = path.join(distDir, 'nguyen-minh-dien');
  await mkdir(profileDir, { recursive: true });

  const profileStructuredData = JSON.stringify(createStructuredData(siteUrl, '/nguyen-minh-dien'));
  const profileCanonical = buildAbsoluteUrl('/nguyen-minh-dien', siteUrl);
  const profileImage = buildAbsoluteUrl(siteConfig.entityImages[0], siteUrl);

  let profileHtml = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${siteConfig.aboutTitleVi}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
      `<meta name="description" content="${siteConfig.aboutDescriptionVi}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
      `<meta property="og:title" content="${siteConfig.aboutTitleVi}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
      `<meta property="og:description" content="${siteConfig.aboutDescriptionVi}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
      `<meta property="og:url" content="${profileCanonical}" />`,
    )
    .replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/,
      `<meta property="og:image" content="${profileImage}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
      `<link rel="canonical" href="${profileCanonical}" />`,
    )
    .replace(
      /<script\s+type="application\/ld\+json"\s+data-seo-schema="portfolio">.*?<\/script>/s,
      `<script type="application/ld+json" data-seo-schema="portfolio">${profileStructuredData}</script>`,
    );

  await writeFile(path.join(profileDir, 'index.html'), profileHtml, 'utf8');
} catch (err) {
  console.warn('[seo] Could not pre-render static profile page:', err.message);
}

if (!env.VITE_SITE_URL) {
  console.warn(`[seo] VITE_SITE_URL is not set. Generated SEO assets with fallback origin: ${siteUrl}`);
}
