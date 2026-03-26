import type { ValidationResult } from '@/shared/utils/validators/validators.types';

export function validateColumnName(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, message: '칼럼 이름을 입력해주세요.' };
  }

  if (value.length > 15) {
    return { isValid: false, message: '칼럼 이름은 15자 이내로 입력해주세요.' };
  }

  return { isValid: true, message: '' };
}
