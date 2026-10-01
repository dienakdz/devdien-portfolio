import React, { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  Facebook,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Youtube,
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../context/ToastContext';
import { siteConfig } from '../../../data/siteConfig';
import { apiUrl } from '../../../lib/api';

export default function ContactPage({ theme, setTheme }) {
  const { lang, t } = useLanguage();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    showToast(
      lang === 'vi' ? 'Đã sao chép địa chỉ email!' : 'Email copied to clipboard!',
      'success'
    );
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      showToast(
        lang === 'vi' ? 'Vui lòng điền đủ các trường.' : 'Please fill all required fields.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('submit_failed');

      form.reset();
      showToast(
        lang === 'vi'
          ? 'Cảm ơn bạn! Lời nhắn đã được gửi thành công.'
          : 'Thank you! Your message was sent successfully.',
        'success'
      );
    } catch {
      showToast(
        lang === 'vi'
          ? 'Không thể gửi tin nhắn lúc này. Vui lòng liên hệ trực tiếp qua email!'
          : 'Could not send message. Please contact via email directly.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteConfig.github,
      icon: Github,
      desc: '@dienakdz',
      color: 'hover:text-white',
    },
    {
      name: 'YouTube',
      href: siteConfig.youtubeChannel,
      icon: Youtube,
      desc: '@devdien',
      color: 'hover:text-red-500',
    },
    {
      name: 'LinkedIn',
      href: siteConfig.linkedin,
      icon: Linkedin,
      desc: 'Minh Dien Nguyen',
      color: 'hover:text-cyan-400',
    },
    {
      name: 'Facebook',
      href: siteConfig.facebook,
      icon: Facebook,
      desc: 'Nguyễn Minh Diện',
      color: 'hover:text-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        
        {/* HEADER */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <MessageSquare size={14} />
            <span>{lang === 'vi' ? 'Sẵn Sàng Hợp Tác' : 'Open for Collaboration'}</span>
          </div>

          <h1 className="mt-4 font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {lang === 'vi' ? 'Kết Nối Với Tôi' : 'Let\'s Connect & Build'}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {lang === 'vi'
              ? 'Bạn đang tìm kiếm kỹ sư backend cho dự án, cần tư vấn kiến trúc hệ thống hoặc muốn trao đổi chuyên môn? Hãy gửi lời nhắn cho tôi bên dưới.'
              : 'Looking for a backend engineer for your team, need architecture consulting, or want to discuss technical ideas? Drop me a message below.'}
          </p>
        </div>

        {/* 2-COLUMN LAYOUT */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm dark:border-white/8 dark:bg-[#121922]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-500 dark:text-amber-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </p>
                    <p className="font-outfit text-base font-bold text-foreground">
                      {siteConfig.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-lg border border-border/70 bg-muted/40 p-2 text-muted-foreground hover:text-amber-500 hover:border-amber-400 transition-colors cursor-pointer dark:border-white/10 dark:bg-white/5"
                  title="Sao chép email"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground dark:border-white/5">
                <span>{lang === 'vi' ? 'Thời gian phản hồi:' : 'Response time:'}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {lang === 'vi' ? 'Trong vòng 24 giờ' : 'Within 24 hours'}
                </span>
              </div>
            </div>

            {/* Location & Details Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm dark:border-white/8 dark:bg-[#121922]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/30 text-muted-foreground dark:border-white/5 dark:bg-white/5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {lang === 'vi' ? 'Địa điểm' : 'Location'}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {siteConfig.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/30 text-muted-foreground dark:border-white/5 dark:bg-white/5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {lang === 'vi' ? 'Điện thoại' : 'Phone'}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {siteConfig.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels Grid */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col rounded-xl border border-border/70 bg-card p-3.5 transition-all hover:border-amber-400/40 hover:shadow-sm dark:border-white/8 dark:bg-[#121922]"
                  >
                    <div className="flex items-center justify-between">
                      <Icon size={16} className="text-muted-foreground" />
                      <span className="text-[10px] font-mono text-muted-foreground/80">LINK</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-foreground">
                      {s.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {s.desc}
                    </span>
                  </a>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm dark:border-white/8 dark:bg-[#121922]">
              <h2 className="font-outfit text-xl sm:text-2xl font-bold text-foreground">
                {lang === 'vi' ? 'Gửi Lời Nhắn Trực Tiếp' : 'Send a Direct Message'}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {lang === 'vi'
                  ? 'Điền thông tin và yêu cầu của bạn, tin nhắn sẽ được chuyển trực tiếp vào hộp thư của tôi.'
                  : 'Fill in your details and message, and it will be routed directly to my inbox.'}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {lang === 'vi' ? 'Họ và tên *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                      className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-amber-500 transition-colors dark:border-white/10 dark:bg-[#0b1118]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-amber-500 transition-colors dark:border-white/10 dark:bg-[#0b1118]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {lang === 'vi' ? 'Nội dung tin nhắn *' : 'Message *'}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={
                      lang === 'vi'
                        ? 'Mô tả ngắn gọn về dự án, yêu cầu công việc hoặc nội dung bạn muốn trao đổi...'
                        : 'Describe your project, team opportunity, or what you would like to discuss...'
                    }
                    className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-amber-500 transition-colors dark:border-white/10 dark:bg-[#0b1118] resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{lang === 'vi' ? 'Đang gửi...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{lang === 'vi' ? 'Gửi tin nhắn ngay' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
