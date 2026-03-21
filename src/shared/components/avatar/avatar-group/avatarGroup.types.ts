import type { ReactNode } from 'react';
import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

export type AvatarGroupUser = {
  id: number | string;
  avatar: ReactNode;
};

export type AvatarGroupProps = {
  users?: AvatarGroupUser[];
  restCount?: number;
  totalCount?: number;
  size?: AvatarSize;
  className?: string;
};
