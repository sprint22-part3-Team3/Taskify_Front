import type { ComponentProps, ElementType, ReactNode } from 'react';

export type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'cancel'
  | 'outlined'
  | 'icon';

export type ButtonSize = 'lg' | 'md' | 'sm' | 'icon';

type ButtonBaseProps = {
  theme?: ButtonTheme;
  size?: ButtonSize;
  children?: ReactNode;
  type?: ComponentProps<'button'>['type'];
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
};

export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps & {
  as?: T;
};

export type PolymorphicButtonProps<T extends ElementType> = ButtonProps<T> &
  Omit<ComponentProps<T>, keyof ButtonProps<T>>;
