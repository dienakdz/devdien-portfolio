import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import MatrixBackground from './components/MatrixBackground';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader.jsx';
import Stats from './components/Stats.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import Experience from './components/Experience.jsx';
import Terminal from './components/Terminal.jsx';
import { ToastProvider } from './context/ToastContext';

function AppContent({ theme, setTheme }) {
  const [loading, setLoading] = useState(true);

  //Theme logic could also be in a provider
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AnimatePresence mode='wait'>
      {loading ? (
        <Preloader key="preloader" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-background transition-colors duration-500 overflow-hidden cursor-none">
          <CustomCursor />
          <MatrixBackground />
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <main>
            <Hero />
            <Stats />
            <TechMarquee />
            <Projects />
            <Skills />
            <Experience />
            <Terminal />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  return (
    <LanguageProvider>
      <ToastProvider>
        <AppContent theme={theme} setTheme={setTheme} />
      </ToastProvider>
    </LanguageProvider>
  )
}

export default App
