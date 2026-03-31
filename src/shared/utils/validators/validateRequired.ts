import type { ValidationResult } from '@/shared/utils/validators/validators.types';

export function createRequiredValidator(message: string) {
  return (value: string): ValidationResult => {
    const trimmed = value.trim();
    if (!trimmed) {
      return { isValid: false, message };
    }
    return { isValid: true, message: '' };
  };
}
