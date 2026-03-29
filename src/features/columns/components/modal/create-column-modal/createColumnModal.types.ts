import type { Column } from '@/features/columns/types/column.types';

export type CreateColumnModalProps = {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
};
