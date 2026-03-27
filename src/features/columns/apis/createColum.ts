import { post } from '@/shared/apis/fetchInstance';
import type {
  Column,
  CreateColumnRequest,
} from '@/features/columns/types/column.types';

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
