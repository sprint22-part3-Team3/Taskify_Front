import type { ComponentProps } from 'react';

export interface TextAreaProps extends Omit<
  ComponentProps<'textarea'>,
  'onChange'
> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
