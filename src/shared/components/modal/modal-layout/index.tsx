import type { ModalLayoutProps } from '@/shared/components/modal/modal.types';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/utils/cn';
import { ModalContext } from '@/shared/components/modal/modal-context';

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
  if (!isOpen) return null;
  const modalRoot = document.getElementById('modal-root') ?? document.body;

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div
          className={cn(
            'w-[90%] overflow-hidden rounded-lg bg-white px-4 py-6 md:px-6',
            className
          )}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    modalRoot
  );
}

export { ModalLayout };
