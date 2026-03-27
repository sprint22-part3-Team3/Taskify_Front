import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

export const AVATAR_SIZE_CLASS_NAMES: Record<AvatarSize, string> = {
  sm: 'h-6 w-6 border border-white',
  md: 'h-6.5 w-6.5 border-2 border-white',
  lg: 'h-8.5 w-8.5 border-2 border-white',
  xl: 'h-9.5 w-9.5 border-2 border-white',
};

export const AVATAR_FALLBACK_TEXT_CLASS_NAMES: Record<AvatarSize, string> = {
  sm: 'text-2xs leading-none font-semibold',
  md: 'text-2xs leading-none font-semibold',
  lg: 'text-md leading-none font-semibold',
  xl: 'text-lg leading-none font-semibold',
};

export const TASK_MODAL_AVATAR_SIZE = {
  mobile: 'md',
  tablet: 'lg',
  desktop: 'lg',
} as const;
