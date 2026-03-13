import React, { useEffect, useState } from 'react';
import { RefreshCcw, Save } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

const normalizeProfile = (user) => ({
  email: user?.email || '',
  fullName: user?.fullName || '',
});

const trimProfile = (profile) => ({
  email: profile.email.trim(),
  fullName: profile.fullName.trim(),
});

export default function AdminProfilePage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { user, fetchCurrentUser, updateProfile } = useAdminAuth();
  const [form, setForm] = useState(() => normalizeProfile(user));
  const [initialForm, setInitialForm] = useState(() => normalizeProfile(user));
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const nextProfile = normalizeProfile(user);
    setForm(nextProfile);
    setInitialForm(nextProfile);
  }, [user?.email, user?.fullName]);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      setLoading(true);
      setError('');

      try {
        const nextUser = await fetchCurrentUser();

        if (!active) {
          return;
        }

        const nextProfile = normalizeProfile(nextUser);
        setForm(nextProfile);
        setInitialForm(nextProfile);
      } catch (error) {
        if (!active) {
          return;
        }

        setError(error.message || t.admin.error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [fetchCurrentUser, t.admin.error]);

  const isDirty = (() => {
    const current = trimProfile(form);
    const initial = trimProfile(initialForm);

    return current.email !== initial.email || current.fullName !== initial.fullName;
  })();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setError('');
  };

  const handleReload = async () => {
    setLoading(true);
    setError('');

    try {
      const nextUser = await fetchCurrentUser();
      const nextProfile = normalizeProfile(nextUser);
      setForm(nextProfile);
      setInitialForm(nextProfile);
    } catch (error) {
      const message = error.message || t.admin.error;
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const nextUser = await updateProfile(trimProfile(form));
      const nextProfile = normalizeProfile(nextUser);

      setForm(nextProfile);
      setInitialForm(nextProfile);
      showToast(t.toasts.profileUpdateSuccess, 'success');
    } catch (error) {
      const message = error.message || t.admin.error;
      setError(message);
      showToast(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-data-grid">
        <section className="admin-card">
          <div className="admin-card__header">
            <div>
              <p className="admin-card__eyebrow">{t.admin.profile}</p>
              <h2 className="admin-card__title">{t.admin.profileFormTitle}</h2>
            </div>

            <button type="button" onClick={handleReload} className="admin-card__ghost-button" disabled={loading || submitting}>
              <RefreshCcw size={16} />
              <span>{t.admin.refresh}</span>
            </button>
          </div>

          {loading ? (
            <p className="admin-card__empty">{t.admin.loading}</p>
          ) : (
            <form onSubmit={handleSubmit} className="admin-form" noValidate>
              <div className="admin-form-grid">
                <label className="admin-form-field">
                  <span>{t.admin.fullName}</span>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="admin-form-input"
                    autoComplete="name"
                    placeholder={t.admin.fullName}
                  />
                </label>

                <label className="admin-form-field">
                  <span>{t.auth.email}</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="admin-form-input"
                    autoComplete="email"
                    required
                    placeholder="admin@example.com"
                  />
                </label>
              </div>

              {error ? <p className="admin-card__empty admin-card__empty--error">{error}</p> : null}

              <div className="admin-form-actions">
                <button type="submit" className="admin-primary-button" disabled={!isDirty || submitting}>
                  <Save size={16} />
                  <span>{submitting ? t.admin.saving : t.admin.saveChanges}</span>
                </button>

                <button type="button" onClick={handleReset} className="admin-card__ghost-button" disabled={!isDirty || submitting}>
                  {t.admin.resetForm}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="admin-card">
          <div className="admin-card__header">
            <div>
              <p className="admin-card__eyebrow">{t.admin.session}</p>
              <h2 className="admin-card__title">{t.admin.accountSummary}</h2>
            </div>
            <span className="admin-card__count">{user?.role || 'admin'}</span>
          </div>

          <div className="admin-detail-list">
            <div className="admin-detail-item">
              <span>{t.admin.userId}</span>
              <strong>{user?.id || '--'}</strong>
            </div>

            <div className="admin-detail-item">
              <span>{t.admin.fullName}</span>
              <strong>{user?.fullName || '--'}</strong>
            </div>

            <div className="admin-detail-item">
              <span>{t.auth.email}</span>
              <strong>{user?.email || 'admin@example.com'}</strong>
            </div>

            <div className="admin-detail-item">
              <span>{t.admin.roleLabel}</span>
              <strong>{user?.role || 'admin'}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
