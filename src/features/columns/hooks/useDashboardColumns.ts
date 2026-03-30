import { useEffect, useState } from 'react';
import { getColumns } from '@/features/columns/apis/columns';
import type { Column } from '@/features/columns/types/column.types';

type UseDashboardColumnsResult = {
  columns: Column[];
  isLoading: boolean;
  errorMessage: string | null;
};

const DEFAULT_ERROR_MESSAGE = '컬럼 정보를 불러오는 데 실패했습니다.';

export function useDashboardColumns(
  dashboardId?: number,
  enabled = false
): UseDashboardColumnsResult {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !dashboardId) {
      setColumns([]);
      setErrorMessage(null);
      return;
    }

    let isMounted = true;

    const fetchColumns = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getColumns({ dashboardId });
        if (!response) {
          throw new Error(DEFAULT_ERROR_MESSAGE);
        }
        if (!isMounted) {
          return;
        }
        setColumns(response.data);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        const message =
          error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        setColumns([]);
        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchColumns();

    return () => {
      isMounted = false;
    };
  }, [dashboardId, enabled]);

  return { columns, isLoading, errorMessage };
}
