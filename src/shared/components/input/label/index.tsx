import { cn } from '@/shared/utils/cn';
import { type LabelProps } from './label.types';

function Label({
  children,
  required = false,
  className,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn('typo-lg-regular text-black-200', className)}
      {...props}
    >
      {children}
      {required && (
        <span className="typo-lg-regular text-primary-500 ml-0.5">*</span>
      )}
    </label>
  );
}

export default Label;
