import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { siteConfig } from '../src/data/siteConfig.js';
import {
  buildAbsoluteUrl,
  createStructuredData,
  getRouteSeo,
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
const buildAboutImageTags = () => {
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

const buildProjectImageTags = () => {
  const images = siteConfig.projectImages || [];
  return images
    .map(
      (img) => `    <image:image>
      <image:loc>${buildAbsoluteUrl(img.loc, siteUrl)}</image:loc>
      <image:title>${img.title.replaceAll('&', '&amp;')}</image:title>
      <image:caption>${img.caption.replaceAll('&', '&amp;')}</image:caption>
    </image:image>`,
    )
    .join('\n');
};

const buildHomeImageTags = () => {
  const avatar = siteConfig.profileImagePath || siteConfig.entityImages?.[0] || '/og-preview.jpg';
  const heroCover = '/images/about/nguyen-minh-dien-lifestyle-travel.webp';
  return `    <image:image>
      <image:loc>${buildAbsoluteUrl(avatar, siteUrl)}</image:loc>
      <image:title>Nguyễn Minh Diện (DevDien) - Kỹ sư Backend &amp; Kiến trúc Hệ thống</image:title>
      <image:caption>Chân dung chính thức của Nguyễn Minh Diện (DevDien) - Kỹ sư Backend tại TMA Solutions, Tốt nghiệp Kỹ thuật Phần mềm VKU</image:caption>
    </image:image>
    <image:image>
      <image:loc>${buildAbsoluteUrl(heroCover, siteUrl)}</image:loc>
      <image:title>Nguyễn Minh Diện (DevDien) - Ảnh Bìa Trang Chủ</image:title>
      <image:caption>Hình ảnh Nguyễn Minh Diện (DevDien) - Kỹ sư Backend đam mê công nghệ và khám phá</image:caption>
    </image:image>`;
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${publicSitemapEntries
  .map((entry) => {
    let imageBlock = '';
    if (entry.path === '/about') {
      imageBlock = `\n${buildAboutImageTags()}`;
    } else if (entry.path === '/projects') {
      imageBlock = `\n${buildProjectImageTags()}`;
    } else if (entry.path === '/') {
      imageBlock = `\n${buildHomeImageTags()}`;
    }
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

// 2. Pre-render static HTML for all public sub-routes: /about, /projects, /contact
const staticRoutes = [
  {
    path: '/about',
    heading: 'Nguyễn Minh Diện (DevDien) | Tiểu Sử & Quá Trình Làm Việc',
    summary:
      'Hồ sơ chi tiết về Nguyễn Minh Diện (DevDien) - Kỹ sư Backend tại TMA Solutions, Tốt nghiệp Kỹ thuật Phần mềm VKU loại Giỏi, người sáng tạo nội dung kênh YouTube @devdien.',
  },
  {
    path: '/projects',
    heading: 'Dự Án Kỹ Thuật Backend & Kiến Trúc Hệ Thống | Nguyễn Minh Diện (DevDien)',
    summary:
      'Tổng hợp các dự án kỹ thuật backend tiêu biểu của Nguyễn Minh Diện (DevDien): RESTful APIs FastAPI, hạ tầng Docker multi-container, mô hình cơ sở dữ liệu EAV và thương mại điện tử tích hợp vận chuyển.',
  },
  {
    path: '/contact',
    heading: 'Liên Hệ & Kết Nối Trực Tiếp | Nguyễn Minh Diện (DevDien)',
    summary:
      'Kênh liên hệ trực tiếp với Nguyễn Minh Diện (DevDien) qua Email minhdien.dev@gmail.com, GitHub, LinkedIn và biểu mẫu nhắn tin.',
  },
];

try {
  const baseHtmlPath = path.join(distDir, 'index.html');
  const baseHtml = await readFile(baseHtmlPath, 'utf8');

  for (const route of staticRoutes) {
    const targetDir = path.join(distDir, route.path.slice(1));
    await mkdir(targetDir, { recursive: true });

    const seo = getRouteSeo(route.path, siteUrl);
    const structuredData = JSON.stringify(createStructuredData(siteUrl, route.path));

    let noscriptContent = `<noscript>\n    <section style="padding: 2rem; font-family: system-ui, sans-serif; color: #061119;">\n      <h1>${route.heading}</h1>\n      <p>${route.summary}</p>\n      <p>Truy cập portfolio với JavaScript được bật để có trải nghiệm đầy đủ.</p>`;

    if (route.path === '/about') {
      const images = siteConfig.entityImages || [];
      const imageFigures = images
        .map(
          (img) =>
            `\n      <figure style="margin-bottom: 1.5rem;">\n        <img src="${buildAbsoluteUrl(img, siteUrl)}" alt="Nguyễn Minh Diện (DevDien) - Kỹ sư Backend tại TMA Solutions, Tốt nghiệp VKU" loading="lazy" decoding="async" style="max-width: 100%; height: auto;" />\n        <figcaption>Hình ảnh hồ sơ thực tế của Nguyễn Minh Diện (DevDien) - Kỹ sư Backend tại TMA Solutions, Tốt nghiệp VKU</figcaption>\n      </figure>`,
        )
        .join('');
      noscriptContent += `\n      <div style="margin-top: 1.5rem;">${imageFigures}\n      </div>`;
    }

    if (route.path === '/projects') {
      const projectImgs = siteConfig.projectImages || [];
      const imageFigures = projectImgs
        .map(
          (img) =>
            `\n      <figure style="margin-bottom: 1.5rem;">\n        <img src="${buildAbsoluteUrl(img.loc, siteUrl)}" alt="${img.title}" loading="lazy" decoding="async" style="max-width: 100%; height: auto;" />\n        <figcaption style="font-weight: 600; margin-top: 0.5rem;">${img.title}</figcaption>\n        <p style="font-size: 0.875rem; color: #4b5563;">${img.caption}</p>\n      </figure>`,
        )
        .join('');
      noscriptContent += `\n      <div style="margin-top: 1.5rem;">${imageFigures}\n      </div>`;
    }

    noscriptContent += `\n    </section>\n  </noscript>`;

    let html = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
        `<meta name="description" content="${seo.description}" />`,
      )
      .replace(
        /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/,
        `<meta name="keywords" content="${seo.keywords}" />`,
      )
      .replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
        `<meta property="og:title" content="${seo.title}" />`,
      )
      .replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
        `<meta property="og:description" content="${seo.description}" />`,
      )
      .replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
        `<meta property="og:url" content="${seo.canonicalUrl}" />`,
      )
      .replace(
        /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/,
        `<meta property="og:image" content="${seo.imageUrl}" />`,
      )
      .replace(
        /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
        `<meta name="twitter:title" content="${seo.title}" />`,
      )
      .replace(
        /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
        `<meta name="twitter:description" content="${seo.description}" />`,
      )
      .replace(
        /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/,
        `<meta name="twitter:image" content="${seo.imageUrl}" />`,
      )
      .replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
        `<link rel="canonical" href="${seo.canonicalUrl}" />`,
      )
      .replace(
        /<script\s+type="application\/ld\+json"\s+data-seo-schema="portfolio">.*?<\/script>/s,
        `<script type="application/ld+json" data-seo-schema="portfolio">${structuredData}</script>`,
      )
      .replace(/<noscript>.*?<\/noscript>/s, noscriptContent);

    await writeFile(path.join(targetDir, 'index.html'), html, 'utf8');
    console.log(`[seo] Pre-rendered static HTML for route: ${route.path}`);
  }

  const homeAvatar = siteConfig.profileImagePath || siteConfig.entityImages?.[0] || '/og-preview.jpg';
  const homeNoscript = `<noscript>\n    <section style="padding: 2rem; font-family: system-ui, sans-serif; color: #061119;">\n      <h1>Nguyễn Minh Diện (DevDien) | Backend Developer</h1>\n      <p>Backend Developer focused on Python, FastAPI, API design, and scalable product systems.</p>\n      <figure style="margin-top: 1.5rem;">\n        <img src="${buildAbsoluteUrl(homeAvatar, siteUrl)}" alt="Nguyễn Minh Diện (DevDien) - Kỹ sư Backend" loading="eager" decoding="async" style="max-width: 280px; height: auto; border-radius: 12px;" />\n        <figcaption style="margin-top: 0.5rem; font-weight: 600;">Nguyễn Minh Diện (DevDien) - Kỹ sư Backend tại TMA Solutions, Tốt nghiệp VKU</figcaption>\n      </figure>\n      <p style="margin-top: 1rem;">Truy cập portfolio với JavaScript được bật để có trải nghiệm đầy đủ.</p>\n    </section>\n  </noscript>`;

  const updatedBaseHtml = baseHtml.replace(/<noscript>.*?<\/noscript>/s, homeNoscript);
  await writeFile(baseHtmlPath, updatedBaseHtml, 'utf8');
  console.log('[seo] Enhanced static noscript for root: /');
} catch (err) {
  console.warn('[seo] Could not pre-render static pages:', err.message);
}

if (!env.VITE_SITE_URL) {
  console.warn(`[seo] VITE_SITE_URL is not set. Generated SEO assets with fallback origin: ${siteUrl}`);
}
