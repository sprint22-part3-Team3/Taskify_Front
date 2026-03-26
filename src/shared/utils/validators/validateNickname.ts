import type { ValidationResult } from '@/shared/utils/validators/validators.types';

export function validateNickname(value: string): ValidationResult {
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

  if (value.length > 5) {
    return { isValid: false, message: '닉네임은 5자 이내로 입력해주세요.' };
  }

  return { isValid: true, message: '' };
}
