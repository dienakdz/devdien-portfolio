import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const blobPalettes = {
  soft: [
    'from-[#c5d9e5]/12 via-[#c5d9e5]/4 to-transparent dark:from-[#2f7c82]/22 dark:via-[#123039]/10',
    'from-[#9db9c8]/10 via-[#9db9c8]/4 to-transparent dark:from-[#4cb9a9]/22 dark:via-[#18414a]/12',
    'from-[#d8e4eb]/8 via-[#d8e4eb]/3 to-transparent dark:from-[#305e79]/20 dark:via-[#162a38]/10',
  ],
  vivid: [
    'from-[#d7e8f1]/14 via-[#9db9c8]/5 to-transparent dark:from-[#2f7c82]/26 dark:via-[#184f53]/12',
    'from-[#9db9c8]/12 via-[#d7e8f1]/5 to-transparent dark:from-[#4cb9a9]/22 dark:via-[#245567]/12',
    'from-[#d2e1e8]/10 via-[#c5d9e5]/4 to-transparent dark:from-[#3b6d86]/20 dark:via-[#213742]/10',
  ],
};

const speedMap = {
  slow: 34,
  normal: 24,
};

const layers = [
  {
    className: '-left-16 top-[-10%] h-[30rem] w-[30rem] md:h-[38rem] md:w-[38rem]',
    animate: {
      x: [0, 30, -16, 0],
      y: [0, -20, 18, 0],
      scale: [1, 1.06, 0.98, 1],
      rotate: [0, 6, -4, 0],
    },
  },
  {
    className: 'right-[-12%] top-[4%] h-[26rem] w-[26rem] md:h-[34rem] md:w-[34rem]',
    animate: {
      x: [0, -28, 22, 0],
      y: [0, 18, -20, 0],
      scale: [1, 0.96, 1.06, 1],
      rotate: [0, -8, 6, 0],
    },
  },
  {
    className: 'bottom-[-16%] left-[18%] h-[28rem] w-[28rem] md:h-[35rem] md:w-[35rem]',
    animate: {
      x: [0, 20, -18, 0],
      y: [0, -14, 24, 0],
      scale: [1, 1.04, 0.96, 1],
      rotate: [0, 5, -4, 0],
    },
  },
];

function AnimatedAuroraBackground({
  variant = 'soft',
  speed = 'slow',
  opacity = 0.8,
}) {
  const reducedMotion = useReducedMotion();
  const palette = blobPalettes[variant] || blobPalettes.soft;
  const duration = speedMap[speed] || speedMap.slow;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,var(--background),var(--background))] dark:bg-[radial-gradient(circle_at_top,rgba(99,208,190,0.16),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_28%),linear-gradient(180deg,var(--background),var(--background))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(197,217,229,0.08),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(157,185,200,0.06),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(216,228,235,0.04),transparent_28%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(47,124,130,0.28),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(76,185,169,0.22),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(48,94,121,0.2),transparent_28%)]" />

      <motion.div
        className="absolute -left-[10%] top-[-18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(197,217,229,0.1),transparent_68%)] blur-[120px] dark:bg-[radial-gradient(circle,rgba(47,124,130,0.26),transparent_68%)]"
        animate={reducedMotion ? undefined : { x: [0, 24, -10, 0], y: [0, 18, -14, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: duration + 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      />
      <motion.div
        className="absolute right-[-12%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(157,185,200,0.1),transparent_68%)] blur-[120px] dark:bg-[radial-gradient(circle,rgba(76,185,169,0.24),transparent_68%)]"
        animate={reducedMotion ? undefined : { x: [0, -22, 14, 0], y: [0, -18, 18, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: duration + 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      />

      {layers.map((layer, index) => (
        <motion.div
          key={layer.className}
          className={`absolute rounded-full bg-gradient-to-br blur-3xl md:blur-[110px] ${layer.className} ${palette[index]}`}
          style={{ opacity: index === 1 ? opacity * 0.72 : opacity }}
          animate={reducedMotion ? undefined : layer.animate}
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: duration + index * 6,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }
          }
        />
      ))}

      <motion.div
        className="absolute left-[-12%] top-[6%] h-[42rem] w-[18rem] rotate-[26deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_62%)] blur-[90px] dark:bg-[linear-gradient(180deg,rgba(99,208,190,0.1),transparent_62%)]"
        animate={reducedMotion ? undefined : { x: [0, 18, -16, 0], opacity: [0.18, 0.26, 0.16, 0.18] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: duration + 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      />
      <motion.div
        className="absolute right-[-8%] top-[2%] h-[38rem] w-[14rem] -rotate-[18deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_62%)] blur-[82px] dark:bg-[linear-gradient(180deg,rgba(76,142,174,0.08),transparent_62%)]"
        animate={reducedMotion ? undefined : { x: [0, -14, 12, 0], opacity: [0.14, 0.22, 0.12, 0.14] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: duration + 24, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      />

      <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(rgba(20,33,43,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(20,33,43,0.28)_1px,transparent_1px)] [background-size:44px_44px] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(20,33,43,0.02)_64%,var(--background)_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.2)_64%,var(--background)_100%)]" />
    </div>
  );
}

export default AnimatedAuroraBackground;
