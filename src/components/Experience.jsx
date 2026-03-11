import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const { t, lang } = useLanguage();
  const highlightsLabel = lang === 'vi' ? 'Điểm chính' : 'Highlights';

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

        <div className="content-plane-strong rounded-[34px] p-4 md:p-5">
          <div className="grid gap-3">
            {experiences.map((exp, index) => (
              <motion.article
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.06 }}
                className={`content-plane rounded-[28px] p-5 md:p-6 ${index === 0 ? 'border-primary/24 shadow-[0_28px_100px_-60px_rgba(99,208,190,0.24)]' : ''}`}
              >
                <div className="grid gap-5 lg:grid-cols-[11rem_minmax(0,1fr)_18rem] lg:items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black tracking-[-0.05em]">{exp.role}</h3>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>

                  <div>
                    <p className="section-kicker">{highlightsLabel}</p>
                    <div className="mt-4 grid gap-2">
                      {exp.highlights.map((item) => (
                        <div
                          key={item}
                          className="rounded-[20px] border border-border/80 bg-background/70 px-4 py-3 text-sm leading-7 text-muted-foreground dark:bg-card/76"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
