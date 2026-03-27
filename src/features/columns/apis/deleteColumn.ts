import { del } from '@/shared/apis/fetchInstance';

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
