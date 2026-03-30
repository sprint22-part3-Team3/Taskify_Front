// shared/hooks/useAsyncValidation.ts

import { useState } from 'react';
import type {
  UseAsyncValidationReturn,
  UseAsyncValidationOptions,
} from '@/shared/utils/validators';
import { COLUMN_NAME_RULES } from '@/shared/utils/validators/validators.constants';

/**
 * `useAsyncValidation` 훅의 옵션 타입입니다.
 *
 * @property checkFn - 비동기 중복 확인 함수. `true`를 반환하면 중복으로 처리합니다.
 */

/**
 * `useAsyncValidation` 훅의 반환 타입입니다.
 *
 * @property value          - input의 현재 값
 * @property error          - 유효성 검사 실패 시 에러 메시지. 통과 시 빈 문자열('')
 * @property successMessage - 중복 확인 통과 시 안내 메시지
 * @property isChecking     - API 호출 중 여부. 로딩 표시에 사용
 * @property isValid        - 중복 확인 통과 여부. 버튼 `disabled` 제어에 사용
 * @property onChange       - input의 `onChange` 핸들러. 입력 변경 시 이전 결과를 초기화합니다.
 * @property onBlur         - input의 `onBlur` 핸들러. 포커스 해제 시 중복 확인 API를 호출합니다.
 * @property reset          - 값, 에러, 유효성 상태를 초기화합니다.
 */

/**
 * 비동기 유효성 검사(중복 확인 등)를 관리하는 훅입니다.
 *
 * - `onBlur` 시 중복 확인 API 호출
 * - `onChange` 시 이전 결과 초기화
 * - `isChecking`으로 로딩 상태 표시
 * - `isValid`로 제출 버튼 `disabled` 제어
 *
 * @returns `UseAsyncValidationReturn`
 *
 * @example
 * ```tsx
 * // API 호출 함수 정의 (features/column/apis/checkColumnName.ts 등)
 * const checkColumnNameDuplicate = async (name: string): Promise<boolean> => {
 *   const response = await fetch(`/api/columns/check?name=${name}`);
 *   const data = await response.json();
 *   return data.isDuplicate;
 * };
 *
 * // 훅 사용
 * const columnNameField = useAsyncValidation({ checkFn: checkColumnNameDuplicate });
 *
 * <Input
 *   value={columnNameField.value}
 *   onChange={columnNameField.onChange}
 *   onBlur={columnNameField.onBlur}
 *   errorMessage={columnNameField.error}
 * />
 * {columnNameField.isChecking && <p>확인 중...</p>}
 * {columnNameField.successMessage && <p>{columnNameField.successMessage}</p>}
 *
 * // 버튼 비활성화
 * <Button disabled={!columnNameField.isValid}>생성</Button>
 * ```
 */
export function useColumnNameValidation({
  checkFn,
}: UseAsyncValidationOptions): UseAsyncValidationReturn {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError('');
    setSuccessMessage('');
    setIsValid(false);
  };

  const onBlur = async (): Promise<void> => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('칼럼 이름을 입력해주세요.');
      setIsValid(false);
      return;
    }

    if (trimmed.length > COLUMN_NAME_RULES.MAX_LENGTH) {
      setError(
        `칼럼 이름은 ${COLUMN_NAME_RULES.MAX_LENGTH}자 이내로 입력해주세요.`
      );
      setIsValid(false);
      return;
    }

    setIsChecking(true);

    try {
      const isDuplicate = await checkFn(trimmed);

      if (isDuplicate) {
        setError('중복된 컬럼 이름입니다.');
        setIsValid(false);
      } else {
        setSuccessMessage('사용 가능한 컬럼 이름입니다.');
        setIsValid(true);
      }
    } catch {
      setError('중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsValid(false);
    } finally {
      setIsChecking(false);
    }
  };

  const reset = () => {
    setValue('');
    setError('');
    setSuccessMessage('');
    setIsChecking(false);
    setIsValid(false);
  };

  return {
    value,
    error,
    successMessage,
    isChecking,
    isValid,
    onChange,
    onBlur,
    reset,
  };
}
