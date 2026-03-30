import type {
  GetCommentsParams,
  GetCommentsResponse,
  PostCommentParams,
  PostCommentResponse,
} from '@/features/comments/apis/comments.types';
import { get, post } from '@/shared/apis/fetchInstance';

/**
 * GET 댓글 목록 조회
 */
export const getComments = async ({ cardId, size = 10 }: GetCommentsParams) => {
  const params = new URLSearchParams({
    size: size.toString(),
    cardId: cardId.toString(),
  });
  const res = await get<GetCommentsResponse>(`comments?${params.toString()}`);

  return res;
};

/**
 * POST 댓글 생성
 */
export const postComment = async ({
  content,
  cardId,
  columnId,
  dashboardId,
}: PostCommentParams) => {
  const res = await post<PostCommentResponse>(`comments`, {
    content,
    cardId,
    columnId,
    dashboardId,
  });

  return res;
};
