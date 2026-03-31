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
