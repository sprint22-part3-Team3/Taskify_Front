import { cn } from '@/shared/utils/cn';
import { forwardRef } from 'react';
import type { InputFieldProps } from './inputField.types';

/**
 * 실제 HTML `input` 요소를 렌더링하는 공용 InputField 컴포넌트입니다.
 *
 *
 * @example
 * ```tsx
 * <InputField
 *   type="email"
 *   placeholder="이메일을 입력해주세요"
 * />
 * ```
 */
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        {...props}
        className={cn(
          'typo-lg-regular focus:border-primary-500 placeholder:typo-lg-regular w-full rounded-lg border border-gray-200 px-4 py-3 outline-0 placeholder:text-gray-300',
          disabled && 'cursor-not-allowed',
          className
        )}
      />
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
