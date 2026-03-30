import { useCallback } from 'react';
import { getCards } from '@/features/cards/apis/cards';
import { useGetData } from '@/shared/hooks/useGetData';

const NOT_FOUND_OR_FORBIDDEN_ERROR =
  '컬럼을 찾을 수 없거나 접근 권한이 없습니다';

/**
 * 카드 목록을 조회하는 훅
 */
export const useCardList = (columnId: number) => {
  const fetchFn = useCallback(() => getCards({ columnId }), [columnId]);

  const { result, isLoading, errorMessage, refetch } = useGetData({
    fetchFn,
    dependencyId: columnId,
    notFoundMessage: NOT_FOUND_OR_FORBIDDEN_ERROR,
  });

  return {
    cards: result?.cards || [],
    cardCount: result?.totalCount || 0,
    isLoading,
    errorMessage,
    refetch,
  };
};
