import { cn } from '@/shared/utils/cn';
import type { TextAreaProps } from './textArea.types';

export default function TextArea({
  className,
  value,
  onChange,
  error,
  ...props
}: TextAreaProps) {
  return (
    <div className="flex max-w-130 flex-col gap-1">
      <textarea
        className={cn(
          'h-31.5 w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3',
          'placeholder:font-lg-regular text-black placeholder:text-gray-300',
          'focus:border-primary-500 focus:outline-none',
          error && 'border-error',
          className
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {error && <p className="text-error typo-md-regular">{error}</p>}
    </div>
  );
}
