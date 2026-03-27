// shared/hooks/useValidation.ts

import { useState, useCallback } from 'react';
import type { ValidationResult } from '@/shared/utils/validators';

/**
 * `useValidation` 훅의 옵션 타입입니다.
 *
 * @property validateFn - 유효성 검사 함수. `validators`에서 import해서 전달합니다.
 */
type UseValidationOptions = {
  validateFn: (value: string) => ValidationResult;
};

/**
 * `useValidation` 훅의 반환 타입입니다.
 *
 * @property value     - input의 현재 값
 * @property error     - 유효성 검사 실패 시 에러 메시지. 통과 시 빈 문자열('')
 * @property isValid   - 현재 필드의 유효성 통과 여부. 버튼 `disabled` 제어에 사용
 * @property onChange  - input의 `onChange` 핸들러. 입력 변경 시 에러를 초기화합니다.
 * @property onBlur    - input의 `onBlur` 핸들러. 포커스 해제 시 유효성 검사를 실행합니다.
 * @property trigger   - 유효성 검사를 강제 실행하고 결과를 반환합니다. `onSubmit` 시 사용합니다.
 * @property reset     - 값, 에러, 유효성 상태를 초기화합니다.
 */
type UseValidationReturn = {
  value: string;
  error: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  trigger: () => ValidationResult;
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
    const trimmed = value.trim();

    setValue(trimmed);
    validate(trimmed);
  };

  const trigger = (): ValidationResult => {
    const trimmed = value.trim();
    const result = validateFn(trimmed);

    setError(result.message);
    setIsValid(result.isValid);
    return result;
  };

  const reset = () => {
    setValue('');
    setError('');
    setIsValid(false);
  };

  return { value, error, isValid, onChange, onBlur, trigger, reset };
}
