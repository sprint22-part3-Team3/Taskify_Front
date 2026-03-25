import type { StatusBadgeProps } from '@/shared/components/status-badge/statusBadge.types';
import { cn } from '@/shared/utils/cn';

/**
 * label prop을 그대로 렌더링하는 상태 뱃지 컴포넌트입니다.
 * label prop을 통해 텍스트를 받으며, API 데이터 연동 시 label에 실제 값을 넘겨주면 바로 반영됩니다.
 *
 * @example
 * ```tsx
 * <StatusBadge label="To Do" />
 * ```
 */
function StatusBadge({ label, className, textClassName }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'bg-primary-500/10 text-primary-500 inline-flex items-center gap-1.5 rounded-full px-2 py-1 md:px-2.5',
        className
      )}
    >
      <span className="bg-primary-500 h-1.25 w-1.25 rounded-full md:h-1.5 md:w-1.5" />
      <span className={cn('typo-xs-regular md:typo-md-regular', textClassName)}>
        {label}
      </span>
    </span>
  );
}

export { StatusBadge };
