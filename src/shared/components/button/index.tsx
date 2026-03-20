import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { type ElementType } from 'react';
import type { PolymorphicButtonProps } from '@/shared/components/button/button.types';

//TODO: cn으로 변경하기
const ButtonStyle = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-solid
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/30
  cursor-pointer disabled:cursor-not-allowed`,
  {
    variants: {
      theme: {
        primary:
          'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-gray-300 disabled:hover:bg-gray-300 aria-disabled:bg-gray-300 aria-disabled:hover:bg-gray-300',
        secondary:
          'border-gray-200 bg-white text-primary-500 hover:bg-primary-100 active:border-primary-700 active:text-primary-700 disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-white aria-disabled:border-gray-200 aria-disabled:text-gray-300 aria-disabled:hover:bg-white',
        danger:
          'border-gray-200 bg-white text-error hover:bg-primary-100 active:border-primary-700 active:text-error disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-white aria-disabled:border-gray-200 aria-disabled:text-gray-300 aria-disabled:hover:bg-white',
        cancel:
          'border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-black-200 active:border-primary-700 active:text-primary-700 disabled:border-gray-100 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300 aria-disabled:border-gray-100 aria-disabled:text-gray-300 aria-disabled:hover:bg-white aria-disabled:hover:text-gray-300',
        outlined:
          'border-gray-200 bg-white text-black-200 hover:bg-gray-50 active:border-primary-700 active:text-primary-700 disabled:border-gray-100 disabled:text-gray-300 disabled:hover:bg-white aria-disabled:border-gray-100 aria-disabled:text-gray-300 aria-disabled:hover:bg-white',
        icon: 'border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-black-200 active:border-primary-700 active:text-primary-700 disabled:border-gray-100 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300 aria-disabled:border-gray-100 aria-disabled:text-gray-300 aria-disabled:hover:bg-white aria-disabled:hover:text-gray-300',
      },
      size: {
        lg: 'h-13.5 rounded-lg px-7 text-lg-semibold',
        md: 'h-12.5 rounded-lg px-6 text-lg-medium',
        sm: 'h-8 rounded-md px-4 text-xs-medium',
        icon: 'h-10 rounded-lg px-4 text-md-medium gap-2',
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
 *  아이콘 전용 버튼은 children 없이 사용 가능하지만, 접근성을 위해 aria-label을 넣어주세요
 * @example
 * <Button theme="primary" type="submit" className="h-[62px] w-full text-md-semibold">
 *   버튼
 * </Button>
 *
 */

//TODO: 버른 로딩 상태 추가(로딩 스피너 vs 로딩 중 텍스트)

function Button<T extends ElementType = 'button'>({
  as,
  children,
  theme,
  size,
  type = 'button',
  disabled = false,
  className,
  onClick,
  ...props
}: PolymorphicButtonProps<T>) {
  const Component = as || 'button';

  const componentProps = {
    className: clsx(ButtonStyle({ theme, size }), className),
    ...(Component === 'button' ? { type } : {}),
    ...(Component === 'button' ? { disabled } : {}),
    onClick,
    ...props,
  };
  return <Component {...componentProps}>{children}</Component>;
}

export { Button };
