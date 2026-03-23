import type { AvatarGroupSize } from './avatarGroup.types';

export const AVATAR_GROUP_VISIBLE_COUNT = {
  mobile: 2,
  tablet: 2,
  desktop: 4,
} as const;

export const AVATAR_GROUP_SIZE = {
  mobile: 'lg',
  tablet: 'xl',
  desktop: 'xl',
} as const;

export const AVATAR_GROUP_GAP_CLASS_NAMES: Record<AvatarGroupSize, string> = {
  lg: '-space-x-3',
  xl: '-space-x-3',
};

export const AVATAR_GROUP_BADGE_TEXT_CLASS_NAMES: Record<
  AvatarGroupSize,
  string
> = {
  lg: 'typo-md-medium lg:typo-lg-medium',
  xl: 'typo-md-medium lg:typo-lg-medium',
};
