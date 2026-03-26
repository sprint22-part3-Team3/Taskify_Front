import { cn } from '@/shared/utils/cn';
import type { TagFieldBoxProps } from '@/features/cards/components/form-field/tag-field-box/tagFieldBox.types';

/**
 * 카드 폼에서 태그 입력/표시 영역을 감싸는 공용 박스입니다.
 *
 * @example
 * ```tsx
 * <TagFieldBox>
 *   <input placeholder="입력 후 Enter" />
 * </TagFieldBox>
 * ```
 */
function TagFieldBox({ children, className, ...props }: TagFieldBoxProps) {
  return (
    <div
      className={cn(
        'flex min-h-12.5 items-center gap-2 rounded-lg border border-gray-200 px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default TagFieldBox;
