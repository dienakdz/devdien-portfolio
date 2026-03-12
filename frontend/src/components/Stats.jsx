import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Layers3, Rocket, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StatItem = ({ icon, value, title, copy, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05 }}
      className="content-plane h-full rounded-[24px] p-5 text-left transition-transform duration-300 hover:-translate-y-1 md:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary/12 text-primary">
          {React.createElement(icon, { size: 22 })}
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/82">
          0{index + 1}
        </span>
      </div>
      <p className="text-4xl font-black tracking-[-0.06em] md:text-[3.25rem]">{value}</p>
      <h3 className="mt-3 text-base font-black uppercase tracking-[0.2em] text-foreground/90">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p>
    </motion.div>
  );
};

const Stats = () => {
  const { lang } = useLanguage();
  const startDate = new Date(2023, 5, 1);
  const today = new Date();
  const diffMonths =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    (today.getMonth() - startDate.getMonth());
  const yearsExperience = Math.max(1, Math.floor(diffMonths / 12));

  const statsData =
    lang === 'vi'
      ? [
          {
            icon: Rocket,
            value: `${yearsExperience}+`,
            title: 'Năm kinh nghiệm',
            copy: 'Từ giai đoạn intern đến backend product work trong môi trường thực tế.',
          },
          {
            icon: BriefcaseBusiness,
            value: '1+',
            title: 'Freelance work',
            copy: 'Các project nhận ngoài công việc chính, tập trung vào backend và workflow thực tế.',
          },
          {
            icon: Layers3,
            value: '3',
            title: 'Ưu tiên chính',
            copy: 'APIs, data flow và integrations cho các workflow nghiệp vụ.',
          },
          {
            icon: Wrench,
            value: '4',
            title: 'Trụ cột kỹ năng',
            copy: 'Backend, data, delivery và support cho end-to-end flow.',
          },
        ]
      : [
          {
            icon: Rocket,
            value: `${yearsExperience}+`,
            title: 'Years experience',
            copy: 'From internship work into backend product delivery in real environments.',
          },
          {
            icon: BriefcaseBusiness,
            value: '1+',
            title: 'Freelance work',
            copy: 'Selected work outside full-time roles, focused on backend delivery and practical workflows.',
          },
          {
            icon: Layers3,
            value: '3',
            title: 'Current priorities',
            copy: 'APIs, data flow, and integrations for real business workflows.',
          },
          {
            icon: Wrench,
            value: '4',
            title: 'Core pillars',
            copy: 'Backend, data, delivery, and support across the full product flow.',
          },
        ];

  return (
    <section className="px-6 pb-8 md:px-10 lg:px-20 xl:px-24">
      <div className="container mx-auto">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatItem key={stat.title} index={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
