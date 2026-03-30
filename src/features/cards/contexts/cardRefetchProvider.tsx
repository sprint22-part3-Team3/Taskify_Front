import {
  CardRefetchContext,
  type CardRefetchContextType,
} from '@/features/cards/contexts/cardRefetchContext';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

type CardRefetchProviderProps = CardRefetchContextType & {
  children: ReactNode;
};

/**
 * 하위 컴포넌트(생성, 수정, 삭제)에서 카드 리스트를 재조회할 수 있도록 refetch 함수를 공급하는 Provider
 */
export function CardRefetchProvider({
  refetch,
  children,
}: CardRefetchProviderProps) {
  const value = useMemo(() => ({ refetch }), [refetch]);

  return (
    <CardRefetchContext.Provider value={value}>
      {children}
    </CardRefetchContext.Provider>
  );
}
