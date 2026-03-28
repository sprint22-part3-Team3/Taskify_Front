import { cva } from 'class-variance-authority';
import { type ElementType } from 'react';
import type { PolymorphicButtonProps } from '@/shared/components/button/button.types';
import { Loading } from '@/shared/components/loading';
import { cn } from '@/shared/utils/cn';

const buttonStyle = cva(
  `relative inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-solid
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/30
  cursor-pointer disabled:cursor-not-allowed`,
  {
    variants: {
      theme: {
        primary:
          'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-gray-300 disabled:hover:bg-gray-300 aria-disabled:bg-gray-300 aria-disabled:hover:bg-gray-300',
        secondary:
          'border-gray-200 bg-white text-primary-500 hover:border-primary-500 hover:bg-primary-100 active:border-primary-600 active:text-primary-600 disabled:border-gray-200 disabled:text-gray-300 disabled:hover:border-gray-200 disabled:hover:bg-white aria-disabled:border-gray-200 aria-disabled:text-gray-300 aria-disabled:hover:border-gray-200 aria-disabled:hover:bg-white',
        danger:
          'border-gray-200 bg-white text-error hover:border-gray-300 hover:bg-gray-50 active:border-gray-400 active:bg-gray-100 active:text-error disabled:border-gray-200 disabled:text-gray-300 disabled:hover:border-gray-200 disabled:hover:bg-white aria-disabled:border-gray-200 aria-disabled:text-gray-300 aria-disabled:hover:border-gray-200 aria-disabled:hover:bg-white',
        cancel:
          'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:bg-gray-50 hover:text-black-200 active:border-gray-400 active:bg-gray-100 active:text-black-200 disabled:border-gray-100 disabled:text-gray-300 disabled:hover:border-gray-100 disabled:hover:bg-white disabled:hover:text-gray-300 aria-disabled:border-gray-100 aria-disabled:text-gray-300 aria-disabled:hover:border-gray-100 aria-disabled:hover:bg-white aria-disabled:hover:text-gray-300',
        outlined:
          'border-gray-200 bg-transparent text-black-200 hover:border-gray-300 hover:bg-gray-50 active:border-gray-400 active:bg-gray-100  disabled:border-gray-100 disabled:text-gray-300 disabled:hover:border-gray-100 disabled:hover:bg-transparent aria-disabled:border-gray-100 aria-disabled:text-gray-300 aria-disabled:hover:border-gray-100 aria-disabled:hover:bg-transparent',
        icon: 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:bg-gray-50 hover:text-black-200 active:border-gray-400 active:bg-gray-100 active:text-black-200 disabled:border-gray-100 disabled:text-gray-300 disabled:hover:border-gray-100 disabled:hover:bg-white disabled:hover:text-gray-300 aria-disabled:border-gray-100 aria-disabled:text-gray-300 aria-disabled:hover:border-gray-100 aria-disabled:hover:bg-white aria-disabled:hover:text-gray-300',
      },
      size: {
        lg: 'h-13.5 rounded-lg px-14 typo-lg-semibold',
        md: 'h-12.5 rounded-lg px-6 typo-2lg-medium',
        sm: 'h-8 rounded-sm px-7 typo-md-medium',
        icon: 'h-10 rounded-lg px-4 typo-lg-medium gap-2',
      },
    },
    defaultVariants: {
      theme: 'primary',
      size: 'lg',
    },
  }
);

/**
 *  Button 컴포넌트
 *
 *  사이즈는 높이 기준으로 나누었습니다.
 *  기본 theme/size를 제공하고,
 *  높이/너비/폰트/반응형 예외는 className에서 직접 덮어쓰면 됩니다.
 *
 *  as={Link}는 to={'경로'}와 같이 사용해주세요
 *  폼 제출하는 타입의 버튼은 type="submit"을 명시해주세요
 *
 * @example
 * <Button theme="primary" type="submit" className="h-8 w-full typo-md-semibold">
 *   버튼
 * </Button>
 *
 */

const LOADING_SIZE = {
  lg: 18,
  md: 16,
  sm: 14,
  icon: 16,
} as const;

function Button<T extends ElementType = 'button'>({
  as,
  children,
  theme,
  size,
  type = 'button',
  disabled = false,
  isLoading = false,
  className,
  onClick,
  ...props
}: PolymorphicButtonProps<T>) {
  const Component = as || 'button';
  const isDisabled = disabled || isLoading;
  const loadingSize = LOADING_SIZE[size ?? 'lg'];

  const componentProps = {
    className: cn(buttonStyle({ theme, size }), className),
    ...(Component === 'button' ? { type } : {}),
    ...(Component === 'button' ? { disabled: isDisabled } : {}),
    ...(Component !== 'button' ? { 'aria-disabled': isDisabled } : {}),
    'aria-busy': isLoading,
    onClick,
    ...props,
  };

  return (
    <Component {...componentProps}>
      <span className={cn(isLoading && 'invisible')}>{children}</span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loading size={loadingSize} color="currentColor" />
        </span>
      )}
    </Component>
  );
}

export { Button };
