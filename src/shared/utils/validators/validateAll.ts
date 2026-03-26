import type { ValidationResult } from '@/shared/utils/validators/validators.types';

/**
 * 여러 필드의 유효성을 한 번에 검사합니다.
 *
 * `onSubmit` 시점에 모든 필드를 일괄 검사할 때 사용합니다.
 * `useValidation`의 `trigger()`를 함께 사용하면 에러 메시지가 UI에 자동으로 표시됩니다.
 *
 * @returns `ValidateAllResult` - 전체 통과 여부와 필드별 에러 메시지
 *
 * @example
 * ```ts
 * const { isAllValid, errors } = validateAll({
 *   nickname: () => nicknameField.trigger(),
 *   email:    () => emailField.trigger(),
 *   password: () => passwordField.trigger(),
 * });
 *
 * if (!isAllValid) return;
 * // errors → { email: '올바른 이메일 형식이 아닙니다.' }
 * ```
 */

export type ValidatorMap = Record<string, () => ValidationResult>;

export type ValidateAllResult = {
  isAllValid: boolean;
  errors: Record<string, string>;
};

export function validateAll(validators: ValidatorMap): ValidateAllResult {
  const errors: Record<string, string> = {};
  let isAllValid = true;

  for (const [fieldName, validatorFn] of Object.entries(validators)) {
    const result = validatorFn();
    if (!result.isValid) {
      errors[fieldName] = result.message;
      isAllValid = false;
    }
  }

  return { isAllValid, errors };
}
