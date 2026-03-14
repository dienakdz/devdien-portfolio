import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig.js';
import { buildAbsoluteUrl, createStructuredData, getDefaultSeo } from '../lib/seo.js';

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const ensureLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const ensureJsonLd = (schema) => {
  const selector = 'script[data-seo-schema="portfolio"]';
  let element = document.head.querySelector(selector);

  if (!schema) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.seoSchema = 'portfolio';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
};

const getRouteSeo = (pathname) => {
  const normalizedPath = pathname || '/';
  const isPrivateRoute = normalizedPath === '/login' || normalizedPath.startsWith('/admin');
  const canonicalUrl = buildAbsoluteUrl(normalizedPath);

  if (isPrivateRoute) {
    return {
      title: `${siteConfig.brand} Admin`,
      description: 'Private admin portal for managing portfolio data.',
      keywords: `${siteConfig.brand}, admin`,
      canonicalUrl,
      robots: 'noindex, nofollow, noarchive',
      schema: null,
    };
  }

  const defaultSeo = getDefaultSeo();

  return {
    ...defaultSeo,
    canonicalUrl,
    robots: 'index, follow, max-image-preview:large',
    schema: createStructuredData(defaultSeo.siteUrl),
  };
};

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(location.pathname);

    document.documentElement.lang = 'en';
    document.title = seo.title;

    ensureMeta('meta[name="description"]', { name: 'description', content: seo.description });
    ensureMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords });
    ensureMeta('meta[name="robots"]', { name: 'robots', content: seo.robots });
    ensureMeta('meta[name="googlebot"]', { name: 'googlebot', content: seo.robots });
    ensureMeta('meta[name="application-name"]', {
      name: 'application-name',
      content: siteConfig.name,
    });
    ensureMeta('meta[name="apple-mobile-web-app-title"]', {
      name: 'apple-mobile-web-app-title',
      content: siteConfig.name,
    });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.description,
    });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonicalUrl });
    ensureMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: siteConfig.name,
    });
    ensureMeta('meta[property="og:locale"]', { property: 'og:locale', content: siteConfig.locale });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: seo.description,
    });

    if (seo.imageUrl) {
      ensureMeta('meta[property="og:image"]', { property: 'og:image', content: seo.imageUrl });
      ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.imageUrl });
    }

    ensureLink('link[rel="canonical"]', { rel: 'canonical', href: seo.canonicalUrl });
    ensureLink('link[rel="icon"]', {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: 'any',
      href: '/favicon.svg',
    });
    ensureLink('link[rel="shortcut icon"]', {
      rel: 'shortcut icon',
      href: '/favicon.svg',
    });
    ensureJsonLd(seo.schema);
  }, [location.pathname]);

  return null;
}
