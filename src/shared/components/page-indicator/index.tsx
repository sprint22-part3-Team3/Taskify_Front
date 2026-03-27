import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import type { PageIndicatorProps } from '@/shared/components/page-indicator/pageIndicator.types';
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
  className,
  onPrev,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
  isHidingOnMobile = false,
  ...props
}: PageIndicatorProps) {
  const navigationButtons = onPrev && onNext && (
    <NavigationButtons
      onPrev={onPrev}
      onNext={onNext}
      isPrevDisabled={isPrevDisabled}
      isNextDisabled={isNextDisabled}
      isHidingOnMobile={isHidingOnMobile}
    />
  );

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <span className="typo-xs-regular md:typo-md-regular text-black-200">
        {totalPages} 페이지 중 {currentPage}
      </span>
      {navigationButtons}
    </div>
  );
}

export { PageIndicator };
export type { PageIndicatorProps };
