import type { Column } from '@/features/columns/types/column.types';

export type CardListHeaderProps = Pick<Column, 'title' | 'id'> & {
  cardCount: number;
};
