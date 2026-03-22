import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

export const avatarSizeClassNames: Record<AvatarSize, string> = {
  sm: 'h-6 w-6 border border-white',
  md: 'h-6.5 w-6.5 border-2 border-white',
  lg: 'h-8.5 w-8.5 border-2 border-white',
  xl: 'h-9.5 w-9.5 border-2 border-white',
};

export const avatarFallbackTextClassNames: Record<AvatarSize, string> = {
  sm: 'text-2xs leading-none font-semibold',
  md: 'text-2xs leading-none font-semibold',
  lg: 'text-md leading-none font-semibold',
  xl: 'text-lg leading-none font-semibold',
};
