import type { ValidationResult } from '@/shared/utils/validators/validators.types';

export type ValidatorMap = Record<string, () => ValidationResult>;

export type ValidateAllResult = {
  isAllValid: boolean;
  errors: Record<string, string>;
};

export function validateAll(validators: ValidatorMap): ValidateAllResult {
  const errors: Record<string, string> = {};
  let isAllValid = true;

  for (const [fieldName, validatorFn] of Object.entries(validators)) {
    const result = validatorFn();
    if (!result.isValid) {
      errors[fieldName] = result.message;
      isAllValid = false;
    }
  }

  return { isAllValid, errors };
}
