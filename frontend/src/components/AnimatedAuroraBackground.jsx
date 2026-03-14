import React from 'react';
import { useReducedMotion } from 'framer-motion';
import './animated-aurora-background.css';

const createSeededRandom = (seed) => () => {
  const nextSeed = (seed * 1664525 + 1013904223) >>> 0;
  seed = nextSeed;
  return nextSeed / 4294967296;
};

const buildStarSet = (seed, count, config) => {
  const random = createSeededRandom(seed);

  for (let index = 0; index < count; index += 1) {
    config.items.push({
      id: `${config.prefix}-${index + 1}`,
      top: `${(random() * config.topSpread + config.topOffset).toFixed(2)}%`,
      left: `${(random() * config.leftSpread + config.leftOffset).toFixed(2)}%`,
      size: `${(random() * config.sizeSpread + config.sizeBase).toFixed(2)}px`,
      opacity: (random() * config.opacitySpread + config.opacityBase).toFixed(2),
      delay: `${(random() * config.delaySpread).toFixed(2)}s`,
      duration: `${(random() * config.durationSpread + config.durationBase).toFixed(2)}s`,
    });
  }
};

const buildMeteorSet = (seed, count) => {
  const random = createSeededRandom(seed);
  const colors = [
    'rgba(255,255,255,0.96)',
    'rgba(181,220,255,0.92)',
    'rgba(126,184,255,0.88)',
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `meteor-${index + 1}`,
    top: (random() * 78 + 4).toFixed(2),
    delay: (random() * 3.8 + index * 0.18).toFixed(2),
    duration: (random() * 2.4 + 4.6).toFixed(2),
    tail: (random() * 6 + 7.5).toFixed(2),
    opacity: (random() * 0.22 + 0.64).toFixed(2),
    color: colors[Math.floor(random() * colors.length)],
  }));
};

const nearStars = [];
const midStars = [];
const farStars = [];

buildStarSet(11, 76, {
  prefix: 'near',
  items: nearStars,
  topOffset: 4,
  topSpread: 72,
  leftOffset: 2,
  leftSpread: 96,
  sizeBase: 1.6,
  sizeSpread: 2,
  opacityBase: 0.58,
  opacitySpread: 0.26,
  delaySpread: 0,
  durationBase: 0,
  durationSpread: 0,
});

buildStarSet(29, 54, {
  prefix: 'mid',
  items: midStars,
  topOffset: 2,
  topSpread: 78,
  leftOffset: 0,
  leftSpread: 100,
  sizeBase: 1.15,
  sizeSpread: 1.3,
  opacityBase: 0.34,
  opacitySpread: 0.22,
  delaySpread: 0,
  durationBase: 0,
  durationSpread: 0,
});

buildStarSet(47, 36, {
  prefix: 'far',
  items: farStars,
  topOffset: 0,
  topSpread: 82,
  leftOffset: 0,
  leftSpread: 100,
  sizeBase: 0.9,
  sizeSpread: 0.9,
  opacityBase: 0.18,
  opacitySpread: 0.16,
  delaySpread: 0,
  durationBase: 0,
  durationSpread: 0,
});

const meteors = buildMeteorSet(73, 24);

const speedPresets = {
  slow: {
    near: '36s',
    mid: '54s',
    far: '74s',
    pulse: '24s',
    drift: '30s',
  },
  normal: {
    near: '28s',
    mid: '42s',
    far: '58s',
    pulse: '20s',
    drift: '24s',
  },
};

function AnimatedAuroraBackground({
  variant = 'soft',
  speed = 'slow',
  opacity = 0.8,
}) {
  const reducedMotion = useReducedMotion();
  const timing = speedPresets[speed] || speedPresets.slow;

  return (
    <div
      aria-hidden="true"
      className={`cosmic-background ${variant === 'vivid' ? 'cosmic-background--vivid' : ''} ${
        reducedMotion ? 'cosmic-background--reduced' : ''
      }`}
      style={{
        '--cosmic-opacity': opacity,
        '--cosmic-near-duration': timing.near,
        '--cosmic-mid-duration': timing.mid,
        '--cosmic-far-duration': timing.far,
        '--cosmic-pulse-duration': timing.pulse,
        '--cosmic-drift-duration': timing.drift,
      }}
    >
      <div className="cosmic-background__base" />
      <div className="cosmic-background__void" />
      <div className="cosmic-background__nebula cosmic-background__nebula--core" />
      <div className="cosmic-background__nebula cosmic-background__nebula--left" />
      <div className="cosmic-background__nebula cosmic-background__nebula--right" />
      <div className="cosmic-background__dust" />

      <div className="cosmic-background__starfield">
        {farStars.map((star) => (
          <span
            key={star.id}
            className="cosmic-background__star cosmic-background__star--far"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              '--star-delay': star.delay,
              '--star-duration': star.duration,
            }}
          />
        ))}
        {midStars.map((star) => (
          <span
            key={star.id}
            className="cosmic-background__star cosmic-background__star--mid"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              '--star-delay': star.delay,
              '--star-duration': star.duration,
            }}
          />
        ))}
        {nearStars.map((star) => (
          <span
            key={star.id}
            className="cosmic-background__star cosmic-background__star--near"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              '--star-delay': star.delay,
              '--star-duration': star.duration,
            }}
          />
        ))}
      </div>

      <div className="cosmic-background__meteor-field">
        {meteors.map((meteor) => (
          <span
            key={meteor.id}
            className="cosmic-background__meteor"
            style={{
              '--meteor-top': `${meteor.top}%`,
              '--meteor-delay': `${meteor.delay}s`,
              '--meteor-duration': `${meteor.duration}s`,
              '--meteor-tail': `${meteor.tail}rem`,
              '--meteor-opacity': meteor.opacity,
              '--meteor-color': meteor.color,
            }}
          />
        ))}
      </div>

      <div className="cosmic-background__grid" />
      <div className="cosmic-background__vignette" />
    </div>
  );
}

export default AnimatedAuroraBackground;
