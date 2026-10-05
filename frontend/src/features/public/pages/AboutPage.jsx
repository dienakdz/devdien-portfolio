import React from 'react';
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
import { useTheme } from '../../../context/ThemeContext';
import { siteConfig, getLocalizedName } from '../../../data/siteConfig';
import AboutGallery from '../../../components/AboutGallery';
import YouTubeShowcase from '../../../components/YouTubeShowcase';
import AboutTimeline from '../../../components/AboutTimeline';
import profileImg from '../../../assets/profile.jpg';

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const { isDark } = useTheme();
  const page = t?.aboutPage || {};
  const localizedName = getLocalizedName(lang);

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
    <>
      {/* HERO SECTION */}
        <section
          id="story"
          className={`relative pt-10 pb-16 md:pt-16 md:pb-20 overflow-hidden border-b ${
            isDark ? 'border-white/5' : 'border-slate-200'
          }`}
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 min-w-0"
              >
                {/* Verified Developer Badge */}
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium backdrop-blur-sm ${
                    isDark
                      ? 'border border-amber-500/25 bg-amber-500/10 text-amber-300'
                      : 'border border-amber-500/40 bg-amber-50 text-amber-800'
                  }`}
                >
                  <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                  <span>Verified Developer</span>
                </div>

                {/* Name & Title */}
                <h1
                  className={`mt-4 font-outfit text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {page.title || 'Nguyen Minh Dien'}{' '}
                  <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>
                    ({page.alias || 'DevDien'})
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  className={`mt-2 text-lg sm:text-xl font-medium ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {lang === 'vi'
                    ? 'Backend Developer & Tech Creator'
                    : 'Backend Developer & Tech Creator'}
                </p>

                {/* Narrative Bio (Condensed, Crisp & Punchy) */}
                <p
                  className={`mt-4 text-sm sm:text-base leading-relaxed max-w-2xl ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {lang === 'vi'
                    ? 'Kỹ sư Backend chuyên thiết kế hệ thống phân tán, kiến trúc microservices và hạ tầng cloud-native có độ sẵn sàng cao. Đam mê xây dựng sản phẩm tin cậy và lan tỏa kinh nghiệm thực chiến tới cộng đồng kỹ thuật.'
                    : 'Passionate Backend Engineer specializing in scalable distributed systems, microservices architecture, and cloud solutions. Dedicated to building reliable software products and sharing practical insights with the developer community.'}
                </p>

                {/* Quick Stats Cards */}
                <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {/* Card 1: Role */}
                  <div
                    className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-amber-500/35 bg-[#121922] shadow-[0_2px_12px_rgba(245,158,11,0.06)] hover:border-amber-500/60 hover:bg-[#151e2a]'
                        : 'border border-amber-500/40 bg-white shadow-sm hover:border-amber-500'
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-2">
                      <ServerCog size={16} />
                    </div>
                    <p
                      className={`text-[11px] font-semibold ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {lang === 'vi' ? 'Vị trí' : 'Role'}
                    </p>
                    <p
                      className={`mt-0.5 text-xs sm:text-sm font-bold truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Backend Dev
                    </p>
                  </div>

                  {/* Card 2: Company */}
                  <div
                    className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922] hover:border-cyan-400/40 hover:bg-[#151e2a]'
                        : 'border border-slate-200 bg-white shadow-sm hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-2">
                      <Building2 size={16} />
                    </div>
                    <p
                      className={`text-[11px] font-semibold ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {lang === 'vi' ? 'Công ty' : 'Company'}
                    </p>
                    <p
                      className={`mt-0.5 text-xs sm:text-sm font-bold truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      TMA Solutions
                    </p>
                  </div>

                  {/* Card 3: Education */}
                  <div
                    className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-white/10 bg-[#121922] hover:border-emerald-400/40 hover:bg-[#151e2a]'
                        : 'border border-slate-200 bg-white shadow-sm hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-2">
                      <GraduationCap size={16} />
                    </div>
                    <p
                      className={`text-[11px] font-semibold ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {lang === 'vi' ? 'Học vấn' : 'Education'}
                    </p>
                    <p
                      className={`mt-0.5 text-xs sm:text-sm font-bold truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      VKU • 3.55 GPA
                    </p>
                  </div>

                  {/* Card 4: YouTube */}
                  <div
                    className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-200 ${
                      isDark
                        ? 'border border-red-500/25 bg-[#121922] hover:border-red-400/50 hover:bg-[#151e2a]'
                        : 'border border-slate-200 bg-white shadow-sm hover:border-red-500/50'
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-2">
                      <Youtube size={16} />
                    </div>
                    <p
                      className={`text-[11px] font-semibold ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {lang === 'vi' ? 'Kênh YouTube' : 'YouTube'}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-bold text-red-400 truncate">
                      @devdien
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.35)] transition-all hover:scale-105 active:scale-95"
                  >
                    <FileText size={16} />
                    <span>{page.downloadCv || 'Download CV'}</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href={siteConfig.youtubeSubscribeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-[#160e10] hover:bg-red-950/40 px-6 py-3 text-sm font-semibold text-red-300 hover:border-red-500/70 transition-all active:scale-95"
                  >
                    <Youtube size={16} className="text-red-500 fill-current" />
                    <span>{lang === 'vi' ? 'Xem Kênh @devdien' : 'Watch Tech Content'}</span>
                  </a>
                </div>

                {/* Minimalist Social Links Row */}
                <div className="mt-7 flex items-center gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                          isDark
                            ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                        } ${social.color}`}
                        aria-label={social.name}
                        title={social.name}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right Column: Portrait Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5 min-w-0"
              >
                <div className="group relative mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] py-4">
                  {/* Radial Ambient Lighting */}
                  <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-gradient-to-tr from-amber-500/25 via-amber-600/10 to-transparent blur-3xl opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />

                  {/* 1. Top-Right Floating Glass HUD Badge: TMA Solutions */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`absolute -top-1.5 right-2 sm:right-6 z-20 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 ${
                      isDark
                        ? 'border border-slate-700/80 bg-[#121922]/95 text-white shadow-black/70 group-hover:border-cyan-400/40'
                        : 'border border-slate-300 bg-white/95 text-slate-800 shadow-md group-hover:border-cyan-500/50'
                    }`}
                  >
                    <Building2 size={14} className="text-cyan-400 shrink-0" />
                    <span>TMA Solutions</span>
                    <span className={isDark ? 'text-slate-400 font-normal' : 'text-slate-500 font-normal'}>• Backend</span>
                  </motion.div>

                  {/* 2. Main Portrait Card Container */}
                  <div
                    className={`relative overflow-hidden rounded-[30px] sm:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(245,158,11,0.2)] transition-all duration-500 group-hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_-5px_rgba(245,158,11,0.35)] cursor-pointer ${
                      isDark
                        ? 'border border-slate-700/70 bg-[#121922] group-hover:border-amber-500/50'
                        : 'border border-slate-300 bg-white shadow-xl group-hover:border-amber-500/50'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                      <img
                        src={profileImg}
                        alt="Nguyễn Minh Diện (DevDien) - Backend Developer at TMA Solutions"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        fetchPriority="high"
                        decoding="async"
                      />
                      {/* Subtle Bottom Ambient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

                      {/* Floating Live Status Pill inside photo bottom-right */}
                      <div className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-950/85 px-3.5 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-xl shadow-xl transition-transform duration-300 group-hover:scale-105">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Available for Collab</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Bottom-Left Floating Glass HUD Badge: VKU Honors */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`absolute -bottom-1.5 left-2 sm:left-6 z-20 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:translate-y-1 ${
                      isDark
                        ? 'border border-slate-700/80 bg-[#121922]/95 text-white shadow-black/70 group-hover:border-amber-500/40'
                        : 'border border-slate-300 bg-white/95 text-slate-800 shadow-md group-hover:border-amber-500/50'
                    }`}
                  >
                    <GraduationCap size={15} className="text-amber-400 shrink-0" />
                    <span>VKU Honors</span>
                    <span className="font-mono text-amber-400 font-bold text-xs">• GPA 3.55</span>
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
    </>
  );
}
