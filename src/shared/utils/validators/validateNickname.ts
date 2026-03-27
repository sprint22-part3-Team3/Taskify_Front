import type { ValidationResult } from '@/shared/utils/validators/validators.types';

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
  const MAX_NICKNAME_LENGTH = 5;

  if (!value || value.trim() === '') {
    return { isValid: false, message: '닉네임을 입력해주세요.' };
  }

  const hasIncompleteKorean = /[ㄱ-ㅎㅏ-ㅣ]/.test(value);
  if (hasIncompleteKorean) {
    return { isValid: false, message: '완성된 한글을 입력해주세요.' };
  }

  const nicknameRegex = /^[가-힣a-zA-Z]+$/;
  if (!nicknameRegex.test(value)) {
    return {
      isValid: false,
      message: '닉네임은 한글, 영문만 사용할 수 있습니다.',
    };
  }

  if (value.length > MAX_NICKNAME_LENGTH) {
    return {
      isValid: false,
      message: `닉네임은 ${MAX_NICKNAME_LENGTH}자 이내로 입력해주세요.`,
    };
  }

  return { isValid: true, message: '' };
}
