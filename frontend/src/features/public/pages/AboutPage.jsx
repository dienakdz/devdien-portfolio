import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Youtube,
  Linkedin,
  Github,
  Facebook,
  Mail,
  FileText,
  ArrowLeft,
  ArrowUpRight,
  Sun,
  Moon,
  Globe,
  HeartHandshake,
  Tv,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { siteConfig, getLocalizedName } from '../../../data/siteConfig';
import AboutGallery from '../../../components/AboutGallery';
import YouTubeShowcase from '../../../components/YouTubeShowcase';
import AboutTimeline from '../../../components/AboutTimeline';
import profileImg from '../../../assets/profile.jpg';

export default function AboutPage() {
  const { t, lang, setLang } = useLanguage();
  const page = t?.aboutPage || {};
  const localizedName = getLocalizedName(lang);

  // Independent theme state isolated from the main landing page
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('nmd_theme');
      return saved ? saved === 'dark' : true; // Default to dark mode
    } catch {
      return true;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('nmd_theme', next ? 'dark' : 'light');
      } catch {
        // Storage restricted
      }
      return next;
    });
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const socialLinks = [
    {
      name: 'YouTube @devdien',
      href: siteConfig.youtubeChannel,
      icon: Youtube,
      color: 'hover:text-red-500 hover:border-red-500/40',
      badge: 'YouTube',
    },
    {
      name: 'LinkedIn',
      href: siteConfig.linkedin,
      icon: Linkedin,
      color: 'hover:text-cyan-400 hover:border-cyan-400/40',
      badge: 'LinkedIn',
    },
    {
      name: 'GitHub',
      href: siteConfig.github,
      icon: Github,
      color: isDark ? 'hover:text-white hover:border-white/40' : 'hover:text-black hover:border-slate-400',
      badge: 'GitHub',
    },
    {
      name: 'Facebook',
      href: siteConfig.facebook,
      icon: Facebook,
      color: 'hover:text-blue-500 hover:border-blue-500/40',
      badge: 'Facebook',
    },
    {
      name: 'Email',
      href: siteConfig.emailHref,
      icon: Mail,
      color: 'hover:text-amber-500 hover:border-amber-500/40',
      badge: 'Email',
    },
  ];

  return (
    <div
      className={`min-h-screen antialiased transition-colors duration-300 selection:bg-amber-500/20 selection:text-amber-400 ${
        isDark ? 'bg-[#0b1118] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Navigation */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
          isDark
            ? 'border-white/5 bg-[#0b1118]/90 text-white'
            : 'border-slate-200 bg-white/90 text-slate-900 shadow-sm'
        }`}
      >
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 text-base font-bold tracking-tight transition ${
                isDark ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isDark ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-500/20 text-amber-600'
                }`}
              >
                <Tv size={18} />
              </div>
              <span className="font-outfit text-lg">DevDien</span>
            </Link>

            <nav
              className={`hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <Link to="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                Portfolio
              </Link>
              <a href="#story" className={isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'}>
                {lang === 'vi' ? 'Tiểu sử' : 'Story'}
              </a>
              <a href="#gallery" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                {lang === 'vi' ? 'Khoảnh khắc' : 'Moments'}
              </a>
              <a
                href="#youtube"
                className={`transition flex items-center gap-1 ${
                  isDark ? 'hover:text-white' : 'hover:text-slate-900'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                YouTube
              </a>
              <a href="#timeline" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                {lang === 'vi' ? 'Sự nghiệp' : 'Timeline'}
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                isDark
                  ? 'border border-white/10 bg-[#121922] text-slate-300 hover:border-amber-400'
                  : 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-amber-500'
              }`}
              aria-label="Toggle language"
            >
              <Globe size={13} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                isDark
                  ? 'border border-white/10 bg-[#121922] text-slate-400 hover:text-white'
                  : 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:text-amber-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              to="/"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                isDark
                  ? 'border border-white/10 bg-[#121922] text-slate-300 hover:text-white hover:border-white/20'
                  : 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:text-slate-900 hover:border-slate-400'
              }`}
            >
              <ArrowLeft size={14} />
              <span>{page.backToHome || 'Quay lại Portfolio'}</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="story"
          className={`relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b ${
            isDark ? 'border-white/5' : 'border-slate-200'
          }`}
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                {/* Verified Knowledge Entity Badge */}
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold backdrop-blur-sm ${
                    isDark
                      ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border border-emerald-500/40 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <ShieldCheck size={15} className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />
                  <span>{page.badge || 'Verified Entity • Hồ Sơ Định Danh Cá Nhân'}</span>
                </div>

                <h1
                  className={`mt-5 font-outfit text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {page.title || 'Nguyễn Minh Diện'}{' '}
                  <span
                    className={`font-light text-3xl sm:text-4xl ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`}
                  >
                    ({page.alias || 'DevDien'})
                  </span>
                </h1>

                <p
                  className={`mt-3 text-base font-semibold sm:text-lg ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Backend Developer at{' '}
                  <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    TMA Solutions
                  </span>{' '}
                  &amp; Content Creator{' '}
                  <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    @devdien
                  </span>
                </p>

                {/* Narrative Bio */}
                <div
                  className={`mt-6 space-y-4 text-sm leading-relaxed sm:text-base ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {page.bioParagraphs ? (
                    page.bioParagraphs.map((para, idx) => <p key={idx}>{para}</p>)
                  ) : (
                    <p>
                      Hi, tôi là Nguyễn Minh Diện (DevDien) — Backend Developer tại TMA Solutions và là người sáng lập kênh YouTube @devdien.
                    </p>
                  )}
                </div>

                {/* 4 Quick Stat Cards */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div
                    className={`rounded-xl p-3.5 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922]'
                        : 'border border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {page.stats?.roleLabel || 'Vị trí hiện tại'}
                    </p>
                    <p
                      className={`mt-1 text-xs font-bold sm:text-sm ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {page.stats?.roleValue || 'Backend Developer'}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl p-3.5 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922]'
                        : 'border border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {page.stats?.companyLabel || 'Nơi làm việc'}
                    </p>
                    <p
                      className={`mt-1 text-xs font-bold sm:text-sm ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {page.stats?.companyValue || 'TMA Solutions'}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl p-3.5 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922]'
                        : 'border border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {page.stats?.educationLabel || 'Học vấn'}
                    </p>
                    <p
                      className={`mt-1 text-xs font-bold sm:text-sm ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {page.stats?.educationValue || 'VKU (GPA 3.55)'}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl p-3.5 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922]'
                        : 'border border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {page.stats?.channelLabel || 'Kênh cộng đồng'}
                    </p>
                    <p className="mt-1 text-xs font-bold text-red-500 sm:text-sm">
                      {page.stats?.channelValue || 'YouTube @devdien'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#e5a93c] hover:bg-[#d9982b] px-6 py-2.5 text-sm font-bold text-black shadow-md transition-all hover:scale-105"
                  >
                    <FileText size={16} />
                    <span>{page.downloadCv || 'Mở CV Online'}</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href={siteConfig.youtubeSubscribeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <Youtube size={16} />
                    <span>{page.youtube?.subscribeBtn || 'Đăng ký @devdien'}</span>
                  </a>
                </div>

                {/* Verified Social Links */}
                <div
                  className={`mt-8 pt-6 border-t ${
                    isDark ? 'border-white/8' : 'border-slate-200'
                  }`}
                >
                  <p
                    className={`mb-3 text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {page.connect || 'Kết nối'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            isDark
                              ? 'border border-white/10 bg-[#121922] text-slate-300 hover:bg-white/5'
                              : 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50'
                          } ${social.color}`}
                          aria-label={social.name}
                        >
                          <Icon size={13} />
                          <span>{social.badge}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Natural Unconstrained Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <div className="relative mx-auto max-w-[360px] lg:max-w-[400px]">
                  <div
                    className={`overflow-hidden rounded-2xl shadow-2xl ${
                      isDark
                        ? 'border border-white/10 bg-[#121922]'
                        : 'border border-slate-200 bg-white shadow-xl'
                    }`}
                  >
                    <img
                      src={profileImg}
                      alt="Nguyễn Minh Diện (DevDien) - Backend Developer at TMA Solutions"
                      className="aspect-[3/4] w-full object-cover object-top"
                      fetchPriority="high"
                    />
                    <div
                      className={`p-4 text-center border-t ${
                        isDark
                          ? 'bg-[#0e1620] border-white/5'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {localizedName}
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Backend Developer • Content Creator
                      </p>
                      <div className="mt-2.5 flex items-center justify-center gap-2 text-xs text-emerald-500 font-medium">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Open to tech discussions &amp; collaboration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 1: KHOẢNH KHẮC & ĐỜI SỐNG (Bento Grid) */}
        <AboutGallery isDark={isDark} />

        {/* SECTION 2: KÊNH YOUTUBE @DEVDIEN (Clean & Focused Showcase) */}
        <YouTubeShowcase isDark={isDark} />

        {/* SECTION 3: DẤU ẤN NGHỀ NGHIỆP & HỌC VẤN (Detailed Milestone Timeline) */}
        <AboutTimeline isDark={isDark} />

        {/* SECTION 4: CTA LIÊN HỆ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div
              className={`rounded-2xl p-8 text-center sm:p-12 shadow-2xl ${
                isDark
                  ? 'border border-amber-500/20 bg-gradient-to-br from-[#121a24] via-[#101720] to-amber-500/5'
                  : 'border border-amber-500/30 bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 shadow-xl'
              }`}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-6 ${
                  isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-500/20 text-amber-700'
                }`}
              >
                <HeartHandshake size={28} />
              </div>
              <h2
                className={`font-outfit text-2xl font-black sm:text-3xl md:text-4xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {page.contactCta?.title || 'Bạn muốn kết nối hoặc hợp tác?'}
              </h2>
              <p
                className={`mt-4 mx-auto max-w-xl text-base leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {page.contactCta?.description ||
                  'Dù là một bài toán backend thú vị, một buổi chia sẻ cộng đồng hay lời chào làm quen, tôi luôn sẵn lòng trò chuyện.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#e5a93c] hover:bg-[#d9982b] px-6 py-3 text-sm font-bold text-black shadow-md transition-all hover:scale-105"
                >
                  <Mail size={16} />
                  <span>{page.contactCta?.button || 'Gửi tin nhắn cho tôi'}</span>
                </a>
                <Link
                  to="/"
                  className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                    isDark
                      ? 'border border-white/10 bg-[#121922] text-slate-300 hover:text-white hover:border-white/20'
                      : 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:text-slate-900 hover:border-slate-400'
                  }`}
                >
                  <ArrowLeft size={16} />
                  <span>{page.backToHome || 'Quay lại Portfolio'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-10 text-center text-xs transition-colors duration-300 ${
          isDark
            ? 'border-white/5 bg-[#080d14] text-slate-500'
            : 'border-slate-200 bg-slate-100 text-slate-600'
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4">
          <div
            className={`flex items-center justify-center gap-5 mb-4 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <a
              href={siteConfig.youtubeChannel}
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={siteConfig.emailHref}
              className="hover:text-amber-500 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <p className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            © {new Date().getFullYear()} {siteConfig.name} ({siteConfig.brand}) - All rights reserved
          </p>
          <p className={`mt-1 text-[11px] ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
            Official Personal Entity Page • Google Knowledge Graph &amp; Schema.org Profile
          </p>
        </div>
      </footer>
    </div>
  );
}
