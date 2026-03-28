import type {
  GetCommentsParams,
  GetCommentsResponse,
} from '@/features/comments/apis/comments.types';
import { get } from '@/shared/apis/fetchInstance';

/**
 * GET 코멘트 목록 조회
 */
export const getComments = async ({ cardId, size = 10 }: GetCommentsParams) => {
  const params = new URLSearchParams({
    size: size.toString(),
    cardId: cardId.toString(),
  });
  const res = await get<GetCommentsResponse>(`comments?${params.toString()}`);

  return res;
};
