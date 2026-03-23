import type { ReactNode } from 'react';

export type ModalContextValue = {
  onClose: () => void;
};

export type ModalLayoutProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export type ModalHeaderProps = {
  title?: string;
  hasMenuIcon?: boolean;
  hasCloseIcon?: boolean;
  className?: string;
};

export type ModalMainProps = {
  children: ReactNode;
  className?: string;
};

export type ModalFooterProps = {
  children: ReactNode;
  className?: string;
};
