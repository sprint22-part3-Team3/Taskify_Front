import type { Card } from '@/features/cards/types/card.types';
import { useEffect, useState } from 'react';
import { getCards } from '@/features/cards/apis/cards';
import { ApiError } from '@/shared/apis/apiError';

const NOT_FOUND_OR_FORBIDDEN_ERROR =
  '컬럼을 찾을 수 없거나 접근 권한이 없습니다';

/**
 * 카드 목록을 조회하는 훅
 */
export const useCardList = (columnId: number) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(columnId)) return;

    const fetchCards = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const res = await getCards({ columnId });
        setCards(res?.cards || []);
        setCardCount(res?.totalCount || 0);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setErrorMessage(NOT_FOUND_OR_FORBIDDEN_ERROR);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [columnId]);

  return { cards, cardCount, isLoading, errorMessage };
};
