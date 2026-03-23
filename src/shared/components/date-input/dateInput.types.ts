import type { InputFieldProps } from '@/shared/components/input/input-field/inputField.types';

export type DateInputFieldProps = Omit<
  InputFieldProps,
  'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};
