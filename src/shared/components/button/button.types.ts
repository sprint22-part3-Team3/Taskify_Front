import type { ComponentProps, ElementType, ReactNode } from 'react';

export type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'cancel'
  | 'outlined'
  | 'icon';

export type ButtonSize = 'lg' | 'md' | 'sm' | 'icon';

interface ButtonBaseProps {
  theme?: ButtonTheme;
  size?: ButtonSize;
  children?: ReactNode;
  type?: ComponentProps<'button'>['type'];
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface ButtonProps<
  T extends ElementType = 'button',
> extends ButtonBaseProps {
  as?: T;
}

export type PolymorphicButtonProps<T extends ElementType> = ButtonProps<T> &
  Omit<ComponentProps<T>, keyof ButtonProps<T>>;
