import { useState, useCallback, useEffect } from 'react';

export const useDrivers = (page = 1, limit = 10) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();
      query.append('page', page);
      query.append('limit', limit);

      const res = await fetch(`/api/drivers?${query.toString()}`);
      const data = await res.json();

      if (data.success) {
        setDrivers(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || 'Failed to fetch drivers');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  return {
    drivers,
    loading,
    error,
    pagination,
    refetch: fetchDrivers,
  };
};
