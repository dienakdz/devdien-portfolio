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

export const createStructuredData = (siteUrl = resolveSiteUrl(), pathname = '/') => {
  const isProfilePage =
    pathname === '/nguyen-minh-dien' ||
    pathname === '/about' ||
    pathname === '/ve-toi';

  const personImages = (siteConfig.entityImages || []).map((img) => buildAbsoluteUrl(img, siteUrl));
  if (siteConfig.ogImagePath) {
    personImages.unshift(buildAbsoluteUrl(siteConfig.ogImagePath, siteUrl));
  }

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: siteConfig.name,
      alternateName: siteConfig.brand,
      url: siteUrl,
      description: siteConfig.siteDescription,
      inLanguage: ['vi', 'en'],
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteConfig.name,
      alternateName: [siteConfig.nameEn, siteConfig.brand, 'dienne.dev', 'dienakdz'],
      jobTitle: siteConfig.role,
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.company,
        url: 'https://www.tmasolutions.com',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: siteConfig.alumniOf,
        alternateName: siteConfig.alumniOfEn,
      },
      description:
        'Nguyễn Minh Diện (DevDien) là Backend Developer tại TMA Solutions, tốt nghiệp Kỹ thuật Phần mềm VKU loại Giỏi, và là người sáng tạo nội dung tại kênh YouTube @devdien chia sẻ kiến thức backend, Python, FastAPI.',
      url: siteUrl,
      image: personImages,
      email: siteConfig.emailHref,
      homeLocation: {
        '@type': 'Place',
        name: siteConfig.location,
      },
      sameAs: siteConfig.sameAs,
      knowsAbout: [
        'Backend Engineering',
        'Python',
        'FastAPI',
        'API Design',
        'PostgreSQL',
        'Docker',
        'System Architecture',
        'Software Engineering',
      ],
    },
  ];

  if (isProfilePage) {
    graph.push({
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/nguyen-minh-dien#webpage`,
      url: `${siteUrl}/nguyen-minh-dien`,
      name: siteConfig.aboutTitleVi,
      description: siteConfig.aboutDescriptionVi,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#person`,
      },
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: buildAbsoluteUrl(siteConfig.entityImages[0], siteUrl),
      },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

export const publicSitemapEntries = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/nguyen-minh-dien',
    changefreq: 'weekly',
    priority: '0.9',
  },
];
