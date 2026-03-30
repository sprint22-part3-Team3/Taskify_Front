import type {
  getColumnsParams,
  GetColumnsResponse,
  CreateColumnRequest,
  UpdateColumnRequest,
} from '@/features/columns/apis/columns.types';
import type { Column } from '@/features/columns/types/cloumn.types';
import { get, post, del, put } from '@/shared/apis/fetchInstance';

/**
 * GET 컬럼 목록 조회
 */
export const getColumns = async ({ dashboardId }: getColumnsParams) => {
  const params = new URLSearchParams({
    dashboardId: dashboardId.toString(),
  });

  const res = await get<GetColumnsResponse>(`columns?${params.toString()}`);

  return res;
};

/**
 * 컬럼을 생성합니다.
 *
 * `POST /{teamId}/columns`
 *
 * @returns 생성된 `Column` 객체
 *
 * @example
 * ```ts
 * const column = await createColumn({ title: 'Todo', dashboardId: 1 });
 * ```
 */
export async function createColumn(
  body: CreateColumnRequest
): Promise<Column | null> {
  return post<Column>('columns', body);
}

/**
 * 컬럼을 삭제합니다.
 *
 * `DELETE /{teamId}/columns/{columnId}`
 *
 * 삭제 성공 시 `204 No Content`를 반환합니다.
 *
 * @returns `null`
 *
 * @example
 * ```ts
 * await deleteColumn(1);
 * ```
 */
export async function deleteColumn(columnId: number): Promise<null> {
  return del<null>(`columns/${columnId}`);
}

/**
 * 컬럼 이름을 수정합니다.
 *
 * `PUT /{teamId}/columns/{columnId}`
 *
 * @returns 수정된 `Column` 객체
 *
 * @example
 * ```ts
 * const column = await updateColumn(1, { title: 'In Progress' });
 * ```
 */
export async function updateColumn(
  columnId: number,
  body: UpdateColumnRequest
): Promise<Column | null> {
  return put<Column>(`columns/${columnId}`, body);
}
