import type { ValidationResult } from '@/shared/utils/validators/validators.types';
import { EMAIL_RULES } from './validators.constants';

/**
 * 이메일 유효성을 검사합니다.
 *
 * 검사 규칙:
 * - 빈 값 불가
 * - `@` 및 도메인 형식 포함 여부 확인
 *
 * @returns `ValidationResult` - 유효성 검사 결과
 *
 * @example
 * ```ts
 * validateEmail('test@example.com');
 * // { isValid: true, message: '' }
 *
 * validateEmail('invalid-email');
 * // { isValid: false, message: '올바른 이메일 형식이 아닙니다. (예: example@email.com)' }
 *
 * validateEmail('');
 * // { isValid: false, message: '이메일을 입력해주세요.' }
 * ```
 */

export function validateEmail(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, message: '이메일을 입력해주세요.' };
  }

  if (!EMAIL_RULES.REGEX.test(value)) {
    return {
      isValid: false,
      message: '올바른 이메일 형식이 아닙니다. (예: example@email.com)',
    };
  }

  return { isValid: true, message: '' };
}
