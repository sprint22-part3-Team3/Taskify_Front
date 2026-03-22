import { type ReactNode } from 'react';
import type { InputFieldProps } from '@/shared/components/input/input-field/inputField.types';

export type InputProps = InputFieldProps & {
  label?: ReactNode;
  errorMessage?: string;
  errorMessageClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
};
