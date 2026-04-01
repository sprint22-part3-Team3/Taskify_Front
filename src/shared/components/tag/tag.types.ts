import type { ComponentProps, ReactNode } from 'react';
import type { TagColorName } from '@/shared/components/tag/tag.constants';

export type TagProps = Omit<ComponentProps<'span'>, 'color' | 'children'> & {
  children: ReactNode;
  color?: TagColorName;
  className?: string;
};
