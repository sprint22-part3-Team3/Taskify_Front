import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

type ResponsiveAvatarSize = Extract<AvatarSize, 'lg' | 'xl'>;

export const RESPONSIVE_AVATAR_SIZE: {
  mobile: ResponsiveAvatarSize;
  tablet: ResponsiveAvatarSize;
  desktop: ResponsiveAvatarSize;
} = {
  mobile: 'lg',
  tablet: 'xl',
  desktop: 'xl',
};
