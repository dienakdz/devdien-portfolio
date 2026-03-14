import { siteConfig } from '../src/data/siteConfig.js';

const DEFAULT_SITE_URL = 'http://localhost:5173';

const withProtocol = (value) => (/^https?:\/\//i.test(value) ? value : `https://${value}`);

export const normalizeSiteUrl = (value = DEFAULT_SITE_URL) => {
  try {
    return new URL(withProtocol(value)).toString().replace(/\/$/, '');
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const resolveSiteUrl = (env = process.env) => {
  const candidate =
    env.VITE_SITE_URL ||
    env.VERCEL_PROJECT_PRODUCTION_URL ||
    env.VERCEL_URL ||
    DEFAULT_SITE_URL;

  return normalizeSiteUrl(candidate);
};

export const buildAbsoluteUrl = (pathname = '/', siteUrl = resolveSiteUrl()) =>
  new URL(pathname, `${siteUrl}/`).toString();

export const getDefaultSeo = (siteUrl = resolveSiteUrl()) => ({
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  keywords: siteConfig.keywords.join(', '),
  imageUrl: buildAbsoluteUrl(siteConfig.ogImagePath, siteUrl),
  siteUrl,
});

export const createStructuredData = (siteUrl = resolveSiteUrl()) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: siteConfig.name,
      alternateName: siteConfig.brand,
      url: siteUrl,
      description: siteConfig.siteDescription,
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      name: siteConfig.name,
      alternateName: siteConfig.brand,
      jobTitle: siteConfig.role,
      description: 'Backend Developer specializing in Python, FastAPI, API design, and scalable backend systems.',
      url: siteUrl,
      image: buildAbsoluteUrl(siteConfig.ogImagePath, siteUrl),
      email: siteConfig.emailHref,
      homeLocation: {
        '@type': 'Place',
        name: siteConfig.location,
      },
      sameAs: siteConfig.sameAs,
    },
  ],
});

export const publicSitemapEntries = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
];
