import type { ModalMainProps } from '@/shared/components/modal/modal.types';
import { cn } from '@/shared/utils/cn';

/**
 * 모달의 핵심 컨텐츠가 들어가는 영역
 */
function ModalMain({ className, children, ...props }: ModalMainProps) {
  return (
    <main className={cn('my-6', className)} {...props}>
      {children}
    </main>
  );
}

export { ModalMain };
