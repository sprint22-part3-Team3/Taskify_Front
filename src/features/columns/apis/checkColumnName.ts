// features/column/apis/checkColumnName.ts

import { get } from '@/shared/apis/fetchInstance';
import type { Column } from '@/features/columns/types/column.types';

// TODO: dashboardId URL 파라미터 또는 Context에서 가져오도록 수정 필요
const TEMP_DASHBOARD_ID = 17586;

type GetColumnsResponse = {
  result: string;
  data: Column[];
};

/**
 * 컬럼 목록을 조회해서 이름 중복 여부를 확인합니다.
 *
 * 별도의 중복 확인 API가 없어 목록 조회 후 클라이언트에서 비교합니다.
 *
 * @returns 중복이면 `true`, 사용 가능하면 `false`
 *
 * @example
 * ```ts
 * const isDuplicate = await checkColumnNameDuplicate('Todo');
 * // true → 이미 존재하는 컬럼
 * ```
 */
export async function checkColumnNameDuplicate(name: string): Promise<boolean> {
  const response = await get<GetColumnsResponse>(
    `columns?dashboardId=${TEMP_DASHBOARD_ID}`
  );
  return response?.data.some((column) => column.title === name) ?? false;
}
