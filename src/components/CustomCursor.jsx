import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const dotX = useTransform(pointerX, (latest) => latest - 5);
  const dotY = useTransform(pointerY, (latest) => latest - 5);
  const ringBaseX = useSpring(pointerX, { damping: 30, stiffness: 360, mass: 0.32 });
  const ringBaseY = useSpring(pointerY, { damping: 30, stiffness: 360, mass: 0.32 });
  const ringX = useTransform(ringBaseX, (latest) => latest - 20);
  const ringY = useTransform(ringBaseY, (latest) => latest - 20);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );

    const updateState = () => setIsEnabled(mediaQuery.matches);
    updateState();
    mediaQuery.addEventListener('change', updateState);

    return () => mediaQuery.removeEventListener('change', updateState);
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove('cursor-fx');
      return undefined;
    }

    const handlePointerMove = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const handleMouseOver = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const clickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button';

      setIsHovering(Boolean(clickable));
    };

    document.body.classList.add('cursor-fx');
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('cursor-fx');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isEnabled, pointerX, pointerY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-foreground will-change-transform"
        style={{
          x: dotX,
          y: dotY,
        }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-primary/60 will-change-transform"
        animate={{
          scale: isHovering ? 1.55 : 1,
          opacity: isHovering ? 0.7 : 0.34,
        }}
        style={{
          x: ringX,
          y: ringY,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      />
    </>
  );
};

export default CustomCursor;
