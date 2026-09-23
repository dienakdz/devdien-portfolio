import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, CheckCircle2, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutTimeline({ isDark = true }) {
  const { t, lang } = useLanguage();

  const milestones = [
    {
      period: lang === 'vi' ? '08/2025 - Hiện tại' : '08/2025 - Present',
      role: 'Backend Developer',
      organization: 'TMA Solutions (TMA Innovation)',
      location: 'Quy Nhơn',
      badge: lang === 'vi' ? 'Đang đảm nhiệm' : 'Current',
      badgeType: 'current',
      type: 'work',
      summary:
        lang === 'vi'
          ? 'Phát triển backend services bằng Python và FastAPI. Thiết kế cơ sở dữ liệu PostgreSQL, tối ưu hiệu năng và trực tiếp tham gia tập huấn, hướng dẫn người dùng vận hành các giải pháp phần mềm thực tế.'
          : 'Developing backend services with Python & FastAPI. Designing PostgreSQL databases, optimizing system performance, and conducting software training and enablement for end users.',
      highlights:
        lang === 'vi'
          ? [
              'Xây dựng các REST APIs hiệu năng cao phục vụ nghiệp vụ thực tế.',
              'Trực tiếp tham gia tập huấn và hướng dẫn người dùng làm chủ hệ thống phần mềm.',
              'Tối ưu hóa dữ liệu và hạ tầng Docker container.',
            ]
          : [
              'Building high-performance REST APIs for business-critical workflows.',
              'Speaker and trainer guiding end users through practical software operations.',
              'Optimizing database queries and Docker container environments.',
            ],
    },
    {
      period: '04/2024 - 08/2025',
      role: 'Junior PHP Developer',
      organization: 'EFE Technology',
      location: 'Đà Nẵng',
      type: 'work',
      summary:
        lang === 'vi'
          ? 'Bảo trì và phát triển website khách hàng bằng PHP core, WordPress và các tính năng mới phục vụ vận hành.'
          : 'Maintained and extended client websites using core PHP, WordPress, and practical business-facing features.',
      highlights:
        lang === 'vi'
          ? [
              'Triển khai tính năng mới bám sát nhu cầu khách hàng thực tế.',
              'Làm việc với codebase lớn và quy trình giao nhận sản phẩm đúng hạn.',
            ]
          : [
              'Delivered production features aligned with client business requirements.',
              'Worked with legacy codebases under real client delivery schedules.',
            ],
    },
    {
      period: '11/2023 - 01/2024',
      role: 'AI Intern',
      organization: 'Nova Square',
      location: 'Đà Nẵng',
      type: 'work',
      summary:
        lang === 'vi'
          ? 'Nghiên cứu ứng dụng OpenAI API vào Messenger workflow và thử nghiệm mô hình dự đoán dữ liệu.'
          : 'Explored OpenAI API integrations for Messenger workflows and experimented with data prediction models.',
      highlights:
        lang === 'vi'
          ? [
              'Tích hợp trợ lý AI vào luồng tương tác khách hàng.',
              'Rèn luyện tư duy tự động hóa quy trình với mô hình ngôn ngữ lớn.',
            ]
          : [
              'Integrated AI assistants into conversational customer flows.',
              'Built foundational thinking for AI-assisted workflow automation.',
            ],
    },
    {
      period: '2020 - 2025',
      role: lang === 'vi' ? 'Kỹ sư Kỹ thuật Phần mềm (Bằng Giỏi)' : 'Software Engineering (Honors Degree)',
      organization:
        lang === 'vi'
          ? 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU)'
          : 'Vietnam - Korea University of Information and Communication Technology (VKU)',
      location: 'Đà Nẵng',
      badge: 'GPA 3.55 / 4.0',
      badgeType: 'honors',
      type: 'education',
      summary:
        lang === 'vi'
          ? 'Tốt nghiệp loại Giỏi chuyên ngành Kỹ thuật Phần mềm. Xây dựng nền tảng vững chắc về cấu trúc dữ liệu, giải thuật, kiến trúc hệ thống và quy trình kỹ nghệ phần mềm.'
          : 'Graduated with distinction (Honors). Built a rigorous foundation in algorithms, data structures, software architecture, and modern engineering practices.',
      highlights:
        lang === 'vi'
          ? [
              'GPA 3.55/4.0 - Xếp loại Tốt nghiệp: Giỏi.',
              'Nền tảng kiến trúc phần mềm, cơ sở dữ liệu và tư duy hệ thống.',
              'Tinh thần tự lập: vừa học vừa bươn chải thực tế (chạy Grab, làm thêm) để trang trải cuộc sống và rèn luyện bản lĩnh kiên trì.',
              'Tham gia tích cực các hoạt động học thuật và nghiên cứu công nghệ.',
            ]
          : [
              'GPA 3.55/4.0 - Graduated with Distinction (Honors).',
              'Solid grounding in software architecture, database design, and systems thinking.',
              'High self-reliance: balanced engineering studies with early hustle (rideshare driver, practical jobs) to cover living expenses and build resilience.',
              'Actively participated in university tech research and academic projects.',
            ],
    },
  ];

  return (
    <section id="timeline" className="relative py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${
              isDark
                ? 'border border-amber-500/20 bg-amber-500/10 text-amber-400'
                : 'border border-amber-500/30 bg-amber-50 text-amber-700'
            }`}
          >
            <Calendar size={14} />
            <span>{t?.aboutPage?.timeline?.eyebrow || 'Hành trình sự nghiệp'}</span>
          </div>
          <h2
            className={`mt-4 font-outfit text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t?.aboutPage?.timeline?.title || 'Dấu Ấn Nghề Nghiệp & Học Vấn'}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t?.aboutPage?.timeline?.description ||
              'Quá trình học tập và tích lũy kinh nghiệm qua từng chặng đường tạo dựng nền tảng hôm nay.'}
          </p>
        </div>

        {/* Timeline Items */}
        <div
          className={`relative border-l-2 ml-4 sm:ml-8 space-y-10 ${
            isDark ? 'border-amber-500/25' : 'border-amber-500/35'
          }`}
        >
          {milestones.map((item, index) => {
            const isEdu = item.type === 'education';
            return (
              <motion.div
                key={item.period + item.organization}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Node Bullet */}
                <div
                  className={`absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isDark ? 'border-[#0b1118]' : 'border-slate-50'
                  } ${
                    isEdu
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                      : item.badgeType === 'current'
                      ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                      : isDark
                      ? 'bg-[#121922] border-amber-500/40 text-amber-400'
                      : 'bg-white border-amber-500/40 text-amber-600 shadow'
                  }`}
                >
                  {isEdu ? <GraduationCap size={15} /> : <Briefcase size={15} />}
                </div>

                {/* Card */}
                <div
                  className={`rounded-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl ${
                    isDark
                      ? 'border border-white/10 bg-[#121922]'
                      : 'border border-slate-200 bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider font-mono ${
                          isDark ? 'text-amber-400' : 'text-amber-600'
                        }`}
                      >
                        {item.period}
                      </span>
                      {item.badge && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            item.badgeType === 'current'
                              ? isDark
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : isDark
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-amber-50 text-amber-700 border border-amber-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs flex items-center gap-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <Building2 size={13} />
                      {item.location}
                    </span>
                  </div>

                  <h3
                    className={`mt-3 text-xl font-black sm:text-2xl ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.role}
                  </h3>
                  <h4
                    className={`text-base font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {item.organization}
                  </h4>

                  <p
                    className={`mt-4 text-sm leading-relaxed sm:text-base ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {item.summary}
                  </p>

                  <div
                    className={`mt-5 space-y-2 border-t pt-4 ${
                      isDark ? 'border-white/5' : 'border-slate-100'
                    }`}
                  >
                    {item.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        <CheckCircle2
                          size={16}
                          className={`mt-0.5 shrink-0 ${
                            isDark ? 'text-amber-400' : 'text-amber-600'
                          }`}
                        />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
