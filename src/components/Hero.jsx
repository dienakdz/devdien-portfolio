import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    return (
        <section id="hero" className="min-h-screen flex items-center section-padding relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-emerald-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-teal-500/5 blur-[100px] rounded-full" />

            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-4 py-1.5 rounded-full bg-primary/10 text-primary-600 text-sm font-semibold mb-6 inline-block"
                    >
                        {t.hero.badge}
                    </motion.span>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1]">
                        <span className="text-glitch" data-text={t.hero.title1}>{t.hero.title1}</span> <span className="text-gradient">{t.hero.title2}</span> <span className="text-glitch" data-text={t.hero.title3}>{t.hero.title3}</span>
                    </h1>

                    <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary-700 transition-all"
                        >
                            {t.hero.btnContact} <ArrowRight size={20} />
                        </motion.a>
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-4 bg-muted text-foreground rounded-2xl font-bold border border-border hover:bg-muted/80 transition-all"
                        >
                            {t.hero.btnCV} <Download size={20} />
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, type: "spring" }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-full max-w-[450px] aspect-square">
                        {/* Rotating Outer Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-dashed border-primary-500/30"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 rounded-full border border-primary-500/10"
                        />

                        {/* Main Orbit Frame */}
                        <div className="absolute inset-8 rounded-full border-2 border-primary-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden bg-zinc-950 p-2">
                            {/* Scanline Effect */}
                            <motion.div
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-1 bg-primary-500/30 z-20 blur-sm pointer-events-none"
                            />

                            <div className="w-full h-full rounded-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 group">
                                <img
                                    src={profileImg}
                                    alt="DevDien Full-Stack Developer Profile"
                                    fetchPriority="high"
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                />
                                {/* Glow Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                            </div>
                        </div>

                        {/* Floating Tech Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 right-10 px-4 py-2 bg-zinc-900 border border-primary-500/30 rounded-full text-[10px] font-black tracking-widest text-primary-500 z-30 shadow-xl"
                        >
                            BACKEND DEVELOPER
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-4 left-10 px-4 py-2 bg-zinc-900 border border-primary-500/30 rounded-full text-[10px] font-black tracking-widest text-white/50 z-30 shadow-xl"
                        >
                            PYTHON / FASTAPI
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
