import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Github,
  Layers,
  Database,
  Terminal,
  Boxes,
  FileText,
  ChevronDown,
  Monitor,
  Check,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { siteConfig } from '../../../data/siteConfig';
const fastapiArchImg = '/images/projects/fastapi-architecture.webp';
const veggieArchImg = '/images/projects/veggie-architecture.webp';
const travelaArchImg = '/images/projects/travela-architecture.webp';
const carShowroomArchImg = '/images/projects/car-showroom-architecture.webp';

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const { isDark } = useTheme();
  const [selectedLayer, setSelectedLayer] = useState('ALL');
  const [activeDiagramIndex, setActiveDiagramIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const architectureList = [
    {
      id: 'fastapi',
      title: 'FastAPI Book Management API',
      category: 'Core REST API',
      tag: 'Layered Clean Architecture',
      sourcePath: 'D:\\FastAPI\\fast-api-books',
      image: fastapiArchImg,
      github: 'https://github.com/dienakdz/fastapi-book-management-api',
      desc:
        lang === 'vi'
          ? 'Kiến trúc phân tầng Clean Architecture: Tách biệt APIRouters, Pydantic v2 schemas DTOs validation chặt chẽ, SQLAlchemy 2.0 ORM với connection pooling và tự động hóa migration bằng Alembic.'
          : 'Layered Clean Architecture: Decoupled APIRouters, strict Pydantic v2 schemas validation, SQLAlchemy 2.0 ORM with connection pooling, and automated Alembic schema migrations.',
      tech: ['FastAPI', 'SQLAlchemy 2.0', 'Pydantic v2', 'PostgreSQL', 'Docker'],
    },
    {
      id: 'veggie',
      title: 'Veggie Organic E-Commerce & GHN Logistics',
      category: 'Enterprise & Logistics',
      tag: 'MVC & Logistics Realtime Flow',
      sourcePath: 'D:\\veggie',
      image: veggieArchImg,
      github: 'https://github.com/dienakdz/veggie-organic-shop',
      desc:
        lang === 'vi'
          ? 'Kiến trúc MVC tích hợp sâu webhook logistics: Tự động tính cước động theo trọng lượng/địa chỉ, push mã vận đơn GHN Express tự động, xử lý thanh toán đa cổng và bảo đảm tính toàn vẹn tồn kho.'
          : 'Full-cycle MVC architecture with live GHN Logistics webhook integration: Dynamic rate engine, automated shipment push, multi-gateway payments, and atomic inventory checkout transactions.',
      tech: ['Spring Boot 3', 'GHN Logistics', 'MySQL', 'Docker Compose', 'Python AI'],
    },
    {
      id: 'travela',
      title: 'Travela Tour Booking & Recommendation Platform',
      category: 'Enterprise Platform',
      tag: 'Domain Modular Booking & AI',
      sourcePath: 'D:\\travela',
      image: travelaArchImg,
      github: 'https://github.com/dienakdz/travela-tour-booking',
      desc:
        lang === 'vi'
          ? 'Nền tảng du lịch modul hóa: Quản lý kho tour theo lịch trình linh hoạt, quy trình đặt chỗ và xuất hóa đơn đa bước, cổng thanh toán kép (PayPal Sandbox & MoMo IPN) cùng AI gợi ý tour thông minh.'
          : 'Modular travel platform: Dynamic itinerary tour management, multi-step booking and automated invoicing pipeline, dual payment gateways (PayPal & MoMo), and content-based AI recommendations.',
      tech: ['Spring Boot 3', 'PayPal / MoMo', 'Python AI (:5555)', 'MySQL', 'Dompdf'],
    },
    {
      id: 'car-showroom',
      title: 'Car Showroom & Dynamic EAV Inventory System',
      category: 'Relational EAV & Concurrency',
      tag: 'Dual-Engine EAV & Row Locking',
      sourcePath: 'D:\\car-showroom',
      image: carShowroomArchImg,
      github: 'https://github.com/dienakdz/car-showroom',
      desc:
        lang === 'vi'
          ? 'Mô hình cơ sở dữ liệu quan hệ EAV phân cấp (Makes ➔ Models ➔ Trims) triệt tiêu schema migration khi mở rộng hàng trăm biến thể xe động, kết hợp State Machine với Pessimistic Row Locking (SELECT ... FOR UPDATE) phòng chống race condition khi khách hàng giữ chỗ cọc xe.'
          : 'Relational EAV catalog model eliminating schema migrations across hundreds of dynamic vehicle variants, unified with an inventory state machine using pessimistic row locking (SELECT ... FOR UPDATE) to prevent concurrency race conditions.',
      tech: ['Laravel 12', 'Livewire 3', 'MySQL 8.0', 'EAV Architecture', 'Row Locks'],
    },
  ];

  const openDiagramModal = (id) => {
    const idx = architectureList.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setActiveDiagramIndex(idx);
      setIsZoomed(false);
    }
  };

  const handleCloseModal = useCallback(() => {
    setActiveDiagramIndex(null);
    setIsZoomed(false);
  }, []);

  const handlePrevDiagram = useCallback(() => {
    setActiveDiagramIndex((prev) =>
      prev === null ? null : (prev - 1 + architectureList.length) % architectureList.length
    );
    setIsZoomed(false);
  }, [architectureList.length]);

  const handleNextDiagram = useCallback(() => {
    setActiveDiagramIndex((prev) =>
      prev === null ? null : (prev + 1) % architectureList.length
    );
    setIsZoomed(false);
  }, [architectureList.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeDiagramIndex === null) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrevDiagram();
      if (e.key === 'ArrowRight') handleNextDiagram();
    };

    if (activeDiagramIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDiagramIndex, handleCloseModal, handlePrevDiagram, handleNextDiagram]);

  const activeDiagram = activeDiagramIndex !== null ? architectureList[activeDiagramIndex] : null;

  const filterOptions = [
    { id: 'ALL', label: lang === 'vi' ? 'Tất cả hệ thống' : 'All Systems' },
    { id: 'core-api', label: 'Core APIs' },
    { id: 'logistics', label: 'Enterprise & Logistics' },
    { id: 'devops', label: 'DevOps & Infrastructure' },
  ];

  // Clean 1-liner filter matching
  const shouldShow = (layer) => selectedLayer === 'ALL' || selectedLayer === layer;

  return (
    <section className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ========================================================================= */}
        {/* Header Section */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1
              className={`font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Engineering Portfolio &amp; System Architecture
            </h1>

            <p
              className={`mt-2 text-sm sm:text-base font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {lang === 'vi'
                ? 'Kiến trúc vi dịch vụ, Connection Pooling, hạ tầng Docker và luồng dữ liệu thời gian thực'
                : 'Production Backend Microservices, Async Connection Pools & Event-Driven Workflows'}
            </p>
          </div>

          {/* Top-Right Badge: Open Source & Production Systems */}
          <div className="shrink-0 self-start md:self-auto">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md shadow-lg ${
                isDark
                  ? 'border border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-amber-500/10'
                  : 'border border-amber-500/40 bg-amber-50 text-amber-800'
              }`}
            >
              <Code2 size={14} className="text-amber-400" />
              <span>Open Source &amp; Production Systems</span>
            </div>
          </div>
        </div>

        {/* Architectural Layer Filter Bar */}
        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          {filterOptions.map((opt) => {
            const isSelected = selectedLayer === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedLayer(opt.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'border border-amber-500 bg-amber-500/15 text-amber-400 font-bold shadow-md shadow-amber-500/20'
                      : 'border border-amber-500 bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : isDark
                    ? 'border border-slate-800 bg-[#121922] text-slate-400 hover:border-slate-700 hover:text-white'
                    : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-amber-400/50 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* Layered Architecture Grid */}
        {/* ========================================================================= */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* ========================================================================= */}
          {/* CARD 1: FastAPI Book Management API (Top-Left, Amber Border Glow)        */}
          {/* ========================================================================= */}
          {shouldShow('core-api') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? 'border border-amber-500/50 bg-[#121922] shadow-[0_0_30px_rgba(245,158,11,0.14)] hover:border-amber-500/70'
                  : 'border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:border-amber-500/50 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Title */}
                <h2
                  className={`font-outfit text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  FastAPI Book Management API
                </h2>

                {/* 2-Column Interior Split (Left: Architecture Diagram, Right: Stack List) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left: Architecture Diagram Box (Always Sleek Dark Terminal) */}
                  <div className="md:col-span-7 rounded-xl p-3 border font-mono text-xs flex flex-col justify-between border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400">
                        <Terminal size={13} />
                        <span>System Architecture</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Layered REST</span>
                    </div>

                    {/* Architecture Diagram Image */}
                    <div
                      onClick={() => openDiagramModal('fastapi')}
                      className="group relative my-2 rounded-lg overflow-hidden border border-slate-800/80 bg-[#0d1520] cursor-zoom-in transition-all duration-200 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.14)]"
                      title={lang === 'vi' ? 'Bấm để phóng to và xem chi tiết kiến trúc' : 'Click to zoom and view architecture details'}
                    >
                      <img
                        src={fastapiArchImg}
                        alt="FastAPI Architecture"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-slate-900/95 px-3 py-1.5 text-[11px] font-semibold text-amber-300 shadow-xl">
                          <Maximize2 size={13} />
                          <span>{lang === 'vi' ? 'Xem chi tiết & ảnh to' : 'View Detail & Enlarge'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 text-right">D:\FastAPI\fast-api-books</div>
                  </div>

                  {/* Right: Text & Tech Stack Bullets */}
                  <div className="md:col-span-5 flex flex-col justify-between text-xs">
                    <div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'vi'
                          ? 'Mô hình kiến trúc phân tầng Clean Architecture: Decoupled Routers, Pydantic DTOs, SQLAlchemy ORM & DB.'
                          : 'Layered REST architecture: Decoupled Routers, Pydantic schemas, SQLAlchemy ORM & DB.'}
                      </p>

                      <div className="mt-3.5">
                        <div className={`font-bold text-xs mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Backend Tech Stack
                        </div>
                        <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>FastAPI + Uvicorn</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>SQLAlchemy 2.0 &amp; Alembic</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Pydantic v2 &amp; Docker</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    FastAPI
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    PostgreSQL
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Alembic
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/dienakdz/fastapi-book-management-api"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://github.com/dienakdz/fastapi-book-management-api#readme"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <ExternalLink size={13} />
                    <span>Live Docs</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* CARD 2: DevOps Foundations Labs (Top-Right, Slate Border)                 */}
          {/* ========================================================================= */}
          {shouldShow('devops') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? 'border border-slate-700/80 bg-[#121922] hover:border-slate-500/80'
                  : 'border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Title */}
                <h2
                  className={`font-outfit text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  DevOps Foundations Labs
                </h2>

                {/* 2-Column Interior Split (Left: Topology Diagram, Right: Stack List) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Multi-Container Architecture Diagram (Always Sleek Dark Terminal) */}
                  <div className="md:col-span-7 rounded-xl p-3 border font-mono text-xs flex flex-col justify-between border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                      <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                        <Boxes size={13} />
                        <span>Docker topology</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Bridge Net</span>
                    </div>

                    {/* 3-Tier Container Topology Diagram */}
                    <div className="my-2 grid grid-cols-12 items-center gap-1.5 text-[10px]">
                      {/* Tier 1: Nginx Proxy (4 cols) */}
                      <div className="col-span-4 flex flex-col items-center">
                        <div className="w-full rounded-lg p-2 border border-emerald-500/40 bg-emerald-950/25 text-center">
                          <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] mb-1">
                            N
                          </div>
                          <div className="font-bold text-emerald-400 text-[10px] leading-tight">Nginx Proxy</div>
                          <div className="text-[8px] text-slate-400">(:80)</div>
                        </div>
                      </div>

                      {/* Arrow 1 */}
                      <div className="col-span-1 text-center text-slate-500 text-xs">→</div>

                      {/* Tier 2: Multi-Container API Box (4 cols) */}
                      <div className="col-span-4 rounded-lg p-1.5 border border-cyan-500/30 bg-cyan-950/15">
                        <div className="text-[8px] text-cyan-400 font-bold mb-1 text-center">Multi-container</div>
                        <div className="space-y-1">
                          <div className="rounded p-1 border border-cyan-500/40 bg-cyan-950/30 text-center">
                            <div className="text-[9px] font-bold text-cyan-300 leading-tight">API Service</div>
                            <div className="text-[7px] text-slate-400">(FastAPI)</div>
                          </div>
                          <div className="rounded p-1 border border-cyan-500/40 bg-cyan-950/30 text-center">
                            <div className="text-[9px] font-bold text-cyan-300 leading-tight">API Worker</div>
                            <div className="text-[7px] text-slate-400">(Celery)</div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow 2 */}
                      <div className="col-span-1 text-center text-slate-500 text-xs">→</div>

                      {/* Tier 3: DB & Redis (2 cols) */}
                      <div className="col-span-2 space-y-1">
                        <div className="rounded p-1 border border-blue-500/40 bg-blue-950/30 text-center">
                          <div className="text-[8px] font-bold text-blue-300 leading-tight">Database</div>
                          <div className="text-[7px] text-slate-400">(Postgres)</div>
                        </div>
                        <div className="rounded p-1 border border-red-500/40 bg-red-950/30 text-center">
                          <div className="text-[8px] font-bold text-red-300 leading-tight">Redis</div>
                          <div className="text-[7px] text-slate-400">(Cache)</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 text-right">Docker Network: app-net</div>
                  </div>

                  {/* Right: Text & Tech Stack Bullets */}
                  <div className="md:col-span-5 flex flex-col justify-between text-xs">
                    <div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'vi'
                          ? 'Mô hình Docker topology đa tầng và lộ trình chuẩn hóa hạ tầng thực hành.'
                          : 'Multi-container Docker container topology diagram.'}
                      </p>

                      <div className="mt-3.5">
                        <div className={`font-bold text-xs mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Backend Tech Stack
                        </div>
                        <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Docker Compose</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>GitHub Actions</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Terraform</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Docker Compose
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    GitHub Actions
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Terraform
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/dienakdz/devops-foundations-labs"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://github.com/dienakdz/devops-foundations-labs#readme"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <Layers size={13} />
                    <span>Demo Lab</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* CARD 3: Veggie Organic E-Commerce & GHN Logistics (Bottom-Left, Glow)     */}
          {/* ========================================================================= */}
          {shouldShow('logistics') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? 'border border-amber-500/50 bg-[#121922] shadow-[0_0_30px_rgba(245,158,11,0.14)] hover:border-amber-500/70'
                  : 'border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:border-amber-500/50 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Title */}
                <h2
                  className={`font-outfit text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Veggie Organic E-Commerce &amp; GHN Logistics
                </h2>

                {/* 2-Column Interior Split (Left: Architecture Diagram, Right: Stack List) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left: Architecture Diagram Box (Always Sleek Dark Terminal) */}
                  <div className="md:col-span-7 rounded-xl p-3 border font-mono text-xs flex flex-col justify-between border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <Terminal size={13} />
                        <span>System Architecture</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Laravel 11</span>
                    </div>

                    {/* Architecture Diagram Image */}
                    <div
                      onClick={() => openDiagramModal('veggie')}
                      className="group relative my-2 rounded-lg overflow-hidden border border-slate-800/80 bg-[#0d1520] cursor-zoom-in transition-all duration-200 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.14)]"
                      title={lang === 'vi' ? 'Bấm để phóng to và xem chi tiết kiến trúc' : 'Click to zoom and view architecture details'}
                    >
                      <img
                        src={veggieArchImg}
                        alt="Veggie Organic Architecture"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-slate-900/95 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-xl">
                          <Maximize2 size={13} />
                          <span>{lang === 'vi' ? 'Xem chi tiết & ảnh to' : 'View Detail & Enlarge'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 text-right">D:\veggie</div>
                  </div>

                  {/* Right: Text & Tech Stack Bullets */}
                  <div className="md:col-span-5 flex flex-col justify-between text-xs">
                    <div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'vi'
                          ? 'Hệ thống thương mại điện tử nông sản hữu cơ: Tích hợp vận chuyển GHN Logistics, thanh toán PayPal & gợi ý thông minh Python AI.'
                          : 'Organic e-commerce system: GHN Logistics realtime shipping, PayPal gateway, and Python AI recommendations.'}
                      </p>

                      <div className="mt-3.5">
                        <div className={`font-bold text-xs mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Backend Tech Stack
                        </div>
                        <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Laravel 11 &amp; MySQL</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>GHN Logistics &amp; PayPal</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Python AI (NLTK Recommender)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Laravel 11
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    GHN Logistics
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    MySQL
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/dienakdz/veggie"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://github.com/dienakdz/veggie#readme"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <FileText size={13} />
                    <span>Case Study</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* CARD 4: Travela Tour Booking & Recommendation Platform (Bottom-Right)     */}
          {/* ========================================================================= */}
          {shouldShow('core-api') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? 'border border-slate-700/80 bg-[#121922] hover:border-slate-500/80'
                  : 'border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Title */}
                <h2
                  className={`font-outfit text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Travela Tour Booking &amp; Recommendation Platform
                </h2>

                {/* 2-Column Interior Split (Left: Architecture Diagram, Right: Stack List) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left: Architecture Diagram Box (Always Sleek Dark Terminal) */}
                  <div className="md:col-span-7 rounded-xl p-3 border font-mono text-xs flex flex-col justify-between border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400">
                        <Terminal size={13} />
                        <span>System Architecture</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Laravel 9</span>
                    </div>

                    {/* Architecture Diagram Image */}
                    <div
                      onClick={() => openDiagramModal('travela')}
                      className="group relative my-2 rounded-lg overflow-hidden border border-slate-800/80 bg-[#0d1520] cursor-zoom-in transition-all duration-200 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.14)]"
                      title={lang === 'vi' ? 'Bấm để phóng to và xem chi tiết kiến trúc' : 'Click to zoom and view architecture details'}
                    >
                      <img
                        src={travelaArchImg}
                        alt="Travela Tour Architecture"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-slate-900/95 px-3 py-1.5 text-[11px] font-semibold text-amber-300 shadow-xl">
                          <Maximize2 size={13} />
                          <span>{lang === 'vi' ? 'Xem chi tiết & ảnh to' : 'View Detail & Enlarge'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 text-right">D:\travela</div>
                  </div>

                  {/* Right: Text & Tech Stack Bullets */}
                  <div className="md:col-span-5 flex flex-col justify-between text-xs">
                    <div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'vi'
                          ? 'Nền tảng đặt tour du lịch trực tuyến: Quy trình đặt chỗ đa bước, cổng thanh toán PayPal/MoMo và AI gợi ý tour thông minh.'
                          : 'Tour booking platform: Multi-step reservation flow, PayPal & MoMo payments, and AI-driven tour recommendation engine.'}
                      </p>

                      <div className="mt-3.5">
                        <div className={`font-bold text-xs mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Backend Tech Stack
                        </div>
                        <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Laravel 9 &amp; MySQL</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>PayPal, MoMo &amp; Dompdf</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Python AI Recommender (:5555)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Laravel 9
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    PayPal &amp; MoMo
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Python AI (:5555)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/dienakdz/travela"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://github.com/dienakdz/travela#readme"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <Monitor size={13} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* CARD 5: Car Showroom EAV System (Rendered in ALL & Logistics)             */}
          {/* ========================================================================= */}
          {shouldShow('logistics') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={`${
                selectedLayer === 'ALL' ? 'lg:col-span-2' : 'col-span-1'
              } flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? 'border border-amber-500/50 bg-[#121922] shadow-[0_0_30px_rgba(245,158,11,0.14)] hover:border-amber-500/70'
                  : 'border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:border-amber-500/50 hover:shadow-lg'
              }`}
            >
              <div>
                <h2
                  className={`font-outfit text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Car Showroom &amp; Dynamic EAV Inventory System
                </h2>
                <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'vi'
                    ? 'Mô hình cơ sở dữ liệu quan hệ EAV phân cấp (Makes/Models/Trims) lưu trữ các thuộc tính xe ô tô động và theo dõi trạng thái giữ chỗ kho xe.'
                    : 'Relational EAV catalog model (Makes/Models/Trims) for dynamic automotive specifications & inventory hold states.'}
                </p>

                {/* 2-Column Interior Split (Left: Dynamic EAV Architecture Diagram, Right: Tech Stack Bullets) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left: Architecture Diagram Terminal */}
                  <div className="md:col-span-7 rounded-xl p-3 border font-mono text-xs flex flex-col justify-between border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400">
                        <Layers size={13} />
                        <span>System Architecture</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Dynamic EAV &amp; Concurrency</span>
                    </div>

                    {/* Architecture Diagram Image */}
                    <div
                      onClick={() => openDiagramModal('car-showroom')}
                      className="group relative my-2 rounded-lg overflow-hidden border border-slate-800/80 bg-[#0d1520] cursor-zoom-in transition-all duration-200 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.14)]"
                      title={lang === 'vi' ? 'Bấm để phóng to và xem chi tiết kiến trúc' : 'Click to zoom and view architecture details'}
                    >
                      <img
                        src={carShowroomArchImg}
                        alt="Car Showroom EAV Architecture"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-slate-900/95 px-3 py-1.5 text-[11px] font-semibold text-amber-300 shadow-xl">
                          <Maximize2 size={13} />
                          <span>{lang === 'vi' ? 'Xem chi tiết & ảnh to' : 'View Detail & Enlarge'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 text-right">D:\car-showroom</div>
                  </div>

                  {/* Right: Technical Specs & Tech Stack Bullets */}
                  <div className="md:col-span-5 flex flex-col justify-between text-xs">
                    <div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'vi'
                          ? 'Mô hình cơ sở dữ liệu quan hệ EAV phân cấp triệt tiêu schema migration khi mở rộng hàng trăm biến thể xe, đồng bộ giữ chỗ với pessimistic row locking.'
                          : 'Relational EAV catalog model eliminating schema migrations across hundreds of vehicle variants, unified with pessimistic row-locking hold states.'}
                      </p>

                      <div className="mt-3.5">
                        <div className={`font-bold text-xs mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Backend Tech Stack
                        </div>
                        <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Laravel 12 &amp; Livewire 3</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Dynamic EAV Attribute Storage</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>Pessimistic Row Lock (SELECT ... FOR UPDATE)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Laravel 12
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Livewire 3
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    MySQL 8.0
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    EAV Architecture
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Inventory Hold
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/dienakdz/car-showroom"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://github.com/dienakdz/car-showroom#readme"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <ExternalLink size={13} />
                    <span>Schema Docs</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* BOTTOM GITHUB DISCOVERY BANNER */}
        <div
          className={`mt-14 rounded-2xl p-8 sm:p-10 text-center border transition-all ${
            isDark
              ? 'border-amber-500/20 bg-gradient-to-br from-[#121922] via-[#0d131a] to-amber-500/5'
              : 'border-amber-500/30 bg-gradient-to-br from-amber-50/70 via-white to-amber-100/30'
          }`}
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-400 mb-4 border border-amber-500/20">
            <Github size={24} />
          </div>

          <h3
            className={`font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {lang === 'vi' ? 'Khám Phá Toàn Bộ Mã Nguồn Trên GitHub' : 'Explore All Repositories on GitHub'}
          </h3>

          <p
            className={`mt-2.5 text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {lang === 'vi'
              ? 'Ngoài các dự án trọng tâm ở trên, tôi còn lưu trữ hơn 33+ repositories về scripts tự động hóa, bài tập chuyên sâu, và các giải pháp thực hành backend trên trang GitHub cá nhân.'
              : 'Beyond these highlighted systems, explore 33+ additional repositories covering automation scripts, hands-on backend labs, and utility services.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.35)] transition-all hover:scale-105 active:scale-95"
            >
              <Github size={16} />
              <span>{lang === 'vi' ? 'Truy cập GitHub @dienakdz' : 'Visit GitHub @dienakdz'}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ARCHITECTURE DIAGRAM LIGHTBOX MODAL (ENLARGED & DETAIL VIEW)             */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeDiagram && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative my-auto w-full max-w-5xl rounded-2xl border border-slate-700/80 bg-[#0d1420] p-4 sm:p-6 text-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              >
                {/* Modal Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-[11px] font-mono font-bold text-amber-300">
                      {activeDiagram.category}
                    </span>
                    <div>
                      <h3 className="font-outfit text-base sm:text-lg font-bold text-white leading-tight">
                        {activeDiagram.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                        <span className="text-amber-400">{activeDiagram.tag}</span>
                        <span>•</span>
                        <span className="text-slate-400">{activeDiagram.sourcePath}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Index Counter */}
                    <span className="font-mono text-xs text-slate-400 px-2 py-1 rounded bg-slate-800/60 border border-slate-700/60">
                      {activeDiagramIndex + 1} / {architectureList.length}
                    </span>

                    {/* Prev Diagram Button */}
                    <button
                      onClick={handlePrevDiagram}
                      className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                      title={lang === 'vi' ? 'Sơ đồ trước (Phím mũi tên trái)' : 'Previous diagram (Left Arrow)'}
                    >
                      <ChevronLeft size={17} />
                    </button>

                    {/* Next Diagram Button */}
                    <button
                      onClick={handleNextDiagram}
                      className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                      title={lang === 'vi' ? 'Sơ đồ tiếp theo (Phím mũi tên phải)' : 'Next diagram (Right Arrow)'}
                    >
                      <ChevronRight size={17} />
                    </button>

                    {/* Zoom Toggle Button */}
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className={`rounded-lg border p-2 transition ${
                        isZoomed
                          ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                          : 'border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      title={isZoomed ? 'Thu nhỏ về khung vừa' : 'Phóng to tối đa (100%)'}
                    >
                      {isZoomed ? <ZoomOut size={17} /> : <ZoomIn size={17} />}
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={handleCloseModal}
                      className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-2 text-slate-300 transition hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-300 ml-1"
                      title={lang === 'vi' ? 'Đóng (Phím ESC)' : 'Close (ESC)'}
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                {/* Main Image Canvas */}
                <div
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`relative rounded-xl border border-slate-800 bg-[#060a12] p-2 sm:p-4 overflow-auto shadow-inner flex items-center justify-center transition-all ${
                    isZoomed ? 'cursor-zoom-out max-h-[68vh]' : 'cursor-zoom-in max-h-[58vh]'
                  }`}
                >
                  <img
                    src={activeDiagram.image}
                    alt={activeDiagram.title}
                    className={`rounded-lg transition-transform duration-300 ${
                      isZoomed
                        ? 'w-auto min-w-[1240px] max-w-none h-auto'
                        : 'w-full h-auto max-h-[54vh] object-contain'
                    }`}
                  />

                  {/* Floating Zoom Indicator Hint */}
                  <div className="absolute bottom-3 right-3 pointer-events-none rounded-md bg-black/75 px-2 py-1 text-[10px] font-mono text-slate-300 border border-slate-700/60 backdrop-blur-sm">
                    {isZoomed
                      ? (lang === 'vi' ? '100% Full Res • Bấm để thu gọn' : '100% Full Res • Click to fit')
                      : (lang === 'vi' ? 'Bấm vào ảnh để phóng to 100%' : 'Click image to zoom 100%')}
                  </div>
                </div>

                {/* Modal Footer / Technical Breakdown */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-t border-slate-800 pt-3">
                  <div className="md:col-span-8">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeDiagram.desc}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {activeDiagram.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-full px-2.5 py-0.5 font-mono text-[10px] border border-slate-700 bg-slate-800/80 text-amber-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-wrap items-center justify-end gap-2.5">
                    <a
                      href={activeDiagram.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
                    >
                      <Github size={14} />
                      <span>{lang === 'vi' ? 'Xem mã nguồn' : 'GitHub Repo'}</span>
                      <ArrowUpRight size={12} className="text-slate-400" />
                    </a>
                    <button
                      onClick={handleCloseModal}
                      className="rounded-lg bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 transition active:scale-95"
                    >
                      {lang === 'vi' ? 'Đóng' : 'Close'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  );
}
