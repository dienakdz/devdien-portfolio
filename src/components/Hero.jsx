import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';

const Hero = () => {
  const { t } = useLanguage();
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
        <div className="grid gap-12 xl:min-h-[calc(100vh-12rem)] xl:grid-cols-[minmax(0,1.04fr)_minmax(380px,0.96fr)] xl:items-center xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-3xl"
          >
            <div className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="h-px w-14 bg-primary/55" />
              {t.hero.badge}
            </div>

            <h1 className="mt-8 max-w-[11ch] font-outfit text-[clamp(3.8rem,8vw,6.4rem)] leading-[0.88] tracking-[-0.07em] text-foreground">
              <span className="block text-balance">
                {t.hero.title1} <span className="text-gradient">{t.hero.title2}</span>
              </span>
              <span className="mt-4 block max-w-[12ch] text-[0.46em] leading-[1.08] tracking-[-0.04em] text-foreground/94">
                {t.hero.title3}
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-[1.08rem]">
              {t.hero.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
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

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {detailCards.map((item, index) => (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 + index * 0.08 }}
                  className="content-plane rounded-[24px] p-5 md:p-6"
                >
                  <p className="section-kicker">{item.label}</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.value}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[36rem] xl:justify-self-end"
          >
            <div className="pointer-events-none absolute -right-4 top-10 hidden h-48 w-48 rounded-full bg-primary/10 blur-[90px] xl:block" />
            <div className="pointer-events-none absolute -left-6 bottom-8 hidden h-44 w-44 rounded-full bg-[#d5e3ea]/12 blur-[90px] xl:block dark:bg-[#275565]/14" />

            <div className="panel-strong rounded-[34px] p-4 sm:p-5">
              <div className="content-plane-strong rounded-[30px] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <div>
                    <p className="section-kicker">{siteConfig.brand}</p>
                    <p className="mt-2 text-lg font-black tracking-[-0.04em]">{siteConfig.name}</p>
                  </div>

                  <a
                    href={siteConfig.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary px-4 py-2 text-xs"
                    aria-label="Open online profile"
                  >
                    {t.nav.profile}
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="mt-4 overflow-hidden rounded-[26px] border border-white/8 bg-[#08131b]">
                  <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-white/68">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffb36b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffd17a]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#63d0be]" />
                    </div>
                    <span>{siteConfig.role}</span>
                  </div>

                  <div className="relative">
                    <img
                      src={profileImg}
                      alt="Nguyen Minh Dien (DevDien) backend developer portrait"
                      fetchPriority="high"
                      className="aspect-[4/5] w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,19,0.02)_10%,rgba(5,13,19,0.22)_48%,rgba(5,13,19,0.94)_100%)]" />

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary">
                        {siteConfig.brand}
                      </p>
                      <div className="mt-3">
                        <p className="text-3xl font-black tracking-[-0.05em] text-white md:text-[2.25rem]">
                          {siteConfig.name}
                        </p>
                        <p className="mt-2 max-w-[22rem] text-sm leading-6 text-white/78">
                          {t.hero.profileTagline}
                        </p>
                      </div>
                    </div>
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
