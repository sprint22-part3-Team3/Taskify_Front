import type { ReactNode } from 'react';
import AvatarFallback from '@/shared/components/avatar/avatar-fallback';
import AvatarImage from '@/shared/components/avatar/avatar-image';
import type { AvatarUser } from '@/shared/types/user.types';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  children?: ReactNode;
  user: AvatarUser;
  size?: AvatarSize;
  className?: string;
};

export type AvatarComponent = ((props: AvatarProps) => ReactNode) & {
  Img: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
};
