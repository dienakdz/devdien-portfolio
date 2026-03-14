import React from 'react';
import { Activity, ArrowLeft, ArrowRight, Globe2, MonitorSmartphone } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useAdminPaginatedCollection } from '../hooks/useAdminPaginatedCollection.js';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';
import { formatAdminDateParts, formatAdminDateTime } from '../utils/formatAdminDate.js';

export default function AdminVisitsPage() {
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
    path: '/api/admin/visits',
    pageSize: 12,
    authorizedFetch,
    showToast,
    messages: {
      loadError: t.toasts.adminLoadError,
      fallbackError: t.admin.error,
    },
  });

  const latestVisit = items[0] || null;

  return (
    <div className="admin-dashboard">
      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span className="admin-stat-card__icon">
            <Activity size={18} />
          </span>
          <div>
            <p className="admin-stat-card__label">{t.admin.visits}</p>
            <p className="admin-stat-card__value">{total}</p>
            <p className="admin-stat-card__meta">{t.admin.totalRecords}</p>
          </div>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-card__icon">
            <Globe2 size={18} />
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
            <MonitorSmartphone size={18} />
          </span>
          <div>
            <p className="admin-stat-card__label">{t.admin.latestVisits}</p>
            <p className="admin-stat-card__value">
              {latestVisit ? latestVisit.ip || t.admin.ipUnavailable : '-'}
            </p>
            <p className="admin-stat-card__meta">
              {latestVisit ? formatAdminDateTime(latestVisit.visitedAt, lang) : t.admin.emptyVisits}
            </p>
          </div>
        </article>
      </div>

      <section className="admin-card">
        <div className="admin-card__header">
          <div>
            <p className="admin-card__eyebrow">{t.admin.visits}</p>
            <h2 className="admin-card__title">{t.admin.visitsPageTitle}</h2>
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
              <table className="admin-table admin-table--visits">
                <thead>
                  <tr>
                    <th scope="col">{t.admin.tableIp}</th>
                    <th scope="col">{t.admin.tableDevice}</th>
                    <th scope="col">{t.admin.tablePlatform}</th>
                    <th scope="col">{t.admin.tableLocation}</th>
                    <th scope="col">{t.admin.tableVisited}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const visitedAt = formatAdminDateParts(item.visitedAt, lang);

                    return (
                      <tr key={item.id}>
                        <td>
                          <span className="admin-table__primary admin-table__primary--mono">
                            {item.ip || t.admin.ipUnavailable}
                          </span>
                        </td>
                        <td>
                          <span className="admin-table__primary">
                            {item.deviceType || t.admin.unknownDevice}
                          </span>
                        </td>
                        <td>
                          <span className="admin-table__primary">
                            {item.browser || t.admin.unknownBrowser}
                          </span>
                          <p className="admin-table__secondary">{item.os || t.admin.unknownOs}</p>
                        </td>
                        <td>
                          <span className="admin-table__primary">
                            {item.city || item.region || t.admin.unknownLocation}
                          </span>
                          <p className="admin-table__secondary">{item.country || '--'}</p>
                        </td>
                        <td>
                          <span className="admin-table__primary admin-table__primary--mono">{visitedAt.date}</span>
                          <p className="admin-table__secondary admin-table__secondary--mono">{visitedAt.time}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="admin-card__empty">{t.admin.emptyVisits}</p>
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
