import React from 'react';

/**
 * BrandLogo component for DevDien
 * Default: Concept 05: The Zen Eclipse (Vầng Nhật Thực Zen Tối Giản)
 * Supports dynamic scaling, responsive light/dark mode contrast.
 */
export const BrandLogo = ({ size = 20, className = '', variant = 'zen-eclipse' }) => {
  if (variant === 'zen-eclipse') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="DevDien Zen Eclipse Logo"
      >
        <defs>
          <linearGradient id="brand-zen-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        <path
          d="M 32 16 H 50 C 72 16 86 30 86 50 C 86 70 72 84 50 84 H 32 C 24 84 18 78 18 70 V 30 C 18 22 24 16 32 16 Z"
          stroke="url(#brand-zen-gold)"
          strokeWidth="9"
          fill="none"
        />
        <path
          d="M 48 34 C 57 34 64 41 64 50 C 64 59 57 66 48 66 C 54 62 56 56 56 50 C 56 44 54 38 48 34 Z"
          fill="url(#brand-zen-gold)"
        />
      </svg>
    );
  }

  // Default: Concept 06 - The Dual Lenses
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DevDien Dual Lenses Logo"
    >
      <defs>
        <linearGradient id="brand-lens-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Golden Ratio Amber Arc */}
      <path
        d="M 28 20 C 56 20 74 36 74 50 C 74 64 56 80 28 80"
        stroke="url(#brand-lens-amber)"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      {/* Intersecting Platinum/White Arc (adapts automatically to theme) */}
      <path
        d="M 72 80 C 44 80 26 64 26 50 C 26 36 44 20 72 20"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        className="text-slate-900 dark:text-white"
      />
      {/* Central Diamond Spark */}
      <polygon points="50,42 58,50 50,58 42,50" fill="#fef08a" />
    </svg>
  );
};

export default BrandLogo;
