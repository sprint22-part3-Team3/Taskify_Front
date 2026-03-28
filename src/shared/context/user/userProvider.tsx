import { useEffect, useMemo, useState } from 'react';
import { UserContext } from '@/shared/context/user/userContext';
import { getCurrentUser } from '@/features/users/apis/getCurrentUser';
import type { ReactNode } from 'react';
import type { UserMe } from '@/shared/types/userMe';

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [userProfile, setUserProfile] = useState<UserMe | null>(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    const fetchUser = async () => {
      setUserDataLoading(true);
      try {
        const user = await getCurrentUser();
        if (!canceled) {
          setUserProfile(user);
        }
      } catch {
        if (!canceled) {
          setUserProfile(null);
        }
      } finally {
        if (!canceled) {
          setUserDataLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      canceled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      userProfile,
      setUserProfile,
      userDataLoading,
    }),
    [userProfile, userDataLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
