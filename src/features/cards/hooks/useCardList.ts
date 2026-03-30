import { useCallback, useMemo } from 'react';
import { getCards } from '@/features/cards/apis/cards';
import { useGetData } from '@/shared/hooks/useGetData';
import { useGetMoreData } from '@/shared/hooks/useGetMoreData';
import type { Card } from '@/features/cards/types/card.types';
import type { GetCardsResponse } from '@/features/cards/apis/cards.types';

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

  const {
    additionalData: additionalCards,
    cursorId,
    isAddLoading,
    addErrorMessage,
    loadMore,
  } = useGetMoreData<Card, GetCardsResponse>({
    initialResult: result,
    fetchMoreFn: useCallback(
      async (cursor) => {
        const res = await getCards({ columnId, cursorId: cursor });
        if (!res) throw new Error('추가 데이터를 불러오지 못했습니다.');
        return res;
      },
      [columnId]
    ),
    extractData: useCallback((res: GetCardsResponse) => res.cards, []),
  });

  const cards = useMemo(
    () => [...(result?.cards ?? []), ...additionalCards],
    [result?.cards, additionalCards]
  );

  return {
    cards,
    cardCount: result?.totalCount ?? 0,
    cursorId,
    isLoading,
    isAddLoading,
    errorMessage,
    addErrorMessage,
    refetch,
    loadMore,
  };
};
