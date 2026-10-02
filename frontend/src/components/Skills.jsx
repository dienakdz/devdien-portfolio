import React from 'react';
import { motion } from 'framer-motion';
import {
  Boxes,
  Cpu,
  Database,
  ServerCog,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { t, lang } = useLanguage();

  const categories = [
    {
      title: 'Backend Systems',
      icon: ServerCog,
      description:
        lang === 'vi'
          ? 'API design, asynchronous services, JWT auth, business logic và kiến trúc microservices.'
          : 'High-throughput API design, async microservices, auth, and business logic.',
      skills: ['Python', 'FastAPI', 'Laravel', 'REST & OpenAPI', 'Redis Caching'],
    },
    {
      title: 'Data & Storage',
      icon: Database,
      description:
        lang === 'vi'
          ? 'Thiết kế schema, tối ưu hóa indexing, toàn vẹn giao dịch và ORM data mapping.'
          : 'Schema modeling, index optimization, transactional integrity, and async ORMs.',
      skills: ['PostgreSQL', 'MySQL', 'SQLAlchemy', 'Redis', 'Database Migrations'],
    },
    {
      title: 'DevOps & Cloud',
      icon: Boxes,
      description:
        lang === 'vi'
          ? 'Container hóa Docker, tự động hóa CI/CD, điều phối Kubernetes và cấu hình Nginx.'
          : 'Docker containerization, GitHub Actions CI/CD, Kubernetes, and Nginx reverse proxy.',
      skills: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux OS', 'Nginx'],
    },
    {
      title: 'AI & Automation',
      icon: Sparkles,
      description:
        lang === 'vi'
          ? 'Tích hợp mô hình AI, kiến trúc RAG, vector search và tự động hóa quy trình nghiệp vụ.'
          : 'AI integrations, RAG architecture, vector search pipelines, and workflow automation.',
      skills: ['RAG Architecture', 'Vector DB', 'FastAPI AI Endpoints', 'PyTorch / Vision', 'Automation'],
    },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <div className="mb-12 max-w-3xl">
          <p className="section-kicker mb-4">{t.skills.eyebrow}</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t.skills.title1} <span className="text-gradient">{t.skills.title2}</span>
          </motion.h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {t.skills.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="skill-card content-plane rounded-[30px] p-7"
              >
                <span aria-hidden="true" className="skill-spotlight" />
                <span aria-hidden="true" className="skill-sheen" />
                <span aria-hidden="true" className="skill-outline" />

                <div className="relative z-[1]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="skill-card__icon flex h-14 w-14 items-center justify-center rounded-[18px] bg-primary/12 text-primary">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/82">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-[1.85rem] font-black tracking-[-0.05em]">{category.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {category.description}
                  </p>

                  <div className="skill-card__rule mt-7" aria-hidden="true" />

                  <div className="mt-6 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-chip rounded-full border border-primary/16 bg-primary/8 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-foreground/82 dark:bg-primary/10 dark:text-foreground/84"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
