import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Play, ExternalLink, ListVideo } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';

export default function YouTubeShowcase({ isDark = true }) {
  const { t, lang } = useLanguage();
  const yt = t?.aboutPage?.youtube || {};

  const featuredItems = yt.featuredItems || [
    {
      id: 'fastapi-tutorial-video',
      type: 'video',
      title:
        'FastAPI Python cho người mới bắt đầu | Book Management API trong 3 giờ (CRUD + Upload + SQLAlchemy)',
      category: 'Python & FastAPI',
      badge: lang === 'vi' ? 'Video Nổi Bật • Tutorial' : 'Featured Video • Masterclass',
      duration: lang === 'vi' ? '3 Giờ Thực Chiến' : '3-Hour Deep Dive',
      description:
        lang === 'vi'
          ? 'Khóa học thực chiến xây dựng hoàn chỉnh Book Management REST API từ con số 0 với Python, FastAPI, SQLAlchemy ORM, SQLite/PostgreSQL và xử lý file upload.'
          : 'Hands-on tutorial building a complete Book Management REST API from scratch with Python, FastAPI, SQLAlchemy ORM, and file uploads.',
      url: 'https://youtu.be/fX3lGg99Wzk?si=iE-OR0sh58AfzPgY',
      thumbnail: 'https://i.ytimg.com/vi/fX3lGg99Wzk/hqdefault.jpg',
      actionText: lang === 'vi' ? 'Xem video trên YouTube' : 'Watch on YouTube',
    },
    {
      id: 'laravel-ecommerce-playlist',
      type: 'playlist',
      title:
        'Xây Dựng Website Bán Thực Phẩm Online Bằng Laravel Từ A đến Z — Có Thanh Toán Trực Tuyến & Gợi Ý Cá Nhân Hóa',
      category: 'PHP & Laravel Fullstack',
      badge: lang === 'vi' ? 'Trọn Bộ Playlist • Series' : 'Complete Series • Playlist',
      duration: lang === 'vi' ? 'Series A - Z (Nhiều tập)' : 'Full Series A - Z',
      description:
        lang === 'vi'
          ? 'Series hướng dẫn toàn diện từ thiết kế database, luồng xác thực, giỏ hàng, tích hợp cổng thanh toán trực tuyến đến thuật toán gợi ý sản phẩm cá nhân hóa.'
          : 'In-depth series covering database architecture, auth flows, shopping carts, online payment gateway integration, and smart product recommendation algorithms.',
      url: 'https://www.youtube.com/playlist?list=PLIro1GlPm0pwapdOtDe8uHKqLk0CDDctL',
      thumbnail: 'https://i.ytimg.com/vi/-Mm0_nct3Ic/hqdefault.jpg',
      actionText: lang === 'vi' ? 'Xem trọn bộ Playlist' : 'Open Full Playlist',
    },
  ];

  return (
    <section
      id="youtube"
      className={`relative py-16 md:py-24 border-y overflow-hidden ${
        isDark ? 'bg-[#0a0f16] border-white/5' : 'bg-slate-100/70 border-slate-200'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[600px] bg-red-600/10 blur-[120px] rounded-full" />

      <div className="container relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
              isDark
                ? 'border border-red-500/25 bg-red-500/10 text-red-400'
                : 'border border-red-500/30 bg-red-50 text-red-600'
            }`}
          >
            <Youtube size={15} className="text-red-500 fill-current" />
            <span>{yt.eyebrow || 'Kênh YouTube @devdien'}</span>
          </div>
          <h2
            className={`mt-4 font-outfit text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {yt.title || 'Chia Sẻ Lập Trình Thực Chiến'}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {yt.description ||
              'Nơi tôi chia sẻ kiến thức chuyên sâu về backend, xây dựng hệ thống và các dự án thực chiến từ con số 0.'}
          </p>

          {/* Quick Subscribe & View Channel Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.youtubeSubscribeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#e62117] hover:bg-[#ff0000] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:scale-105"
            >
              <Youtube size={18} className="fill-current" />
              <span>{yt.subscribeBtn || 'Đăng ký kênh @devdien'}</span>
            </a>

            <a
              href={siteConfig.youtubeChannel}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                isDark
                  ? 'border border-white/10 bg-[#121922] text-slate-300 hover:text-white hover:border-white/25'
                  : 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:text-slate-900 hover:border-slate-400'
              }`}
            >
              <span>{yt.viewChannel || 'Xem trên YouTube'}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* 2 Featured Cards: 1 Video Tutorial + 1 Complete Playlist Series */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredItems.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl p-3.5 sm:p-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer ${
                isDark
                  ? 'border border-white/10 bg-[#121922]'
                  : 'border border-slate-200 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

                {/* Top Badges */}
                <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md border border-white/10">
                    {item.type === 'playlist' ? (
                      <ListVideo size={13} />
                    ) : (
                      <Play size={12} className="fill-current" />
                    )}
                    <span>{item.badge}</span>
                  </span>
                  <span className="rounded-full bg-black/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-slate-200 border border-white/10 backdrop-blur-md shadow-sm">
                    {item.duration}
                  </span>
                </div>

                {/* Center Action Button (Play / Playlist) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex h-13 w-13 items-center justify-center rounded-full bg-red-600/90 text-white shadow-xl shadow-red-600/40 transition-all duration-300 group-hover:scale-115 group-hover:bg-red-500">
                    {item.type === 'playlist' ? (
                      <ListVideo size={24} />
                    ) : (
                      <Play size={22} className="ml-1 fill-current" />
                    )}
                  </div>
                </div>

                {/* Bottom Category Tag & Channel Watermark */}
                <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-300 pointer-events-none">
                  <span className="rounded-md bg-black/75 px-2.5 py-0.5 border border-white/10 text-amber-300 backdrop-blur-sm">
                    {item.category}
                  </span>
                  <span className="font-mono text-slate-400">@devdien</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <h3
                    className={`text-base sm:text-lg font-bold line-clamp-2 leading-snug transition-colors group-hover:text-red-500 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                      isDark ? 'text-slate-300/90' : 'text-slate-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Footer Action Link */}
                <div
                  className={`mt-4 flex items-center justify-between pt-3 border-t text-xs ${
                    isDark ? 'border-white/5' : 'border-slate-100'
                  }`}
                >
                  <span
                    className={`inline-flex items-center gap-1.5 font-bold transition-colors ${
                      isDark ? 'text-amber-400 group-hover:text-amber-300' : 'text-amber-600 group-hover:text-amber-700'
                    }`}
                  >
                    <span>{item.actionText}</span>
                    <ExternalLink size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">YouTube Official</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
