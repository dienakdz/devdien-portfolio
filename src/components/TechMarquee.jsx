import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
    const technologies = [
        "React", "TailwindCSS",
        "Docker", "AWS", "PostgreSQL", "MySQL", "PHP", "Laravel",
        "Git", "Python"
    ];

    // Double the list to create seamless loop
    const doubledTechs = [...technologies, ...technologies];

    return (
        <div className="py-10 bg-zinc-950/50 border-y border-white/5 overflow-hidden flex whitespace-nowrap">
            <motion.div
                className="flex gap-12 items-center"
                animate={{ x: [0, -1035] }} // Adjust based on total width
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {doubledTechs.map((tech, idx) => (
                    <span
                        key={idx}
                        className="text-2xl md:text-3xl font-black text-white/20 hover:text-primary-500 transition-colors cursor-default uppercase tracking-tighter"
                    >
                        {tech}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default TechMarquee;
