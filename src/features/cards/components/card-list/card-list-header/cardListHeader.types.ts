import type { Column } from '@/shared/types/column.types';

export type CardListHeaderProps = Pick<Column, 'title'> & {
  cardCount: number;
};
