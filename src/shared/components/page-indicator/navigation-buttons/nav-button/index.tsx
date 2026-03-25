import { IcArrowLeft, IcArrowRight } from '@/shared/assets/icons';
import type { NavigationButtonProps } from '@/shared/components/page-indicator/navigation-buttons/navigationButtons.types';
import { cn } from '@/shared/utils/cn';

export default function NavigationButton({
  direction,
  disabled,
  onClick,
}: NavigationButtonProps) {
  const isPrev = direction === 'prev';

  const ariaLabel = isPrev ? '이전 페이지' : '다음 페이지';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'flex h-9 w-9 items-center justify-center border border-gray-200 md:h-10 md:w-10',
        isPrev ? 'rounded-l' : '-ml-px rounded-r',
        disabled ? 'cursor-not-allowed' : 'hover:bg-gray-50'
      )}
    >
      {isPrev ? (
        <IcArrowLeft
          className={cn('h-3 w-1.5 text-gray-400', disabled && 'text-gray-200')}
        />
      ) : (
        <IcArrowRight
          className={cn('h-3 w-1.5 text-gray-400', disabled && 'text-gray-200')}
        />
      )}
    </button>
  );
}
