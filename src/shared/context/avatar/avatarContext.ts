import { createContext, useContext } from 'react';
import type { AvatarSize } from '@/shared/components/avatar/avatar.types';
import type { AvatarUser } from '@/shared/types/user.types';

export const AvatarSizeContext = createContext<AvatarSize>('md');
export const AvatarUserContext = createContext<AvatarUser | null>(null);

export function useAvatarSize() {
  return useContext(AvatarSizeContext);
}

export function useAvatarUser() {
  return useContext(AvatarUserContext);
}
