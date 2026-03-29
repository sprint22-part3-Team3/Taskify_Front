import { ColumnContext } from '@/features/columns/contexts/columnContext';
import { useContext } from 'react';

export const useColumnContext = () => {
  const context = useContext(ColumnContext);
  if (!context) {
    throw new Error(
      'useColumnContext는 ColumnProvider 안에서만 사용할 수 있습니다.'
    );
  }
  return context;
};
