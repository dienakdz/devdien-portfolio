import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Filter,
  Github,
  Layers,
  Lock,
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { projectData } from '../../../data/projectData';
import { siteConfig } from '../../../data/siteConfig';

export default function ProjectsPage({ theme, setTheme }) {
  const { lang } = useLanguage();
  const projects = projectData[lang] || projectData.en;
  const [selectedTag, setSelectedTag] = useState('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const filterOptions = [
    { id: 'ALL', label: lang === 'vi' ? 'Tất cả' : 'All Projects' },
    { id: 'Python', label: 'Python & FastAPI' },
    { id: 'Laravel', label: 'PHP & Laravel' },
    { id: 'Docker', label: 'DevOps & Docker' },
    { id: 'AI', label: 'AI & Vision' },
  ];

  const filteredProjects = projects.filter((proj) => {
    if (selectedTag === 'ALL') return true;
    if (selectedTag === 'Python') return proj.tech.some((t) => t.includes('Python') || t.includes('FastAPI'));
    if (selectedTag === 'Laravel') return proj.tech.some((t) => t.includes('Laravel') || t.includes('PHP'));
    if (selectedTag === 'Docker') return proj.tech.some((t) => t.includes('Docker') || t.includes('Kubernetes'));
    if (selectedTag === 'AI') return proj.tech.some((t) => t.includes('RAG') || t.includes('PyTorch'));
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        
        {/* HEADER SECTION */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Code2 size={14} />
            <span>{lang === 'vi' ? 'Mã Nguồn Mở & Dự Án Thực Tế' : 'Open Source & Projects'}</span>
          </div>

          <h1 className="mt-4 font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {lang === 'vi' ? 'Dự Án Đã Xây Dựng' : 'Featured Engineering Work'}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {lang === 'vi'
              ? 'Tập hợp các dự án tiêu biểu thể hiện cách tôi tổ chức kiến trúc backend, thiết kế database, xử lý thuật toán và tự động hóa quy trình triển khai.'
              : 'A curated selection of backend architectures, database schemas, quantitative models, and DevOps automation workflows.'}
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border/60 pb-6 dark:border-white/8">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
            <Filter size={13} className="text-amber-500" />
            <span>{lang === 'vi' ? 'Lọc theo:' : 'Filter:'}</span>
          </div>

          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedTag(opt.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === opt.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-amber-400/40 dark:border-white/10 dark:bg-[#121922]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <article
              key={project.title}
              className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-amber-500/40 hover:shadow-lg dark:border-white/8 dark:bg-[#121922] dark:hover:border-amber-500/30"
            >
              <div>
                {/* Image Preview & Meta */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-950">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-md border border-white/20 bg-slate-950/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                      0{index + 1} • {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-outfit text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-amber-500 transition-colors">
                      {project.title}
                    </h2>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  {/* Problem & Solution block */}
                  <div className="mt-4 space-y-2 rounded-xl border border-border/60 bg-muted/40 p-3.5 text-xs dark:border-white/5 dark:bg-[#0b1118]/60">
                    <div>
                      <span className="font-bold text-foreground">
                        {lang === 'vi' ? 'Bối cảnh:' : 'Problem:'}{' '}
                      </span>
                      <span className="text-muted-foreground">{project.problem}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {lang === 'vi' ? 'Giải pháp:' : 'Solution:'}{' '}
                      </span>
                      <span className="text-muted-foreground">{project.solution}</span>
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-border/70 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-foreground/80 dark:border-white/5 dark:bg-white/[0.03]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 dark:border-white/8">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-amber-500 transition-colors"
                >
                  <Github size={15} />
                  <span>{lang === 'vi' ? 'Mã nguồn GitHub' : 'View Source'}</span>
                  <ArrowUpRight size={13} />
                </a>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:underline"
                  >
                    <span>{lang === 'vi' ? 'Trải nghiệm trực tiếp' : 'Live Demo'}</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground/80">
                    <Lock size={12} />
                    <span>{lang === 'vi' ? 'Dự án nội bộ' : 'Internal Architecture'}</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM GITHUB DISCOVERY BANNER */}
        <div className="mt-16 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 text-center dark:border-white/10 dark:bg-[#121922]">
          <h3 className="font-outfit text-xl sm:text-2xl font-bold text-foreground">
            {lang === 'vi' ? 'Khám phá thêm trên GitHub' : 'Explore More on GitHub'}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            {lang === 'vi'
              ? 'Ngoài các dự án trọng điểm phía trên, tôi còn lưu trữ hơn 20+ repositories về scripts, labs, và giải pháp kỹ thuật trên GitHub cá nhân.'
              : 'Beyond these highlighted projects, explore 20+ additional repositories, foundational labs, and backend utility libraries on my profile.'}
          </p>
          <div className="mt-6">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="button-primary inline-flex items-center gap-2"
            >
              <Github size={16} />
              <span>{lang === 'vi' ? 'Xem GitHub @dienakdz' : 'Visit GitHub @dienakdz'}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
