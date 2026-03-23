import { cn } from '@/shared/utils/cn';
import { type ColorLabelProps } from '@/features/dashboards/components/color/color-label/colorLabel.types';

/**
 * 대시보드 색상 원형과 이름을 함께 보여주는 컴포넌트입니다.
 *
 * API에서 받은 hex 색상값과 표시할 텍스트를 전달해 재사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * const dashboard = {
 *   title: '회의록',
 *   color: selectedColor,
 * };
 *
 * const colorHex = getDashboardColorHex(dashboard.color);
 *
 * <ColorLabel color={colorHex} label={dashboard.title} />
 * ```
 */
function ColorLabel({
  color,
  label,
  className,
  labelClassName,
  ...props
}: ColorLabelProps) {
  return (
    <div className={cn('inline-flex items-center gap-4', className)} {...props}>
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className={cn('typo-2lg-medium text-gray-400', labelClassName)}>
        {label}
      </span>
    </div>
  );
}

export { ColorLabel };
export type { ColorLabelProps };
