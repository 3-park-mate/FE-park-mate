import { ApiResponse } from '@/types/responseDataTypes';
import { useState, useEffect, useCallback } from 'react';

interface UseFetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useFetchData<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  initialFetch = true
): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      if (res.success) {
        setData(res.data);
      } else {
        setError(new Error(res.message || 'Failed to fetch data'));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (initialFetch) {
      fetchData();
    }
  }, [fetchData, initialFetch]);

  return { data, loading, error, refetch: fetchData };
}
