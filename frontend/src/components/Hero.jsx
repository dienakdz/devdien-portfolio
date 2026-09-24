import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedName, siteConfig } from '../data/siteConfig';

const Hero = () => {
  const { t, lang } = useLanguage();
  const localizedName = getLocalizedName(lang);
  const quickLinks = [
    {
      href: siteConfig.emailHref,
      label: 'Email',
      icon: Mail,
    },
    {
      href: siteConfig.linkedin,
      label: 'LinkedIn',
      icon: Linkedin,
      external: true,
    },
    {
      href: siteConfig.github,
      label: 'GitHub',
      icon: Github,
      external: true,
    },
  ];
  const detailCards = [
    {
      label: t.hero.focusLabel,
      value: t.hero.focusValue,
    },
    {
      label: t.hero.opportunityLabel,
      value: t.hero.opportunityValue,
    },
    {
      label: t.hero.noteLabel,
      value: t.hero.noteValue,
    },
  ];
  return (
    <section
      id="hero"
      className="section-padding relative min-h-screen overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[7.75rem] h-px bg-gradient-to-r from-transparent via-primary/42 to-transparent md:top-[9.25rem]" />
      <div className="pointer-events-none absolute left-[6%] top-[10%] -z-10 h-72 w-72 rounded-full bg-primary/12 blur-[150px]" />
      <div className="pointer-events-none absolute right-[8%] top-[14%] -z-10 h-80 w-80 rounded-full bg-[#b7d0dc]/12 blur-[160px] dark:bg-[#2b6674]/18" />

      <div className="container mx-auto relative">
        <div className="grid gap-12 xl:min-h-[calc(100vh-12rem)] xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] xl:items-center xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-10 bg-primary/55" />
              {t.hero.badge}
            </div>

            <h1 className="mt-6 font-outfit text-[clamp(2.8rem,6.5vw,5.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-foreground">
              <span className="block">
                {t.hero.title1} <span className="text-gradient">{t.hero.title2}</span>
              </span>
              <span className="mt-3 block text-[0.46em] font-medium leading-[1.25] tracking-normal text-foreground/88">
                {t.hero.title3}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="button-primary"
              >
                {t.hero.btnContact}
                <ArrowRight size={18} />
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {t.hero.btnResume}
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              {quickLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/78 transition-colors duration-300 hover:text-primary"
                  >
                    <Icon size={16} className="text-primary" />
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {detailCards.map((item, index) => (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 + index * 0.08 }}
                  className="content-plane rounded-2xl p-5"
                >
                  <p className="section-kicker">{item.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.value}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[420px] xl:justify-self-end"
          >
            <div className="pointer-events-none absolute -right-6 top-8 hidden h-56 w-56 rounded-full bg-primary/15 blur-[90px] xl:block" />
            <div className="pointer-events-none absolute -left-8 bottom-6 hidden h-52 w-52 rounded-full bg-cyan-500/10 blur-[90px] xl:block" />

            <div className="relative overflow-hidden rounded-[30px] border border-white/14 bg-card/65 p-3.5 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-primary/30 dark:border-white/10 dark:bg-[#0c1622]/75 dark:shadow-[0_24px_70px_-20px_rgba(0,0,0,0.7)]">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-foreground/85">
                    {siteConfig.company}
                  </span>
                </div>

                <Link
                  to="/nguyen-minh-dien"
                  className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-primary hover:text-primary dark:bg-white/5"
                  aria-label="Xem hồ sơ định danh"
                >
                  <span>{t.nav.aboutMe || 'Về tôi'}</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Portrait Image Container */}
              <div className="relative mt-2 overflow-hidden rounded-[22px] bg-slate-900 aspect-[4/5]">
                <img
                  src={profileImg}
                  alt={`${localizedName} (DevDien) backend developer portrait`}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
                
                {/* Natural dark vignette for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Bottom Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center gap-2">
                    <p className="font-outfit text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">
                      {localizedName}
                    </p>
                    <span className="rounded-md border border-white/20 bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-md">
                      DevDien
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                    {t.hero.profileTagline}
                  </p>

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-3">
                    <Link
                      to="/nguyen-minh-dien"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow transition hover:bg-slate-100"
                    >
                      <span>{lang === 'vi' ? 'Tiểu sử & Sự nghiệp' : 'Story & Bio'}</span>
                      <ArrowRight size={13} />
                    </Link>

                    <span className="text-[11px] font-medium text-white/70">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
