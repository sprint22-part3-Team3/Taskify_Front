import { ApiError } from '@/shared/apis/apiError';
import { useEffect, useState } from 'react';

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
 * const { result, isLoading, errorMessage } = useGetData({
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(dependencyId)) return;

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const res = await fetchFn();
        setResult(res);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setErrorMessage(notFoundMessage);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dependencyId, fetchFn, notFoundMessage]);

  return { result, isLoading, errorMessage };
};
