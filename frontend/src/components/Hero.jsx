import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Facebook,
  Github,
  Linkedin,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  Tv,
  Youtube,
} from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedName, siteConfig } from '../data/siteConfig';

const Hero = () => {
  const { t, lang } = useLanguage();
  const localizedName = getLocalizedName(lang);

  const quickLinks = [
    {
      href: siteConfig.github,
      label: 'GitHub',
      icon: Github,
      color: 'hover:text-white hover:border-white/30',
      badge: '20+ repos',
    },
    {
      href: siteConfig.linkedin,
      label: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:text-cyan-400 hover:border-cyan-400/40',
    },
    {
      href: siteConfig.youtubeChannel,
      label: 'YouTube',
      icon: Youtube,
      color: 'hover:text-red-400 hover:border-red-400/40',
      badge: '@devdien',
    },
    {
      href: siteConfig.emailHref,
      label: 'Email',
      icon: Mail,
      color: 'hover:text-amber-400 hover:border-amber-400/40',
    },
    {
      href: siteConfig.facebook,
      label: 'Facebook',
      icon: Facebook,
      color: 'hover:text-blue-400 hover:border-blue-400/40',
    },
  ];

  const highlights = [
    'Python / FastAPI',
    'PostgreSQL & Redis',
    'Docker & CI/CD',
    'Microservices Architecture',
    'AI & RAG Workflows',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Subtle top divider line */}
      <div className="pointer-events-none absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      {/* Atmospheric ambient glows */}
      <div
        className="pointer-events-none absolute left-[5%] top-[12%] -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[140px] dark:bg-amber-500/8"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[18%] -z-10 h-96 w-96 rounded-full bg-blue-500/8 blur-[160px] dark:bg-slate-700/20"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-12">
          
          {/* LEFT COLUMN: Main Pitch & Authority */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7 xl:col-span-7"
          >
            {/* Google Knowledge Graph Verified Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="tracking-wide">VERIFIED KNOWLEDGE ENTITY</span>
              <span className="hidden sm:inline text-emerald-500/50">•</span>
              <span className="font-mono text-[11px] text-emerald-600/90 dark:text-emerald-300/80">
                kg:/g/11vsvs7f0_
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              <span>{localizedName}</span>{' '}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                (DevDien)
              </span>
            </h1>

            {/* Role Title */}
            <p className="mt-3 font-outfit text-xl sm:text-2xl font-bold tracking-tight text-foreground/90">
              {lang === 'vi'
                ? 'Backend Engineer • Thiết Kế Kiến Trúc Hệ Thống & APIs'
                : 'Backend Engineer • System Architecture & Production APIs'}
            </p>

            {/* Core Description */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {lang === 'vi'
                ? 'Chuyên thiết kế và xây dựng các hệ thống backend chịu tải cao, API sạch chuẩn OpenAPI, luồng dữ liệu nhất quán và tự động hóa quy trình triển khai với Docker & CI/CD.'
                : 'Designing and building high-throughput backend architectures, clean OpenAPI services, robust transactional data flows, and automated cloud deployments with Docker & CI/CD.'}
            </p>

            {/* Tech Badges Row */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-semibold text-foreground/85 backdrop-blur-md dark:border-white/8 dark:bg-card/70"
                >
                  <Code2 size={13} className="text-amber-500" />
                  {item}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#contact"
                className="button-primary inline-flex items-center gap-2"
              >
                <span>{lang === 'vi' ? 'Liên hệ ngay' : 'Get in Touch'}</span>
                <Send size={16} />
              </a>

              <Link
                to="/about"
                className="button-secondary inline-flex items-center gap-2 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:border-amber-400"
              >
                <ShieldCheck size={17} />
                <span>{lang === 'vi' ? 'Tiểu sử chi tiết' : 'Full Biography'}</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="button-secondary inline-flex items-center gap-1.5"
              >
                <span>{t.hero.btnResume}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Social channels row */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-border/60 dark:border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                {lang === 'vi' ? 'Kênh kết nối:' : 'Connect:'}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-all ${item.color} dark:border-white/10 dark:bg-card/60`}
                    >
                      <Icon size={14} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Profile & Credibility Showcase Bento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="lg:col-span-5 xl:col-span-5"
          >
            <div className="relative mx-auto max-w-[420px] rounded-[32px] border border-amber-500/20 bg-card/90 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#121922] dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.85)]">
              {/* Subtle top indicator bar */}
              <div className="flex items-center justify-between px-2 pb-3 border-b border-border/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {lang === 'vi' ? 'Sẵn sàng nhận dự án mới' : 'Available for opportunities'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>HN, Vietnam</span>
                </div>
              </div>

              {/* Portrait Container */}
              <div className="relative mt-3 overflow-hidden rounded-[24px] aspect-[4/4.6] bg-slate-950">
                <img
                  src={profileImg}
                  alt={`${localizedName} (DevDien) backend developer portrait`}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                
                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating pill: Creator badge */}
                <div className="absolute top-3.5 left-3.5">
                  <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/70 px-3 py-1 text-[11px] font-bold text-red-200 backdrop-blur-md">
                    <Tv size={12} className="text-red-400" />
                    <span>YouTube @devdien</span>
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center gap-2">
                    <h2 className="font-outfit text-2xl font-bold tracking-tight text-white">
                      {localizedName}
                    </h2>
                    <span className="rounded-md border border-amber-400/40 bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 backdrop-blur-md">
                      DevDien
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-white/80 line-clamp-2">
                    {lang === 'vi'
                      ? 'Kỹ sư phần mềm tập trung vào Backend, API độ trễ thấp và chia sẻ kiến thức cộng đồng.'
                      : 'Software engineer specializing in Backend, low-latency APIs, and tech content creation.'}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between border-t border-white/15 pt-3">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition-colors shadow-sm"
                    >
                      <span>{lang === 'vi' ? 'Xem Profile đầy đủ' : 'View Full Profile'}</span>
                      <ArrowRight size={13} />
                    </Link>
                    <span className="text-[11px] font-mono text-white/70">
                      Python • FastAPI • Go
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 High-Impact Metric Cards beneath photo */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-border/80 bg-background/60 p-2.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                  <p className="font-outfit text-lg font-extrabold text-amber-500 dark:text-amber-400">
                    3+ Năm
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {lang === 'vi' ? 'Kinh nghiệm' : 'Experience'}
                  </p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-2.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                  <p className="font-outfit text-lg font-extrabold text-foreground">
                    20+ Repos
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {lang === 'vi' ? 'Mã nguồn mở' : 'Open Source'}
                  </p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/60 p-2.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                  <p className="font-outfit text-lg font-extrabold text-emerald-500">
                    &lt;15ms
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    P99 Latency
                  </p>
                </div>
              </div>

              {/* Mini Architecture Terminal Tagline */}
              <div className="mt-3 flex items-center justify-between rounded-xl border border-border/70 bg-background/40 px-3 py-2 text-[11px] font-mono text-muted-foreground dark:border-white/5 dark:bg-black/30">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FastAPI + PostgreSQL + Docker</span>
                </div>
                <span className="text-[10px] text-amber-500 font-bold">READY</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
