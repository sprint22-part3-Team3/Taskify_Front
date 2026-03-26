import type { ValidationResult } from '@/shared/utils/validators/validators.types';

export function validateEmail(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, message: '이메일을 입력해주세요.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return {
      isValid: false,
      message: '올바른 이메일 형식이 아닙니다. (예: example@email.com)',
    };
  }

  return { isValid: true, message: '' };
}
