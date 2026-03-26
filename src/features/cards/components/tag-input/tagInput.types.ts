import type { ComponentProps } from 'react';

export type TagInputProps = Pick<
  ComponentProps<'input'>,
  'value' | 'onChange' | 'onKeyDown' | 'placeholder'
>;
