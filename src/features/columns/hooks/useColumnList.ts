import type { Column } from '@/features/columns/types/column.types';
import { useEffect, useState } from 'react';
import { getColumns } from '@/features/columns/apis/columns';
import { ApiError } from '@/shared/apis/apiError';

const NOT_FOUND_OR_FORBIDDEN_ERROR =
  '대시보드를 찾을 수 없거나 접근 권한이 없습니다';

/**
 * 대시보드의 컬럼 목록을 조회하는 훅
 */
export const useColumnList = (dashboardId: number) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(dashboardId)) return;

    const fetchColumns = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const res = await getColumns({ dashboardId });
        setColumns(res?.data || []);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setErrorMessage(NOT_FOUND_OR_FORBIDDEN_ERROR);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchColumns();
  }, [dashboardId]);

  return { columns, isLoading, errorMessage };
};
