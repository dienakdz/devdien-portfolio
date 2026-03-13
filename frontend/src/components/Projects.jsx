import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ExternalLink, Github, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectData } from '../data/projectData';
import { siteConfig } from '../data/siteConfig';

const Projects = () => {
  const { t, lang } = useLanguage();
  const projects = projectData[lang] || projectData.en;
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = useMemo(
    () => (showAll ? projects : projects.slice(0, 4)),
    [projects, showAll],
  );
  const hasMoreProjects = projects.length > 4;

  const handleProjectPointerMove = (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty('--project-spotlight-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--project-spotlight-y', `${event.clientY - rect.top}px`);
  };

  const handleProjectPointerLeave = (event) => {
    const card = event.currentTarget;

    card.style.removeProperty('--project-spotlight-x');
    card.style.removeProperty('--project-spotlight-y');
  };

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute right-[-10rem] top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker mb-4">{t.projects.eyebrow}</p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-title max-w-2xl"
            >
              {t.projects.title1} <span className="text-gradient">{t.projects.title2}</span>
            </motion.h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {t.projects.description}
            </p>
          </div>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="button-secondary shrink-0"
          >
            {t.projects.viewAll}
            <ArrowUpRight size={18} />
          </a>
        </div>

        {visibleProjects.length ? (
          <div className="content-plane-strong rounded-[34px] p-4 md:p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="section-kicker">{t.projects.archiveLabel}</p>
              <span className="text-sm text-muted-foreground">
                {visibleProjects.length}/{projects.length}
              </span>
            </div>

            <div className="grid gap-3">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.05 }}
                  onPointerMove={handleProjectPointerMove}
                  onPointerLeave={handleProjectPointerLeave}
                  className="project-card content-plane rounded-[28px] p-4 md:p-5"
                >
                  <span aria-hidden="true" className="project-spotlight" />
                  <span aria-hidden="true" className="project-sheen" />
                  <span aria-hidden="true" className="project-outline" />

                  <div className="relative z-[1] grid gap-4 md:grid-cols-[8.5rem_minmax(0,1fr)] xl:grid-cols-[8.5rem_minmax(0,1fr)_11rem] xl:items-start">
                    <div className="overflow-hidden rounded-[20px] border border-white/8 bg-[#08131b]">
                      <div className="flex items-center justify-between border-b border-white/8 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/68">
                        <span>0{index + 1}</span>
                        <span>{index === 0 ? t.projects.featuredLabel : project.status}</span>
                      </div>
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        className="aspect-[16/11] w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-black tracking-[-0.05em]">{project.title}</h3>
                        <span className="rounded-full border border-primary/20 bg-primary/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                          {project.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.summary}</p>

                      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,0.62fr)]">
                        <div>
                          <p className="section-kicker">{t.projects.compactNote}</p>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{project.impact}</p>
                        </div>

                        <div className="flex flex-wrap content-start gap-2 xl:justify-end">
                          {project.tech.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-primary/20 bg-primary/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 xl:flex-col xl:items-stretch">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button-secondary px-4 py-2 text-xs"
                      >
                        {t.projects.viewRepo}
                        <Github size={16} />
                      </a>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-primary px-4 py-2 text-xs"
                        >
                          {t.projects.viewDemo}
                          <ExternalLink size={16} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border/90 bg-background/72 px-4 py-2 text-xs font-bold text-foreground/82 dark:bg-card/80">
                          <Lock size={14} />
                          {t.projects.demoPending}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {hasMoreProjects ? (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((current) => !current)}
                  className="button-secondary text-sm"
                >
                  {showAll ? t.projects.showLess : t.projects.showMore}
                  <ArrowDown
                    size={16}
                    className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Projects;
