import type { ShowToastParams } from './toastContext';
import type { ToastProps } from '@/shared/components/toast/toast.types';
import { useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from './toastContext';
import { Toast } from '@/shared/components/toast';
import { MAX_TOASTS } from '@/shared/components/toast/toast.constants';

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
      const next = prev.filter((toast) => toast.id !== id);
      return next.length === prev.length ? prev : next;
    });
  }, []);

  const showToast = useCallback((params: ShowToastParams) => {
    const id = crypto.randomUUID();

    const newToast: ToastData = {
      ...params,
      id,
    };

    setToasts((prev) => {
      const next = [...prev, newToast];
      return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next;
    });
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="z-toast fixed right-5 bottom-5 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} />
          ))}
        </div>,
        document.getElementById('modal-root') || document.body
      )}
    </ToastContext.Provider>
  );
}
