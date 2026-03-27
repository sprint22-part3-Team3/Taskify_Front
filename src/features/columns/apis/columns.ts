import type { GetColumnsResponse } from '@/features/columns/columns.types';
import { get } from '@/shared/apis/fetchInstance';

/**
 * GET 컬럼 목록 조회
 */
export const getColumns = async (dashboardId: number, token: string | null) => {
  const res = await get<GetColumnsResponse>(
    `columns?dashboardId=${dashboardId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};
