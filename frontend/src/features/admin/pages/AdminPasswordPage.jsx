import React, { useState } from 'react';
import { Lock, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

const initialForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function AdminPasswordPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { user, changePassword } = useAdminAuth();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.newPassword !== form.confirmPassword) {
      setError(t.admin.passwordMismatch);
      return;
    }

    setSubmitting(true);

    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      showToast(t.toasts.passwordUpdateSuccess, 'success');
      navigate('/login', { replace: true });
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
              <p className="admin-card__eyebrow">{t.admin.passwordSettings}</p>
              <h2 className="admin-card__title">{t.admin.passwordFormTitle}</h2>
            </div>
            <span className="admin-card__count">{t.admin.protected}</span>
          </div>

          <form onSubmit={handleSubmit} className="admin-form" noValidate>
            <label className="admin-form-field">
              <span>{t.admin.currentPassword}</span>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="admin-form-input"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="admin-form-grid">
              <label className="admin-form-field">
                <span>{t.admin.newPassword}</span>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="admin-form-input"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                />
              </label>

              <label className="admin-form-field">
                <span>{t.admin.confirmPassword}</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="admin-form-input"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                />
              </label>
            </div>

            <p className="admin-form-hint">{t.admin.passwordRequirements}</p>

            {error ? <p className="admin-card__empty admin-card__empty--error">{error}</p> : null}

            <div className="admin-form-actions">
              <button type="submit" className="admin-primary-button" disabled={submitting}>
                <Save size={16} />
                <span>{submitting ? t.admin.changingPassword : t.admin.saveChanges}</span>
              </button>
            </div>
          </form>
        </section>

        <section className="admin-card">
          <div className="admin-card__header">
            <div>
              <p className="admin-card__eyebrow">{t.admin.session}</p>
              <h2 className="admin-card__title">{t.admin.accountSummary}</h2>
            </div>
            <span className="admin-card__count">
              <Lock size={14} />
              <span>{user?.role || 'admin'}</span>
            </span>
          </div>

          <div className="admin-detail-list">
            <div className="admin-detail-item">
              <span>{t.auth.email}</span>
              <strong>{user?.email || 'admin@example.com'}</strong>
            </div>

            <div className="admin-detail-item">
              <span>{t.admin.roleLabel}</span>
              <strong>{user?.role || 'admin'}</strong>
            </div>
          </div>

          <p className="admin-form-hint">{t.admin.reloginNotice}</p>
        </section>
      </div>
    </div>
  );
}
