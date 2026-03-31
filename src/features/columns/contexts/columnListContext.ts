import { createContext } from 'react';
import type { Column } from '@/features/columns/types/column.types';

export type ColumnListContextType = {
  columns: Column[];
  refetch: () => void;
};

export const ColumnListContext = createContext<ColumnListContextType>({
  columns: [],
  refetch: () => {},
});
