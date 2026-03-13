import { useCallback, useEffect, useMemo, useState } from 'react';

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

export function useAdminPaginatedCollection({
  path,
  pageSize = 12,
  authorizedFetch,
  showToast,
  messages,
}) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    total: 0,
    items: [],
    loading: true,
    error: '',
  });

  const loadPage = useCallback(
    async (targetPage = page) => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: '',
      }));

      try {
        const response = await authorizedFetch(`${path}?page=${targetPage}&pageSize=${pageSize}`);
        const data = await readJson(response);

        if (!response.ok) {
          throw new Error(data.message || messages.loadError);
        }

        setState({
          total: data.total || 0,
          items: Array.isArray(data.items) ? data.items : [],
          loading: false,
          error: '',
        });
      } catch (error) {
        const message = error.message || messages.fallbackError;

        setState({
          total: 0,
          items: [],
          loading: false,
          error: message,
        });
        showToast(message, 'error');
      }
    },
    [authorizedFetch, messages.fallbackError, messages.loadError, page, pageSize, path, showToast],
  );

  useEffect(() => {
    loadPage(page);
  }, [loadPage, page]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((state.total || 0) / pageSize) || 1),
    [pageSize, state.total],
  );

  const goToPreviousPage = useCallback(() => {
    setPage((current) => Math.max(1, current - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPage((current) => (current < totalPages ? current + 1 : current));
  }, [totalPages]);

  return {
    page,
    pageSize,
    total: state.total,
    totalPages,
    items: state.items,
    loading: state.loading,
    error: state.error,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    refresh: () => loadPage(page),
    goToPreviousPage,
    goToNextPage,
  };
}
