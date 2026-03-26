export type ValidationResult = {
  isValid: boolean;
  message: string;
};

export type UseAsyncValidationReturn = {
  value: string;
  error: string;
  successMessage: string;
  isChecking: boolean;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => Promise<void>;
  reset: () => void;
};

export type UseAsyncValidationOptions = {
  checkFn: (value: string) => Promise<boolean>;
};
