import type { Column } from '@/features/columns/column.types';

export type CardListHeaderProps = Pick<Column, 'title'> & {
  cardCount: number;
};
