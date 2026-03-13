import { useCallback, useEffect, useState } from 'react';

export function useAdminDashboard({ fetchCurrentUser, authorizedFetch, showToast, messages }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboard, setDashboard] = useState({
    profile: null,
    contacts: { total: 0, items: [] },
    visits: { total: 0, items: [] },
  });

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [profile, contactsResponse, visitsResponse] = await Promise.all([
        fetchCurrentUser(),
        authorizedFetch('/api/admin/contacts?page=1&pageSize=5'),
        authorizedFetch('/api/admin/visits?page=1&pageSize=6'),
      ]);

      const [contactsData, visitsData] = await Promise.all([
        contactsResponse.json(),
        visitsResponse.json(),
      ]);

      if (!contactsResponse.ok || !visitsResponse.ok) {
        throw new Error(contactsData.message || visitsData.message || messages.loadError);
      }

      setDashboard({
        profile,
        contacts: contactsData,
        visits: visitsData,
      });
    } catch (error) {
      const message = error.message || messages.fallbackError;
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [authorizedFetch, fetchCurrentUser, messages.fallbackError, messages.loadError, showToast]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard: loadDashboard,
  };
}
