import { useCallback, useMemo } from 'react';
import { getComments } from '@/features/comments/apis/comments';
import { useGetData } from '@/shared/hooks/useGetData';
import { useGetMoreData } from '@/shared/hooks/useGetMoreData';
import type { Comment } from '@/features/comments/types/comment.types';
import type { GetCommentsResponse } from '@/features/comments/apis/comments.types';
import { COMMENT_MESSAGES } from '@/features/comments/constants/commentMessage.constants';

/**
 * 댓글 목록을 조회하는 훅
 */
export const useCommentList = (cardId: number) => {
  const fetchFn = useCallback(() => getComments({ cardId }), [cardId]);

  const { result, isLoading, errorMessage, refetch } = useGetData({
    fetchFn,
    dependencyId: cardId,
    notFoundMessage: COMMENT_MESSAGES.ERROR.NOT_FOUND_OR_FORBIDDEN.message,
  });

  const {
    additionalData: additionalComments,
    cursorId,
    isAddLoading,
    addErrorMessage,
    loadMore,
  } = useGetMoreData<Comment, GetCommentsResponse>({
    initialResult: result,
    fetchMoreFn: useCallback(
      async (cursor) => {
        const res = await getComments({ cardId, cursorId: cursor });
        if (!res) throw new Error(COMMENT_MESSAGES.ERROR.FETCH_MORE.message);
        return res;
      },
      [cardId]
    ),
    extractData: useCallback((res: GetCommentsResponse) => res.comments, []),
  });

  const comments = useMemo(
    () => [...(result?.comments ?? []), ...additionalComments],
    [result?.comments, additionalComments]
  );

  return {
    comments,
    cursorId,
    isLoading,
    isAddLoading,
    errorMessage,
    addErrorMessage,
    refetch,
    loadMore,
  };
};
