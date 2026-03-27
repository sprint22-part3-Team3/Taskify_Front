import type {
  getColumnsParams,
  GetColumnsResponse,
} from '@/features/columns/apis/columns.types';
import { get } from '@/shared/apis/fetchInstance';

/**
 * GET 컬럼 목록 조회
 */
// TODO : 공통 토큰 로직 추가 후 정리
export const getColumns = async ({ dashboardId, token }: getColumnsParams) => {
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
