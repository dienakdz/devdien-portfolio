import React, { useMemo } from 'react';
import { LogOut } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../admin.css';
import AdminShell from './AdminShell.jsx';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { signOut } = useAdminAuth();

  const pageMeta = useMemo(() => {
    if (location.pathname.startsWith('/admin/profile')) {
      return {
        sectionLabel: t.admin.profile,
        title: t.admin.profilePageTitle,
        description: t.admin.profilePageDescription,
      };
    }

    if (location.pathname.startsWith('/admin/password')) {
      return {
        sectionLabel: t.admin.passwordSettings,
        title: t.admin.passwordPageTitle,
        description: t.admin.passwordPageDescription,
      };
    }

    if (location.pathname.startsWith('/admin/contacts')) {
      return {
        sectionLabel: t.admin.contacts,
        title: t.admin.contactsPageTitle,
        description: t.admin.contactsPageDescription,
      };
    }

    if (location.pathname.startsWith('/admin/visits')) {
      return {
        sectionLabel: t.admin.visits,
        title: t.admin.visitsPageTitle,
        description: t.admin.visitsPageDescription,
      };
    }

    return {
      sectionLabel: t.admin.overview,
      title: t.admin.title,
      description: t.admin.description,
    };
  }, [location.pathname, t.admin]);

  const handleSignOut = async () => {
    await signOut();
    showToast(t.toasts.logoutSuccess, 'success');
    navigate('/login', { replace: true });
  };

  const actions = (
    <button type="button" onClick={handleSignOut} className="admin-toolbar-button admin-toolbar-button--danger">
      <LogOut size={15} />
      <span>{t.admin.signOut}</span>
    </button>
  );

  return (
    <AdminShell
      sectionLabel={pageMeta.sectionLabel}
      title={pageMeta.title}
      description={pageMeta.description}
      actions={actions}
    >
      <Outlet />
    </AdminShell>
  );
}
