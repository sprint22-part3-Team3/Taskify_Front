import type { ModalLayoutProps } from '@/shared/components/modal/modal.types';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/utils/cn';
import { ModalContext } from '@/shared/context/modal/modalContext';
import { useModalAnimation } from '@/shared/hooks/useModalAnimation';

/**
 * 모달의 배경 오버레이와 하얀색 기본 박스를 렌더링하고,
 * Portal을 이용해 #modal-root로 내보내는 모달 레이아웃 컴포넌트
 */
function ModalLayout({
  isOpen,
  onClose,
  className = '',
  children,
}: ModalLayoutProps) {
  const { isRendered, isClosing, handleAnimationEnd } =
    useModalAnimation(isOpen);
  if (!isRendered) return null;

  const modalRoot = document.getElementById('modal-root') ?? document.body;

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/70',
          isClosing ? 'animate-fade-out' : 'animate-fade-in'
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className={cn(
            'flex max-h-[90vh] w-[90%] flex-col overflow-hidden rounded-lg bg-white px-4 py-6 md:px-6',
            isClosing ? 'animate-fade-move-out' : 'animate-fade-move-in',
            className
          )}
          onAnimationEnd={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    modalRoot
  );
}

export { ModalLayout };
