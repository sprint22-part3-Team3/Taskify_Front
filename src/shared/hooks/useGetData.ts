import { ApiError } from '@/shared/apis/apiError';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseGetDataProps<T> = {
  fetchFn: () => Promise<T>;
  dependencyId: number;
  notFoundMessage: string;
};

/**
 * GET 요청을 수행하고 로딩 및 에러 상태를 관리하는 공통 훅
 *
 * @example
 * ```ts
 * const fetchFn = useCallback(() => getCards({ columnId }), [columnId]);
 *
 * const { result, isLoading, isFetching, errorMessage, refetch } = useGetData({
 *   fetchFn,
 *   dependencyId: columnId,
 *   notFoundMessage: '컬럼을 찾을 수 없거나 접근 권한이 없습니다',
 * });
 * ```
 */
export const useGetData = <T>({
  fetchFn,
  dependencyId,
  notFoundMessage,
}: UseGetDataProps<T>) => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const isInitialLoad = useRef(true);
  const refetch = useCallback(() => setRefetchKey((prev) => prev + 1), []);

  useEffect(() => {
    isInitialLoad.current = true;
  }, [dependencyId]);

  useEffect(() => {
    if (Number.isNaN(dependencyId)) {
      setIsLoading(false);
      setIsFetching(false);
      setErrorMessage(null);
      return;
    }

    let isCancelled = false;

    const fetchData = async () => {
      if (isInitialLoad.current) {
        setIsLoading(true);
      }
      setIsFetching(true);
      setErrorMessage(null);

      try {
        const res = await fetchFn();
        if (!isCancelled) {
          setResult(res);
        }
      } catch (err) {
        if (!isCancelled) {
          if (err instanceof ApiError && err.status === 404) {
            setErrorMessage(notFoundMessage);
          } else if (err instanceof Error) {
            setErrorMessage(err.message);
          } else {
            setErrorMessage('알 수 없는 에러가 발생했습니다.');
          }
        }
      } finally {
        if (!isCancelled) {
          isInitialLoad.current = false;
          setIsLoading(false);
          setIsFetching(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [dependencyId, fetchFn, notFoundMessage, refetchKey]);

  return { result, isLoading, isFetching, errorMessage, refetch };
};
