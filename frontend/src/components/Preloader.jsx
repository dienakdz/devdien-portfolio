import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedName, siteConfig } from '../data/siteConfig';
import profileImg from '../assets/profile.jpg';
import './preloader.css';

const fallbackPreloaderText = {
  label: 'Opening portfolio',
  phases: {
    boot: 'align',
    kernel: 'lock',
    assets: 'sync',
    ready: 'open',
  },
};

const CONTAINER_EASE = [0.22, 1, 0.36, 1];
const LOADER_DURATION = 1080;
const MIN_VISIBLE_TIME = 920;
const PROGRESS_TIMELINE = [
  { at: 0, value: 0 },
  { at: 0.18, value: 12 },
  { at: 0.42, value: 38 },
  { at: 0.68, value: 67 },
  { at: 0.86, value: 88 },
  { at: 1, value: 96 },
];
const PHASE_THRESHOLDS = [0, 28, 60, 88];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeOutCubic = (value) => 1 - (1 - value) ** 3;

const getTimelineValue = (progress) => {
  for (let index = 0; index < PROGRESS_TIMELINE.length - 1; index += 1) {
    const current = PROGRESS_TIMELINE[index];
    const next = PROGRESS_TIMELINE[index + 1];

    if (progress <= next.at) {
      const localProgress = clamp((progress - current.at) / (next.at - current.at), 0, 1);
      const eased = easeOutCubic(localProgress);

      return current.value + (next.value - current.value) * eased;
    }
  }

  return PROGRESS_TIMELINE[PROGRESS_TIMELINE.length - 1].value;
};

const wait = (duration) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });

const preloadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    const finish = () => resolve();

    image.onload = finish;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      resolve();
    }
  });

const waitForCriticalAssets = async () => {
  const tasks = [preloadImage(profileImg)];

  if (document.fonts?.ready) {
    tasks.push(document.fonts.ready.catch(() => undefined));
  }

  await Promise.allSettled(tasks);
};

const getBrandMonogram = (brand) => {
  const initials = brand.match(/[A-Z]/g)?.slice(0, 2).join('');

  if (initials) {
    return initials;
  }

  return brand.slice(0, 2).toUpperCase();
};

