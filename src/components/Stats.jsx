import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Award, Code, Rocket, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StatItem = ({ icon, value, label, suffix = "+" }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, { duration: 2, ease: "easeOut" });
        return controls.stop;
    }, [value]);

    return (
        <div className="flex flex-col items-center p-6 text-center group">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                {React.cloneElement(icon, { size: 24, className: "text-primary-500" })}
            </div>
            <div className="text-4xl font-black mb-1 flex items-baseline gap-1">
                <motion.span>{rounded}</motion.span>
                <span className="text-primary-500 text-2xl">{suffix}</span>
            </div>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{label}</p>
        </div>
    );
};

const Stats = () => {
    const { t } = useLanguage();

    const statsData = [
        { icon: <Award />, value: 2, label: t.stats.exp },
        { icon: <Rocket />, value: 2, label: t.stats.projects },
        { icon: <Code />, value: 100, label: t.stats.code, suffix: "K+" },
        { icon: <Users />, value: 99, label: t.stats.clients, suffix: "%" },
    ];

    return (
        <section className="py-12 border-y border-border bg-card/30 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, idx) => (
                        <StatItem key={idx} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
