import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { siteConfig } from '../../../data/siteConfig';
import fastapiArchImg from '../../../assets/optimized/fastapi-architecture.webp';

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const { isDark } = useTheme();
  const [selectedLayer, setSelectedLayer] = useState('ALL');

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
                    <div className="my-2 rounded-lg overflow-hidden border border-slate-800/80 bg-[#0d1520]">
                      <img
                        src={fastapiArchImg}
                        alt="FastAPI Architecture"
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
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

                {/* 2-Column Interior Split (Left: Webhook & Order Pipeline, Right: Specs) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left: Webhook Monitor & Order Pipeline (Always Sleek Dark Terminal) */}
                  <div className="md:col-span-7 rounded-xl p-3 border font-mono text-xs flex flex-col justify-between border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                    <div>
                      <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                        <span className="font-bold text-slate-200">Live Webhook Status</span>
                        <span className="text-[10px] text-emerald-400 font-sans">● Listening</span>
                      </div>

                      {/* Webhook Rows */}
                      <div className="mt-2.5 space-y-1.5 text-[11px]">
                        <div className="flex justify-between items-center text-emerald-400">
                          <span>GHN Order Update</span>
                          <span className="font-bold">[200 OK]</span>
                        </div>
                        <div className="flex justify-between items-center text-emerald-400">
                          <span>Payment Confirmed</span>
                          <span className="font-bold">[200 OK]</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Progress Pipeline */}
                    <div className="mt-4 pt-3 border-t border-dashed border-slate-800">
                      <div className="text-[10px] text-slate-400 mb-2">Order #12345</div>
                      <div className="flex items-center justify-between text-[9px]">
                        {/* Step 1: Created */}
                        <div className="flex flex-col items-center">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold mb-1">
                            <Check size={8} strokeWidth={3} />
                          </span>
                          <span className="text-slate-300">Created</span>
                        </div>

                        {/* Line 1 */}
                        <div className="h-0.5 flex-1 bg-emerald-500/60 mx-1" />

                        {/* Step 2: Payment */}
                        <div className="flex flex-col items-center">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold mb-1">
                            <Check size={8} strokeWidth={3} />
                          </span>
                          <span className="text-slate-300">Payment</span>
                        </div>

                        {/* Line 2 */}
                        <div className="h-0.5 flex-1 bg-amber-500/60 mx-1" />

                        {/* Step 3: GHN Shipped */}
                        <div className="flex flex-col items-center">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold mb-1 animate-pulse">
                            ●
                          </span>
                          <span className="text-amber-400 font-bold">GHN Shipped</span>
                        </div>

                        {/* Line 3 */}
                        <div className="h-0.5 flex-1 bg-slate-700 mx-1" />

                        {/* Step 4: Delivered */}
                        <div className="flex flex-col items-center">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-600 bg-transparent mb-1" />
                          <span className="text-slate-500">Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Description & Feature Pills */}
                  <div className="md:col-span-5 flex flex-col justify-between text-xs">
                    <div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'vi'
                          ? 'Veggies Organic E-Commerce & imbrans GHN Logistics integration.'
                          : 'Veggies Organic E-Commerce & imbrans GHN Logistics integration.'}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-amber-300">
                          Inventory Sync
                        </span>
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-amber-300">
                          Async Jobs
                        </span>
                      </div>

                      <div className="mt-3.5">
                        <div className={`font-bold text-xs mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          Features
                        </div>
                        <ul className={`space-y-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <li>• Realtime shipping calculation</li>
                          <li>• GHN webhook status updates</li>
                          <li>• Order state machine validation</li>
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
                    Inventory Sync
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

                <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'vi'
                    ? 'Quy trình đặt tour đa bước bảo toàn giao dịch và Microservice gợi ý tour bằng Python.'
                    : 'Showcase a multi-step reservation pipeline for Microservices.'}
                </p>

                {/* Reservation Pipeline Flow (Always Sleek Dark Terminal) */}
                <div className="mt-5 rounded-xl p-3 sm:p-4 border font-mono text-xs border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                  {/* 5 Connected Steps with arrows */}
                  <div className="grid grid-cols-5 items-center gap-1.5 sm:gap-2 text-center">
                    {/* Step 1: Select Tour */}
                    <div className="rounded-lg p-2 border border-slate-800 bg-slate-900/60 min-h-[58px] flex flex-col justify-between">
                      <div className="font-bold text-slate-200 text-[9px] sm:text-[10px] leading-tight">Select Tour</div>
                      <div className="mt-1">
                        <span className="inline-block rounded bg-amber-500/20 px-1.5 py-0.5 text-[8px] font-bold text-amber-400">
                          Pending
                        </span>
                      </div>
                    </div>

                    {/* Step 2: Check Availability */}
                    <div className="rounded-lg p-2 border border-slate-800 bg-slate-900/60 min-h-[58px] flex flex-col justify-between">
                      <div className="font-bold text-slate-200 text-[9px] sm:text-[10px] leading-tight">Check Avail</div>
                      <div className="mt-1">
                        <span className="inline-block rounded bg-blue-500/20 px-1.5 py-0.5 text-[8px] font-bold text-blue-400">
                          Processing
                        </span>
                      </div>
                    </div>

                    {/* Step 3: Payment */}
                    <div className="rounded-lg p-2 border border-emerald-500/30 bg-emerald-950/30 min-h-[58px] flex flex-col justify-between">
                      <div className="font-bold text-emerald-400 text-[9px] sm:text-[10px] leading-tight">Payment</div>
                      <div className="mt-1">
                        <span className="inline-block rounded bg-emerald-500/25 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">
                          Booked
                        </span>
                      </div>
                    </div>

                    {/* Step 4: Confirmation */}
                    <div className="rounded-lg p-2 border border-slate-800 bg-slate-900/60 min-h-[58px] flex flex-col justify-between">
                      <div className="font-bold text-slate-200 text-[9px] sm:text-[10px] leading-tight">Confirmation</div>
                      <div className="mt-1">
                        <span className="inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[8px] font-bold text-slate-400">
                          Success
                        </span>
                      </div>
                    </div>

                    {/* Step 5: Recs Engine */}
                    <div className="rounded-lg p-2 border border-amber-500/30 bg-amber-950/30 min-h-[58px] flex flex-col justify-between">
                      <div className="font-bold text-amber-400 text-[9px] sm:text-[10px] leading-tight">Recs Engine</div>
                      <div className="mt-1">
                        <span className="inline-block rounded bg-amber-500/20 px-1.5 py-0.5 text-[8px] font-bold text-amber-300">
                          Triggered
                        </span>
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
                    Microservices
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Redis, Personalized Recs
                  </span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-mono border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300">
                    Email/SMS Alerts
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

                {/* 2-Column Interior Split (Left: Dynamic EAV Schema Explorer, Right: Specs & Bullets) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left: Dynamic EAV Schema Explorer (Always Sleek Dark Terminal) */}
                  <div className="md:col-span-7 rounded-xl p-3 border font-mono text-xs flex flex-col justify-between border-slate-800/80 bg-[#0d1520] text-slate-200 shadow-inner">
                    <div>
                      <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                        <div className="flex items-center gap-1.5 font-bold text-amber-400">
                          <Database size={13} />
                          <span>eav_catalog.sql</span>
                          <span className="rounded bg-emerald-500/20 text-emerald-400 px-1 py-0.2 text-[9px]">MySQL 8.0</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Dynamic EAV Schema</span>
                      </div>

                      {/* Level 1: 3-Tier Entity Hierarchy */}
                      <div className="mt-2.5 rounded-lg p-2 border border-slate-800 bg-slate-900/60">
                        <div className="text-[9px] text-slate-400 mb-1 font-sans">Entity Hierarchy (Normalized Core)</div>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="font-bold text-amber-400">Makes</span>
                          <span className="text-slate-500">→</span>
                          <span className="font-bold text-cyan-400">Models</span>
                          <span className="text-slate-500">→</span>
                          <span className="font-bold text-emerald-400">Trims</span>
                          <span className="text-slate-500">→</span>
                          <span className="text-slate-200 font-sans">Porsche 911 GT3 RS</span>
                        </div>
                      </div>

                      {/* Level 2: Dynamic EAV Key-Value Store */}
                      <div className="mt-2 space-y-1 text-[10px]">
                        <div className="flex items-center justify-between rounded p-1.5 bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-400 font-mono text-[9px]">[attr: engine]</span>
                          <span className="font-bold text-slate-200 font-sans text-[10px]">4.0L Naturally Aspirated Flat-6</span>
                        </div>
                        <div className="flex items-center justify-between rounded p-1.5 bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-400 font-mono text-[9px]">[attr: output]</span>
                          <span className="font-bold text-amber-300 font-sans text-[10px]">518 HP @ 8,500 RPM / 465 Nm</span>
                        </div>
                        <div className="flex items-center justify-between rounded p-1.5 bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-400 font-mono text-[9px]">[attr: transmission]</span>
                          <span className="font-bold text-cyan-300 font-sans text-[10px]">7-Speed PDK Dual-Clutch</span>
                        </div>
                        <div className="flex items-center justify-between rounded p-1.5 bg-emerald-950/25 border border-emerald-500/30">
                          <span className="text-emerald-400 font-mono text-[9px]">[inventory_status]</span>
                          <span className="font-bold text-emerald-300 font-sans text-[10px]">Hold Reserved [Row Lock]</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-[9px] text-slate-500 text-right">Schema Extensibility: 0-migration catalog</div>
                  </div>

                  {/* Right: Technical Specs & Tech Pills */}
                  <div className="md:col-span-5 flex flex-col justify-between text-xs">
                    <div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'vi'
                          ? 'Kiến trúc Entity-Attribute-Value triệt tiêu việc mở rộng cột bảng khi phát sinh hàng trăm biến thể xe & trạng thái khóa giữ chỗ xe.'
                          : 'Entity-Attribute-Value architecture eliminating column sprawl across hundreds of vehicle variants & inventory hold states.'}
                      </p>

                      {/* Small Tech Pills */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-amber-300">
                          Laravel 9
                        </span>
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-amber-300">
                          MySQL 8.0
                        </span>
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-amber-300">
                          EAV Pattern
                        </span>
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-amber-300">
                          Docker
                        </span>
                      </div>
                    </div>

                    {/* MySQL EAV Specs Box (Always Dark Terminal) */}
                    <div className="mt-4 rounded-xl p-3 border font-mono text-[11px] border-slate-800/80 bg-[#0d1520] text-slate-300 shadow-inner">
                      <div className="font-bold text-slate-200 mb-1.5">MySQL EAV Relational Specs</div>
                      <div className="space-y-1 text-slate-400 text-[10px]">
                        <div className="flex justify-between">
                          <span>Primary Hierarchy:</span>
                          <span className="font-bold text-slate-200">Makes → Models → Trims</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dynamic Attributes:</span>
                          <span className="font-bold text-amber-400">JSON &amp; Key-Value Store</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Concurrency Lock:</span>
                          <span className="font-bold text-emerald-400">FOR UPDATE (Row Lock)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Index Strategy:</span>
                          <span className="font-bold text-cyan-400">Composite (entity, attr)</span>
                        </div>
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
                    MySQL
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
    </section>
  );
}
