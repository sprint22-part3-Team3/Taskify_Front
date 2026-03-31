import type { ErrorFallbackProps } from '@/shared/components/error/error-fallback/errorFallback.types';
import { Button } from '@/shared/components/button';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const errorFallbackVariants = cva(
  'flex w-full flex-col items-center justify-center gap-3 p-4',
  {
    variants: {
      variant: {
        full: 'h-full min-h-40',
        part: 'h-40 rounded-lg border border-gray-200 bg-gray-50/50',
      },
    },
    defaultVariants: {
      variant: 'full',
    },
  }
);

/**
 * 에러 상태를 표시하는 공통 컴포넌트입니다.
 * 재시도 함수(onRetry)가 주어지면 '다시 시도' 버튼을 함께 렌더링합니다.
 *
 * @example
 * ```tsx
 * // 영역 전체를 차지하는 기본 에러 (variant="full")
 * <ErrorFallback message="데이터를 불러오지 못했습니다." onRetry={refetch} />
 *
 * // 리스트 하단이나 특정 박스 영역 내부의 에러 (variant="part")
 * <ErrorFallback message="추가 로드 실패" variant="part" onRetry={loadMore} />
 * ```
 */
export function ErrorFallback({
  message,
  onRetry,
  variant = 'full',
  className,
}: ErrorFallbackProps) {
  return (
    <div className={cn(errorFallbackVariants({ variant }), className)}>
      <p className="typo-sm-medium text-error">{message}</p>
      {onRetry && (
        <Button size="sm" theme="cancel" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}
