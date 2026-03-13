import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { BriefcaseBusiness, Layers3, Rocket, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CountUpValue = ({ value, suffix = '' }) => {
  const valueRef = useRef(null);
  const isInView = useInView(valueRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return undefined;
    }

    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  return (
    <span ref={valueRef}>
      {displayValue}
      {suffix}
    </span>
  );
};

const StatItem = ({ icon, count, suffix, title, copy, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05 }}
      className="stats-card content-plane h-full rounded-[24px] p-5 text-left md:p-6"
    >
      <span aria-hidden="true" className="stats-card__glow" />
      <span aria-hidden="true" className="stats-card__bar" />

      <div className="relative z-[1]">
        <div className="mb-5 flex items-center justify-between">
          <div className="stats-card__icon flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary/12 text-primary">
            {React.createElement(icon, { size: 22 })}
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/82">
            0{index + 1}
          </span>
        </div>
        <p className="stats-card__value text-4xl font-black tracking-[-0.06em] md:text-[3.25rem]">
          <CountUpValue value={count} suffix={suffix} />
        </p>
        <h3 className="mt-3 text-base font-black uppercase tracking-[0.2em] text-foreground/90">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p>
      </div>
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
            count: yearsExperience,
            suffix: '+',
            title: 'Năm kinh nghiệm',
            copy: 'Từ giai đoạn intern đến backend product work trong môi trường thực tế.',
          },
          {
            icon: BriefcaseBusiness,
            count: 1,
            suffix: '+',
            title: 'Freelance work',
            copy: 'Các project nhận ngoài công việc chính, tập trung vào backend và workflow thực tế.',
          },
          {
            icon: Layers3,
            count: 3,
            suffix: '',
            title: 'Ưu tiên chính',
            copy: 'APIs, data flow và integrations cho các workflow nghiệp vụ.',
          },
          {
            icon: Wrench,
            count: 4,
            suffix: '',
            title: 'Trụ cột kỹ năng',
            copy: 'Backend, data, delivery và support cho end-to-end flow.',
          },
        ]
      : [
          {
            icon: Rocket,
            count: yearsExperience,
            suffix: '+',
            title: 'Years experience',
            copy: 'From internship work into backend product delivery in real environments.',
          },
          {
            icon: BriefcaseBusiness,
            count: 1,
            suffix: '+',
            title: 'Freelance work',
            copy: 'Selected work outside full-time roles, focused on backend delivery and practical workflows.',
          },
          {
            icon: Layers3,
            count: 3,
            suffix: '',
            title: 'Current priorities',
            copy: 'APIs, data flow, and integrations for real business workflows.',
          },
          {
            icon: Wrench,
            count: 4,
            suffix: '',
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
