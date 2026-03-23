import type { ReactNode } from 'react';

type ModalBaseProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export type FormModalVariant = 'simple' | 'base' | 'detailed';

export type FormModalProps = ModalBaseProps & {
  onClickSecondary?: () => void;
  onClickPrimary: () => void;
  variant: FormModalVariant;
  title: string;
  isCloseIcon?: boolean;
  secondaryText?: string;
  primaryText?: string;
};

export type ModalLayoutProps = {
  onClose: () => void;
  className?: string;
  children: ReactNode;
};
