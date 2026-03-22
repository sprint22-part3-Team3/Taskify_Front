import { cn } from '@/shared/utils/cn';
import { forwardRef } from 'react';
import type { InputFieldProps } from './inputField.types';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        {...props}
        className={cn(
          'typo-lg-regular focus:border-primary-500 placeholder:typo-lg-regular w-full rounded-lg border border-gray-200 px-4 py-3 outline-0 placeholder:text-gray-300',
          disabled && 'cursor-not-allowed',
          className
        )}
      />
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
