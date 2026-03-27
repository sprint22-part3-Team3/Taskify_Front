import { useEffect, useState } from 'react';
import { getColumns } from '@/features/columns/apis/columns';

type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * 대시보드의 컬럼 목록을 조회하는 훅
 */
export const useColumnList = (dashboardId: number) => {
  // TODO : #59 머지 후, @/shared/types/column.types의 `Column[]` 으로 변경
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dashboardId || Number.isNaN(dashboardId)) return;

    const fetchColumns = async () => {
      try {
        setIsLoading(true);
        const res = await getColumns(dashboardId);
        setColumns(res?.data || []);
      } catch (err) {
        // TODO : 에러 처리
        console.error('컬럼 조회 실패', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchColumns();
  }, [dashboardId]);

  return { columns, isLoading };
};
