import { useCallback } from 'react';
import { getColumns } from '@/features/columns/apis/columns';
import { useGetData } from '@/shared/hooks/useGetData';

const NOT_FOUND_OR_FORBIDDEN_ERROR =
  '대시보드를 찾을 수 없거나 접근 권한이 없습니다';

/**
 * 대시보드의 컬럼 목록을 조회하는 훅
 */
export const useColumnList = (dashboardId: number) => {
  const fetchFn = useCallback(() => getColumns({ dashboardId }), [dashboardId]);

  const { result, isLoading, errorMessage, refetch } = useGetData({
    fetchFn,
    dependencyId: dashboardId,
    notFoundMessage: NOT_FOUND_OR_FORBIDDEN_ERROR,
  });

  return { columns: result?.data || [], isLoading, errorMessage, refetch };
};
