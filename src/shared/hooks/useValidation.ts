import { useState, useCallback } from 'react';
import type { ValidationResult } from '@/shared/utils/validators/validators.types';

type UseValidationOptions = {
  validateFn: (value: string) => ValidationResult;
};

type UseValidationReturn = {
  value: string;
  error: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  reset: () => void;
};

/**
 * 단일 input 필드의 유효성 검사를 관리하는 훅입니다.
 *
 * - `onBlur` 시 유효성 검사 실행
 * - `onChange` 시 이전 에러 초기화 (블러 전까지 에러 미노출)
 * - `trigger()`로 onSubmit 시 강제 검사 가능
 * - `isValid`로 제출 버튼 `disabled` 제어
 *
 * @returns `UseValidationReturn`
 *
 * @example
 * ```tsx
 * const emailField = useValidation({ validateFn: validateEmail });
 *
 * <Input
 *   value={emailField.value}
 *   onChange={emailField.onChange}
 *   onBlur={emailField.onBlur}
 *   errorMessage={emailField.error}
 * />
 *
 * // onSubmit 시 강제 검사
 * const handleSubmit = () => {
 *   const { isAllValid } = validateAll({
 *     email: () => emailField.trigger(),
 *   });
 *   if (!isAllValid) return;
 * };
 *
 * // 버튼 비활성화
 * <Button disabled={!emailField.isValid}>제출</Button>
 * ```
 */

export function useValidation({
  validateFn,
}: UseValidationOptions): UseValidationReturn {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const validate = useCallback(
    (val: string) => {
      const result = validateFn(val);
      setError(result.message);
      setIsValid(result.isValid);
    },
    [validateFn]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError('');
  };

  const onBlur = () => {
    validate(value);
  };

  const reset = () => {
    setValue('');
    setError('');
    setIsValid(false);
  };

  return { value, error, isValid, onChange, onBlur, reset };
}
