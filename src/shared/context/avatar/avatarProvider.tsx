import type { ReactNode } from 'react';
import {
  AvatarSizeContext,
  AvatarUserContext,
} from '@/shared/context/avatar/avatarContext';
import type { AvatarSize } from '@/shared/components/avatar/avatar.types';
import type { AvatarUser } from '@/shared/types/user.types';

export function AvatarSizeProvider({
  children,
  size,
  user = null,
}: {
  children: ReactNode;
  size: AvatarSize;
  user?: AvatarUser | null;
}) {
  return (
    <AvatarUserContext.Provider value={user}>
      <AvatarSizeContext.Provider value={size}>
        {children}
      </AvatarSizeContext.Provider>
    </AvatarUserContext.Provider>
  );
}
