import {
  IcToastError,
  IcToastInfo,
  IcToastSuccess,
  IcToastWarning,
} from '@/shared/assets';

export const TOAST_ICONS = {
  success: {
    Icon: IcToastSuccess,
    colorClass: 'text-primary-500',
  },
  error: {
    Icon: IcToastError,
    colorClass: 'text-error',
  },
  warning: {
    Icon: IcToastWarning,
    colorClass: 'text-warning',
  },
  info: {
    Icon: IcToastInfo,
    colorClass: 'text-info',
  },
} as const;

export const DEFAULT_TITLES = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
} as const;

export const TOAST_DURATION = 3000;
export const MAX_TOASTS = 3;
