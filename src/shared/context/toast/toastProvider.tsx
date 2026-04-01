import type { ShowToastParams } from './toastContext';
import type { ToastProps } from '@/shared/components/toast/toast.types';
import { useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from './toastContext';
import { Toast } from '@/shared/components/toast';

type ToastProviderProps = {
  children: React.ReactNode;
};

type ToastData = Omit<ToastProps, 'onClose'>;

/**
 * 토스트 메시지 상태를 전역으로 관리하고 화면에 렌더링하는 Provider 컴포넌트입니다.
 * 최상위 App 컴포넌트에서 앱 전체를 감싸는 데 사용됩니다.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      if (!prev.some((toast) => toast.id === id)) return prev;
      return prev.filter((toast) => toast.id !== id);
    });
  }, []);

  const showToast = useCallback((params: ShowToastParams) => {
    const id = crypto.randomUUID();

    const newToast: ToastData = {
      ...params,
      id,
    };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="z-toast fixed bottom-5 left-1/2 flex -translate-x-1/2 flex-col gap-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} />
          ))}
        </div>,
        document.getElementById('modal-root') || document.body
      )}
    </ToastContext.Provider>
  );
}
