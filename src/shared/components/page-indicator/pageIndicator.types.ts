import type { ComponentProps } from 'react';
import type { NavigationButtonsProps } from '@/shared/components/page-indicator/navigation-buttons/navigationButtons.types';

export type PageIndicatorProps = ComponentProps<'div'> & {
  currentPage: number;
  totalPages: number;
} & Partial<
    Pick<
      NavigationButtonsProps,
      | 'onPrev'
      | 'onNext'
      | 'isPrevDisabled'
      | 'isNextDisabled'
      | 'isHidingOnMobile'
    >
  >;
