import React from 'react'
import { useLanguage } from '../context/LanguageContext'
const Footer = () => {
    const { lang, t } = useLanguage();
    return (
        <footer className="py-12 border-t border-border bg-card/50">
            <div className="container mx-auto px-6 text-center">
                <p className="text-muted-foreground">
                    &copy; {new Date().getFullYear()} <span className="text-primary font-semibold text-glitch" data-text="DevDien Portfolio">DevDien Portfolio</span>.
                    {lang === 'vi' ? 'Được chế tác bởi Nguyen Minh Dien aka DevDien.' : 'Crafted by Nguyen Minh Dien aka DevDien.'}
                </p>
            </div>
        </footer>
    )
}

export default Footer