import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';

const fallbackPreloaderText = {
  boot: 'Preparing portfolio...',
  kernel: 'Visual system ready',
  assets: 'Loading selected work',
  ready: 'Almost there',
};

const Preloader = ({ onComplete }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  const preloaderText = t?.preloader || fallbackPreloaderText;

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
    const duration = 960;

    const tick = (now) => {
      const elapsed = now - start;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(tick);
      } else {
        finishTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 160);
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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/96 p-6 backdrop-blur-xl sm:p-12"
    >
      <div className="panel-strong w-full max-w-xl p-8 sm:p-10">
        <p className="section-kicker">Portfolio</p>
        <h2 className="mt-4 font-outfit text-4xl font-black tracking-[-0.05em] sm:text-5xl">
          {siteConfig.brand}
        </h2>
        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
          {preloaderText.assets}
        </p>

        <div className="mt-10 space-y-3">
          <div className="relative h-2 overflow-hidden rounded-full bg-foreground/6 dark:bg-white/8">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary/90 to-slate-500/70"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[0.72rem] font-black uppercase tracking-[0.24em] text-muted-foreground">
            <span>{preloaderText.boot}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="metric-chip">
            <p className="section-kicker">01</p>
            <p className="mt-3">{preloaderText.kernel}</p>
          </div>
          <div className="metric-chip">
            <p className="section-kicker">02</p>
            <p className="mt-3">{preloaderText.assets}</p>
          </div>
          <div className="metric-chip">
            <p className="section-kicker">03</p>
            <p className="mt-3">{preloaderText.ready}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
