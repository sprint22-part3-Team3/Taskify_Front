import { cn } from '@/shared/utils/cn';

type FieldErrorProps = {
  className?: string;
  children: string;
};

export default function FieldError({ children, className }: FieldErrorProps) {
  return (
    <p className={cn('typo-md-regular text-error mt-1', className)}>
      {children}
    </p>
  );
}
