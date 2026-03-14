import { siteConfig } from '../data/siteConfig.js';

const DEFAULT_SITE_URL = 'http://localhost:5173';

export const normalizeSiteUrl = (value) => {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const baseValue = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    return new URL(baseValue).toString().replace(/\/$/, '');
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const getRuntimeSiteUrl = () => {
  if (import.meta.env.VITE_SITE_URL) {
    return normalizeSiteUrl(import.meta.env.VITE_SITE_URL);
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return normalizeSiteUrl(window.location.origin);
  }

  return DEFAULT_SITE_URL;
};

export const buildAbsoluteUrl = (pathname = '/', siteUrl = getRuntimeSiteUrl()) =>
  new URL(pathname, `${siteUrl}/`).toString();

export const getDefaultSeo = (siteUrl = getRuntimeSiteUrl()) => ({
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  keywords: siteConfig.keywords.join(', '),
  imageUrl: buildAbsoluteUrl(siteConfig.ogImagePath, siteUrl),
  siteUrl,
});

export const createStructuredData = (siteUrl = getRuntimeSiteUrl()) => ({
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
