import React, { Suspense, lazy, useEffect, useState } from 'react';
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

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.documentElement.style.colorScheme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

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
          </BrowserRouter>
        </AdminAuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
