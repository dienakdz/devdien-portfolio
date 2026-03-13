import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Languages, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import '../admin.css';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang, toggleLang } = useLanguage();
  const { showToast } = useToast();
  const { isAuthenticated, signIn } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const redirectTo = location.state?.from || '/admin';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await signIn({ email, password });
      showToast(t.toasts.loginSuccess, 'success');
      navigate(redirectTo, { replace: true });
    } catch (error) {
      showToast(error.message || t.toasts.loginError, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cosmic-login">
      <svg className="cosmic-login__filters" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="cosmic-electric-border"
            colorInterpolationFilters="sRGB"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.035"
              numOctaves="2"
              seed="7"
              result="noisePrimary"
            >
              <animate
                attributeName="baseFrequency"
                values="0.008 0.035;0.012 0.05;0.008 0.035"
                dur="5.6s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.014 0.12"
              numOctaves="1"
              seed="19"
              result="noiseDetail"
            >
              <animate
                attributeName="baseFrequency"
                values="0.014 0.12;0.02 0.18;0.014 0.12"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feBlend in="noisePrimary" in2="noiseDetail" mode="screen" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
              result="distortedBorder"
            />
            <feGaussianBlur in="distortedBorder" stdDeviation="0.22" result="softenedBorder" />
            <feColorMatrix
              in="softenedBorder"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -7"
              result="electricBorder"
            />
            <feMerge>
              <feMergeNode in="electricBorder" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="cosmic-login__stars" />
      <div className="cosmic-login__nebula cosmic-login__nebula--left" />
      <div className="cosmic-login__nebula cosmic-login__nebula--right" />
      <div className="cosmic-login__orbit" />
      <div className="cosmic-login__core" />

      <header className="cosmic-login__topbar">
        <Link to="/" className="cosmic-login__brand">
          <span className="cosmic-login__brand-mark">DD</span>
          <div className="cosmic-login__brand-copy">
            <span className="cosmic-login__brand-label">DEVDIEN ADMIN</span>
            <span className="cosmic-login__brand-value">Private workspace</span>
          </div>
        </Link>

        <div className="cosmic-login__topbar-actions">
          <button type="button" onClick={toggleLang} className="cosmic-login__ghost">
            <Languages size={16} />
            <span>{lang.toUpperCase()}</span>
          </button>
          <Link to="/" className="cosmic-login__ghost">
            <ArrowLeft size={16} />
            <span>{t.auth.backToSite}</span>
          </Link>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="cosmic-login__panel"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="cosmic-login__panel-border"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect
            className="cosmic-login__panel-border-base"
            x="1.5"
            y="1.5"
            width="97"
            height="97"
            rx="7"
            pathLength="100"
          />
          <rect
            className="cosmic-login__panel-border-glow"
            x="1.5"
            y="1.5"
            width="97"
            height="97"
            rx="7"
            pathLength="100"
          />
          <rect
            className="cosmic-login__panel-border-trail"
            x="1.5"
            y="1.5"
            width="97"
            height="97"
            rx="7"
            pathLength="100"
          />
        </svg>
        <span aria-hidden="true" className="cosmic-login__corner-spark cosmic-login__corner-spark--top-left" />
        <span aria-hidden="true" className="cosmic-login__corner-spark cosmic-login__corner-spark--top-right" />
        <span aria-hidden="true" className="cosmic-login__corner-spark cosmic-login__corner-spark--bottom-right" />
        <span aria-hidden="true" className="cosmic-login__corner-spark cosmic-login__corner-spark--bottom-left" />

        <div className="cosmic-login__panel-badge">
          <ShieldCheck size={15} />
          <span>{t.auth.eyebrow}</span>
        </div>

        <div className="cosmic-login__panel-copy">
          <h1 className="cosmic-login__title">
            {t.auth.title1} <span>{t.auth.title2}</span>
          </h1>
          <p className="cosmic-login__description">{t.auth.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="cosmic-login__form">
          <label className="cosmic-login__field">
            <span>{t.auth.email}</span>
            <div className="cosmic-login__input">
              <Mail size={18} />
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@yourdomain.com"
                required
              />
            </div>
          </label>

          <label className="cosmic-login__field">
            <span>{t.auth.password}</span>
            <div className="cosmic-login__input">
              <LockKeyhole size={18} />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          <button type="submit" className="cosmic-login__submit" disabled={submitting}>
            <span>{submitting ? t.auth.submitting : t.auth.submit}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.section>
    </div>
  );
}
