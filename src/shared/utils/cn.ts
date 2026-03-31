import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 조건부 클래스 결합(clsx)과 Tailwind 클래스 충돌 병합(twMerge)을
 * 동시에 처리해 주는 공용 유틸리티 함수
 *
 * @example 1. 조건부 클래스 적용 및 충돌 병합
 * ```tsx
 * <button className={cn('px-4', isActive && 'bg-red-500', 'px-6')}>버튼</button>
 * // → className: 'bg-red-500 px-6'
 * ```
 *
 * @example 2. cva와 함께 사용하여 클래스 동적 생성
 * ```tsx
 * const buttonVariants = cva('px-4 py-2', {
 *   variants: {
 *     intent: {
 *       primary: 'bg-primary-500 text-white',
 *       secondary: 'bg-gray-200 text-primary-500',
 *     },
 *     size: {
 *       sm: 'typo-sm-medium h-8',
 *       md: 'typo-md-medium h-10',
 *     },
 *   },
 * });
 *
 * return (
 *   <button className={cn(buttonVariants({ intent: 'primary', size: 'sm' }))}>버튼</button>
 *   // → className: 'px-4 py-2 bg-primary-500 text-white typo-sm-medium h-8'
 * )
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
