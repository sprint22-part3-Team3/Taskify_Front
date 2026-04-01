import { useCallback, useEffect, useState } from 'react';
import type { UpdateCardRequest } from '@/features/cards/apis/cards.types';
import { updateCard } from '@/features/cards/apis/cards';
import { useCardRefetchContext } from '@/features/cards/hooks/useCardRefetchContext';
import { CARD_EVENTS } from '@/features/cards/utils/cardEvents';
import type { Card } from '@/features/cards/types/card.types';
import { useCardImageUpload } from '@/features/cards/hooks/useCardImageUpload';

type UseTodoEditFormParams = {
  card: Card;
};

export function useTodoEditForm({ card }: UseTodoEditFormParams) {
  const { refetch } = useCardRefetchContext();
  const cardId = card.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    imageUrl,
    isUploadingImage,
    imageUploadError,
    handleImageSelect,
    resetImageState,
  } = useCardImageUpload({
    teamId: card.teamId,
    initialImageUrl: card.imageUrl,
  });

  const handleUpdateCard = useCallback(
    async (payload: UpdateCardRequest, originalColumnId: number) => {
      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        const updatedCard = await updateCard(cardId, payload);
        refetch();
        window.dispatchEvent(
          new CustomEvent(CARD_EVENTS.LIST_CHANGE, {
            detail: {
              newColumnId: payload.columnId,
              originalColumnId,
            },
          })
        );
        return updatedCard;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '카드 수정을 실패했습니다. 다시 시도해 주세요.';
        setSubmissionError(message);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [cardId, refetch]
  );

  useEffect(() => {
    resetImageState(card.imageUrl);
    setSubmissionError(null);
  }, [card.id, card.imageUrl, resetImageState]);

  return {
    isSubmitting,
    submissionError,
    handleUpdateCard,
    imageUrl,
    isUploadingImage,
    imageUploadError,
    handleImageSelect,
    resetImageState,
  };
}
