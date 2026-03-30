import { useCallback, useState } from 'react';
import type { UpdateCardRequest } from '@/features/cards/apis/cards.types';
import { updateCard } from '@/features/cards/apis/cards';
import { useCardRefetchContext } from '@/features/cards/hooks/useCardRefetchContext';

type UseTodoEditFormParams = {
  cardId: number;
};

export function useTodoEditForm({ cardId }: UseTodoEditFormParams) {
  const { refetch } = useCardRefetchContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleUpdateCard = useCallback(
    async (payload: UpdateCardRequest) => {
      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        await updateCard(cardId, payload);
        refetch();
        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '카드 수정을 실패했습니다. 다시 시도해 주세요.';
        setSubmissionError(message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [cardId, refetch]
  );

  return { isSubmitting, submissionError, handleUpdateCard };
}
