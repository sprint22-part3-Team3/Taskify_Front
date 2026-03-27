import type { ReactNode } from 'react';

export type DeleteModalProps = {
  message: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  isOpen?: boolean;
  className?: string;
  renderInModal?: boolean;
  cancelText?: string;
  confirmText?: string;
};
