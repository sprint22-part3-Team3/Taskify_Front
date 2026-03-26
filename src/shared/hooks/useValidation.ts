import { useState, useCallback } from 'react';
import type { ValidationResult } from '@/shared/utils/validators/validators.types';

type UseValidationOptions = {
  validateFn: (value: string) => ValidationResult;
};

type UseValidationReturn = {
  value: string;
  error: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  reset: () => void;
};

export function useValidation({
  validateFn,
}: UseValidationOptions): UseValidationReturn {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const validate = useCallback(
    (val: string) => {
      const result = validateFn(val);
      setError(result.message);
      setIsValid(result.isValid);
    },
    [validateFn]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError('');
    setIsValid(false);
  };

  const onBlur = () => {
    validate(value);
  };

  const reset = () => {
    setValue('');
    setError('');
    setIsValid(false);
  };

  return { value, error, isValid, onChange, onBlur, reset };
}
