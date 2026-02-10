import React from 'react';
import { motion } from 'framer-motion';
import {
    Database,
    Terminal,
    Cpu,
    Layout
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
    const { t } = useLanguage();
    const categories = [
        {
            title: 'Frontend',
            icon: <Layout className="text-emerald-500" />,
            skills: ['React', 'Tailwind', 'HTML', 'CSS', 'JavaScript', 'Bootstrap']
        },
        {
            title: 'Backend',
            icon: <Terminal className="text-green-500" />,
            skills: ['Python', 'FastAPI', 'PHP', 'Laravel']
        },
        {
            title: 'Database',
            icon: <Database className="text-teal-500" />,
            skills: ['MySQL', 'PostgreSQL', 'SQL Server']
        },
        {
            title: 'Infrastructure',
            icon: <Cpu className="text-cyan-500" />,
            skills: ['Docker', 'AWS', 'CI/CD', 'Nginx', 'Vercel']
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="section-padding bg-muted/30">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold mb-4"
                    >
                        <span className="text-glitch" data-text={t.skills.title1}>{t.skills.title1}</span> <span className="text-gradient">{t.skills.title2}</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-lg">
                        {t.skills.description}
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6">
                                {cat.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full bg-muted text-foreground text-xs font-semibold border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
