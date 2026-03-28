import type { Card } from '@/features/cards/types/card.types';

export type GetCardsParams = {
  columnId: number;
  size?: number;
};

export type GetCardsResponse = {
  cursorId: number | null;
  totalCount: number;
  cards: Card[];
};
