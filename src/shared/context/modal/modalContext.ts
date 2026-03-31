import type { ModalContextValue } from '@/shared/components/modal/modal.types';
import { createContext, useContext } from 'react';

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal 하위 컴포넌트는 Modal 안에서만 사용할 수 있습니다.');
  }
  return context;
};
