import { useCallback, useMemo } from 'react';
import { getComments } from '@/features/comments/apis/comments';
import { useGetData } from '@/shared/hooks/useGetData';
import { useGetMoreData } from '@/shared/hooks/useGetMoreData';
import type { Comment } from '@/features/comments/types/comment.types';
import type { GetCommentsResponse } from '@/features/comments/apis/comments.types';

const NOT_FOUND_OR_FORBIDDEN_ERROR =
  '코멘트를 찾을 수 없거나 접근 권한이 없습니다';

/**
 * 코멘트 목록을 조회하는 훅
 */
export const useCommentList = (cardId: number) => {
  const fetchFn = useCallback(() => getComments({ cardId }), [cardId]);

  const { result, isLoading, errorMessage, refetch } = useGetData({
    fetchFn,
    dependencyId: cardId,
    notFoundMessage: NOT_FOUND_OR_FORBIDDEN_ERROR,
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
        if (!res) throw new Error('추가 데이터를 불러오지 못했습니다.');
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
