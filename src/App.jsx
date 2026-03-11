import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Approach from './components/Approach.jsx';
import Preloader from './components/Preloader.jsx';
import Stats from './components/Stats.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import Experience from './components/Experience.jsx';
import AnimatedAuroraBackground from './components/AnimatedAuroraBackground.jsx';
import { ToastProvider } from './context/ToastContext';

function AppContent({ theme, setTheme }) {
  const [loading, setLoading] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio-preloaded') !== '1';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.documentElement.style.colorScheme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem('portfolio-preloaded', '1');
    } catch {
      // Ignore storage restrictions.
    }
    setLoading(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen overflow-x-hidden bg-background transition-colors duration-500"
          >
            <AnimatedAuroraBackground
              variant="soft"
              speed="slow"
              opacity={theme === 'dark' ? 0.62 : 0.3}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(99,208,190,0.14),transparent_68%)]" />
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <main className="relative z-10 pb-6">
              <Hero />
              <TechMarquee />
              <Stats />
              <Approach />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  return (
    <LanguageProvider>
      <ToastProvider>
        <AppContent theme={theme} setTheme={setTheme} />
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
