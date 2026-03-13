import React from 'react';
import { Activity, FileText, Globe2, Languages, LayoutDashboard, Lock, Mail, User } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { apiUrl } from '../../../lib/api.js';

export default function AdminShell({ children, sectionLabel, title, description, actions }) {
  const { lang, toggleLang, t } = useLanguage();
  const { user } = useAdminAuth();
  const location = useLocation();

  const navigationItems = [
    {
      to: '/admin',
      end: true,
      icon: LayoutDashboard,
      label: t.admin.overview,
    },
    {
      to: '/admin/profile',
      icon: User,
      label: t.admin.profile,
    },
    {
      to: '/admin/password',
      icon: Lock,
      label: t.admin.passwordSettings,
    },
    {
      to: '/admin/contacts',
      icon: Mail,
      label: t.admin.contacts,
    },
    {
      to: '/admin/visits',
      icon: Activity,
      label: t.admin.visits,
    },
  ];

  const toolItems = [
    {
      href: apiUrl('/api/docs'),
      label: t.admin.documentation,
      icon: FileText,
      external: true,
    },
    {
      to: '/',
      label: t.admin.openSite,
      icon: Globe2,
    },
  ];

  const activeItem =
    navigationItems.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to))) ||
    navigationItems[0];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-sidebar__brand">
          <span className="admin-sidebar__mark">DD</span>
          <div className="admin-sidebar__brand-copy">
            <span className="admin-sidebar__brand-label">DEVDIEN OPS</span>
            <span className="admin-sidebar__brand-value">{t.admin.workspace}</span>
          </div>
        </Link>

        <div className="admin-sidebar__section">
          <p className="admin-sidebar__section-label">{t.admin.navigation}</p>
          <nav className="admin-sidebar__nav">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="admin-sidebar__section">
          <p className="admin-sidebar__section-label">{t.admin.tools}</p>
          <nav className="admin-sidebar__nav">
            {toolItems.map((item) => {
              const Icon = item.icon;

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-nav-item admin-nav-item--subtle"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </a>
                );
              }

              return (
                <Link key={item.to} to={item.to} className="admin-nav-item admin-nav-item--subtle">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="admin-sidebar__profile">
          <p className="admin-sidebar__profile-label">{t.admin.signedInAs}</p>
          <p className="admin-sidebar__profile-name">{user?.fullName || 'Admin user'}</p>
          <p className="admin-sidebar__profile-email">{user?.email || 'admin@example.com'}</p>
          <span className="admin-sidebar__role">{user?.role || 'admin'}</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-main__header">
          <div className="admin-main__headline">
            <div className="admin-main__eyebrow-row">
              <span className="admin-main__badge">{sectionLabel || activeItem.label}</span>
              <span className="admin-main__eyebrow">{t.admin.protected}</span>
            </div>
            <h1 className="admin-main__title">{title}</h1>
            <p className="admin-main__description">{description}</p>
          </div>

          <div className="admin-main__header-side">
            <div className="admin-main__session">
              <span className="admin-main__session-label">{t.admin.sessionOwner}</span>
              <strong className="admin-main__session-value">{user?.email || 'admin@example.com'}</strong>
              <span className="admin-main__session-meta">{user?.role || 'admin'}</span>
            </div>

            <div className="admin-main__actions">
              <button type="button" onClick={toggleLang} className="admin-toolbar-button">
                <Languages size={15} />
                <span>{lang.toUpperCase()}</span>
              </button>
              {actions}
            </div>
          </div>
        </header>

        <div className="admin-main__content">{children}</div>
      </main>
    </div>
  );
}
