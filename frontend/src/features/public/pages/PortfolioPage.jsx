import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Database,
  Github,
  Linkedin,
  Mail,
  ServerCog,
  ShieldCheck,
  Sparkles,
  User,
  Youtube,
} from 'lucide-react';
import heroCover from '../../../assets/optimized/hero-cover.webp';
import { useLanguage } from '../../../context/LanguageContext';
import { getLocalizedName, siteConfig } from '../../../data/siteConfig';
import { projectData } from '../../../data/projectData';
import { careerData } from '../../../data/careerData';

export default function PortfolioPage() {
  const { lang } = useLanguage();
  const localizedName = getLocalizedName(lang);
  const projects = projectData[lang] || projectData.en;
  const carProject = projects.find((p) => p.id === 'car-showroom') || projects[0];
  const veggieProject = projects.find((p) => p.id === 'veggie-logistics') || projects[1];
  const fastapiProject = projects.find((p) => p.id === 'fastapi-book') || projects[2];
  const careerItems = careerData[lang] || careerData.en;

  return (
    <>
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Wide Ambient Bleed Layout) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20 border-b border-border/60 dark:border-white/5 bg-background transition-colors duration-200">
          
          {/* Ambient Horizontal Photo (Cinematic Bleed across both Light & Dark modes) */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[48%] xl:w-[45%] pointer-events-none overflow-hidden select-none">
            <img
              src={heroCover}
              alt={localizedName}
              className="h-full w-full object-cover object-[center_35%] lg:object-[86%_center] filter brightness-[0.98] dark:brightness-[0.93] contrast-[1.03] saturate-[0.98] transition-all duration-700"
            />
            <div className="absolute inset-y-0 left-0 w-44 sm:w-64 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/75 to-transparent dark:from-[#0b1118] dark:via-[#0b1118]/75 dark:to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f8fafc]/90 via-[#f8fafc]/40 to-transparent dark:from-[#0b1118]/90 dark:via-[#0b1118]/40 dark:to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f8fafc]/90 via-[#f8fafc]/60 to-transparent dark:from-[#0b1118]/90 dark:via-[#0b1118]/60 dark:to-transparent" />
            <div className="absolute inset-0 bg-[#f8fafc]/88 dark:bg-[#0b1118]/88 lg:hidden" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:gap-12 lg:grid-cols-12 lg:items-center min-h-[500px]">
              
              {/* Left Column: ~60% Width — Intro, Core Pillars, Metrics & CTAs */}
              <div className="lg:col-span-7">
                
                {/* Verified Knowledge Entity Badge & Google Graph ID & Experience Badge */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck size={14} />
                    <span>VERIFIED KNOWLEDGE ENTITY</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
                    <span>3+ {lang === 'vi' ? 'Năm Kinh Nghiệm' : 'Years Experience'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-muted-foreground">
                    <span>Google Graph:</span>
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      kg:/g/11vsvs7f0_
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="mt-6 font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                  <span>{localizedName}</span> <br className="hidden sm:inline" />
                  <span className="text-amber-600 dark:text-amber-400">
                    (DevDien)
                  </span>
                </h1>

                {/* Role Subtitle */}
                <p className="mt-3 font-outfit text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-foreground/90">
                  {lang === 'vi'
                    ? 'Backend Engineer & System Architect'
                    : 'Backend Engineer & System Architect'}
                </p>

                {/* Bio Description */}
                <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-muted-foreground">
                  {lang === 'vi'
                    ? 'Tôi tập trung thiết kế và xây dựng các dịch vụ backend ổn định, tối ưu cơ sở dữ liệu quan hệ, phát triển REST APIs chuẩn mực và đóng gói môi trường với Docker.'
                    : 'Designing and building reliable backend services, standardized REST APIs, relational database schemas, and containerized workflows with Docker.'}
                </p>

                {/* Action CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    to="/projects"
                    className="button-primary inline-flex items-center gap-2"
                  >
                    <span>{lang === 'vi' ? 'Xem các dự án' : 'View Projects'}</span>
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    to="/about"
                    className="button-secondary inline-flex items-center gap-2"
                  >
                    <User size={15} />
                    <span>{lang === 'vi' ? 'Tiểu sử chi tiết' : 'About Me'}</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="button-secondary inline-flex items-center gap-1.5"
                  >
                    <Mail size={14} />
                    <span>{lang === 'vi' ? 'Liên hệ' : 'Contact'}</span>
                  </Link>
                </div>

                {/* Social Links Row Underneath CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                    {lang === 'vi' ? 'Kênh kết nối:' : 'Connect:'}
                  </span>

                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 hover:border-amber-400 hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-sm dark:border-white/8 dark:bg-[#121922]/80 dark:text-foreground/80 dark:hover:text-white dark:shadow-none"
                    title="GitHub"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={siteConfig.youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-red-500 hover:border-red-400 hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-sm dark:border-white/8 dark:bg-[#121922]/80 dark:text-foreground/80 dark:hover:text-red-400 dark:shadow-none"
                    title="YouTube @devdien"
                  >
                    <Youtube size={14} className="text-red-500" />
                    <span>YouTube</span>
                  </a>

                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-cyan-600 hover:border-cyan-400 hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-sm dark:border-white/8 dark:bg-[#121922]/80 dark:text-foreground/80 dark:hover:text-cyan-400 dark:shadow-none"
                    title="LinkedIn"
                  >
                    <Linkedin size={14} className="text-cyan-500" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Right Column: ~40% Clean Space revealing the ambient bleed photo */}
              <div className="hidden lg:block lg:col-span-5" />

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CORE CAPABILITIES (3 PILLARS ARCHITECTURAL CARDS) */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-20 border-b border-border/60 dark:border-white/5 relative">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold font-mono tracking-wider text-amber-500 dark:text-amber-400 uppercase">
                <Sparkles size={13} className="text-amber-400" />
                <span>{lang === 'vi' ? 'Năng Lực Trọng Tâm' : 'Core Capabilities'}</span>
              </div>
              <h2 className="mt-3 font-outfit text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                {lang === 'vi' ? 'Lĩnh Vực Chuyên Môn' : 'What I Bring to the Table'}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                {lang === 'vi'
                  ? 'Tập trung phát triển API dịch vụ, thiết kế cơ sở dữ liệu quan hệ và đóng gói môi trường với Docker.'
                  : 'Focused on backend API development, relational databases, and containerized development.'}
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {/* Pillar 01 */}
              <div className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)] hover:-translate-y-1 dark:border-white/8 dark:bg-[#121922]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 dark:text-amber-400 transition-transform duration-300 group-hover:scale-105">
                      <ServerCog size={22} />
                    </div>
                    <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-extrabold text-amber-500 dark:text-amber-400">
                      01
                    </span>
                  </div>

                  <h3 className="mt-4 font-outfit text-lg font-bold text-foreground group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    Backend & RESTful APIs
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {lang === 'vi'
                      ? 'Xây dựng API dịch vụ và xử lý nghiệp vụ với Python (FastAPI) và PHP (Laravel).'
                      : 'Building backend services and business logic with Python (FastAPI) and PHP (Laravel).'}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {[
                      lang === 'vi' ? 'Thiết kế RESTful APIs chuẩn hóa, rõ ràng với FastAPI & Laravel' : 'Standardized RESTful APIs with FastAPI & Laravel',
                      lang === 'vi' ? 'Xử lý xác thực người dùng (JWT, Bearer token) & phân quyền' : 'User authentication (JWT, Bearer token) & authorization',
                      lang === 'vi' ? 'Cấu trúc mã nguồn module hóa, dễ bảo trì và mở rộng' : 'Modular codebase architecture, clean and maintainable',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/85 leading-relaxed">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/60 dark:border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {['FastAPI', 'Python', 'Laravel', 'REST APIs', 'JWT'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground dark:border-white/5 dark:bg-white/[0.03] group-hover:text-amber-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pillar 02 */}
              <div className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)] hover:-translate-y-1 dark:border-white/8 dark:bg-[#121922]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 dark:text-amber-400 transition-transform duration-300 group-hover:scale-105">
                      <Database size={22} />
                    </div>
                    <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-extrabold text-amber-500 dark:text-amber-400">
                      02
                    </span>
                  </div>

                  <h3 className="mt-4 font-outfit text-lg font-bold text-foreground group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {lang === 'vi' ? 'Cơ Sở Dữ Liệu & ORM' : 'Database & ORM'}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {lang === 'vi'
                      ? 'Thiết kế cấu trúc bảng và quản lý dữ liệu với PostgreSQL, MySQL và Redis.'
                      : 'Relational data modeling and database operations with PostgreSQL, MySQL and Redis.'}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {[
                      lang === 'vi' ? 'Mô hình hóa dữ liệu quan hệ chuẩn hóa với PostgreSQL & MySQL' : 'Normalized relational schema design with PostgreSQL & MySQL',
                      lang === 'vi' ? 'Thao tác dữ liệu hiệu quả qua SQLAlchemy và Eloquent ORM' : 'Efficient data operations via SQLAlchemy and Eloquent ORM',
                      lang === 'vi' ? 'Ứng dụng Redis cho bộ nhớ đệm (caching) và quản lý session' : 'Redis caching layer and session management',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/85 leading-relaxed">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/60 dark:border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {['PostgreSQL', 'MySQL', 'Redis', 'SQLAlchemy', 'Alembic'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground dark:border-white/5 dark:bg-white/[0.03] group-hover:text-amber-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pillar 03 */}
              <div className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)] hover:-translate-y-1 dark:border-white/8 dark:bg-[#121922]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 dark:text-amber-400 transition-transform duration-300 group-hover:scale-105">
                      <Boxes size={22} />
                    </div>
                    <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-extrabold text-amber-500 dark:text-amber-400">
                      03
                    </span>
                  </div>

                  <h3 className="mt-4 font-outfit text-lg font-bold text-foreground group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {lang === 'vi' ? 'Container & Môi Trường' : 'Container & Environment'}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {lang === 'vi'
                      ? 'Đóng gói ứng dụng nhất quán và làm việc trên môi trường Linux & Git.'
                      : 'Containerizing applications for consistency and working with Linux & Git.'}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {[
                      lang === 'vi' ? 'Đóng gói ứng dụng với Docker & Docker Compose chạy ổn định' : 'Containerizing applications with Docker & Docker Compose',
                      lang === 'vi' ? 'Làm việc và vận hành trên môi trường Linux (Ubuntu, Bash)' : 'Working on Linux environments (Ubuntu, Bash commands)',
                      lang === 'vi' ? 'Quản lý mã nguồn với Git/GitHub & tích hợp API bên thứ ba' : 'Version control with Git/GitHub & third-party API integration',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/85 leading-relaxed">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/60 dark:border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'Docker Compose', 'Linux', 'Git', 'Postman'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground dark:border-white/5 dark:bg-white/[0.03] group-hover:text-amber-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 3. FEATURED PROJECTS PREVIEW (BENTO GRID SPOTLIGHT: CAR SHOWROOM + VEGGIE & FASTAPI) */}
        {/* ========================================================================= */}
        <section className="py-14 md:py-18 border-b border-border/60 dark:border-white/5">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">
                  {lang === 'vi' ? 'Dự Án Chọn Lọc' : 'Featured Work'}
                </span>
                <h2 className="mt-2 font-outfit text-3xl sm:text-4xl font-extrabold text-foreground">
                  {lang === 'vi' ? 'Các Sản Phẩm Tiêu Biểu' : 'Flagship Projects'}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
                  {lang === 'vi'
                    ? '3 dự án thực tế thể hiện tư duy thiết kế cơ sở dữ liệu quan hệ, API chuẩn mực và nghiệp vụ backend.'
                    : '3 practical projects showcasing relational database design, clean APIs, and backend business logic.'}
                </p>
              </div>

              <Link
                to="/projects"
                className="button-secondary inline-flex items-center gap-1.5 shrink-0"
              >
                <span>{lang === 'vi' ? 'Xem tất cả dự án' : 'View All Projects'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Bento Grid: 60% Left Hero Spotlight (Car Showroom) + 40% Right Stacked (Veggie & FastAPI) */}
            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
              {/* Left Column (60%): Car Showroom Spotlight */}
              {carProject && (
                <div className="lg:col-span-7 group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 lg:p-7 shadow-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.08)] dark:border-white/8 dark:bg-[#121922]">
                  <div>
                    {/* Top Mockup Image (16:10 Full Width) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950 border border-border/60 dark:border-white/10">
                      <img
                        src={carProject.image}
                        alt={carProject.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-md bg-slate-950/85 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                        {carProject.status}
                      </span>
                    </div>

                    {/* Content Below */}
                    <div className="mt-5">
                      <h3 className="font-outfit text-2xl font-bold text-foreground group-hover:text-amber-500 transition-colors">
                        {carProject.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {carProject.summary}
                      </p>

                      {/* Architecture Highlights */}
                      <div className="mt-4 space-y-2 text-xs text-foreground/85">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>
                            {lang === 'vi'
                              ? 'Danh mục phân cấp đa tầng (Makes / Models / Trims)'
                              : 'Multi-tier catalog hierarchy (Makes / Models / Trims)'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>
                            {lang === 'vi'
                              ? 'Lưu trữ thuộc tính động EAV & quản trị kho xe (VIN, trạng thái giữ chỗ)'
                              : 'Dynamic EAV attributes & vehicle inventory tracking (VIN, hold states)'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>
                            {lang === 'vi'
                              ? 'Tiếp nhận Lead khách hàng & lịch hẹn lái thử (Appointments)'
                              : 'CRM Lead capture & test-drive appointment scheduling'}
                          </span>
                        </div>
                      </div>

                      {/* Tech Badges */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {carProject.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-mono text-muted-foreground dark:border-white/5 dark:bg-white/[0.03]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between dark:border-white/5">
                    <a
                      href={carProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary inline-flex items-center gap-2 text-xs font-bold"
                    >
                      <Github size={15} />
                      <span>{lang === 'vi' ? 'Mã nguồn GitHub' : 'View Source on GitHub'}</span>
                      <ArrowUpRight size={13} />
                    </a>

                    <Link
                      to="/projects"
                      className="text-xs font-semibold text-amber-500 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{lang === 'vi' ? 'Chi tiết dự án' : 'Project Details'}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Right Column (40%): Veggie & FastAPI Book API Stacked (Both Image Top, Text Bottom) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                {/* Project 2: Veggie */}
                {veggieProject && (
                  <div className="flex-1 group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] dark:border-white/8 dark:bg-[#121922]">
                    <div>
                      {/* Image on Top (Full Width) */}
                      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl bg-slate-950 border border-border/60 dark:border-white/10">
                        <img
                          src={veggieProject.image}
                          alt={veggieProject.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 rounded-md bg-slate-950/85 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                          {veggieProject.status}
                        </span>
                      </div>

                      {/* Text Below */}
                      <h3 className="mt-3.5 font-outfit text-lg font-bold text-foreground group-hover:text-amber-500 transition-colors">
                        {veggieProject.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {veggieProject.summary}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {veggieProject.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground dark:border-white/5 dark:bg-white/[0.03]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between dark:border-white/5">
                      <a
                        href={veggieProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-amber-500 transition-colors"
                      >
                        <Github size={14} />
                        <span>{lang === 'vi' ? 'Mã nguồn GitHub' : 'View Source'}</span>
                        <ArrowUpRight size={12} />
                      </a>

                      <Link
                        to="/projects"
                        className="text-xs font-semibold text-amber-500 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{lang === 'vi' ? 'Chi tiết' : 'Details'}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Project 3: FastAPI Book Management API */}
                {fastapiProject && (
                  <div className="flex-1 group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] dark:border-white/8 dark:bg-[#121922]">
                    <div>
                      {/* Image on Top (Full Width) */}
                      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl bg-slate-950 border border-border/60 dark:border-white/10">
                        <img
                          src={fastapiProject.image}
                          alt={fastapiProject.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 rounded-md bg-slate-950/85 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-500/30">
                          {fastapiProject.status}
                        </span>
                      </div>

                      {/* Text Below */}
                      <h3 className="mt-3.5 font-outfit text-lg font-bold text-foreground group-hover:text-amber-500 transition-colors">
                        {fastapiProject.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {fastapiProject.summary}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {fastapiProject.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground dark:border-white/5 dark:bg-white/[0.03]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between dark:border-white/5">
                      <a
                        href={fastapiProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-amber-500 transition-colors"
                      >
                        <Github size={14} />
                        <span>{lang === 'vi' ? 'Mã nguồn GitHub' : 'View Source'}</span>
                        <ArrowUpRight size={12} />
                      </a>

                      <Link
                        to="/projects"
                        className="text-xs font-semibold text-amber-500 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{lang === 'vi' ? 'Chi tiết' : 'Details'}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CAREER & EXPERIENCE TIMELINE (MẪU 1: TIMELINE + STATS CARD) */}
        {/* ========================================================================= */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            {/* Header: Title + Subtitle + Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                    {lang === 'vi' ? 'Kinh Nghiệm Nghề Nghiệp' : 'Professional Experience'}
                  </h2>
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-400 font-mono uppercase">
                    TIMELINE & MILESTONES
                  </span>
                </div>
                <p className="mt-1 font-outfit text-xl sm:text-2xl font-semibold text-muted-foreground/80">
                  {lang === 'vi' ? 'Career Experience' : 'Milestones & Growth'}
                </p>
              </div>

              <Link
                to="/about#timeline"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:underline"
              >
                <span>{lang === 'vi' ? 'Xem toàn bộ tiểu sử' : 'View Full Story'}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Grid: 2 Columns (Left ~65% Timeline, Right ~35% Stats Box) */}
            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left Column (8 cols): Vertical Timeline */}
              <div className="lg:col-span-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-amber-400/50 via-amber-400/25 to-amber-400/10" />

                <div className="space-y-9 sm:space-y-10">
                  {careerItems.map((item, idx) => (
                    <div key={`${item.organization}-${idx}`} className="relative flex items-start">
                      {/* Glowing Node Dot */}
                      <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.85)] ring-4 ring-background dark:ring-[#0b1118]" />

                      {/* Content */}
                      <div className="pl-6 sm:pl-8 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-outfit text-xl sm:text-2xl font-bold text-foreground">
                            {item.organization}
                          </h3>
                          {item.badge && (
                            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-400 font-mono">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm font-medium text-muted-foreground">
                          {item.role} ({item.period})
                        </p>

                        {item.tech && item.tech.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-lg border border-border/80 bg-card px-3 py-1 text-xs font-mono text-foreground/80 dark:border-white/8 dark:bg-[#121922]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (4 cols): Stats Card */}
              <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm dark:border-white/8 dark:bg-[#121922]">
                <div className="space-y-6">
                  {/* Stat 1 */}
                  <div>
                    <div className="font-outfit text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                      3+
                    </div>
                    <p className="mt-1 text-sm sm:text-base font-medium text-muted-foreground">
                      {lang === 'vi' ? 'Năm kinh nghiệm' : 'Years Experience'}
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div>
                    <div className="font-outfit text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                      10+
                    </div>
                    <p className="mt-1 text-sm sm:text-base font-medium text-muted-foreground">
                      {lang === 'vi' ? 'Dự án' : 'Projects Completed'}
                    </p>
                  </div>

                  {/* Stat 3 */}
                  <div>
                    <div className="font-outfit text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                      100%
                    </div>
                    <p className="mt-1 text-sm sm:text-base font-medium text-muted-foreground">
                      {lang === 'vi' ? 'Cam kết chất lượng' : 'Quality Commitment'}
                    </p>
                  </div>
                </div>

                <Link
                  to="/about#timeline"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3.5 text-sm transition-all shadow-md hover:shadow-amber-500/20 active:scale-[0.98]"
                >
                  <span>{lang === 'vi' ? 'Xem chi tiết tiểu sử' : 'View Full Story'}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
