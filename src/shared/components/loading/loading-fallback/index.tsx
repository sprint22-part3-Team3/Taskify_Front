import type { LoadingFallbackProps } from '@/shared/components/loading/loading-fallback/loadingFallback.types';
import { Loading } from '@/shared/components/loading';
import { cn } from '@/shared/utils/cn';
import { cva } from 'class-variance-authority';

const fallbackVariants = cva('flex items-center justify-center', {
  variants: {
    variant: {
      full: 'h-full min-h-40 w-full',
      part: 'h-16 w-full py-4',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
});

const LOADING_SIZES = {
  full: 24,
  part: 16,
} as const;

/**
 * 로딩 상태를 표시하는 공통 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * // 영역 전체를 차지하는 기본 로딩 (variant="full")
 * <LoadingFallback />
 *
 * // 무한 스크롤 하단 등 좁은 영역의 로딩 (variant="part")
 * <LoadingFallback variant="part" />
 * ```
 */
export function LoadingFallback({
  variant = 'full',
  className,
}: LoadingFallbackProps) {
  return (
    <div className={cn(fallbackVariants({ variant }), className)}>
      <Loading size={LOADING_SIZES[variant]} color="currentColor" />
    </div>
  );
}
