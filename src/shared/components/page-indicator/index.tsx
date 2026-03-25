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
  ...props
}: PageIndicatorProps) {
  return (
    <span
      className={cn(
        'typo-xs-regular md:typo-md-regular text-black-200',
        className
      )}
      {...props}
    >
      {totalPages} 페이지 중 {currentPage}
    </span>
  );
}

export { PageIndicator };
export type { PageIndicatorProps };
