import type { ModalFooterProps } from '@/shared/components/modal/modal.types';
import { cn } from '@/shared/utils/cn';

/**
 * 하단 액션 버튼들이 배치되는 영역
 */
function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <footer className={cn('flex gap-2 *:flex-1 *:px-0', className)} {...props}>
      {children}
    </footer>
  );
}

export { ModalFooter };
