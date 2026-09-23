import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Calendar,
  Layers,
  Briefcase,
  GraduationCap,
  Trophy,
  Compass,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_VISIBLE_COUNT = 8;

export default function AboutGallery({ isDark = true }) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const galleryData = t?.aboutPage?.gallery || {};
  const galleryItems = galleryData.items || [];
  const categoriesMap = galleryData.categories || {
    all: lang === 'vi' ? 'Tất cả' : 'All Moments',
    career: lang === 'vi' ? 'Sự nghiệp & TMA' : 'Career & TMA',
    education: lang === 'vi' ? 'Học vấn & VKU' : 'Education & VKU',
    sports: lang === 'vi' ? 'Thể thao & Giải đấu' : 'Sports & League',
    lifestyle: lang === 'vi' ? 'Đời sống & Du lịch' : 'Lifestyle & Travel',
  };

  const categoryIcons = {
    all: Layers,
    career: Briefcase,
    education: GraduationCap,
    sports: Trophy,
    lifestyle: Compass,
  };

  const categoryKeys = ['all', 'career', 'education', 'sports', 'lifestyle'];

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: galleryItems.length };
    categoryKeys.forEach((key) => {
      if (key !== 'all') {
        counts[key] = galleryItems.filter((item) => item.category === key).length;
      }
    });
    return counts;
  }, [galleryItems]);

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  // Visible photos sliced by visibleCount
  const visiblePhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const hasMore = visibleCount < filteredPhotos.length;
  const remainingCount = Math.max(0, filteredPhotos.length - visibleCount);

  const handleCategorySelect = (key) => {
    setActiveCategory(key);
    setActivePhotoIndex(null);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_VISIBLE_COUNT, filteredPhotos.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleOpen = (index) => {
    setActivePhotoIndex(index);
  };

  const handleClose = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const handlePrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setActivePhotoIndex((prev) => {
        if (prev === null) return null;
        return prev > 0 ? prev - 1 : filteredPhotos.length - 1;
      });
    },
    [filteredPhotos.length]
  );

  const handleNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setActivePhotoIndex((prev) => {
        if (prev === null) return null;
        return prev < filteredPhotos.length - 1 ? prev + 1 : 0;
      });
    },
    [filteredPhotos.length]
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activePhotoIndex, handleClose, handlePrev, handleNext]);

  return (
    <section id="gallery" className={`relative py-16 md:py-24 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
              isDark
                ? 'border border-amber-500/25 bg-amber-500/10 text-amber-400'
                : 'border border-amber-500/30 bg-amber-50 text-amber-700'
            }`}
          >
            <Camera size={14} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
            <span>{galleryData.eyebrow || 'Visual Life & Moments'}</span>
          </div>
          <h2
            className={`mt-4 font-outfit text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {galleryData.title || 'Hành Trình Qua Từng Bức Ảnh'}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {galleryData.description ||
              'Những hình ảnh chân thực ghi lại dấu ấn công việc tại TMA Solutions, các hội nghị công nghệ và cuộc sống đời thường.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categoryKeys.map((key) => {
            const Icon = categoryIcons[key] || Tag;
            const isActive = activeCategory === key;
            const count = categoryCounts[key] || 0;

            return (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold'
                    : isDark
                    ? 'border border-white/10 bg-[#121922] text-slate-300 hover:border-white/20 hover:text-white'
                    : 'border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-amber-500 hover:text-slate-900'
                }`}
                aria-pressed={isActive}
              >
                <Icon size={14} className={isActive ? 'text-black' : isDark ? 'text-amber-400' : 'text-amber-600'} />
                <span>{categoriesMap[key] || key}</span>
                <span
                  className={`rounded-full px-2 py-0.2 text-[10px] font-bold ${
                    isActive
                      ? 'bg-black/20 text-black'
                      : isDark
                      ? 'bg-white/10 text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Masonry Layout */}
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          <AnimatePresence>
            {visiblePhotos.map((photo, index) => (
              <motion.div
                key={photo.id || photo.src}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                onClick={() => handleOpen(index)}
                className={`group relative break-inside-avoid overflow-hidden rounded-2xl p-2 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer ${
                  isDark
                    ? 'border border-white/10 bg-[#121922]'
                    : 'border border-slate-200 bg-white shadow-md'
                }`}
              >
                <div className="relative w-full overflow-hidden rounded-xl bg-slate-950">
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.caption}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Top Badges */}
                  <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md border border-white/10 shadow-sm">
                      <Tag size={11} className="text-amber-400" />
                      <span>{photo.tag}</span>
                    </span>
                    {photo.year && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-medium text-slate-300 backdrop-blur-md border border-white/10 shadow-sm">
                        <Calendar size={10} className="text-slate-400" />
                        <span>{photo.year}</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Caption Info */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="text-sm font-bold sm:text-base leading-snug group-hover:text-amber-300 transition-colors">
                      {photo.caption}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-300/90 leading-relaxed">
                      {photo.detail}
                    </p>
                  </div>

                  {/* Hover Maximize Icon */}
                  <div className="absolute right-3.5 bottom-3.5 rounded-full bg-amber-500 p-2 text-black opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More / Show Less Button */}
        {filteredPhotos.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            {hasMore ? (
              <button
                type="button"
                onClick={handleLoadMore}
                className="group relative inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-8 py-3.5 text-sm font-bold text-amber-400 backdrop-blur-sm transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-black hover:shadow-xl hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <span>{galleryData.loadMore || (lang === 'vi' ? 'Xem thêm ảnh' : 'Load more photos')}</span>
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 group-hover:bg-black/20 group-hover:text-black">
                  +{remainingCount}
                </span>
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowLess}
                className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${
                  isDark
                    ? 'border border-white/10 bg-[#121922] text-slate-400 hover:border-white/20 hover:text-white'
                    : 'border border-slate-300 bg-white text-slate-600 shadow-sm hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                <span>{galleryData.showLess || (lang === 'vi' ? 'Thu gọn' : 'Show less')}</span>
                <ChevronUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            )}
            <span className="text-xs text-slate-500 font-mono">
              {(galleryData.showingProgress || 'Đang hiển thị {visible} trên tổng số {total} khoảnh khắc')
                .replace('{visible}', visiblePhotos.length)
                .replace('{total}', filteredPhotos.length)}
            </span>
          </div>
        )}

        {/* Footer Hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <Sparkles size={14} className="text-amber-400/80" />
          <span>{galleryData.zoomHint || 'Bấm vào bất kỳ ảnh nào để xem chi tiết và câu chuyện'}</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 p-2.5 text-white transition hover:bg-white/25 focus:outline-none"
              aria-label={galleryData.closeModal || 'Close'}
            >
              <X size={20} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-2.5 sm:p-3 text-white backdrop-blur-md transition hover:bg-black/80 hover:border-amber-400 focus:outline-none"
              aria-label={galleryData.prevBtn || 'Previous image'}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-2.5 sm:p-3 text-white backdrop-blur-md transition hover:bg-black/80 hover:border-amber-400 focus:outline-none"
              aria-label={galleryData.nextBtn || 'Next image'}
            >
              <ChevronRight size={24} />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#101720] p-3 sm:p-4 text-left shadow-2xl custom-scrollbar"
            >
              {/* Image Preview Container (Never cuts off) */}
              <div className="flex max-h-[64vh] sm:max-h-[68vh] items-center justify-center overflow-hidden rounded-xl bg-black/60">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt || activePhoto.caption}
                  className="max-h-[64vh] sm:max-h-[68vh] w-auto max-w-full rounded-lg object-contain mx-auto shadow-2xl"
                />
              </div>

              {/* Story & Meta Details */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                      <Tag size={12} />
                      {activePhoto.tag}
                    </span>
                    {activePhoto.year && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-300">
                        <Calendar size={12} className="text-slate-400" />
                        {activePhoto.year}
                      </span>
                    )}
                  </div>

                  {/* Counter */}
                  <span className="text-xs font-mono font-medium text-slate-400 bg-white/5 px-2.5 py-1 rounded-md">
                    {galleryData.counterText || 'Ảnh'} {activePhotoIndex + 1}{' '}
                    {galleryData.ofText || '/'}{' '}
                    {filteredPhotos.length}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white sm:text-xl leading-snug">
                  {activePhoto.caption}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {activePhoto.detail}
                </p>

                {/* Micro tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/5 text-[11px] text-slate-400 font-mono">
                  <span>#NguyễnMinhDiện</span>
                  <span>#DevDien</span>
                  <span>#SoftwareEngineer</span>
                  <span>#TMAInnovation</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

