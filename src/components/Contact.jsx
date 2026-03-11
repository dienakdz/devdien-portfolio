import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Facebook,
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
  Phone,
  Send,
  Youtube,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { siteConfig } from '../data/siteConfig';

const Contact = () => {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClassName =
    'w-full rounded-[22px] border border-border/90 bg-background/84 px-5 py-4 text-foreground placeholder:text-muted-foreground/75 backdrop-blur-xl transition-colors focus:border-primary/60 focus:bg-background/96 dark:bg-card/88 dark:focus:bg-card';

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.email,
      href: siteConfig.emailHref,
    },
    {
      icon: Phone,
      label: t.contact.labelPhone,
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
    },
  ];

  const socialLinks = [
    { icon: Github, href: siteConfig.github, label: 'GitHub' },
    { icon: Linkedin, href: siteConfig.linkedin, label: 'LinkedIn' },
    { icon: Facebook, href: siteConfig.facebook, label: 'Facebook' },
    { icon: Youtube, href: siteConfig.youtube, label: 'YouTube' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('_subject', `Portfolio contact from ${formData.get('name') || 'unknown'}`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    setIsSubmitting(true);

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('submit_failed');
      }

      form.reset();
      showToast(t.toasts.successSend, 'success');
    } catch {
      showToast(t.toasts.errorSend, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="section-kicker mb-4">{t.contact.eyebrow}</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t.contact.title1} <span className="text-gradient">{t.contact.title2}</span>
          </motion.h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {t.contact.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="content-plane-strong rounded-[32px] p-8 md:p-10"
          >
            <p className="section-kicker">{t.contact.infoTitle}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              {lang === 'vi'
                ? 'Nếu hợp gu làm việc, bạn có thể gửi email trực tiếp hoặc để lại một lời nhắn ngắn. Tôi ưu tiên các cuộc trò chuyện rõ ràng, thực tế và có định hướng.'
                : 'If the fit feels right, send an email directly or leave a short note. I prefer conversations that are clear, practical, and intentional.'}
            </p>

            <div className="mt-8 grid gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="content-plane rounded-[24px] p-5 transition-colors hover:bg-background/94 dark:hover:bg-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-primary/12">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
                        <p className="mt-2 text-lg font-bold tracking-[-0.02em]">{item.value}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8">
              <p className="section-kicker">{t.contact.socialTitle}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="group content-plane rounded-[24px] px-4 py-5 text-center text-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-background/94 dark:hover:bg-card"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary/12 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon size={20} />
                      </div>
                      <p className="mt-4 text-sm font-bold">{social.label}</p>
                      <div className="mt-2 flex justify-center text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                        <ArrowUpRight size={15} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="content-plane-strong rounded-[32px] overflow-hidden p-8 md:p-10"
          >
            <p className="section-kicker">{t.contact.formTitle}</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] md:text-4xl">{t.contact.formHeading}</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              {t.contact.formDescription}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {t.contact.labelName}
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    className={inputClassName}
                    placeholder="Nguyen Minh Dien"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {t.contact.labelEmail}
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    className={inputClassName}
                    placeholder="name@email.com"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  {t.contact.labelMessage}
                </span>
                <textarea
                  required
                  name="message"
                  rows="6"
                  className={inputClassName}
                  placeholder={t.contact.placeholderMessage}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary w-full py-4 text-base disabled:translate-y-0 disabled:opacity-75 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    {t.contact.btnSend}
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
