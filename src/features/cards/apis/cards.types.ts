import type { Card } from '@/features/cards/types/card.types';

export type GetCardsParams = {
  columnId: number;
  size?: number;
  cursorId?: number | null;
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
  assigneeUserId?: number | null;
  title: string;
  description: string;
  dueDate?: string | null;
  tags?: string[];
  imageUrl?: string | null;
};
