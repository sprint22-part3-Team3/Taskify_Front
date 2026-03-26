// shared/utils/validators/validatePassword.ts

import type { ValidationResult } from './validators.types';

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
