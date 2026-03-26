import type { ValidationResult } from '@/shared/utils/validators/validators.types';

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
 * @param value - 검사할 비밀번호 문자열
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
  if (!value || value.trim() === '') {
    return { isValid: false, message: '비밀번호를 입력해주세요.' };
  }

  if (value.length < 8) {
    return { isValid: false, message: '비밀번호는 8자 이상이어야 합니다.' };
  }

  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*()_+\-={}[\];':"\\|,.<>/?]/.test(value);

  if (!hasLetter)
    return { isValid: false, message: '영문자를 포함해야 합니다.' };
  if (!hasNumber) return { isValid: false, message: '숫자를 포함해야 합니다.' };
  if (!hasSpecial)
    return {
      isValid: false,
      message: '특수문자를 포함해야 합니다. (예: !@#$%^&*)',
    };

  return { isValid: true, message: '' };
}
