import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { siteConfig } from '../data/siteConfig';

const Navbar = ({ theme, toggleTheme }) => {
  const { lang, t, toggleLang } = useLanguage();
  const { showToast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionLinks = ['#focus', '#projects', '#experience', '#skills', '#contact'];
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;

      const marker = Math.max(112, window.innerHeight * 0.24);
      let nextActive = '';

      for (const href of sectionLinks) {
        const section = document.getElementById(href.slice(1));

        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();

        if (rect.top <= marker) {
          nextActive = href;
        }

        if (rect.top <= marker && rect.bottom >= marker) {
          nextActive = href;
          break;
        }
      }

      setActiveHref((current) => (current === nextActive ? current : nextActive));
    };

    const requestActiveUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', requestActiveUpdate, { passive: true });
    window.addEventListener('resize', requestActiveUpdate);
    window.addEventListener('hashchange', requestActiveUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', requestActiveUpdate);
      window.removeEventListener('resize', requestActiveUpdate);
      window.removeEventListener('hashchange', requestActiveUpdate);
    };
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#focus' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleThemeToggle = () => {
    toggleTheme();
    showToast(t.toasts.themeChanged, 'info');
  };

  const handleLangToggle = () => {
    toggleLang();
    showToast(lang === 'vi' ? 'English activated' : 'Đã kích hoạt Tiếng Việt', 'info');
  };

  const handleNavClick = (href) => {
    setActiveHref(href);
    setIsOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <motion.div
        className="fixed left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        style={{ scaleX }}
      />

      <div
        className={`mx-auto max-w-7xl rounded-[28px] border px-4 py-3 transition-all duration-300 md:px-5 ${
          scrolled
            ? 'border-border/90 bg-background/82 shadow-[0_28px_90px_-48px_rgba(3,11,16,0.5)] backdrop-blur-2xl dark:bg-[#08141d]/82'
            : 'border-white/12 bg-background/62 backdrop-blur-xl dark:border-white/8 dark:bg-[#07121a]/62'
        }`}
      >
        <div className="flex items-center gap-4">
          <a href="#hero" onClick={() => setActiveHref('')} className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-primary/30 bg-primary/14 text-sm font-black tracking-[0.2em] text-primary">
              DD
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black uppercase tracking-[0.25em] text-foreground">
                {siteConfig.brand}
              </p>
              <p className="truncate text-xs text-muted-foreground/90">
                {siteConfig.role}
              </p>
            </div>
          </a>

          <div className="hidden xl:flex flex-1 justify-center">
            <div className="nav-pill-shell inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/64 px-2 py-2 dark:bg-card/86">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                  >
                    {isActive ? <motion.span layoutId="navbar-active-pill" className="nav-link__pill" /> : null}
                    <span className="nav-link__label">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="ml-auto hidden lg:flex items-center gap-2">
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="button-secondary px-4 py-2 text-xs"
            >
              {t.nav.resume}
              <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/90 bg-background/84 text-foreground/88 transition-colors hover:bg-background dark:bg-card/88 dark:hover:bg-card"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              type="button"
              onClick={handleLangToggle}
              aria-label="Toggle language"
              className="rounded-full border border-border/90 bg-background/84 px-4 py-3 text-xs font-black uppercase tracking-[0.24em] text-foreground/88 transition-colors hover:bg-background dark:bg-card/88 dark:hover:bg-card"
            >
              {lang === 'vi' ? 'EN' : 'VI'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-border/90 bg-background/84 text-foreground/88 transition-colors hover:bg-background lg:hidden dark:bg-card/88 dark:hover:bg-card"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-7xl lg:hidden"
          >
            <div className="panel overflow-hidden p-4">
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={activeHref === link.href ? 'page' : undefined}
                    className={`mobile-nav-link ${activeHref === link.href ? 'mobile-nav-link--active' : ''}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="button-primary w-full text-xs"
                >
                  {t.nav.resume}
                  <ArrowUpRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="button-secondary w-full text-xs"
                >
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                  {theme === 'light' ? 'Dark' : 'Light'}
                </button>
                <button
                  type="button"
                  onClick={handleLangToggle}
                  className="button-secondary w-full text-xs"
                >
                  {lang === 'vi' ? 'English' : 'Tiếng Việt'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
