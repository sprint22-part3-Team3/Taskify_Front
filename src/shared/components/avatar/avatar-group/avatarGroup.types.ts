import type { ReactNode } from 'react';
import type { AvatarSize } from '@/shared/components/avatar/avatar.types';

export type AvatarGroupSize = Extract<AvatarSize, 'lg' | 'xl'>;

export type AvatarGroupUser = {
  id: number | string;
  avatar: ReactNode;
};

export type AvatarGroupProps = {
  users?: AvatarGroupUser[];
  restCount?: number;
  totalCount?: number;
  className?: string;
};
