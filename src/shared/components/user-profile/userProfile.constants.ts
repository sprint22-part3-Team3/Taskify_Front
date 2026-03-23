import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

type UserProfileAvatarSize = Extract<AvatarSize, 'lg' | 'xl'>;

export const USER_PROFILE_AVATAR_SIZE: {
  mobile: UserProfileAvatarSize;
  tablet: UserProfileAvatarSize;
  desktop: UserProfileAvatarSize;
} = {
  mobile: 'lg',
  tablet: 'xl',
  desktop: 'xl',
};
