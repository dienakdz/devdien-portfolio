import React from 'react';
import { ArrowLeft, ArrowRight, Mail, MapPinned } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useAdminPaginatedCollection } from '../hooks/useAdminPaginatedCollection.js';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';
import { formatAdminDateParts, formatAdminDateTime } from '../utils/formatAdminDate.js';

export default function AdminContactsPage() {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const { authorizedFetch } = useAdminAuth();
  const {
    items,
    total,
    page,
    totalPages,
    loading,
    error,
    pageSize,
    hasPreviousPage,
    hasNextPage,
    refresh,
    goToPreviousPage,
    goToNextPage,
  } = useAdminPaginatedCollection({
    path: '/api/admin/contacts',
    pageSize: 10,
    authorizedFetch,
    showToast,
    messages: {
      loadError: t.toasts.adminLoadError,
      fallbackError: t.admin.error,
    },
  });

  const latestContact = items[0] || null;

  return (
    <div className="admin-dashboard">
      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span className="admin-stat-card__icon">
            <Mail size={18} />
          </span>
          <div>
            <p className="admin-stat-card__label">{t.admin.contacts}</p>
            <p className="admin-stat-card__value">{total}</p>
            <p className="admin-stat-card__meta">{t.admin.totalRecords}</p>
          </div>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-card__icon">
            <MapPinned size={18} />
          </span>
          <div>
            <p className="admin-stat-card__label">{t.admin.currentPage}</p>
            <p className="admin-stat-card__value">{page}</p>
            <p className="admin-stat-card__meta">
              {t.admin.pageOf} {totalPages}
            </p>
          </div>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-card__icon">
            <Mail size={18} />
          </span>
          <div>
            <p className="admin-stat-card__label">{t.admin.latestContacts}</p>
            <p className="admin-stat-card__value">{latestContact ? latestContact.name || latestContact.email : '-'}</p>
            <p className="admin-stat-card__meta">
              {latestContact ? formatAdminDateTime(latestContact.createdAt, lang) : t.admin.emptyContacts}
            </p>
          </div>
        </article>
      </div>

      <section className="admin-card">
        <div className="admin-card__header">
          <div>
            <p className="admin-card__eyebrow">{t.admin.contacts}</p>
            <h2 className="admin-card__title">{t.admin.contactsPageTitle}</h2>
          </div>

          <div className="admin-card__actions">
            <span className="admin-card__count">
              {t.admin.pageSize}: {pageSize}
            </span>
            <button type="button" onClick={refresh} className="admin-card__ghost-button">
              {t.admin.refresh}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="admin-card__empty">{t.admin.loading}</p>
        ) : error ? (
          <p className="admin-card__empty admin-card__empty--error">{error}</p>
        ) : items.length ? (
          <div className="admin-table-shell">
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">{t.admin.tableContact}</th>
                    <th scope="col">{t.admin.tableIp}</th>
                    <th scope="col">{t.admin.tableLocation}</th>
                    <th scope="col">{t.admin.tableMessage}</th>
                    <th scope="col">{t.admin.tableSubmitted}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const submittedAt = formatAdminDateParts(item.createdAt, lang);

                    return (
                      <tr key={item.id}>
                        <td>
                          <span className="admin-table__primary">{item.name || '--'}</span>
                          <p className="admin-table__secondary">{item.email}</p>
                        </td>
                        <td>
                          <span className="admin-table__primary admin-table__primary--mono">
                            {item.ip || t.admin.ipUnavailable}
                          </span>
                        </td>
                        <td>
                          <span className="admin-table__primary">
                            {item.city || item.region || t.admin.unknownLocation}
                          </span>
                          <p className="admin-table__secondary">{item.country || '--'}</p>
                        </td>
                        <td>
                          <p className="admin-table__copy admin-table__copy--message" title={item.message || t.admin.noMessage}>
                            {item.message || t.admin.noMessage}
                          </p>
                        </td>
                        <td>
                          <span className="admin-table__primary admin-table__primary--mono">{submittedAt.date}</span>
                          <p className="admin-table__secondary admin-table__secondary--mono">{submittedAt.time}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="admin-card__empty">{t.admin.emptyContacts}</p>
        )}

        <div className="admin-pagination">
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={!hasPreviousPage || loading}
            className="admin-pagination__button"
          >
            <ArrowLeft size={16} />
            <span>{t.admin.previous}</span>
          </button>

          <div className="admin-pagination__status">
            <span>{t.admin.currentPage}</span>
            <strong>
              {page} / {totalPages}
            </strong>
          </div>

          <button
            type="button"
            onClick={goToNextPage}
            disabled={!hasNextPage || loading}
            className="admin-pagination__button"
          >
            <span>{t.admin.next}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
