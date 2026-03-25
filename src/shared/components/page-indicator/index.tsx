import type { PageIndicatorProps } from '@/shared/components/page-indicator/pageIndicator.types';
import NavigationButtons from '@/shared/components/page-indicator/navigationButtons';
import { cn } from '@/shared/utils/cn';

/**
 * 현재 페이지와 전체 페이지 수를 표시하는 공용 컴포넌트입니다.
 *
 * @example
 * <PageIndicator currentPage={1} totalPages={10} />
 */
function PageIndicator({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
  isHidingOnMobile = false,
  wrapperClassName,
  className,
  ...props
}: PageIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-3', wrapperClassName)}>
      <span
        className={cn('typo-md-regular text-black-200', className)}
        {...props}
      >
        {totalPages} 페이지 중 {currentPage}
      </span>

      {onPrev && onNext && (
        <NavigationButtons
          onPrev={onPrev}
          onNext={onNext}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          isHidingOnMobile={isHidingOnMobile}
        />
      )}
    </div>
  );
}

export { PageIndicator };
export type { PageIndicatorProps };
