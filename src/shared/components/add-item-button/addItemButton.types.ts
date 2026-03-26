import type { ReactNode } from 'react';

export type AddItemButtonProps = {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
};
