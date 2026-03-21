import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

export const avatarSizeClassNames: Record<AvatarSize, string> = {
  sm: 'h-6 w-6 border border-white',
  md: 'h-6.5 w-6.5 border-2 border-white',
  lg: 'h-8.5 w-8.5 border-2 border-white',
  xl: 'h-9.5 w-9.5 border-2 border-white',
};

export const avatarFallbackTextClassNames: Record<AvatarSize, string> = {
  sm: 'typo-2xs-tight-semibold',
  md: 'typo-2xs-tight-semibold',
  lg: 'typo-md-tight-semibold',
  xl: 'typo-lg-tight-semibold',
};
