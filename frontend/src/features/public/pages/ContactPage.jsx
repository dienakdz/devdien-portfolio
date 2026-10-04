import React, { useEffect, useState } from 'react';
import {
  Check,
  Facebook,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../context/ToastContext';
import { siteConfig } from '../../../data/siteConfig';
import { apiUrl } from '../../../lib/api';

export default function ContactPage({ theme, setTheme }) {
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDark = theme ? theme === 'dark' : true;

  const toggleTheme = () => {
    if (setTheme) {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
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
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const rawMessage = String(formData.get('message') || '').trim();

    if (!name || !email || !rawMessage) {
      showToast(
        lang === 'vi' ? 'Vui lòng điền đủ các trường bắt buộc.' : 'Please fill all required fields.',
        'error'
      );
      return;
    }

    const message = subject ? `[Subject: ${subject}]\n\n${rawMessage}` : rawMessage;

    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
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
    },
    {
      name: 'LinkedIn',
      href: siteConfig.linkedin,
      icon: Linkedin,
      desc: 'Minh Dien Nguyen',
    },
    {
      name: 'YouTube',
      href: siteConfig.youtubeChannel,
      icon: Youtube,
      desc: '@devdien',
    },
    {
      name: 'Facebook',
      href: siteConfig.facebook,
      icon: Facebook,
      desc: 'Nguyễn Minh Diện',
    },
  ];

  return (
    <div
      className={`min-h-screen antialiased overflow-x-hidden transition-colors duration-200 selection:bg-amber-500/20 selection:text-amber-400 ${
        isDark ? 'bg-[#0b1118] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Navbar theme={isDark ? 'dark' : 'light'} toggleTheme={toggleTheme} />

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {/* ========================================================================= */}
        {/* HEADER SECTION (Matching Mẫu C: Center Aligned Typography)               */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto">
          <h1
            className={`font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {lang === 'vi' ? 'Bắt Đầu Cuộc Trò Chuyện Trực Tiếp' : 'Start a Direct Conversation'}
          </h1>

          <p
            className={`mt-3 text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {lang === 'vi'
              ? 'Liên hệ trực tiếp qua kênh phương thức thuận tiện hoặc gửi lời nhắn nhanh bên dưới.'
              : 'Reach out via your preferred method or send a quick message.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SYMMETRICAL DUAL MONOLITH LAYOUT (Mẫu C Exact Match)                     */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* ======================================================================= */}
          {/* LEFT MONOLITH CARD: Direct Contact Hub                                  */}
          {/* ======================================================================= */}
          <div
            className={`flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl ${
              isDark
                ? 'border border-slate-800 bg-[#121922]'
                : 'border border-slate-200 bg-white shadow-slate-100'
            }`}
          >
            <div>
              {/* Card Title */}
              <h2
                className={`font-outfit text-xl sm:text-2xl font-bold tracking-tight mb-5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {lang === 'vi' ? 'Thông tin liên hệ trực tiếp' : 'Direct email'}
              </h2>

              {/* Direct Info Blocks Stack */}
              <div className="space-y-3.5">
                {/* Block 1: Direct Email with Click-to-Copy Button */}
                <div
                  className={`rounded-xl p-4 border transition-colors flex items-center justify-between gap-3 ${
                    isDark
                      ? 'border-slate-800 bg-[#0c1117]'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {lang === 'vi' ? 'Email trực tiếp' : 'Direct email'}
                      </p>
                      <p
                        className={`text-xs sm:text-sm font-semibold ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {siteConfig.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="shrink-0 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 text-xs font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    title={lang === 'vi' ? 'Sao chép email' : 'Click to copy'}
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={13} strokeWidth={3} className="text-slate-950" />
                        <span>{lang === 'vi' ? 'Đã sao chép' : 'Copied!'}</span>
                      </>
                    ) : (
                      <span>{lang === 'vi' ? 'Sao chép' : 'Click to-copy'}</span>
                    )}
                  </button>
                </div>

                {/* Block 2: Direct Phone Number */}
                <div
                  className={`rounded-xl p-4 border transition-colors flex items-center gap-3.5 ${
                    isDark
                      ? 'border-slate-800 bg-[#0c1117]'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {lang === 'vi' ? 'Số điện thoại' : 'Direct phone number'}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-semibold ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      {siteConfig.phone}
                    </p>
                  </div>
                </div>

                {/* Block 3: Location */}
                <div
                  className={`rounded-xl p-4 border transition-colors flex items-center gap-3.5 ${
                    isDark
                      ? 'border-slate-800 bg-[#0c1117]'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {lang === 'vi' ? 'Địa điểm' : 'Location'}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-semibold ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      {siteConfig.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Social Channels Dock & SLA Pill */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              {/* 4 Social Docks */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-all hover:-translate-y-0.5 ${
                        isDark
                          ? 'border-slate-800 bg-[#0c1117] text-slate-300 hover:text-amber-400 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-amber-600 hover:border-amber-500/50 hover:shadow-md'
                      }`}
                      title={s.desc}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>

              {/* SLA Response Pill */}
              <div className="mt-5 flex justify-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold ${
                    isDark
                      ? 'border border-slate-800 bg-[#0c1117] text-slate-400'
                      : 'border border-slate-200 bg-slate-100 text-slate-600'
                  }`}
                >
                  <span>&lt; 24h SLA</span>
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* RIGHT MONOLITH CARD: Direct Message Form                                */}
          {/* ======================================================================= */}
          <div
            className={`flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl ${
              isDark
                ? 'border border-slate-800 bg-[#121922]'
                : 'border border-slate-200 bg-white shadow-slate-100'
            }`}
          >
            <div>
              {/* Card Title */}
              <h2
                className={`font-outfit text-xl sm:text-2xl font-bold tracking-tight mb-5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {lang === 'vi' ? 'Gửi tin nhắn trực tiếp' : 'Direct message form'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {lang === 'vi' ? 'Họ và tên *' : 'Name'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'Name'}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors ${
                      isDark
                        ? 'border-slate-800 bg-[#0c1117] text-white placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors ${
                      isDark
                        ? 'border-slate-800 bg-[#0c1117] text-white placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                    }`}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {lang === 'vi' ? 'Chủ đề' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={lang === 'vi' ? 'Trao đổi về vị trí Backend Engineer...' : 'Subject'}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors ${
                      isDark
                        ? 'border-slate-800 bg-[#0c1117] text-white placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                    }`}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {lang === 'vi' ? 'Nội dung tin nhắn *' : 'Message'}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={
                      lang === 'vi'
                        ? 'Mô tả ngắn gọn về dự án, yêu cầu công việc hoặc nội dung bạn muốn trao đổi...'
                        : 'Message'
                    }
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors resize-y ${
                      isDark
                        ? 'border-slate-800 bg-[#0c1117] text-white placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                    }`}
                  />
                </div>

                {/* Submit Button (Matching Mẫu C) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      isDark
                        ? 'border-amber-500/60 bg-[#0c1117] hover:bg-amber-500/10 text-white shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-400'
                        : 'border-amber-500 bg-amber-50 hover:bg-amber-100 text-amber-900 shadow-sm'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-amber-400" />
                        <span>{lang === 'vi' ? 'Đang gửi tin nhắn...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="text-amber-400" />
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
