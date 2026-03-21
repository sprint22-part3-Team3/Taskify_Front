import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

export const AVATAR_GROUP_VISIBLE_COUNT = {
  mobile: 2,
  tablet: 2,
  desktop: 4,
} as const;

export const avatarGroupGapClassNames: Record<AvatarSize, string> = {
  sm: '-space-x-2',
  md: '-space-x-2.5',
  lg: '-space-x-3',
  xl: '-space-x-3',
};

export const avatarGroupBadgeTextClassNames: Record<AvatarSize, string> = {
  sm: 'typo-md-medium lg:typo-lg-medium',
  md: 'typo-md-medium lg:typo-lg-medium',
  lg: 'typo-md-medium lg:typo-lg-medium',
  xl: 'typo-md-medium lg:typo-lg-medium',
};
