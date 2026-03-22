import { forwardRef, useId } from 'react';
import InputField from '@/shared/components/input/input-field';
import Label from '@/shared/components/input/label';
import { cn } from '@/shared/utils/cn';
import type { InputProps } from './input.types';

/**
 * 라벨, 입력 필드, 에러 메시지를 함께 렌더링하는 공용 Input 컴포넌트입니다.
 *
 * 기본 HTML `input` 속성을 모두 지원하며,
 * 라벨 표시와 에러 메시지 출력, 영역별 스타일 커스터마이징을 제공합니다.
 *
 * required prop으로 필수 입력 여부를 표시할 수 있으며, 에러 메시지는 errorMessage prop으로 전달합니다.
 * labelClassName은 Label만 꾸밀 때 사용합니다.
 * className은 실제 `<input>`만 꾸밀 때 사용합니다.
 * errorMessageClassName은 에러 메시지만 꾸밀 때 사용합니다.
 * containerClassName은 이 세 요소를 감싸는 바깥 `<div>`를 꾸밀 때 사용합니다.
 *
 * @example
 * ```tsx
 * <Input
 *   label="비밀번호"
 *   type="password"
 *   placeholder="8자 이상 입력하세요"
 *   required
 *   errorMessage="비밀번호는 8자 이상이어야 합니다."
 *   labelClassName="typo-lg-bold md:typo-xl-bold"
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      required = false,
      errorMessage,
      errorMessageClassName,
      containerClassName,
      className,
      labelClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={cn('flex w-full flex-col gap-2', containerClassName)}>
        {label && (
          <Label
            htmlFor={inputId}
            required={required}
            className={labelClassName}
          >
            {label}
          </Label>
        )}
        <InputField
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(errorMessage)}
          {...props}
          className={className}
        />
        {errorMessage && (
          <p
            className={cn('typo-md-regular text-error', errorMessageClassName)}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
