import { CardRefetchContext } from '@/features/cards/contexts/cardRefetchContext';
import { useContext } from 'react';

export const useCardRefetchContext = () => {
  const context = useContext(CardRefetchContext);
  if (!context) {
    throw new Error(
      'useCardRefetchContext는 CardRefetchProvider 안에서만 사용할 수 있습니다.'
    );
  }
  return context;
};
