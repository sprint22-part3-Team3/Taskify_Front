import type { ComponentProps, ReactNode } from 'react';

export type ColorLabelProps = Omit<ComponentProps<'div'>, 'color'> & {
  color: string;
  label: ReactNode;
  className?: string;
  labelClassName?: string;
};
