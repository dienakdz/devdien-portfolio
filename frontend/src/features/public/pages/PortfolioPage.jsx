import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Tv,
  User,
  Youtube,
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import profileImg from '../../../assets/profile.jpg';
import heroCover from '../../../assets/hero-cover.jpg';
import { useLanguage } from '../../../context/LanguageContext';
import { getLocalizedName, siteConfig } from '../../../data/siteConfig';
import { projectData } from '../../../data/projectData';
import { apiUrl } from '../../../lib/api';

export default function PortfolioPage({ theme, setTheme }) {
  const { lang } = useLanguage();
  const localizedName = getLocalizedName(lang);
  const projects = projectData[lang] || projectData.en;
  const featuredProjects = projects.slice(0, 3);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const visitKey = `portfolio-visit:${window.location.pathname}`;
    if (sessionStorage.getItem(visitKey) === '1') return undefined;

    const controller = new AbortController();
    fetch(apiUrl('/api/visits'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname }),
      signal: controller.signal,
    })
      .then((res) => {
        if (res.ok) {
          sessionStorage.setItem(visitKey, '1');
          window.dispatchEvent(new CustomEvent('visit-recorded'));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Cinematic Split Hero — 60/40 Harmonious Balance) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/60 dark:border-white/5 bg-background">
          
          {/* Ambient Horizontal Photo (Right ~40-45%, Shifted Right & Harmonized Lighting) */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[48%] xl:w-[45%] pointer-events-none overflow-hidden select-none">
            <img
              src={heroCover}
              alt={localizedName}
              className="h-full w-full object-cover object-[center_35%] lg:object-[86%_center] filter brightness-[0.93] contrast-[1.04] saturate-[0.98] transition-all duration-700"
            />
            {/* Seamless Soft Left Fade Gradient (Harmonious transition to deep dark) */}
            <div className="absolute inset-y-0 left-0 w-44 sm:w-64 bg-gradient-to-r from-background via-background/75 to-transparent dark:from-[#0b1118] dark:via-[#0b1118]/75 dark:to-transparent" />
            {/* Top & Bottom subtle ambient blends */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/90 via-background/40 to-transparent dark:from-[#0b1118]/90 dark:via-[#0b1118]/40 dark:to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/90 via-background/60 to-transparent dark:from-[#0b1118]/90 dark:via-[#0b1118]/60 dark:to-transparent" />
            {/* Mobile scrim overlay so text is 100% legible on small screens */}
            <div className="absolute inset-0 bg-background/88 dark:bg-[#0b1118]/88 lg:hidden" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center min-h-[540px]">
              
              {/* Left Column: ~60% Width — Intro, Core Pillars, Metrics & CTAs */}
              <div className="lg:col-span-7">
                
                {/* Verified Knowledge Entity Badge & Google Graph ID & Experience Badge */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck size={14} />
                    <span>VERIFIED KNOWLEDGE ENTITY</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500 dark:text-amber-400 font-mono">
                    <span>3+ {lang === 'vi' ? 'Năm Kinh Nghiệm' : 'Years Experience'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>Google Graph:</span>
                    <span className="font-mono text-xs font-bold text-amber-500 dark:text-amber-400">
                      kg:/g/11vsvs7f0_
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="mt-6 font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                  <span>{localizedName}</span> <br className="hidden sm:inline" />
                  <span className="text-amber-500 dark:text-amber-400">
                    (DevDien)
                  </span>
                </h1>

                {/* Role Subtitle */}
                <p className="mt-3 font-outfit text-xl sm:text-2xl font-bold tracking-tight text-foreground/90">
                  {lang === 'vi'
                    ? 'Backend Engineer & System Architect'
                    : 'Backend Engineer & System Architect'}
                </p>

                {/* Bio Description */}
                <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                  {lang === 'vi'
                    ? 'Tôi tập trung thiết kế và xây dựng các hệ thống backend chịu tải cao, tối ưu cơ sở dữ liệu quan hệ, phát triển REST APIs chuẩn OpenAPI và tự động hóa quy trình triển khai với Docker & CI/CD.'
                    : 'Designing and building high-throughput backend architectures, clean OpenAPI services, robust relational data pipelines, and cloud automation with Docker & CI/CD.'}
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
                    to="/nguyen-minh-dien"
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
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {lang === 'vi' ? 'Kênh kết nối:' : 'Connect:'}
                  </span>

                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-foreground hover:border-amber-400/50 hover:bg-card hover:-translate-y-0.5 transition-all dark:border-white/8 dark:bg-[#121922]/80"
                    title="GitHub"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={siteConfig.youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-red-500 hover:border-red-500/40 hover:bg-card hover:-translate-y-0.5 transition-all dark:border-white/8 dark:bg-[#121922]/80"
                    title="YouTube @devdien"
                  >
                    <Youtube size={14} className="text-red-500" />
                    <span>YouTube</span>
                  </a>

                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-card hover:-translate-y-0.5 transition-all dark:border-white/8 dark:bg-[#121922]/80"
                    title="LinkedIn"
                  >
                    <Linkedin size={14} className="text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Right Column: ~40% Clean Space Letting Photo Breathe Fully */}
              <div className="hidden lg:block lg:col-span-5" />

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CORE CAPABILITIES (3 PILLARS) */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-20 border-b border-border/60 dark:border-white/5">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {lang === 'vi' ? 'Năng Lực Trọng Tâm' : 'Core Capabilities'}
              </span>
              <h2 className="mt-2 font-outfit text-3xl sm:text-4xl font-extrabold text-foreground">
                {lang === 'vi' ? 'Tôi Có Thể Giúp Gì Cho Dự Án Của Bạn?' : 'What I Bring to the Table'}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                {lang === 'vi'
                  ? 'Tôi tập trung chuyên sâu vào hạ tầng phía sau của ứng dụng, đảm bảo tính ổn định, bảo mật và tốc độ phản hồi.'
                  : 'Specializing in backend foundations to ensure reliability, security, and high-performance user experiences.'}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {/* Pillar 1 */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-amber-400/50 dark:border-white/8 dark:bg-[#121922]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-500 dark:text-amber-400">
                  <ServerCog size={22} />
                </div>
                <h3 className="mt-5 font-outfit text-xl font-bold text-foreground">
                  Backend Architecture & APIs
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {lang === 'vi'
                    ? 'Thiết kế RESTful APIs chuẩn OpenAPI với FastAPI/Python và Laravel. Xử lý bất đồng bộ, tối ưu latency P99 và bảo mật JWT authentication.'
                    : 'Designing RESTful APIs with FastAPI/Python and Laravel. Async request handling, P99 latency optimization, and JWT auth.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-border/60 text-[11px] font-mono text-muted-foreground dark:border-white/5">
                  <span>FastAPI</span> • <span>Python</span> • <span>REST</span> • <span>OpenAPI</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-amber-400/50 dark:border-white/8 dark:bg-[#121922]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-500 dark:text-amber-400">
                  <Database size={22} />
                </div>
                <h3 className="mt-5 font-outfit text-xl font-bold text-foreground">
                  Database & Performance
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {lang === 'vi'
                    ? 'Thiết kế mô hình cơ sở dữ liệu quan hệ với PostgreSQL và MySQL. Tối ưu hóa truy vấn, lập chỉ mục (indexing), caching với Redis và migrations an toàn.'
                    : 'Relational data modeling with PostgreSQL and MySQL. Query indexing, Redis caching layers, and zero-downtime migrations.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-border/60 text-[11px] font-mono text-muted-foreground dark:border-white/5">
                  <span>PostgreSQL</span> • <span>MySQL</span> • <span>Redis</span> • <span>SQLAlchemy</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-amber-400/50 dark:border-white/8 dark:bg-[#121922]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-500 dark:text-amber-400">
                  <Boxes size={22} />
                </div>
                <h3 className="mt-5 font-outfit text-xl font-bold text-foreground">
                  Cloud, DevOps & Automation
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {lang === 'vi'
                    ? 'Đóng gói Docker multi-stage tối ưu dung lượng, xây dựng pipeline GitHub Actions CI/CD tự động test & deploy, và cấu hình Nginx reverse proxy.'
                    : 'Docker multi-stage builds, automated GitHub Actions CI/CD pipelines, Kubernetes manifests, and Nginx reverse proxy configs.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-border/60 text-[11px] font-mono text-muted-foreground dark:border-white/5">
                  <span>Docker</span> • <span>CI/CD</span> • <span>Kubernetes</span> • <span>Nginx</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FEATURED PROJECTS PREVIEW */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-20 border-b border-border/60 dark:border-white/5">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  {lang === 'vi' ? 'Dự Án Chọn Lọc' : 'Featured Work'}
                </span>
                <h2 className="mt-2 font-outfit text-3xl sm:text-4xl font-extrabold text-foreground">
                  {lang === 'vi' ? 'Các Sản Phẩm Tiêu Biểu' : 'Flagship Projects'}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
                  {lang === 'vi'
                    ? 'Các dự án thể hiện cách tôi giải quyết bài toán nghiệp vụ, độ trễ và luồng dữ liệu thực tế.'
                    : 'Demonstrating architecture decisions, throughput optimization, and real business flows.'}
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

            {/* Grid of 3 featured projects */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredProjects.map((p, idx) => (
                <div
                  key={p.title}
                  className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:border-amber-400/40 dark:border-white/8 dark:bg-[#121922]"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold text-white border border-white/10">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="mt-4 font-outfit text-xl font-bold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {p.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-foreground/80 dark:border-white/5 dark:bg-white/[0.03]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between dark:border-white/5">
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-amber-500 transition-colors"
                    >
                      <Github size={13} />
                      <span>{lang === 'vi' ? 'Mã nguồn' : 'Source'}</span>
                      <ArrowUpRight size={12} />
                    </a>

                    <Link
                      to="/projects"
                      className="text-xs font-semibold text-amber-500 hover:underline"
                    >
                      {lang === 'vi' ? 'Chi tiết ->' : 'Details ->'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ABOUT ME TEASER */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-20 border-b border-border/60 dark:border-white/5">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm dark:border-white/8 dark:bg-[#121922]">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                    {lang === 'vi' ? 'Về Nguyễn Minh Diện' : 'About Nguyễn Minh Diện'}
                  </span>
                  <h2 className="mt-2 font-outfit text-3xl sm:text-4xl font-extrabold text-foreground">
                    {lang === 'vi' ? 'Hành Trình & Định Hướng Nghề Nghiệp' : 'Background & Engineering Philosophy'}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {lang === 'vi'
                      ? 'Từ những ngày đầu mày mò code và dựng server, tôi luôn giữ nguyên tắc: một hệ thống tốt không phải là một hệ thống phức tạp, mà là một hệ thống giải quyết đúng bài toán, dễ đọc, dễ duy trì và ổn định khi dữ liệu tăng trưởng.'
                      : 'I believe great backend engineering is not about over-complicating systems, but about delivering clear, reliable, and easily maintainable services that scale gracefully.'}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      to="/nguyen-minh-dien"
                      className="button-primary inline-flex items-center gap-2"
                    >
                      <ShieldCheck size={16} />
                      <span>{lang === 'vi' ? 'Xem toàn bộ tiểu sử & sự nghiệp' : 'Read Full Story & Timeline'}</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4 rounded-2xl border border-border/60 bg-muted/20 p-5 dark:border-white/5 dark:bg-[#0b1118]/60">
                  <p className="font-outfit text-xs font-bold uppercase tracking-wider text-foreground">
                    {lang === 'vi' ? 'Thông tin nhanh' : 'Quick Facts'}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <li>• {lang === 'vi' ? 'Vai trò:' : 'Role:'} Backend Engineer</li>
                    <li>• {lang === 'vi' ? 'Địa điểm:' : 'Location:'} Hà Nội, Việt Nam</li>
                    <li>• {lang === 'vi' ? 'Học vấn:' : 'Education:'} Đại học Mỏ - Địa chất (HUMG)</li>
                    <li>• {lang === 'vi' ? 'Kênh YouTube:' : 'YouTube:'} @devdien</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. YOUTUBE SHOWCASE */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-20 border-b border-border/60 dark:border-white/5">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/5 via-card to-card p-8 sm:p-10 shadow-sm dark:border-white/8 dark:bg-[#121922]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                    <Youtube size={16} className="fill-current" />
                    <span>YouTube @devdien</span>
                  </div>
                  <h2 className="mt-2 font-outfit text-2xl sm:text-3xl font-extrabold text-foreground">
                    {lang === 'vi' ? 'Chia Sẻ Kiến Thức Lập Trình Thực Chiến' : 'Hands-on Coding Masterclasses'}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                    {lang === 'vi'
                      ? 'Nơi tôi hướng dẫn chi tiết từ việc thiết kế REST API bằng FastAPI 3 giờ đến trọn bộ xây dựng website thương mại điện tử với Laravel.'
                      : 'Free tutorials covering FastAPI Book Management REST APIs from scratch and fullstack eCommerce platforms with Laravel.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={siteConfig.youtubeSubscribeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
                  >
                    <Youtube size={16} className="fill-current" />
                    <span>{lang === 'vi' ? 'Đăng ký kênh @devdien' : 'Subscribe @devdien'}</span>
                  </a>

                  <a
                    href={siteConfig.youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary text-xs"
                  >
                    <span>{lang === 'vi' ? 'Xem kênh' : 'View Channel'}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CALL TO ACTION BANNER */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-foreground">
              {lang === 'vi' ? 'Bạn Đang Có Dự Án Hoặc Muốn Kết Nối?' : 'Ready to Build Something Great?'}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              {lang === 'vi'
                ? 'Tôi luôn sẵn sàng trao đổi về các cơ hội kỹ thuật, vị trí backend phù hợp và các giải pháp hệ thống.'
                : 'I am always open to exploring technical opportunities, backend positions, or collaboration on scalable systems.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="button-primary inline-flex items-center gap-2 text-base px-6 py-3"
              >
                <Send size={16} />
                <span>{lang === 'vi' ? 'Liên hệ ngay với tôi' : 'Get in Touch'}</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="button-secondary inline-flex items-center gap-2 text-base px-6 py-3"
              >
                <span>{lang === 'vi' ? 'Tải / Xem CV' : 'Open Resume'}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
