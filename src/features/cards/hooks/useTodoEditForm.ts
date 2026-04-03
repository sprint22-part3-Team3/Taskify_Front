import { useCallback, useEffect, useState } from 'react';
import type { UpdateCardRequest } from '@/features/cards/apis/cards.types';
import { updateCard } from '@/features/cards/apis/cards';
import { useCardRefetchContext } from '@/features/cards/hooks/useCardRefetchContext';
import { CARD_EVENTS } from '@/features/cards/utils/cardEvents';
import type { Card } from '@/features/cards/types/card.types';
import { useCardImageUpload } from '@/features/cards/hooks/useCardImageUpload';
import { useToast } from '@/shared/hooks/useToast';

type UseTodoEditFormParams = {
  card: Card;
};

export function useTodoEditForm({ card }: UseTodoEditFormParams) {
  const { refetch } = useCardRefetchContext();
  const cardId = card.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const { showToast } = useToast();

  const handleUpdateCard = useCallback(
    async (payload: UpdateCardRequest, originalColumnId: number) => {
      setIsSubmitting(true);

      try {
        await updateCard(cardId, payload);
        showToast({
          theme: 'success',
          title: '할 일 수정 완료',
          message: '할 일 정보가 저장되었습니다.',
        });
        refetch();
        window.dispatchEvent(
          new CustomEvent(CARD_EVENTS.LIST_CHANGE, {
            detail: {
              newColumnId: payload.columnId,
              originalColumnId,
            },
          })
        );
        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '카드 수정을 실패했습니다. 다시 시도해 주세요.';
        showToast({
          theme: 'error',
          title: '할 일 수정 실패',
          message,
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [cardId, refetch, showToast]
  );

  useEffect(() => {
    resetImageState(card.imageUrl);
  }, [card.id, card.imageUrl, resetImageState]);

  return {
    isSubmitting,
    handleUpdateCard,
    imageUrl,
    isUploadingImage,
    imageUploadError,
    handleImageSelect,
    resetImageState,
  };
}
