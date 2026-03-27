import type { ValidationResult } from '@/shared/utils/validators/validators.types';
import { PASSWORD_RULES } from '@/shared/utils/validators/validators.constants';

/**
 * 비밀번호 유효성을 검사합니다.
 *
 * 검사 규칙:
 * - 빈 값 불가
 * - 8자 이상
 * - 영문자 포함
 * - 숫자 포함
 * - 특수문자 포함 (`!@#$%^&*` 등)
 *
 * @returns `ValidationResult` - 유효성 검사 결과
 *
 * @example
 * ```ts
 * validatePassword('Test1234!');
 * // { isValid: true, message: '' }
 *
 * validatePassword('test');
 * // { isValid: false, message: '비밀번호는 8자 이상이어야 합니다.' }
 *
 * validatePassword('testtest');
 * // { isValid: false, message: '숫자를 포함해야 합니다.' }
 *
 * validatePassword('testtest1');
 * // { isValid: false, message: '특수문자를 포함해야 합니다. (예: !@#$%^&*)' }
 * ```
 */

export function validatePassword(value: string): ValidationResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: false, message: '비밀번호를 입력해주세요.' };
  }

  if (value.length < PASSWORD_RULES.MIN_LENGTH) {
    return {
      isValid: false,
      message: `비밀번호는 ${PASSWORD_RULES.MIN_LENGTH}자 이상이어야 합니다.`,
    };
  }

  if (!PASSWORD_RULES.LETTER_REGEX.test(value)) {
    return { isValid: false, message: '영문자를 포함해야 합니다.' };
  }

  if (!PASSWORD_RULES.NUMBER_REGEX.test(value)) {
    return { isValid: false, message: '숫자를 포함해야 합니다.' };
  }

  if (!PASSWORD_RULES.SPECIAL_REGEX.test(value)) {
    return {
      isValid: false,
      message: '특수문자를 포함해야 합니다. (예: !@#$%^&*)',
    };
  }

  return { isValid: true, message: '' };
}
