import type {
  DelCommentParams,
  GetCommentsParams,
  GetCommentsResponse,
  PostCommentParams,
  PostCommentResponse,
  PutCommentParams,
  PutCommentResponse,
} from '@/features/comments/apis/comments.types';
import { del, get, post, put } from '@/shared/apis/fetchInstance';

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

/**
 * PUT 댓글 수정
 */
export const putComment = async ({ id, content }: PutCommentParams) => {
  const res = await put<PutCommentResponse>(`comments/${id}`, {
    content,
  });

  return res;
};

/**
 * DELETE 댓글 삭제
 */
export const delComment = async ({ id }: DelCommentParams) => {
  await del(`comments/${id}`);
};
