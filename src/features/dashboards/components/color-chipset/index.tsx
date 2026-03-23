import { IcCheck } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import { type ColorChipsetProps } from '@/features/dashboards/components/color-chipset/colorChipset.types';

/**
 * 대시보드 색상을 선택하는 컬러칩셋 컴포넌트입니다.
 *
 * 컬러칩셋에서 선택한 색상 id는 대시보드 생성 폼 상태로 저장해
 * 라벨, 카드, 목록 등 다른 UI와 쉽게 연결할 수 있습니다.
 *
 * @example
 * ```tsx
 * <ColorChipset
 *   colors={dashboardColors}
 *   selectedColor={selectedColor}
 *   onChange={setSelectedColor}
 * />
 * ```
 */
function ColorChipset({
  colors,
  selectedColor,
  onChange,
  className,
  ...props
}: ColorChipsetProps) {
  return (
    <div
      role="radiogroup"
      aria-label="대시보드 색상 선택"
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      {colors.map(function (color) {
        const isSelected = color.id === selectedColor;

        return (
          <button
            key={color.id}
            type="button"
            role="radio"
            aria-label={`${color.id} 색상 선택`}
            aria-checked={isSelected}
            onClick={function () {
              onChange(color.id);
            }}
            className="relative flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full transition-all"
            style={{ backgroundColor: color.hex }}
          >
            {isSelected && (
              <IcCheck
                aria-hidden
                className="h-2.5 w-3.5 filter-[brightness(0)_invert(1)]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export { ColorChipset };
export type { ColorChipsetProps };
