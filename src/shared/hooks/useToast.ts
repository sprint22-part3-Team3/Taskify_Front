import { ToastContext } from '@/shared/context/toast/toastContext';
import { useContext } from 'react';

/**
 * 토스트를 호출하기 위한 커스텀 훅입니다.
 *
 * @example
 * ```tsx
 * const { showToast } = useToast();
 * const handleClick = () => {
 * showToast({
 * theme: 'info',
 * title: '알림',
 * message: '설정이 저장되었습니다.',
 * });
 * };
 * ```
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast는 ToastProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
