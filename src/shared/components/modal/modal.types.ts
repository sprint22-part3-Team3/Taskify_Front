import type { ReactNode } from 'react';

export type ModalLayoutProps = {
  onClose: () => void;
  className?: string;
  children: ReactNode;
};
