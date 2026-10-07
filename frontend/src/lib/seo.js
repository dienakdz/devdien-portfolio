import { siteConfig } from '../data/siteConfig.js';

const DEFAULT_SITE_URL = 'https://www.devdien.site';

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
  canonicalUrl: buildAbsoluteUrl('/', siteUrl),
  siteUrl,
  robots: 'index, follow, max-image-preview:large',
});

export const getRouteSeo = (pathname = '/', siteUrl = getRuntimeSiteUrl()) => {
  const normalizedPath = pathname || '/';
  const isPrivateRoute = normalizedPath === '/login' || normalizedPath.startsWith('/admin');
  const canonicalUrl = buildAbsoluteUrl(normalizedPath, siteUrl);

  if (isPrivateRoute) {
    return {
      title: `${siteConfig.brand} Admin`,
      description: 'Private admin portal for managing portfolio data.',
      keywords: `${siteConfig.brand}, admin`,
      canonicalUrl,
      imageUrl: buildAbsoluteUrl(siteConfig.ogImagePath, siteUrl),
      robots: 'noindex, nofollow, noarchive',
      schema: null,
      siteUrl,
    };
  }

  const defaultSeo = getDefaultSeo(siteUrl);

  if (normalizedPath === '/about') {
    return {
      title: siteConfig.aboutTitleVi,
      description: siteConfig.aboutDescriptionVi,
      keywords: `${siteConfig.keywords.join(', ')}, Tiểu sử Nguyễn Minh Diện, Quá trình làm việc Nguyễn Minh Diện, YouTube devdien, TMA Solutions, VKU`,
      canonicalUrl,
      imageUrl: buildAbsoluteUrl(siteConfig.entityImages[0], siteUrl),
      robots: 'index, follow, max-image-preview:large',
      schema: createStructuredData(siteUrl, '/about'),
      siteUrl,
    };
  }

  if (normalizedPath === '/projects') {
    return {
      title: siteConfig.projectsTitleVi,
      description: siteConfig.projectsDescriptionVi,
      keywords: `${siteConfig.keywords.join(', ')}, Dự án Backend Python FastAPI, Kiến trúc hệ thống microservices, Docker DevOps Labs, EAV Model MySQL, Veggie Logistics GHN`,
      canonicalUrl,
      imageUrl: buildAbsoluteUrl(siteConfig.projectImages[0].loc, siteUrl),
      robots: 'index, follow, max-image-preview:large',
      schema: createStructuredData(siteUrl, '/projects'),
      siteUrl,
    };
  }

  if (normalizedPath === '/contact') {
    return {
      title: siteConfig.contactTitleVi,
      description: siteConfig.contactDescriptionVi,
      keywords: `${siteConfig.keywords.join(', ')}, Liên hệ Nguyễn Minh Diện, Tuyển dụng Backend Developer, Kết nối DevDien, Email minhdien.dev@gmail.com`,
      canonicalUrl,
      imageUrl: buildAbsoluteUrl(siteConfig.ogImagePath, siteUrl),
      robots: 'index, follow, max-image-preview:large',
      schema: createStructuredData(siteUrl, '/contact'),
      siteUrl,
    };
  }

  return {
    ...defaultSeo,
    canonicalUrl,
    robots: 'index, follow, max-image-preview:large',
    schema: createStructuredData(siteUrl, normalizedPath),
  };
};

export const createStructuredData = (siteUrl = getRuntimeSiteUrl(), pathname = '/') => {
  const isProfilePage = pathname === '/about';
  const isProjectsPage = pathname === '/projects';
  const isContactPage = pathname === '/contact';

  const personImages = (siteConfig.entityImages || []).map((img) => buildAbsoluteUrl(img, siteUrl));
  if (siteConfig.ogImagePath) {
    personImages.unshift(buildAbsoluteUrl(siteConfig.ogImagePath, siteUrl));
  }

  const personEntity = {
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
  };

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
    personEntity,
  ];

  if (isProfilePage) {
    graph.push({
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/about#webpage`,
      url: `${siteUrl}/about`,
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

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About Me',
          item: `${siteUrl}/about`,
        },
      ],
    });
  }

  if (isProjectsPage) {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/projects#webpage`,
      url: `${siteUrl}/projects`,
      name: siteConfig.projectsTitleVi,
      description: siteConfig.projectsDescriptionVi,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#person`,
      },
    });

    graph.push({
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: 'FastAPI Book Management API',
            description:
              'RESTful API chuẩn Clean Architecture với FastAPI, PostgreSQL async, SQLAlchemy ORM, phân quyền JWT.',
            codeRepository: 'https://github.com/dienakdz/fastapi-book-management-api',
            programmingLanguage: 'Python',
            image: [
              buildAbsoluteUrl('/images/projects/fastapi-architecture.webp', siteUrl),
              buildAbsoluteUrl('/images/projects/fastapi-book.webp', siteUrl),
            ],
            author: { '@id': `${siteUrl}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareSourceCode',
            name: 'AWS DevOps Foundations Labs',
            description:
              'Bộ lab thực hành DevOps chuẩn hóa kết nối Docker Compose, cụm microservices, Kubernetes manifests và Terraform AWS.',
            codeRepository: 'https://github.com/dienakdz/devops-foundations-labs',
            programmingLanguage: 'Shell / Docker',
            image: buildAbsoluteUrl('/images/projects/devops-foundations-labs.webp', siteUrl),
            author: { '@id': `${siteUrl}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareSourceCode',
            name: 'Veggie Organic E-Commerce & GHN Logistics',
            description:
              'Nền tảng thương mại điện tử thực phẩm sạch với tích hợp giao vận Giao Hàng Nhanh (GHN API), quản lý state machine đơn hàng.',
            codeRepository: 'https://github.com/dienakdz/veggie',
            programmingLanguage: 'PHP / Laravel',
            image: [
              buildAbsoluteUrl('/images/projects/veggie-architecture.webp', siteUrl),
              buildAbsoluteUrl('/images/projects/veggie.webp', siteUrl),
            ],
            author: { '@id': `${siteUrl}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareSourceCode',
            name: 'Car Showroom & Dynamic EAV Inventory System',
            description:
              'Mô hình cơ sở dữ liệu quan hệ EAV phân cấp (Makes/Models/Trims) lưu trữ thuộc tính xe động và trạng thái kho xe.',
            programmingLanguage: 'SQL / PHP',
            image: [
              buildAbsoluteUrl('/images/projects/car-showroom-architecture.webp', siteUrl),
              buildAbsoluteUrl('/images/projects/car-showroom.webp', siteUrl),
            ],
            author: { '@id': `${siteUrl}/#person` },
          },
        },
      ],
    });

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${siteUrl}/projects`,
        },
      ],
    });
  }

  if (isContactPage) {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${siteUrl}/contact#webpage`,
      url: `${siteUrl}/contact`,
      name: siteConfig.contactTitleVi,
      description: siteConfig.contactDescriptionVi,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    });

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: `${siteUrl}/contact`,
        },
      ],
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};
