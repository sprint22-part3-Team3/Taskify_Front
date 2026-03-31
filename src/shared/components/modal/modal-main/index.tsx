import type { ModalMainProps } from '@/shared/components/modal/modal.types';
import { cn } from '@/shared/utils/cn';

/**
 * 모달의 핵심 컨텐츠가 들어가는 영역
 */
function ModalMain({ className, children, ...props }: ModalMainProps) {
  return (
    <div
      className={cn(
        'custom-modal-scrollbar my-6 flex-1 overflow-y-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ModalMain };
