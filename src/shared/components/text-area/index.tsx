import { useId } from 'react';
import { cn } from '@/shared/utils/cn';
import type { TextAreaProps } from './textArea.types';

/**
 * 여러 줄 텍스트 입력을 처리하는 공용 TextArea 컴포넌트입니다.
 *
 * 입력 값과 에러 메시지를 함께 관리할 수 있으며,
 *
 * @example
 * ```tsx
 * <TextArea
 *   value={content}
 *   onChange={setContent}
 *   placeholder="내용을 입력해주세요"
 *   error="내용은 10자 이상 입력해주세요."
 * />
 * ```
 */
function TextArea({
  className,
  value,
  onChange,
  error,
  ref,
  ...props
}: TextAreaProps) {
  const errorId = useId();

  return (
    <div className="flex w-full flex-col gap-1">
      <textarea
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'h-31.5 w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3',
          'placeholder:typo-lg-regular text-black placeholder:text-gray-300',
          'focus:border-primary-500 focus:outline-none',
          error && 'border-error',
          className
        )}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-error typo-md-regular">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextArea;
