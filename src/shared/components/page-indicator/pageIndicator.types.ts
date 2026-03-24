import type { ComponentProps } from 'react';

export type PageIndicatorProps = ComponentProps<'span'> & {
  currentPage: number;
  totalPages: number;
};
