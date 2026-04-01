import type { ToastItemProps } from '@/shared/components/toast/toast-item/toastItem.types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';
import { IcClose } from '@/shared/assets';
import {
  DEFAULT_TITLES,
  TOAST_ICONS,
} from '@/shared/components/toast/toast.constants';

const toastVariants = cva(
  'pointer-events-auto flex w-full max-w-sm items-center gap-3 bg-white p-4 shadow-lg ring-1 ring-black/5 transition-all h-14 border-l-4',
  {
    variants: {
      theme: {
        success: 'border-l-4 border-l-primary-500',
        error: 'border-l-4 border-l-error',
        warning: 'border-l-4 border-l-warning',
        info: 'border-l-4 border-l-info',
      },
    },
    defaultVariants: {
      theme: 'success',
    },
  }
);

/**
 * 화면 하단에 띄워지는 알림(Toast) UI 컴포넌트입니다.
 */
export function ToastItem({
  id,
  theme = 'success',
  title,
  message,
  isDisableTitle = false,
  onClose,
}: ToastItemProps) {
  const { Icon, colorClass } = TOAST_ICONS[theme];
  return (
    <div className={toastVariants({ theme })} role="alert">
      <div className={cn('shrink-0', colorClass)}>
        <Icon />
      </div>

      <div className="flex-1">
        {!isDisableTitle && (
          <p className="typo-sm-semibold text-black-200 -mb-0.5">
            {title || DEFAULT_TITLES[theme]}
          </p>
        )}
        {message && (
          <p className={cn('typo-xs-regular text-gray-400')}>{message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onClose(id)}
        className="shrink-0 cursor-pointer rounded-md p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
        aria-label="닫기"
      >
        <IcClose className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}
