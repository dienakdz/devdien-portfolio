/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiUrl } from '../../../lib/api.js';

const STORAGE_KEY = 'portfolio-admin-session';

const AdminAuthContext = createContext(null);

const readStoredSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }

  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [session, setSession] = useState(readStoredSession);

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage restrictions.
    }
  }, [session]);

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await readJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to sign in.');
    }

    setSession({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return data.user;
  }, []);

  const refreshSession = useCallback(async () => {
    if (!session?.refreshToken) {
      throw new Error('No refresh session available.');
    }

    const response = await fetch(apiUrl('/api/auth/refresh'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });

    const data = await readJson(response);

    if (!response.ok) {
      clearSession();
      throw new Error(data.message || 'Session refresh failed.');
    }

    setSession((prev) =>
      prev
        ? {
            ...prev,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }
        : prev,
    );

    return data;
  }, [clearSession, session?.refreshToken]);

  const authorizedFetch = useCallback(
    async (path, init = {}) => {
      if (!session?.accessToken) {
        throw new Error('Missing access token.');
      }

      const request = (accessToken) =>
        fetch(apiUrl(path), {
          ...init,
          headers: {
            ...(init.headers || {}),
            Authorization: `Bearer ${accessToken}`,
          },
        });

      let response = await request(session.accessToken);

      if (response.status !== 401) {
        return response;
      }

      const refreshed = await refreshSession();
      response = await request(refreshed.accessToken);

      if (response.status === 401) {
        clearSession();
      }

      return response;
    },
    [clearSession, refreshSession, session?.accessToken],
  );

  const fetchCurrentUser = useCallback(async () => {
    const response = await authorizedFetch('/api/auth/me');
    const data = await readJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load current user.');
    }

    setSession((prev) =>
      prev
        ? {
            ...prev,
            user: data.user,
          }
        : prev,
    );

    return data.user;
  }, [authorizedFetch]);

  const updateProfile = useCallback(
    async ({ email, fullName }) => {
      const response = await authorizedFetch('/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullName }),
      });

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update profile.');
      }

      setSession((prev) =>
        prev
          ? {
              ...prev,
              user: data.user,
            }
          : prev,
      );

      return data.user;
    },
    [authorizedFetch],
  );

  const changePassword = useCallback(
    async ({ currentPassword, newPassword }) => {
      const response = await authorizedFetch('/api/auth/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(data.message || 'Unable to change password.');
      }

      if (data.requiresLogin) {
        clearSession();
      }

      return data;
    },
    [authorizedFetch, clearSession],
  );

  const signOut = useCallback(async () => {
    try {
      if (session?.refreshToken) {
        await fetch(apiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: session.refreshToken }),
        });
      }
    } finally {
      clearSession();
    }
  }, [clearSession, session?.refreshToken]);

  return (
    <AdminAuthContext.Provider
      value={{
        session,
        user: session?.user || null,
        accessToken: session?.accessToken || '',
        isAuthenticated: Boolean(session?.accessToken),
        signIn,
        signOut,
        refreshSession,
        fetchCurrentUser,
        updateProfile,
        changePassword,
        authorizedFetch,
        clearSession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
