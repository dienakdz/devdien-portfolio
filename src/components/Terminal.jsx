import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { siteConfig } from '../data/siteConfig';
import { projectData } from '../data/projectData';

const Terminal = () => {
  const { lang, t, setLang } = useLanguage();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState([{ type: 'system', content: t.terminal.welcome }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    const rawInput = input.trim();
    const command = rawInput.toLowerCase();

    if (!rawInput) {
      return;
    }

    if (command === 'clear') {
      setHistory([{ type: 'system', content: t.terminal.welcome }]);
      setInput('');
      return;
    }

    const nextItems = [{ type: 'input', content: rawInput }];

    switch (command) {
      case 'help':
        nextItems.push({
          type: 'output',
          content:
            lang === 'vi'
              ? 'Lệnh có sẵn: help, about, projects, contact, profile, lang [en/vi], clear'
              : 'Available commands: help, about, projects, contact, profile, lang [en/vi], clear',
        });
        break;
      case 'about':
        nextItems.push({ type: 'output', content: t.hero.description });
        break;
      case 'projects':
        nextItems.push({
          type: 'output',
          content: projectData[lang]
            .map((project) => project.title)
            .join(' / '),
        });
        break;
      case 'contact':
        nextItems.push({
          type: 'output',
          content: `Email: ${siteConfig.email} | Phone: ${siteConfig.phone}`,
        });
        break;
      case 'profile':
      case 'resume':
        window.open(siteConfig.profileUrl, '_blank', 'noopener,noreferrer');
        nextItems.push({ type: 'output', content: siteConfig.profileUrl });
        break;
      case 'lang en':
        setLang('en');
        nextItems.push({ type: 'output', content: 'Language switched to English.' });
        showToast('Language changed to English', 'info');
        break;
      case 'lang vi':
        setLang('vi');
        nextItems.push({ type: 'output', content: 'Đã chuyển sang Tiếng Việt.' });
        showToast('Đã chuyển sang Tiếng Việt', 'info');
        break;
      default:
        nextItems.push({
          type: 'error',
          content:
            lang === 'vi'
              ? `Lệnh không hợp lệ: ${command}. Gõ "help" để xem danh sách lệnh.`
              : `Unknown command: ${command}. Type "help" for a list of commands.`,
        });
    }

    setHistory((current) => [...current, ...nextItems]);
    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(true)}
          aria-label={t.terminal.openLabel}
          className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0d1822] text-white shadow-[0_18px_45px_-20px_rgba(9,19,27,0.72)] md:flex"
        >
          <TerminalIcon size={22} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? '52px' : '440px',
            }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="fixed bottom-6 right-6 z-50 hidden w-[min(92vw,34rem)] overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1822]/96 font-mono text-sm shadow-[0_24px_80px_-28px_rgba(9,19,27,0.8)] md:block"
          >
            <div className="flex items-center justify-between border-b border-white/8 bg-[#101d28]/84 px-4 py-3">
              <div className="flex items-center gap-2 text-white/70">
                <TerminalIcon size={14} className="text-primary" />
                <span className="text-xs font-bold">quick-terminal</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMinimized((value) => !value)}
                  className="rounded-full p-1 text-white/55 transition-colors hover:text-primary"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-white/55 transition-colors hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <div className="flex h-[calc(100%-52px)] flex-col p-4">
                <div ref={scrollRef} className="custom-scrollbar flex-1 space-y-2 overflow-y-auto pr-2">
                  {history.map((item, index) => (
                    <div
                      key={`${item.type}-${index}`}
                      className={
                        item.type === 'input'
                          ? 'text-white'
                          : item.type === 'output'
                            ? 'text-primary'
                            : item.type === 'error'
                              ? 'text-red-400'
                              : 'text-white/55'
                      }
                    >
                      {item.type === 'input' ? <span className="mr-2 text-primary">$</span> : null}
                      {item.content}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-white/8 pt-4 text-primary">
                  <span>$</span>
                  <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleCommand}
                    placeholder={t.terminal.placeholder}
                    className="flex-1 bg-transparent text-white placeholder:text-white/25"
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
