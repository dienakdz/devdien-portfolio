import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { AdminAuthProvider } from './features/admin/context/AdminAuthContext.jsx';
import ProtectedAdminRoute from './features/admin/components/ProtectedAdminRoute.jsx';
import PortfolioPage from './features/public/pages/PortfolioPage.jsx';
import SeoHead from './components/SeoHead.jsx';

const AdminLayout = lazy(() => import('./features/admin/components/AdminLayout.jsx'));
const AdminLoginPage = lazy(() => import('./features/admin/pages/AdminLoginPage.jsx'));
const AdminDashboardPage = lazy(() => import('./features/admin/pages/AdminDashboardPage.jsx'));
const AdminContactsPage = lazy(() => import('./features/admin/pages/AdminContactsPage.jsx'));
const AdminVisitsPage = lazy(() => import('./features/admin/pages/AdminVisitsPage.jsx'));
const AdminProfilePage = lazy(() => import('./features/admin/pages/AdminProfilePage.jsx'));
const AdminPasswordPage = lazy(() => import('./features/admin/pages/AdminPasswordPage.jsx'));

const RouteFallback = () => <div className="min-h-screen bg-background" />;
// Temporary anti-DevTools test flags. Set to false to disable the trap quickly.
const ENABLE_DEVTOOLS_TRAP = true;
// Docked DevTools usually changes the visible browser size by a noticeable amount.
const DEVTOOLS_SIZE_THRESHOLD = 160;
// How aggressively the page should pause execution while DevTools is detected.
const DEBUGGER_SPAM_INTERVAL_MS = 120;

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Keep the root document theme in sync so global CSS responds immediately.
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.documentElement.style.colorScheme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!ENABLE_DEVTOOLS_TRAP) {
      return undefined;
    }

    // Repeated debugger calls make the page hard to use while DevTools is open.
    let debuggerIntervalId = null;
    let hasWarnedAboutDevTools = false;
    const runDebuggerTrap = () => {
      // eslint-disable-next-line no-debugger
      debugger;
    };

    const showDevToolsWarning = () => {
      if (hasWarnedAboutDevTools) {
        return;
      }

      hasWarnedAboutDevTools = true;
      console.warn(
        '%cStop',
        'color: #b91c1c; font-size: 48px; font-weight: 800; letter-spacing: 0.08em;',
      );
      console.warn(
        '%cThis panel is for developers. Do not paste code or run commands here unless you understand exactly what they do.',
        'color: #f59e0b; font-size: 14px; font-weight: 600;',
      );
    };

    const startDebuggerSpam = () => {
      if (debuggerIntervalId !== null) {
        return;
      }

      runDebuggerTrap();
      debuggerIntervalId = window.setInterval(runDebuggerTrap, DEBUGGER_SPAM_INTERVAL_MS);
    };

    const stopDebuggerSpam = () => {
      if (debuggerIntervalId === null) {
        return;
      }

      window.clearInterval(debuggerIntervalId);
      debuggerIntervalId = null;
    };

    // Rough detector: works mainly when DevTools is docked to the browser window.
    const isDevToolsOpen = () => {
      const widthGap = window.outerWidth - window.innerWidth > DEVTOOLS_SIZE_THRESHOLD;
      const heightGap = window.outerHeight - window.innerHeight > DEVTOOLS_SIZE_THRESHOLD;
      return widthGap || heightGap;
    };

    const syncDebuggerTrap = () => {
      if (isDevToolsOpen()) {
        showDevToolsWarning();
        startDebuggerSpam();
        return;
      }

      hasWarnedAboutDevTools = false;
      stopDebuggerSpam();
    };

    // Catch the most common shortcuts users press to open DevTools or view source.
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      const isF12 = key === 'F12';
      const isWindowsDevToolsShortcut =
        event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(key);
      const isMacDevToolsShortcut =
        event.metaKey && event.altKey && ['I', 'J', 'C'].includes(key);
      const isViewSourceShortcut =
        (event.ctrlKey && key === 'U') || (event.metaKey && event.altKey && key === 'U');

      if (!isF12 && !isWindowsDevToolsShortcut && !isMacDevToolsShortcut && !isViewSourceShortcut) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      showDevToolsWarning();
      startDebuggerSpam();
    };

    const pollId = window.setInterval(syncDebuggerTrap, 500);

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('resize', syncDebuggerTrap);
    syncDebuggerTrap();

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('resize', syncDebuggerTrap);
      window.clearInterval(pollId);
      stopDebuggerSpam();
    };
  }, []);

  return (
    <LanguageProvider>
      <ToastProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <SeoHead />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<PortfolioPage theme={theme} setTheme={setTheme} />} />
                <Route path="/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminLayout />
                    </ProtectedAdminRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="profile" element={<AdminProfilePage />} />
                  <Route path="password" element={<AdminPasswordPage />} />
                  <Route path="contacts" element={<AdminContactsPage />} />
                  <Route path="visits" element={<AdminVisitsPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            {/* Vercel traffic analytics */}
            <Analytics />
            {/* Vercel real-user performance metrics */}
            <SpeedInsights />
          </BrowserRouter>
        </AdminAuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
