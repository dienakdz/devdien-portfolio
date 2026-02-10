import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';

const Projects = () => {
    const { t, lang } = useLanguage();

    const projects = [
        {
            title: 'Travela - Tour Booking',
            description: lang === 'vi'
                ? 'Hệ thống đặt tour du lịch tích hợp công nghệ Python để xử lý dữ liệu và thuật toán gợi ý điểm đến thông minh.'
                : 'Tour booking system integrated with Python for data processing and smart destination recommendation algorithms.',
            image: project1,
            tags: ['Laravel', 'PHP', 'Python', 'MySQL'],
            live: '#',
            github: 'https://github.com/dienakdz/travela'
        },
        {
            title: 'Veggie - Food Store',
            description: lang === 'vi'
                ? 'Nền tảng thương mại điện tử thực phẩm sạch, tích hợp đơn vị vận chuyển GHN và hệ thống quản lý kho hàng tối ưu.'
                : 'Clean food e-commerce platform, integrating GHN shipping service and optimized inventory management system.',
            image: project2,
            tags: ['Laravel', 'PHP', 'MySQL', 'API GHN'],
            live: '#',
            github: 'https://github.com/dienakdz/veggie'
        }
    ];

    return (
        <section id="projects" className="section-padding overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-extrabold mb-4"
                        >
                            <span className="text-glitch" data-text={t.projects.title1}>{t.projects.title1}</span> <span className="text-gradient">{t.projects.title2}</span>
                        </motion.h2>
                        <p className="text-muted-foreground text-lg">
                            {t.projects.description}
                        </p>
                    </div>
                    <motion.a
                        href="https://github.com"
                        target="_blank"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                    >
                        {t.projects.viewAll} <ExternalLink size={20} />
                    </motion.a>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                    <motion.a
                                        href={project.live}
                                        whileHover={{ y: -5 }}
                                        className="w-14 h-14 rounded-full bg-white text-foreground flex items-center justify-center shadow-xl"
                                    >
                                        <ExternalLink size={24} />
                                    </motion.a>
                                    <motion.a
                                        href={project.github}
                                        whileHover={{ y: -5 }}
                                        className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-xl"
                                    >
                                        <Github size={24} />
                                    </motion.a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary-600 rounded-full border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary-500 transition-colors">{project.title}</h3>
                                <p className="text-muted-foreground text-lg mb-0 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
