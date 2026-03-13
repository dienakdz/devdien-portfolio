import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const { t, lang } = useLanguage();
  const highlightsLabel = lang === 'vi' ? 'Điểm chính' : 'Highlights';
  const currentRoleLabel = lang === 'vi' ? 'Vai trò hiện tại' : 'Current role';
  const previousRolesLabel = lang === 'vi' ? 'Các chặng trước' : 'Earlier roles';
  const previousRolesCopy =
    lang === 'vi'
      ? 'Những vai trò trước đó tạo nền cho cách tôi xây backend systems hôm nay.'
      : 'The earlier roles that shaped how I approach backend systems today.';
  const educationLabel = lang === 'vi' ? 'Học vấn' : 'Education';

  const experiences = [
    {
      company: 'TMA Solutions',
      role: 'Backend Developer',
      period: lang === 'vi' ? '08/2025 - Hiện tại' : '08/2025 - Present',
      description:
        lang === 'vi'
          ? 'Phát triển backend services bằng Python và FastAPI, tham gia thiết kế dữ liệu và tối ưu hiệu năng cho sản phẩm.'
          : 'Building backend services with Python and FastAPI while contributing to data design and performance tuning.',
      highlights:
        lang === 'vi'
          ? [
              'Xây dựng API layers rõ ràng cho các bài toán backend thực tế.',
              'Phối hợp tối ưu dữ liệu và hiệu năng cho workload production.',
            ]
          : [
              'Built clearer API layers for real product-facing backend workflows.',
              'Contributed to data and performance tuning for production workloads.',
            ],
    },
    {
      company: 'EFE Technology',
      role: 'Junior PHP Developer',
      period: '04/2024 - 08/2025',
      description:
        lang === 'vi'
          ? 'Bảo trì và phát triển website khách hàng bằng PHP core, WordPress và các tính năng mới phục vụ vận hành.'
          : 'Maintained and extended client websites with core PHP, WordPress, and practical product-facing features.',
      highlights:
        lang === 'vi'
          ? [
              'Triển khai các tính năng mới bám sát nhu cầu vận hành thực tế.',
              'Làm việc với codebase kế thừa và quy trình giao website cho khách hàng.',
            ]
          : [
              'Delivered practical features aligned with day-to-day business needs.',
              'Worked with legacy codebases and real client delivery constraints.',
            ],
    },
    {
      company: 'Nova Square',
      role: 'AI Intern',
      period: '11/2023 - 01/2024',
      description:
        lang === 'vi'
          ? 'Tìm hiểu ứng dụng OpenAI API vào Messenger workflow và thử nghiệm mô hình dự đoán dữ liệu cơ bản.'
          : 'Explored OpenAI API integrations for Messenger workflows and experimented with lightweight prediction models.',
      highlights:
        lang === 'vi'
          ? [
              'Thử nghiệm tích hợp AI vào workflow nhắn tin có tính ứng dụng.',
              'Tiếp cận sớm tư duy automation và dữ liệu trong sản phẩm.',
            ]
          : [
              'Explored practical AI integration paths for messaging workflows.',
              'Built early exposure to automation and data-oriented product thinking.',
            ],
    },
    {
      company: 'Fastworld Tech',
      role: 'PHP WordPress Intern',
      period: '06/2023 - 11/2023',
      description:
        lang === 'vi'
          ? 'Làm quen với CMS WordPress, hooks/actions và quy trình giao website trong môi trường thực tế.'
          : 'Learned WordPress CMS internals, hooks/actions, and the practical delivery flow for client websites.',
      highlights:
        lang === 'vi'
          ? [
              'Nắm quy trình giao website và làm việc theo yêu cầu khách hàng.',
              'Xây nền tảng về CMS, hooks/actions và custom theme/plugin.',
            ]
          : [
              'Learned real delivery flows for client-facing website work.',
              'Built fundamentals around CMS internals, hooks/actions, and customization.',
            ],
    },
    {
      company: 'VKU University',
      role: lang === 'vi' ? 'Sinh viên Kỹ thuật Phần mềm' : 'Software Engineering Student',
      period: '2020 - 2025',
      description:
        lang === 'vi'
          ? 'Tốt nghiệp loại Giỏi, GPA 3.55/4.0, xây dựng nền tảng kỹ thuật cho backend và phát triển phần mềm.'
          : 'Graduated with distinction, GPA 3.55/4.0, building the technical foundation for backend and software engineering.',
      highlights:
        lang === 'vi'
          ? [
              'Tập trung vào nền tảng software engineering và tư duy hệ thống.',
              'Phát triển khả năng học nhanh và chuyển hóa kiến thức vào dự án thực tế.',
            ]
          : [
              'Built the core software engineering and systems-thinking foundation.',
              'Strengthened the ability to learn quickly and apply theory in projects.',
            ],
    },
  ];

  const currentExperience = experiences[0];
  const educationExperience = experiences[experiences.length - 1];
  const previousExperiences = experiences.slice(1, -1);

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-kicker mb-4">{t.experience.eyebrow}</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t.experience.title1} <span className="text-gradient">{t.experience.title2}</span>
          </motion.h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {t.experience.description}
          </p>
        </div>

        <div className="grid gap-5">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="experience-featured content-plane-strong overflow-hidden rounded-[34px] border-primary/22 shadow-[0_34px_110px_-68px_rgba(99,208,190,0.24)]"
          >
            <span aria-hidden="true" className="experience-featured__glow" />
            <span aria-hidden="true" className="experience-featured__sheen" />

            <div className="grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
              <div className="border-b border-border/70 bg-[linear-gradient(180deg,rgba(21,91,102,0.08),transparent)] p-6 md:p-8 lg:border-r lg:border-b-0 lg:p-9">
                <p className="section-kicker">{currentRoleLabel}</p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                  <Calendar size={14} />
                  {currentExperience.period}
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.22em] text-primary/88">
                  {currentExperience.company}
                </p>
                <h3 className="mt-3 text-[clamp(2.4rem,4vw,3.7rem)] font-black leading-[0.94] tracking-[-0.06em]">
                  {currentExperience.role}
                </h3>
              </div>

              <div className="p-6 md:p-8 lg:p-9">
                <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-[1.03rem]">
                  {currentExperience.description}
                </p>

                <div className="mt-8">
                  <p className="section-kicker">{highlightsLabel}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {currentExperience.highlights.map((item) => (
                      <div
                        key={item}
                        className="content-plane rounded-[22px] px-5 py-4 text-sm leading-7 text-muted-foreground"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.06 }}
              className="content-plane-strong rounded-[32px] p-6 md:p-7"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="section-kicker">{previousRolesLabel}</p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {previousRolesCopy}
                  </p>
                </div>
              </div>

              <div className="experience-timeline mt-8">
                <span aria-hidden="true" className="experience-timeline__line" />
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="experience-timeline__progress"
                />

                <div className="grid gap-5">
                  {previousExperiences.map((exp, index) => (
                    <motion.article
                      key={`${exp.company}-${exp.role}`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: 0.08 + index * 0.05 }}
                      className="experience-timeline__item relative pl-6 sm:pl-8"
                    >
                      <motion.span
                        aria-hidden="true"
                        initial={{ scale: 0.9, opacity: 0.72 }}
                        whileInView={{ scale: [0.9, 1.18, 0.98], opacity: [0.72, 1, 0.9] }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75, delay: 0.14 + index * 0.08 }}
                        className="experience-timeline__dot"
                        style={{ animationDelay: `${index * 0.55}s` }}
                      />

                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
                            {exp.company}
                          </p>
                          <h3 className="mt-2 text-2xl font-black tracking-[-0.05em]">{exp.role}</h3>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/8 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
                          <Calendar size={13} />
                          {exp.period}
                        </div>
                      </div>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                        {exp.description}
                      </p>

                      <div className="mt-4 grid gap-2">
                        {exp.highlights.map((item) => (
                          <div key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                            <span className="mt-[0.7rem] h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.14 }}
              className="content-plane-strong rounded-[32px] p-6 md:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-primary/12 text-primary">
                  <GraduationCap size={24} />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/8 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
                  <Calendar size={13} />
                  {educationExperience.period}
                </div>
              </div>

              <p className="section-kicker mt-8">{educationLabel}</p>
              <h3 className="mt-3 text-[2rem] font-black leading-[1] tracking-[-0.05em]">
                {educationExperience.role}
              </h3>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {educationExperience.company}
              </p>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {educationExperience.description}
              </p>

              <div className="mt-6 grid gap-3">
                {educationExperience.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[20px] border border-border/80 bg-background/70 px-4 py-3 text-sm leading-7 text-muted-foreground dark:bg-card/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
