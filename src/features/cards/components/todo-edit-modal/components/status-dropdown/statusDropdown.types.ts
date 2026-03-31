import type { Column } from '@/features/columns/types/column.types';

export type StatusDropdownProps = {
  columns: Column[];
  selectedColumnId: number;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (columnId: number) => void;
  isLoading: boolean;
};
