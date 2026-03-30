import type { Column } from '@/features/columns/types/cloumn.types';

export type CardListHeaderProps = Pick<Column, 'title' | 'id'> & {
  cardCount: number;
};
