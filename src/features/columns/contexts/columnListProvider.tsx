// ColumnListProvider
import type { ReactNode } from 'react';
import type { Column } from '@/features/columns/types/column.types';
import { useMemo } from 'react';
import { ColumnListContext } from '@/features/columns/contexts/columnListContext';

type ColumnListProviderProps = {
  columns: Column[];
  refetch: () => void;
  children: ReactNode;
};

export function ColumnListProvider({
  columns,
  refetch,
  children,
}: ColumnListProviderProps) {
  const value = useMemo(() => ({ columns, refetch }), [columns, refetch]);
  return (
    <ColumnListContext.Provider value={value}>
      {children}
    </ColumnListContext.Provider>
  );
}
