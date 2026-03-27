import { put } from '@/shared/apis/fetchInstance';
import type {
  Column,
  UpdateColumnRequest,
} from '@/features/columns/types/column.types';

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
