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
  HeartHandshake,
  ServerCog,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { siteConfig, getLocalizedName } from '../../../data/siteConfig';
import AboutGallery from '../../../components/AboutGallery';
import YouTubeShowcase from '../../../components/YouTubeShowcase';
import AboutTimeline from '../../../components/AboutTimeline';
import profileImg from '../../../assets/profile.jpg';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function AboutPage({ theme, setTheme }) {
  const { t, lang, setLang } = useLanguage();
  const page = t?.aboutPage || {};
  const localizedName = getLocalizedName(lang);

  // Shared global theme state
  const isDark = theme ? theme === 'dark' : true;

  const toggleTheme = () => {
    if (setTheme) {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
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
      className={`min-h-screen antialiased transition-colors duration-200 selection:bg-amber-500/20 selection:text-amber-400 ${
        isDark ? 'bg-[#0b1118] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Global Navigation */}
      <Navbar theme={isDark ? 'dark' : 'light'} toggleTheme={toggleTheme} />

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
                  {/* Card 1: Role */}
                  <div
                    className={`rounded-xl p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922] hover:border-amber-500/30'
                        : 'border border-slate-200 bg-white shadow-sm hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <ServerCog size={13} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                      <p
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {page.stats?.roleLabel || 'Vị trí'}
                      </p>
                    </div>
                    <p
                      className={`mt-1.5 text-xs font-bold sm:text-sm ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {page.stats?.roleValue || 'Backend Developer'}
                    </p>
                  </div>

                  {/* Card 2: Company */}
                  <div
                    className={`rounded-xl p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922] hover:border-cyan-400/30'
                        : 'border border-slate-200 bg-white shadow-sm hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Building2 size={13} className="text-cyan-400" />
                      <p
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {page.stats?.companyLabel || 'Nơi làm việc'}
                      </p>
                    </div>
                    <p
                      className={`mt-1.5 text-xs font-bold sm:text-sm ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {page.stats?.companyValue || 'TMA Solutions'}
                    </p>
                  </div>

                  {/* Card 3: Education */}
                  <div
                    className={`rounded-xl p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922] hover:border-emerald-400/30'
                        : 'border border-slate-200 bg-white shadow-sm hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={13} className="text-emerald-400" />
                      <p
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {page.stats?.educationLabel || 'Học vấn'}
                      </p>
                    </div>
                    <p
                      className={`mt-1.5 text-xs font-bold sm:text-sm ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {page.stats?.educationValue || 'VKU (GPA 3.55)'}
                    </p>
                  </div>

                  {/* Card 4: YouTube */}
                  <div
                    className={`rounded-xl p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922] hover:border-red-400/30'
                        : 'border border-slate-200 bg-white shadow-sm hover:border-red-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Youtube size={13} className="text-red-500" />
                      <p
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {page.stats?.channelLabel || 'Kênh cộng đồng'}
                      </p>
                    </div>
                    <p className="mt-1.5 text-xs font-bold text-red-500 sm:text-sm">
                      {page.stats?.channelValue || 'YouTube @devdien'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <FileText size={16} />
                    <span>{page.downloadCv || 'Mở CV Online'}</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href={siteConfig.youtubeSubscribeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/20 transition-all active:scale-95"
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

              {/* Right Column: Cinematic Floating HUD Portrait (Mẫu 2) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <div className="relative mx-auto max-w-[360px] lg:max-w-[400px] pt-3 pb-3">
                  {/* Subtle Ambient Backlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-cyan-500/10 to-transparent blur-3xl opacity-75" />

                  {/* 1. Top-Right Floating Glass HUD Badge: TMA Solutions */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`absolute -top-1.5 right-3 sm:right-6 z-20 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-2xl backdrop-blur-md transition-colors ${
                      isDark
                        ? 'border border-white/15 bg-[#0b1118]/85 text-white'
                        : 'border border-slate-300 bg-white/90 text-slate-800 shadow-md'
                    }`}
                  >
                    <Building2 size={13} className="text-cyan-400 shrink-0" />
                    <span>TMA Solutions</span>
                    <span className={isDark ? 'text-slate-400 font-normal' : 'text-slate-500 font-normal'}>• Backend</span>
                  </motion.div>

                  {/* 2. Main Portrait Card */}
                  <div
                    className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-300 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922] hover:border-amber-500/30'
                        : 'border border-slate-200 bg-white shadow-xl hover:border-amber-500/40'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                      <img
                        src={profileImg}
                        alt="Nguyễn Minh Diện (DevDien) - Backend Developer at TMA Solutions"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        fetchPriority="high"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1620]/90 via-transparent to-transparent opacity-60" />

                      {/* Floating Status Pill inside photo bottom-right */}
                      <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-black/80 px-3 py-1 text-[11px] font-medium text-emerald-400 backdrop-blur-md shadow-lg">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Available for Collab</span>
                      </div>
                    </div>

                    {/* Bottom Caption Bar */}
                    <div
                      className={`p-3.5 text-center border-t ${
                        isDark ? 'bg-[#0e1620] border-white/5' : 'bg-slate-50 border-slate-200'
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
                        Backend Developer • Content Creator @devdien
                      </p>
                    </div>
                  </div>

                  {/* 3. Bottom-Left Floating Glass HUD Badge: VKU Honors */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`absolute -bottom-1.5 left-3 sm:left-6 z-20 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-2xl backdrop-blur-md transition-colors ${
                      isDark
                        ? 'border border-white/15 bg-[#0b1118]/85 text-white'
                        : 'border border-slate-300 bg-white/90 text-slate-800 shadow-md'
                    }`}
                  >
                    <GraduationCap size={14} className="text-amber-400 shrink-0" />
                    <span>VKU Honors</span>
                    <span className="font-mono text-amber-400 font-bold text-[11px]">• GPA 3.55</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 1: DẤU ẤN NGHỀ NGHIỆP & HỌC VẤN (Detailed Milestone Timeline) */}
        <AboutTimeline isDark={isDark} />

        {/* SECTION 2: KÊNH YOUTUBE @DEVDIEN (Clean & Focused Showcase) */}
        <YouTubeShowcase isDark={isDark} />

        {/* SECTION 3: KHOẢNH KHẮC & ĐỜI SỐNG (Bento Grid) */}
        <AboutGallery isDark={isDark} />

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
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Mail size={16} />
                  <span>{page.contactCta?.button || 'Gửi tin nhắn cho tôi'}</span>
                </a>
                <Link
                  to="/"
                  className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-95 ${
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
      <Footer />
    </div>
  );
}
