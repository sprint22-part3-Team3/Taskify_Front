import type { ModalHeaderProps } from '@/shared/components/modal/modal.types';
import { cn } from '@/shared/utils/cn';
import { IcClose, IcMenu } from '@/shared/assets/icons';
import { useModalContext } from '@/shared/components/modal/modal-context';

/**
 * 제목과 닫기/메뉴 버튼을 포함하는 모달 상단 영역
 */
function ModalHeader({
  title,
  hasCloseIcon = false,
  hasMenuIcon = false,
  className,
  ...props
}: ModalHeaderProps) {
  const { onClose } = useModalContext();
  const menuLayoutClass = hasMenuIcon
    ? 'flex-col-reverse items-end gap-4 md:flex-row md:items-center'
    : 'items-center';

  return (
    <header
      className={cn(
        'flex items-center justify-between',
        menuLayoutClass,
        className
      )}
      {...props}
    >
      <h2 className="typo-xl-bold md:typo-2xl-bold text-black-200 w-full">
        {title}
      </h2>
      {(hasMenuIcon || hasCloseIcon) && (
        <div className="flex items-center gap-4 *:flex *:cursor-pointer *:items-center *:justify-center md:gap-6">
          {hasMenuIcon && (
            <button
              type="button"
              aria-label="메뉴 열기"
              className="h-5 w-5 md:h-7 md:w-7"
            >
              <IcMenu className="w-0.75 text-black md:w-1" />
            </button>
          )}
          {hasCloseIcon && (
            <button
              type="button"
              aria-label="모달 닫기"
              className="h-6 w-6 md:h-8 md:w-8"
              onClick={onClose}
            >
              <IcClose className="h-full w-full text-black" />
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export { ModalHeader };
