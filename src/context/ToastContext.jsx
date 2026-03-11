import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'success') => {
        const id = crypto.randomUUID?.() || Math.random().toString(36).slice(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => removeToast(id), 5000);
    }, [removeToast]);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="text-emerald-500" size={18} />;
            case 'error': return <AlertCircle className="text-red-500" size={18} />;
            case 'info': return <Info className="text-blue-500" size={18} />;
            default: return <Info className="text-primary-500" size={18} />;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div
                aria-live="polite"
                className="pointer-events-none fixed bottom-6 left-6 z-[200] flex max-w-sm flex-col gap-3"
            >
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="pointer-events-auto flex min-w-[300px] items-center gap-3 rounded-2xl border border-white/20 bg-background/90 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl"
                        >
                            {getIcon(toast.type)}
                            <span className="flex-1 text-sm text-foreground/85">{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-foreground/45 transition-colors hover:text-foreground/80"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}
