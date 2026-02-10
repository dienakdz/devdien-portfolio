import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Send, MessageCircle, Youtube, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

const Contact = () => {
    const { t } = useLanguage();
    const { showToast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        showToast(t.toasts.successSend, 'success');
    };

    const contactInfo = [
        {
            icon: <Mail className="text-emerald-500" />,
            label: 'Email',
            value: 'minhdien.dev@gmail.com',
            href: 'mailto:minhdien.dev@gmail.com'
        },
        {
            icon: <Phone className="text-green-500" />,
            label: t.contact.labelEmail,
            value: '+84 967 468 703',
            href: 'tel:+84967468703'
        }
    ];

    const socialLinks = [
        { icon: <Facebook size={24} />, href: 'https://www.facebook.com/dienne.dev', color: 'bg-blue-600' },
        { icon: <Youtube size={24} />, href: 'https://www.youtube.com/@devdien', color: 'bg-red-600' },
        { icon: <Github size={24} />, href: 'https://github.com/dienakdz', color: 'bg-zinc-800' },
        { icon: <Linkedin size={24} />, href: 'https://linkedin.com/in/devdien', color: 'bg-blue-700' },
    ];

    return (
        <section id="contact" className="section-padding bg-muted/30 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full" />

            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold mb-4"
                    >
                        <span className="text-glitch" data-text={t.contact.title1}>{t.contact.title1}</span> <span className="text-gradient">{t.contact.title2}</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-lg">{t.contact.description}</p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10">
                    {/* Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="h-full md:col-span-2"
                    >
                        <div className="p-8 md:p-12 rounded-[2rem] bg-card border border-border shadow-sm h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-primary-500">{t.contact.infoTitle}</h3>
                                <div className="space-y-8">
                                    {contactInfo.map((info, idx) => (
                                        <a
                                            key={idx}
                                            href={info.href}
                                            className="flex items-center gap-6 group"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                                                <p className="text-lg font-bold group-hover:text-primary-500 transition-colors">{info.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-border">
                                <p className="font-bold mb-6 uppercase tracking-widest text-xs text-muted-foreground">{t.contact.socialTitle}</p>
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((social, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={social.href}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${social.color} shadow-lg`}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-[2rem] bg-zinc-900 border border-white/5 shadow-2xl relative overflow-hidden h-full md:col-span-3"
                    >
                        {/* Decorative background for the form */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl -z-10" />

                        <h3 className="text-3xl font-bold mb-8 text-white">{t.contact.formTitle}</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/50 uppercase tracking-widest">{t.contact.labelName}</label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500 outline-none transition-all placeholder:text-white/20 text-white"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/50 uppercase tracking-widest">{t.contact.labelEmail}</label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500 outline-none transition-all placeholder:text-white/20 text-white"
                                        placeholder="name@email.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white/50 uppercase tracking-widest">{t.contact.labelMessage}</label>
                                <textarea
                                    required
                                    name="message"
                                    rows="4"
                                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500 outline-none transition-all placeholder:text-white/20 text-white"
                                    placeholder={t.contact.placeholderMessage}
                                ></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 rounded-2xl bg-primary-500 text-zinc-950 font-black text-lg flex items-center justify-center gap-3 hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
                            >
                                {t.contact.btnSend} <Send size={20} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section >
    );
};

export default Contact;
