import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

const Terminal = () => {
    const { lang, t, setLang } = useLanguage();
    const { showToast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [history, setHistory] = useState([
        { type: 'system', content: t.terminal.welcome }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: input }];

            switch (cmd) {
                case 'help':
                    newHistory.push({
                        type: 'output', content: lang === 'vi'
                            ? 'Các lệnh có sẵn: help, about, projects, contact, lang [en/vi], clear'
                            : 'Available commands: help, about, projects, contact, lang [en/vi], clear'
                    });
                    break;
                case 'about':
                    newHistory.push({ type: 'output', content: t.hero.description });
                    break;
                case 'projects':
                    newHistory.push({
                        type: 'output', content: lang === 'vi'
                            ? 'Đang hiển thị các dự án tiêu biểu... Hãy cuộn lên section Projects!'
                            : 'Displaying featured projects... Scroll up to the Projects section!'
                    });
                    break;
                case 'contact':
                    newHistory.push({ type: 'output', content: 'Email: minhdien.dev@gmail.com | Phone: +84 967 468 703' });
                    break;
                case 'clear':
                    setHistory([{ type: 'system', content: t.terminal.welcome }]);
                    setInput('');
                    return;
                case 'lang en':
                    setLang('en');
                    newHistory.push({ type: 'output', content: 'Language switched to English.' });
                    showToast('Language changed to English', 'info');
                    break;
                case 'lang vi':
                    setLang('vi');
                    newHistory.push({ type: 'output', content: 'Đã chuyển sang Tiếng Việt.' });
                    showToast('Đã chuyển sang Tiếng Việt', 'info');
                    break;
                default:
                    newHistory.push({
                        type: 'error', content: lang === 'vi'
                            ? `Lệnh không hợp lệ: ${cmd}. Gõ "help" để xem danh sách lệnh.`
                            : `Unknown command: ${cmd}. Type "help" for a list of commands.`
                    });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-24 w-14 h-14 rounded-full bg-foreground text-background shadow-2xl z-40 flex items-center justify-center border border-primary/20"
                >
                    <TerminalIcon size={24} />
                </motion.button>
            )}

            {/* Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? '40px' : '450px'
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`fixed bottom-8 right-8 w-full max-w-md bg-zinc-950 rounded-xl border border-primary/30 shadow-2xl z-50 overflow-hidden font-mono text-sm`}
                    >
                        {/* Header */}
                        <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <TerminalIcon size={14} className="text-primary-500" />
                                <span className="text-xs font-bold text-white/50">master@portfolio: ~</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:text-primary-500 transition-colors">
                                    {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:text-red-500 transition-colors">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        {!isMinimized && (
                            <div className="p-4 flex flex-col h-[calc(100%-40px)]">
                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto mb-4 space-y-2 custom-scrollbar"
                                >
                                    {history.map((item, idx) => (
                                        <div key={idx} className={`
                      ${item.type === 'input' ? 'text-white' : ''}
                      ${item.type === 'output' ? 'text-primary-400' : ''}
                      ${item.type === 'system' ? 'text-yellow-500/80' : ''}
                      ${item.type === 'error' ? 'text-red-500' : ''}
                    `}>
                                            {item.type === 'input' && <span className="text-primary-500 mr-2">$</span>}
                                            {item.content}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-primary-500">
                                    <span>$</span>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleCommand}
                                        className="bg-transparent border-none outline-none flex-1 text-white caret-primary-500"
                                        placeholder="..."
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Terminal;
