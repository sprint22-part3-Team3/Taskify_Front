import type { ValidationResult } from '@/shared/utils/validators/validators.types';
import { NICKNAME_RULES } from '@/shared/utils/validators/validators.constants';

/**
 * 닉네임 유효성을 검사합니다.
 *
 * 검사 규칙:
 * - 빈 값 불가
 * - 한글 자모 단독 입력 불가 (ㄱ, ㅏ 등)
 * - 한글(완성형), 영문만 허용 (숫자, 특수문자, 공백 불가)
 * - 5자 이내
 *
 * @returns `ValidationResult` - 유효성 검사 결과
 *
 * @example
 * ```ts
 * validateNickname('홍길동');
 * // { isValid: true, message: '' }
 *
 * validateNickname('hong');
 * // { isValid: true, message: '' }
 *
 * validateNickname('홍길동123');
 * // { isValid: false, message: '닉네임은 한글, 영문만 사용할 수 있습니다.' }
 *
 * validateNickname('홍길동홍길동');
 * // { isValid: false, message: '닉네임은 5자 이내로 입력해주세요.' }
 *
 * validateNickname('ㅎㄱ');
 * // { isValid: false, message: '완성된 한글을 입력해주세요.' }
 * ```
 */

export function validateNickname(value: string): ValidationResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: false, message: '닉네임을 입력해주세요.' };
  }

  if (NICKNAME_RULES.INCOMPLETE_KOREAN_REGEX.test(trimmed)) {
    return { isValid: false, message: '완성된 한글을 입력해주세요.' };
  }

  if (!NICKNAME_RULES.REGEX.test(trimmed)) {
    return {
      isValid: false,
      message: '닉네임은 한글, 영문만 사용할 수 있습니다.',
    };
  }

  if (trimmed.length > NICKNAME_RULES.MAX_LENGTH) {
    return {
      isValid: false,
      message: `닉네임은 ${NICKNAME_RULES.MAX_LENGTH}자 이내로 입력해주세요.`,
    };
  }

  return { isValid: true, message: '' };
}
