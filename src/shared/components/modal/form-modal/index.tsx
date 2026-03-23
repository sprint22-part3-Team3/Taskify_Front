import type {
  FormModalProps,
  FormModalVariant,
} from '@/shared/components/modal/modal.types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';
import { IcClose } from '@/shared/assets/icons';
import { Button } from '@/shared/components/button';
import ModalLayout from '@/shared/components/modal/modal-layout';

const modalVariants = cva('', {
  variants: {
    layoutStyle: {
      simple: 'px-4 py-6 rounded-lg md:px-6',
      base: 'px-4 py-5 rounded-2xl md:px-8 md:py-8',
      detailed: 'px-4 py-6 rounded-2xl md:px-8 md:py-8',
    } satisfies Record<FormModalVariant, string>,
    titleStyle: {
      simple: 'typo-xl-bold md:typo-2xl-bold',
      base: 'typo-xl-bold md:typo-2xl-bold',
      detailed: 'typo-lg-bold md:typo-2xl-bold',
    } satisfies Record<FormModalVariant, string>,
    mainStyle: {
      simple: 'mt-4 mb-6 md:mt-6',
      base: 'mt-6 mb-8 md:mb-10',
      detailed: 'my-8',
    } satisfies Record<FormModalVariant, string>,
  },
});

/**
 * 폼 입력 컨텐츠에 사용될 공통 모달 컴포넌트
 * variant를 통해 패딩과 마진 크기 조절 가능
 *
 * @example
 * <FormModal
 *   isOpen={isOpen}
 *   onClose={closeModal}
 *   onClickPrimary={handleClick}
 *   variant="detailed"
 *   title="할 일 수정"
 * >
 *   ...
 * </FormModal>
 */
function FormModal({
  isOpen,
  onClose,
  onClickSecondary,
  onClickPrimary,
  variant,
  title,
  isCloseIcon = false,
  secondaryText,
  primaryText,
  children,
}: FormModalProps) {
  if (!isOpen) return null;

  return (
    <ModalLayout
      onClose={onClose}
      className={cn(
        modalVariants({ layoutStyle: variant }),
        'max-w-81.75 transition-[max-width] md:max-w-146'
      )}
    >
      <header className="flex items-center justify-between">
        <h2
          className={cn(
            modalVariants({ titleStyle: variant }),
            'text-black-200'
          )}
        >
          {title}
        </h2>
        {isCloseIcon && (
          <button
            type="button"
            className="flex h-6 w-6 cursor-pointer items-center justify-center md:h-9 md:w-9"
            onClick={onClose}
          >
            <IcClose className="h-full w-full" />
          </button>
        )}
      </header>
      <main className={cn(modalVariants({ mainStyle: variant }))}>
        {children}
      </main>
      <footer className="flex gap-2 *:flex-1 *:px-0">
        <Button
          theme="cancel"
          className="font-medium"
          onClick={onClickSecondary || onClose}
        >
          {secondaryText || '취소'}
        </Button>
        <Button type="submit" onClick={onClickPrimary}>
          {primaryText || '생성'}
        </Button>
      </footer>
    </ModalLayout>
  );
}

export { FormModal };
