import React from 'react';
import { motion } from 'framer-motion';
import {
  AppWindow,
  Boxes,
  Database,
  ServerCog,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { t, lang } = useLanguage();

  const handleSkillPointerMove = (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty('--skill-spotlight-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--skill-spotlight-y', `${event.clientY - rect.top}px`);
  };

  const handleSkillPointerLeave = (event) => {
    const card = event.currentTarget;

    card.style.removeProperty('--skill-spotlight-x');
    card.style.removeProperty('--skill-spotlight-y');
  };

  const categories = [
    {
      title: 'Backend',
      icon: ServerCog,
      description:
        lang === 'vi'
          ? 'API design, service layers, auth, business logic và các tích hợp backend.'
          : 'API design, service layers, auth, business logic, and backend integrations.',
      skills: ['Python', 'FastAPI', 'Laravel', 'PHP'],
    },
    {
      title: 'Data',
      icon: Database,
      description:
        lang === 'vi'
          ? 'Thiết kế schema, tối ưu truy vấn và giữ dữ liệu nhất quán cho sản phẩm.'
          : 'Schema design, query optimization, and data consistency for product workloads.',
      skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'ETL'],
    },
    {
      title: 'Delivery',
      icon: Boxes,
      description:
        lang === 'vi'
          ? 'Containerization, môi trường triển khai và quy trình release ổn định.'
          : 'Containerization, deployment environments, and reliable release workflows.',
      skills: ['Docker', 'Nginx', 'CI/CD', 'AWS'],
    },
    {
      title: 'Support',
      icon: AppWindow,
      description:
        lang === 'vi'
          ? 'Đủ để phối hợp với frontend, debug flow end-to-end và hỗ trợ khi cần chạm vào bề mặt sản phẩm.'
          : 'Enough to collaborate with frontend, debug end-to-end flows, and support product delivery when needed.',
      skills: ['React', 'JavaScript', 'Debugging', 'Vite'],
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
                onPointerMove={handleSkillPointerMove}
                onPointerLeave={handleSkillPointerLeave}
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
