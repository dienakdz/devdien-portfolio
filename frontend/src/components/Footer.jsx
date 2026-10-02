import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Eye,
  Github,
  Linkedin,
  Mail,
  MoveUp,
  Tv,
  Youtube,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedName, siteConfig } from '../data/siteConfig';
import { apiUrl } from '../lib/api';

const Footer = () => {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState(null);
  const localizedName = getLocalizedName(lang);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSummary = async () => {
      try {
        const response = await fetch(apiUrl('/api/visits/summary'), {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const data = await response.json();
        const nextCount =
          data?.uniqueVisitors > 0 ? data.uniqueVisitors : data?.totalVisits ?? null;
        setVisitorCount(nextCount);
      } catch {
        // Non-critical metric
      }
    };

    fetchSummary();
    const handleVisitRecorded = () => fetchSummary();
    window.addEventListener('visit-recorded', handleVisitRecorded);

    return () => {
      controller.abort();
      window.removeEventListener('visit-recorded', handleVisitRecorded);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-border/80 bg-card/60 transition-colors duration-200 dark:border-white/8 dark:bg-[#080d13]">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-500 dark:text-amber-400">
                <Tv size={16} />
              </div>
              <span className="font-outfit text-lg font-bold text-foreground">
                DevDien
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {lang === 'vi'
                ? 'Kỹ sư phần mềm chuyên về Backend Systems, API Architecture, giải pháp dữ liệu và chia sẻ kiến thức cộng đồng.'
                : 'Software engineer specializing in Backend Systems, high-throughput APIs, data engineering, and tech content creation.'}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {lang === 'vi' ? 'Sẵn sàng nhận cơ hội mới' : 'Available for opportunities'}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <p className="font-outfit text-xs font-bold uppercase tracking-wider text-foreground">
              {lang === 'vi' ? 'Điều hướng' : 'Navigation'}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">
                  {lang === 'vi' ? 'Trang chủ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/nguyen-minh-dien" className="hover:text-amber-500 transition-colors">
                  {lang === 'vi' ? 'Về tôi (Tiểu sử)' : 'About Me (Story)'}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-500 transition-colors">
                  {lang === 'vi' ? 'Dự án nổi bật' : 'Selected Projects'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-500 transition-colors">
                  {lang === 'vi' ? 'Liên hệ & Hợp tác' : 'Contact & Inquiries'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div>
            <p className="font-outfit text-xs font-bold uppercase tracking-wider text-foreground">
              {lang === 'vi' ? 'Kênh kết nối' : 'Connect'}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Github size={15} />
                  <span>GitHub @dienakdz</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.youtubeChannel}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <Youtube size={15} />
                  <span>YouTube @devdien</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-500 transition-colors"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-center gap-2 hover:text-amber-500 transition-colors"
                >
                  <Mail size={15} />
                  <span>minhdien.dev@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row dark:border-white/8">
          <p>© {year} {localizedName}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] font-mono dark:border-white/10 dark:bg-[#121922]">
              <Eye size={13} className="text-amber-500" />
              <span>{lang === 'vi' ? 'Lượt xem' : 'Views'}: {visitorCount ?? '--'}</span>
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-amber-500 transition-colors cursor-pointer"
            >
              <span>{lang === 'vi' ? 'Đầu trang' : 'Top'}</span>
              <MoveUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
