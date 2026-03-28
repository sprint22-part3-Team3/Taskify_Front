import { useMemo } from 'react';
import { UserContext } from '@/shared/context/user/userContext';
import type { ReactNode } from 'react';
import { useUserProfile } from '@/shared/hooks/user/useUserProfile';

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const userProfileState = useUserProfile();

  const value = useMemo(() => userProfileState, [userProfileState]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
