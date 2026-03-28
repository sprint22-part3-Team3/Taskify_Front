import { useCallback } from 'react';
import { getComments } from '@/features/comments/apis/comments';
import { useGetData } from '@/shared/hooks/useGetData';

const NOT_FOUND_OR_FORBIDDEN_ERROR =
  '코멘트를 찾을 수 없거나 접근 권한이 없습니다';

/**
 * 코멘트 목록을 조회하는 훅
 */
export const useCommentList = (cardId: number) => {
  const fetchFn = useCallback(() => getComments({ cardId }), [cardId]);

  const { result, isLoading, errorMessage } = useGetData({
    fetchFn,
    dependencyId: cardId,
    notFoundMessage: NOT_FOUND_OR_FORBIDDEN_ERROR,
  });

  return { comments: result?.comments || [], isLoading, errorMessage };
};
