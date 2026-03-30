import type { ReactNode } from 'react';
import type { ButtonProps } from '@/shared/components/button/button.types';

export type DeleteModalProps = {
  message: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  isOpen?: boolean;
  className?: string;
  renderInModal?: boolean;
  cancelText?: string;
  confirmText?: string;
  confirmButtonProps?: Pick<
    ButtonProps,
    'disabled' | 'isLoading' | 'className'
  >;
  cancelButtonProps?: Pick<ButtonProps, 'disabled' | 'className'>;
};
