import { useState, useCallback, useEffect } from 'react';

export const useBookings = (page = 1, limit = 10, status = 'all') => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();
      query.append('page', page);
      query.append('limit', limit);
      if (status !== 'all') {
        query.append('status', status);
      }

      const res = await fetch(`/api/booking?${query.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBookings(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, limit, status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    pagination,
    refetch: fetchBookings,
  };
};

export const useBookingStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/booking/analytics');
      const data = await res.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.message || 'Failed to fetch stats');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

export const createBooking = async (bookingData) => {
  const res = await fetch('/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to create booking');
  }

  return data.data;
};

export const updateBookingStatus = async (bookingId, status, endpoint) => {
  const res = await fetch(`/api/booking/${bookingId}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to update booking');
  }

  return data.data;
};

export const addBookingRating = async (bookingId, rating, review) => {
  const res = await fetch(`/api/booking/${bookingId}/rate`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating, review }),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to add rating');
  }

  return data.data;
};

export const updatePaymentStatus = async (bookingId, paymentStatus, paymentMethod) => {
  const res = await fetch(`/api/booking/${bookingId}/payment`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentStatus, paymentMethod }),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to update payment');
  }

  return data.data;
};

export const cancelBooking = async (bookingId, reason) => {
  const res = await fetch(`/api/booking/${bookingId}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cancellationReason: reason }),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to cancel booking');
  }

  return data.data;
};
