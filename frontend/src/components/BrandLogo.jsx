import React from 'react';

/**
 * BrandLogo component for DevDien
 * Features dynamic light/dark mode contrast:
 * - Dark mode: Luminous glowing amber-gold (#fef08a -> #f59e0b -> #d97706)
 * - Light mode: Rich, razor-sharp warm bronze amber (#ea580c -> #d97706 -> #92400e)
 * Ensures high contrast (WCAG AAA) and crispness on both obsidian and white backgrounds.
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
          {/* Dark Mode Luminous Radiant Gold */}
          <linearGradient id="brand-zen-gold-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Light Mode Deep High-Contrast Bronze Amber */}
          <linearGradient id="brand-zen-gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="45%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>

        {/* DARK MODE: Luminous Gold against Obsidian */}
        <g className="hidden dark:inline">
          <path
            d="M 32 16 H 50 C 72 16 86 30 86 50 C 86 70 72 84 50 84 H 32 C 24 84 18 78 18 70 V 30 C 18 22 24 16 32 16 Z"
            stroke="url(#brand-zen-gold-dark)"
            strokeWidth="9"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 48 34 C 57 34 64 41 64 50 C 64 59 57 66 48 66 C 54 62 56 56 56 50 C 56 44 54 38 48 34 Z"
            fill="url(#brand-zen-gold-dark)"
          />
        </g>

        {/* LIGHT MODE: Crisp Optical Stroke Width & High Contrast Bronze Gold */}
        <g className="inline dark:hidden">
          <path
            d="M 32 16 H 50 C 72 16 86 30 86 50 C 86 70 72 84 50 84 H 32 C 24 84 18 78 18 70 V 30 C 18 22 24 16 32 16 Z"
            stroke="url(#brand-zen-gold-light)"
            strokeWidth="10.5"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 48 34 C 57 34 64 41 64 50 C 64 59 57 66 48 66 C 54 62 56 56 56 50 C 56 44 54 38 48 34 Z"
            fill="url(#brand-zen-gold-light)"
          />
        </g>
      </svg>
    );
  }

  // Concept 06 - The Dual Lenses (Dual Mode Support)
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
        <linearGradient id="brand-lens-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="brand-lens-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* Dark version */}
      <g className="hidden dark:inline">
        <path
          d="M 28 20 C 56 20 74 36 74 50 C 74 64 56 80 28 80"
          stroke="url(#brand-lens-dark)"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 72 80 C 44 80 26 64 26 50 C 26 36 44 20 72 20"
          stroke="#ffffff"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="50,42 58,50 50,58 42,50" fill="#fef08a" />
      </g>

      {/* Light version */}
      <g className="inline dark:hidden">
        <path
          d="M 28 20 C 56 20 74 36 74 50 C 74 64 56 80 28 80"
          stroke="url(#brand-lens-light)"
          strokeWidth="11.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 72 80 C 44 80 26 64 26 50 C 26 36 44 20 72 20"
          stroke="#0f172a"
          strokeWidth="9.5"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="50,42 58,50 50,58 42,50" fill="#d97706" />
      </g>
    </svg>
  );
};

export default BrandLogo;
