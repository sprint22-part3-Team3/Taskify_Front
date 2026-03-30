// ColumnListProvider
import type { ReactNode } from 'react';
import type { Column } from '@/features/columns/types/cloumns.types';
import { useMemo } from 'react';
import { ColumnListContext } from '@/features/columns/contexts/columnListContext';

type ColumnListProviderProps = {
  columns: Column[];
  children: ReactNode;
};

export function ColumnListProvider({
  columns,
  children,
}: ColumnListProviderProps) {
  const value = useMemo(() => columns, [columns]);
  return (
    <ColumnListContext.Provider value={value}>
      {children}
    </ColumnListContext.Provider>
  );
}
