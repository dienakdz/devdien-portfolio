import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';

const fallbackPreloaderText = {
  boot: 'Initializing presentation layer',
  kernel: 'Visual engine online',
  assets: 'Syncing selected work',
  ready: 'Preparing the experience',
};

const Preloader = ({ onComplete }) => {
  const { t, lang } = useLanguage();
  const [progress, setProgress] = useState(0);

  const preloaderText = t?.preloader || fallbackPreloaderText;
  const phaseItems = [
    { code: '01', label: preloaderText.boot },
    { code: '02', label: preloaderText.kernel },
    { code: '03', label: preloaderText.assets },
    { code: '04', label: preloaderText.ready },
  ];

  const activePhase =
    progress < 22
      ? 0
      : progress < 48
        ? 1
        : progress < 82
          ? 2
          : 3;

  const progressValue = Math.round(progress);
  const progressLabel = String(progressValue).padStart(2, '0');
  const circleRadius = 92;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  const introCopy =
    lang === 'vi'
      ? 'Một opening sequence ngắn gọn, chỉn chu và thiên về cảm giác product-grade trước khi vào portfolio.'
      : 'A short, product-grade opening sequence before the portfolio surface comes into view.';

  const systemCards = [
    {
      label: lang === 'vi' ? 'Vai trò' : 'Role',
      value: siteConfig.role,
    },
    {
      label: lang === 'vi' ? 'Hiện tại' : 'Current',
      value: siteConfig.company,
    },
    {
      label: lang === 'vi' ? 'Địa điểm' : 'Location',
      value: siteConfig.location,
    },
  ];
  const chamberCards = [
    {
      label: lang === 'vi' ? 'Stack' : 'Core stack',
      value: 'Python / FastAPI',
    },
    {
      label: lang === 'vi' ? 'Trọng tâm' : 'Primary focus',
      value: lang === 'vi' ? 'API, dữ liệu, tích hợp' : 'APIs, data, integrations',
    },
    {
      label: lang === 'vi' ? 'Nguyên tắc' : 'Build mode',
      value: lang === 'vi' ? 'Rõ ràng và bền vững' : 'Clear and durable',
    },
  ];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 160);

      return () => clearTimeout(timer);
    }

    let frame;
    let finishTimer;
    const start = performance.now();
    const duration = 1420;

    const tick = (now) => {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const nextProgress = easedProgress * 100;
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(tick);
      } else {
        finishTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 240);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(14px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] overflow-hidden bg-background p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(78,154,170,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,var(--background),var(--background))] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(99,208,190,0.14),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(58,104,139,0.18),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%),linear-gradient(180deg,var(--background),var(--background))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(20,33,43,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(20,33,43,0.22)_1px,transparent_1px)] [background-size:44px_44px] dark:opacity-[0.12]" />

      <motion.div
        className="absolute -left-[10%] top-[-12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(78,154,170,0.18),transparent_64%)] blur-[120px] dark:bg-[radial-gradient(circle,rgba(47,124,130,0.24),transparent_66%)]"
        animate={{ x: [0, 24, -14, 0], y: [0, 16, -12, 0], scale: [1, 1.06, 0.96, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10%] top-[4%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(197,217,229,0.22),transparent_66%)] blur-[120px] dark:bg-[radial-gradient(circle,rgba(76,185,169,0.22),transparent_66%)]"
        animate={{ x: [0, -20, 16, 0], y: [0, -18, 14, 0], scale: [1, 0.94, 1.04, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.82, 1, 0.84] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(99,208,190,0.12),transparent)]"
        animate={{ y: ['-100%', '180%'] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-8 rounded-[34px] border border-border/70 bg-white/42 p-6 shadow-[0_40px_120px_-78px_rgba(9,18,24,0.28)] backdrop-blur-2xl dark:bg-white/[0.03] sm:p-8 lg:p-10"
          >
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-background/68 px-4 py-2 text-[11px] font-black uppercase tracking-[0.26em] text-foreground/76 dark:bg-card/78">
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(99,208,190,0.65)]" />
                {lang === 'vi' ? 'Khởi động portfolio' : 'Portfolio boot sequence'}
              </div>

              <p className="mt-8 text-[0.72rem] font-black uppercase tracking-[0.32em] text-primary/90">
                {siteConfig.role}
              </p>

              <h2 className="mt-4 max-w-[11ch] font-outfit text-[clamp(3.6rem,10vw,7.4rem)] leading-[0.84] tracking-[-0.08em] text-foreground">
                {siteConfig.brand}
              </h2>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {lang === 'vi' ? 'Portfolio theo chuẩn product' : 'Product-grade portfolio system'}
              </p>

              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground md:text-[1.02rem]">
                {introCopy}
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_13rem]">
              <div className="rounded-[28px] border border-border/80 bg-background/70 p-5 backdrop-blur-2xl dark:bg-card/78">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary/88">
                      {lang === 'vi' ? 'Tiến trình hệ thống' : 'System progress'}
                    </p>
                    <p className="mt-3 text-5xl font-black tracking-[-0.07em] text-foreground">
                      {progressLabel}
                      <span className="text-xl text-muted-foreground">%</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/80">
                      {phaseItems[activePhase].code}
                    </p>
                    <p className="mt-2 max-w-[10rem] text-sm leading-6 text-muted-foreground">
                      {phaseItems[activePhase].label}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="relative h-2 overflow-hidden rounded-full bg-foreground/6 dark:bg-white/8">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-accent-solid to-[#7ab9c6]"
                      style={{ width: `${progress}%` }}
                    />
                    <motion.div
                      className="absolute inset-y-[-10px] w-[4.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0))] blur-md"
                      style={{ left: `calc(${progress}% - 2.75rem)` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {systemCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-border/80 bg-background/66 px-4 py-3 backdrop-blur-xl dark:bg-card/78"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/82">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground/88">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {phaseItems.map((item, index) => {
                const isActive = index <= activePhase;

                return (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 + index * 0.06 }}
                    className={`rounded-[24px] border px-4 py-4 transition-colors duration-300 ${
                      isActive
                        ? 'border-primary/24 bg-primary/10 shadow-[0_18px_48px_-32px_rgba(99,208,190,0.28)]'
                        : 'border-border/75 bg-background/56 dark:bg-card/64'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary/86">
                        {item.code}
                      </p>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-primary shadow-[0_0_16px_rgba(99,208,190,0.55)]' : 'bg-border'}`}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground/82">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[38px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.18))] p-4 shadow-[0_44px_140px_-78px_rgba(9,18,24,0.38)] backdrop-blur-2xl dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] sm:p-5">
              <div className="relative min-h-[27rem] overflow-hidden rounded-[30px] border border-white/8 bg-[#07121a] p-5 sm:min-h-[34rem] sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,208,190,0.15),transparent_24%),radial-gradient(circle_at_18%_24%,rgba(48,94,121,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%)]" />
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

                <motion.div
                  className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(99,208,190,0.18),transparent)]"
                  animate={{ y: ['-100%', '220%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                <div className="relative z-10 flex items-center justify-between gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/64">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#63d0be]" />
                    {lang === 'vi' ? 'Trình tự hiển thị' : 'Live sequence'}
                  </span>
                  <span>{siteConfig.brand}</span>
                </div>

                <div className="relative flex min-h-[22rem] items-center justify-center sm:min-h-[28rem]">
                  <motion.div
                    className="absolute h-[22rem] w-[22rem] rounded-full border border-white/8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute h-[18rem] w-[18rem] rounded-full border border-primary/18"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute h-[14rem] w-[14rem] rounded-full border border-white/10"
                    animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.58, 0.3] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute h-[19rem] w-[19rem] rounded-full bg-[radial-gradient(circle,rgba(99,208,190,0.16),transparent_68%)] blur-3xl" />
                  </div>

                  <motion.div
                    className="absolute h-[20rem] w-[20rem]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_rgba(99,208,190,0.8)]" />
                    <div className="absolute right-[7%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/80" />
                    <div className="absolute bottom-[8%] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#7ab9c6]" />
                  </motion.div>

                  <div className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/22 to-transparent" />
                  <div className="absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/18 to-transparent" />

                  <svg className="relative z-10 h-[17rem] w-[17rem] -rotate-90" viewBox="0 0 240 240" aria-hidden="true">
                    <circle
                      cx="120"
                      cy="120"
                      r={circleRadius}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="120"
                      cy="120"
                      r={circleRadius}
                      fill="none"
                      stroke="url(#preloader-ring)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      style={{ strokeDashoffset: strokeOffset }}
                    />
                    <defs>
                      <linearGradient id="preloader-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#63d0be" />
                        <stop offset="55%" stopColor="#7ad9cb" />
                        <stop offset="100%" stopColor="#7ab9c6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute z-20 text-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.26em] text-primary">
                      {phaseItems[activePhase].code}
                    </p>
                    <p className="mt-3 text-6xl font-black tracking-[-0.08em] text-white">
                      {progressLabel}
                    </p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/54">
                      {lang === 'vi' ? 'hoàn tất' : 'percent'}
                    </p>
                    <p className="mt-4 max-w-[11rem] text-sm leading-6 text-white/72">
                      {phaseItems[activePhase].label}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 grid gap-3 sm:grid-cols-3">
                  {chamberCards.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-xl"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/86">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/78">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
