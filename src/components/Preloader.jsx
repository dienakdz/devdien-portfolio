import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const Preloader = ({ onComplete }) => {
    const { t } = useLanguage();
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);

    //Defensive check for t.preloader
    const preloaderText = t?.preloader || {
        boot: 'Starting system...',
        kernel: 'Kernel OK',
        assets: 'Loading assets...',
        ready: 'System Ready',
    };

    const bootLogs = [
        `> [SYSTEM] ${preloaderText.boot}`,
        `> [KERNEL] ${preloaderText.kernel}... v6.1.0-master`,
        `> [NETWORK] Initializing eth0... OK`,
        `> [ASSETS] ${preloaderText.assets}`,
        `> [GRAPHICS] Loading 3D textures... OK`,
        `> [UI] Initializing Glassmorphism... OK`,
        `> [SHADERS] Compiling terminal green... DONE`,
        `> [STATUS] ${preloaderText.ready}`
    ];

    useEffect(() => {
        let currentLog = 0;
        const interval = setInterval(() => {
            if (currentLog < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[currentLog]]);
                setProgress(((currentLog + 1) / bootLogs.length) * 100);
                currentLog++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 800);
            }
        }, 150);

        return () => clearInterval(interval);
    }, [bootLogs.length, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6 sm:p-12 font-mono"
        >
            <div className="w-full max-w-2xl">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-primary-500 text-xs font-bold uppercase tracking-widest">Master Boot Sequence</span>
                </div>

                <div className="h-64 overflow-hidden mb-8 space-y-2">
                    {logs.map((log, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-primary-500/80 text-sm sm:text-base"
                        >
                            {log}
                        </motion.div>
                    ))}
                    <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-2 h-5 bg-primary-500 inline-block"
                    />
                </div>

                <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-primary-500"
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-white/30 uppercase font-black">
                    <span>Booting</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;