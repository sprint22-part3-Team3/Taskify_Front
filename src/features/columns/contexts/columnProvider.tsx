import type { ReactNode } from 'react';
import type { Column } from '@/features/columns/types/cloumns.types';
import { useMemo } from 'react';
import { ColumnContext } from '@/features/columns/contexts/columnContext';

type ColumnProviderProps = {
  column: Column;
  children: ReactNode;
};

/**
 * 컬럼 데이터를 하위 컴포넌트에 공급하는 Provider
 */
export function ColumnProvider({ column, children }: ColumnProviderProps) {
  const value = useMemo(() => column, [column]);

  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  );
}