const Preloader = ({ onComplete }) => {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const readyToFinishRef = useRef(false);
  const completedRef = useRef(false);

  const preloaderText = t?.preloader || fallbackPreloaderText;
  const phaseEntries = [
    {
      key: 'boot',
      label: preloaderText.phases?.boot || fallbackPreloaderText.phases.boot,
      threshold: PHASE_THRESHOLDS[0],
    },
    {
      key: 'kernel',
      label: preloaderText.phases?.kernel || fallbackPreloaderText.phases.kernel,
      threshold: PHASE_THRESHOLDS[1],
    },
    {
      key: 'assets',
      label: preloaderText.phases?.assets || fallbackPreloaderText.phases.assets,
      threshold: PHASE_THRESHOLDS[2],
    },
    {
      key: 'ready',
      label: preloaderText.phases?.ready || fallbackPreloaderText.phases.ready,
      threshold: PHASE_THRESHOLDS[3],
    },
  ];

  const progressValue = Math.round(progress);
  const currentPhaseIndex = phaseEntries.reduce((activeIndex, phase, index) => {
    if (progressValue >= phase.threshold) {
      return index;
    }

    return activeIndex;
  }, 0);
  const currentPhase = phaseEntries[currentPhaseIndex];
  const brandMonogram = getBrandMonogram(siteConfig.brand);
  const localizedName = getLocalizedName(lang);

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    let finishTimer = 0;

    readyToFinishRef.current = false;
    completedRef.current = false;

    const complete = () => {
      if (cancelled || completedRef.current) {
        return;
      }

      completedRef.current = true;
      setProgress(100);

      finishTimer = window.setTimeout(() => {
        if (!cancelled) {
          onComplete?.();
        }
      }, reduceMotion ? 80 : 180);
    };

    const start = performance.now();

    const tick = (now) => {
      if (cancelled) {
        return;
      }

      const rawProgress = clamp((now - start) / LOADER_DURATION, 0, 1);
      const nextProgress = rawProgress >= 1 && readyToFinishRef.current
        ? 100
        : getTimelineValue(rawProgress);

      setProgress(nextProgress);

      if (rawProgress < 1 || !readyToFinishRef.current) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      complete();
    };

    if (reduceMotion) {
      setProgress(96);
    } else {
      frameId = window.requestAnimationFrame(tick);
    }

    Promise.all([waitForCriticalAssets(), wait(reduceMotion ? 120 : MIN_VISIBLE_TIME)]).then(() => {
      if (cancelled) {
        return;
      }

      readyToFinishRef.current = true;

      if (reduceMotion) {
        complete();
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.32, delay: 0.12, ease: CONTAINER_EASE } }}
      className="preloader-console"
    >
      <p className="sr-only">{`${preloaderText.label || fallbackPreloaderText.label}: ${progressValue}%`}</p>

      <div className="preloader-console__backdrop" />
      <div className="preloader-console__aurora" />
      <div className="preloader-console__grid ambient-grid" />
      <div className="preloader-console__noise noise-overlay" />
      <div className="preloader-console__vignette" />

      <motion.div
        className="preloader-console__halo"
        animate={reduceMotion ? undefined : { scale: [0.96, 1.04, 0.98], opacity: [0.54, 0.78, 0.58] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.32, ease: CONTAINER_EASE } }}
      />

      <motion.section
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14, scale: 0.96, filter: 'blur(12px)', transition: { duration: 0.28, ease: CONTAINER_EASE } }}
        transition={{ duration: 0.64, ease: CONTAINER_EASE }}
        className="preloader-console__shell"
      >
        <div className="preloader-console__shell-grid ambient-grid" />
        <div className="preloader-console__shell-noise noise-overlay" />
        <div className="preloader-console__sheen" />

        <div className="preloader-console__header">
          <div className="preloader-console__brand">
            <span className="preloader-console__monogram">{brandMonogram}</span>
            <div className="preloader-console__brand-copy">
              <p className="preloader-console__eyebrow">{preloaderText.label}</p>
              <h2 className="preloader-console__title">{siteConfig.brand}</h2>
            </div>
          </div>

          <div className="preloader-console__status-chip">
            <motion.span
              className="preloader-console__status-dot"
              animate={reduceMotion ? undefined : { scale: [1, 1.28, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span>{currentPhase.label}</span>
          </div>
        </div>

        <div className="preloader-console__body">
          <div className="preloader-console__copy">
            <p className="preloader-console__name">{localizedName}</p>
            <p className="preloader-console__descriptor">{siteConfig.role}</p>

            <div className="preloader-console__progress-meta">
              <span>{currentPhase.label}</span>
              <span>{String(progressValue).padStart(2, '0')}%</span>
            </div>

            <div className="preloader-console__progress-track" aria-hidden="true">
              <span
                className="preloader-console__progress-fill"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>

          <div className="preloader-console__visual" aria-hidden="true">
            <motion.div
              className="preloader-console__orbit"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'linear' }}
            >
              <span className="preloader-console__orbit-dot" />
            </motion.div>

            <motion.div
              className="preloader-console__ring"
              style={{ '--preloader-progress': `${progressValue}%` }}
              animate={reduceMotion ? undefined : { rotate: [0, 4, -4, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="preloader-console__ring-core">
                <div className="preloader-console__ring-value-wrap">
                  <span className="preloader-console__ring-value">{String(progressValue).padStart(2, '0')}</span>
                  <span className="preloader-console__ring-unit">%</span>
                </div>
                <span className="preloader-console__ring-phase">{currentPhase.label}</span>
              </div>
            </motion.div>

            <motion.span
              className="preloader-console__scan"
              animate={reduceMotion ? undefined : { y: ['-46%', '46%', '-46%'] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <div className="preloader-console__phases">
          {phaseEntries.map((phase, index) => {
            const isComplete = progressValue >= phase.threshold;
            const isCurrent = index === currentPhaseIndex;

            return (
              <div
                key={phase.key}
                className={`preloader-console__phase${isComplete ? ' preloader-console__phase--complete' : ''}${isCurrent ? ' preloader-console__phase--current' : ''}`}
              >
                <span className="preloader-console__phase-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="preloader-console__phase-label">{phase.label}</span>
                <span className="preloader-console__phase-bar" />
              </div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Preloader;
