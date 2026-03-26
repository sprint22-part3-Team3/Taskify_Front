import type { ValidationResult } from '@/shared/utils/validators/validators.types';

/**
 * 칼럼 이름 유효성을 검사합니다.
 *
 * 검사 규칙:
 * - 빈 값 불가
 * - 15자 이내
 *
 * @remarks
 * 중복 여부는 서버 응답으로 처리합니다.
 *
 * @returns `ValidationResult` - 유효성 검사 결과
 *
 * @example
 * ```ts
 * validateColumnName('Todo');
 * // { isValid: true, message: '' }
 *
 * validateColumnName('');
 * // { isValid: false, message: '칼럼 이름을 입력해주세요.' }
 *
 * validateColumnName('이름이너무너무너무길어요');
 * // { isValid: false, message: '칼럼 이름은 15자 이내로 입력해주세요.' }
 * ```
 */

export function validateColumnName(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, message: '칼럼 이름을 입력해주세요.' };
  }

  if (value.length > 15) {
    return { isValid: false, message: '칼럼 이름은 15자 이내로 입력해주세요.' };
  }

  return { isValid: true, message: '' };
}
