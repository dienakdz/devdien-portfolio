import React from 'react';
import { Eye, MoveUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';

const Footer = () => {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  const footerStatus =
    lang === 'vi'
      ? 'Open cho backend role phù hợp và selected freelance work.'
      : 'Open to the right backend roles and selected freelance work.';
  const visitorLabel = lang === 'vi' ? 'Lượt truy cập' : 'Visitors';

  return (
    <footer className="px-6 pb-8 pt-4 md:px-10 lg:px-20 xl:px-24">
      <div className="container mx-auto">
        <div className="panel rounded-[30px] px-6 py-4 md:px-8 md:py-4">
          <div className="flex flex-col gap-3 text-sm text-muted-foreground/90 md:flex-row md:items-center md:justify-between">
            <p>{`${year} ${siteConfig.name}. All rights reserved.`}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end">
              <p>{footerStatus}</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-background/82 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-foreground/86 dark:bg-card/84">
                <Eye size={14} className="text-primary" />
                {visitorLabel}: 1
              </span>
              <a
                href="#hero"
                className="inline-flex items-center gap-2 font-semibold text-foreground/78 transition-colors duration-300 hover:text-primary"
              >
                {lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}
                <MoveUpRight size={16} className="text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
