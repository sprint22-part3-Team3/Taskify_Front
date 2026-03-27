import type {
  getColumnsParams,
  GetColumnsResponse,
} from '@/features/columns/apis/columns.types';
import { get } from '@/shared/apis/fetchInstance';

/**
 * GET 컬럼 목록 조회
 */
export const getColumns = async ({ dashboardId }: getColumnsParams) => {
  const res = await get<GetColumnsResponse>(
    `columns?dashboardId=${dashboardId}`
  );

  return res;
};
