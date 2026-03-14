export const siteConfig = {
  name: 'Nguyễn Minh Diện',
  nameEn: 'Nguyen Minh Dien',
  brand: 'DevDien',
  role: 'Backend Developer',
  company: 'TMA Solutions',
  location: 'Quy Nhon, Viet Nam',
  email: 'minhdien.dev@gmail.com',
  phone: '+84 967 468 703',
  emailHref: 'mailto:minhdien.dev@gmail.com',
  phoneHref: 'tel:+84967468703',
  github: 'https://github.com/dienakdz',
  portfolioRepo: 'https://github.com/dienakdz/devdien-portfolio',
  linkedin: 'https://www.linkedin.com/in/devdien/',
  facebook: 'https://www.facebook.com/dienne.dev',
  youtube: 'https://www.youtube.com/@devdien',
  sameAs: [
    'https://github.com/dienakdz',
    'https://www.linkedin.com/in/devdien/',
    'https://www.facebook.com/dienne.dev',
    'https://www.youtube.com/@devdien',
  ],
  profileUrl: 'https://www.linkedin.com/in/devdien/',
  resumeUrl: 'https://www.linkedin.com/in/devdien/',
  siteTitle: 'Nguyễn Minh Diện (DevDien) | Backend Developer',
  siteDescription:
    'Nguyễn Minh Diện (DevDien) is a Backend Developer specializing in Python, FastAPI, scalable APIs, and production-ready systems.',
  keywords: [
    'Nguyễn Minh Diện',
    'Nguyen Minh Dien',
    'DevDien',
    'Backend Developer',
    'Python',
    'FastAPI',
    'API Design',
    'Portfolio',
    'TMA Solutions',
  ],
  locale: 'en_US',
  ogImagePath: '/og-preview.jpg',
};

export const getLocalizedName = (lang = 'en') =>
  lang === 'vi' ? siteConfig.name : siteConfig.nameEn;
