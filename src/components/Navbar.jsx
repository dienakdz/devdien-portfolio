import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";

//Force re-parse for Vite refresh

const Navbar = ({theme, toggleTheme}) => {
    const { lang, t, toggleLang } = useLanguage();
    const { showToast } = useToast();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.about, href: '#hero' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.experience, href: '#experience' },
        { name: t.nav.contact, href: '#contact' },
    ];

    const handleThemeToggle = () => {
        toggleTheme();
        showToast(t.toasts.themeChanged, 'info');
    };

    const handleLangToggle = () => {
        toggleLang();
        showToast(lang === 'vi' ? 'English activated' : 'Đã kích hoạt Tiếng Việt', 'info');
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
            {/* Ultra-slim Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-primary-500 origin-left z-[60] shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ scaleX }}
            />

            <div className="container mx-auto px-6">
                <div className={`relative flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-500 border border-border/10 backdrop-blur-2xl ${scrolled ? 'bg-background/80 shadow-2xl translate-y-2 border-border/50' : 'bg-transparent border-transparent'}`}>

                    {/* Brand / Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center border border-primary-500/20 group-hover:bg-primary-500 group-hover:text-zinc-950 transition-all duration-300">
                            <TerminalIcon size={20} className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tighter text-foreground uppercase leading-none text-glitch" data-text="DEVDIEN">DEVDIEN</span>
                            <span className="text-[10px] font-bold text-primary-500 tracking-[0.2em] uppercase leading-none mt-1">Portfolio v1.0</span>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-12">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li
                                    key={link.name}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className="relative px-2 py-1"
                                >
                                    <a
                                        href={link.href}
                                        className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${hoveredLink === link.name ? 'text-primary-500' : 'text-foreground/60'}`}
                                    >
                                        {link.name}
                                    </a>
                                    {/* Animated Underline */}
                                    <AnimatePresence>
                                        {hoveredLink === link.name && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                exit={{ width: 0 }}
                                                className="absolute bottom-0 left-0 h-[2px] bg-primary-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                            />
                                        )}
                                    </AnimatePresence>
                                </li>
                            ))}
                        </ul>

                        <div className="h-6 w-[1px] bg-foreground/10" />

                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleThemeToggle}
                                aria-label="Toggle Theme"
                                className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/70 hover:text-primary-500 hover:bg-foreground/10 transition-all border border-foreground/5"
                            >
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </motion.button>

                            {/* Lang Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLangToggle}
                                aria-label="Toggle Language"
                                className="px-4 py-2 rounded-lg bg-primary-500/10 text-primary-500 text-[10px] font-black uppercase tracking-widest border border-primary-500/20 hover:bg-primary-500 hover:text-zinc-950 transition-all"
                            >
                                {lang === 'vi' ? 'English' : 'Tiếng Việt'}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Mobile Menu"
                            className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/70 border border-foreground/10"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-full left-0 w-full px-6 pt-4"
                    >
                        <div className="bg-background/95 backdrop-blur-3xl border border-foreground/10 rounded-3xl p-8 shadow-3xl">
                            <ul className="flex flex-col gap-6 mb-12">
                                {navLinks.map((link, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <a
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-2xl font-black text-foreground hover:text-primary-500 transition-colors uppercase tracking-tighter flex items-center justify-between group"
                                        >
                                            {link.name}
                                            <div className="w-2 h-2 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={handleThemeToggle}
                                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-foreground/5 text-foreground/70 border border-foreground/5 font-bold uppercase text-[10px] tracking-widest"
                                >
                                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                                </button>
                                <button
                                    onClick={handleLangToggle}
                                    className="py-4 rounded-2xl bg-primary-500 text-zinc-950 font-black uppercase text-[10px] tracking-widest"
                                >
                                    {lang === 'vi' ? 'English' : 'Tiếng Việt'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;