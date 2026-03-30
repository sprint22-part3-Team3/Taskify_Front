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

export type CreateCardRequest = {
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  assigneeUserId?: number;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
};

export type UpdateCardRequest = {
  columnId: number;
  assigneeUserId?: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
};
