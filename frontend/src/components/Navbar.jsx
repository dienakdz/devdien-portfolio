import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Globe,
  Menu,
  Moon,
  Send,
  Sun,
  Tv,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../data/siteConfig';

const Navbar = ({ theme: propTheme, toggleTheme: propToggleTheme }) => {
  const { lang, toggleLang } = useLanguage();
  const { theme: ctxTheme, toggleTheme: ctxToggleTheme } = useTheme();
  const theme = propTheme || ctxTheme;
  const toggleTheme = propToggleTheme || ctxToggleTheme;
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', href: '/' },
    { name: lang === 'vi' ? 'Về tôi' : 'About Me', href: '/about' },
    { name: lang === 'vi' ? 'Dự án' : 'Projects', href: '/projects' },
    { name: lang === 'vi' ? 'Liên hệ' : 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md transition-colors duration-200 dark:border-white/5 dark:bg-[#0b1118]/85">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* BRAND LOGO: Sleek & Clean */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-500 transition-transform group-hover:scale-105 dark:text-amber-400">
            <Tv size={16} />
          </div>
          <span className="font-outfit text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-amber-500">
            DevDien
          </span>
        </Link>

        {/* DESKTOP NAV LINKS: Airy, Text-based with subtle active indicator */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 py-1 ${
                  isActive
                    ? 'text-amber-500 dark:text-amber-400 font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: Minimalist & Sleek */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Switch Language (VI/EN)"
          >
            <Globe size={13} className="text-amber-500" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 transition-colors cursor-pointer dark:hover:bg-white/5"
            title="Toggle Dark/Light Mode"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Direct CTA */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm shadow-amber-500/10 active:scale-95"
          >
            <Send size={12} />
            <span>{lang === 'vi' ? 'Liên hệ' : 'Contact'}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground md:hidden hover:bg-black/5 dark:hover:bg-white/5"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="border-b border-border/80 bg-background/98 px-4 py-4 md:hidden dark:border-white/10 dark:bg-[#0b1118]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="mt-2 pt-3 border-t border-border/60 flex items-center justify-between dark:border-white/10">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500"
              >
                <span>{lang === 'vi' ? 'Mở CV trực tuyến' : 'Open Resume'}</span>
                <ArrowUpRight size={13} />
              </a>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="button-primary text-xs py-1.5 px-3"
              >
                {lang === 'vi' ? 'Gửi lời nhắn' : 'Contact'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
