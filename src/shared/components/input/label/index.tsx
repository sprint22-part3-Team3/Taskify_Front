import { cn } from '@/shared/utils/cn';
import { type LabelProps } from './label.types';

/**
 * 입력 필드의 라벨을 표시하는 공용 Label 컴포넌트입니다.
 *
 * `required`가 `true`이면 라벨 오른쪽에 `*` 표시를 함께 렌더링합니다.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required>
 *   이메일
 * </Label>
 * ```
 */
function Label({
  children,
  required = false,
  className,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn('typo-lg-regular text-black-200', className)}
      {...props}
    >
      {children}
      {required && (
        <span className="typo-lg-regular text-primary-500 ml-0.5">*</span>
      )}
    </label>
  );
}

export default Label;
