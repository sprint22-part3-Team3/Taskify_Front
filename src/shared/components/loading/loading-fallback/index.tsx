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

const loadingSizes = {
  full: 24,
  part: 16,
} as const;

export function LoadingFallback({
  variant = 'full',
  className,
}: LoadingFallbackProps) {
  return (
    <div className={cn(fallbackVariants({ variant }), className)}>
      <Loading size={loadingSizes[variant]} color="currentColor" />
    </div>
  );
}
