import type { ToastProps } from '@/shared/components/toast/toast.types';
import { createContext } from 'react';

export type ShowToastParams = Omit<ToastProps, 'id' | 'onClose'>;

export type ToastContextType = {
  showToast: (params: ShowToastParams) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
