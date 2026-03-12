import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    const toggleLang = () => {
        setLang(prevLang => prevLang === 'vi' ? 'en' : 'vi');
    };

    const t = translations[lang] || translations.en;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
