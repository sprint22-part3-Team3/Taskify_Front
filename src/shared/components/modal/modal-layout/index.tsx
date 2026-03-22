import type { ModalLayoutProps } from '@/shared/components/modal/modal.types';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/utils/cn';

/**
 * 모달의 공통 배경과 하얀색 기본 박스를 렌더링하고,
 * Portal을 이용해 #modal-root로 내보내는 모달 레이아웃 컴포넌트
 */
function ModalLayout({ onClose, className = '', children }: ModalLayoutProps) {
  const modalRoot = document.getElementById('modal-root') ?? document.body;

  function handleContentClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className={cn('w-[90%] bg-white', className)}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default ModalLayout;
