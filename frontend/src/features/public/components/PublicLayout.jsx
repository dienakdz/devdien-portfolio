import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { apiUrl } from '../../../lib/api';

export default function PublicLayout() {
  const location = useLocation();

  // 1. Unified Scroll Restoration on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // 2. Unified Page Visit Tracking across all public routes
  useEffect(() => {
    const currentPath = location.pathname;
    const visitKey = `portfolio-visit:${currentPath}`;

    if (sessionStorage.getItem(visitKey) === '1') return undefined;

    const controller = new AbortController();
    fetch(apiUrl('/api/visits'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: currentPath }),
      signal: controller.signal,
    })
      .then((res) => {
        if (res.ok) {
          sessionStorage.setItem(visitKey, '1');
          window.dispatchEvent(new CustomEvent('visit-recorded'));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
