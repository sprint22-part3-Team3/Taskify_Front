import { useEffect, useState } from 'react';
import type { UserMe } from '@/features/users/apis/userMe.types';
import { getCurrentUser } from '@/features/users/apis/getCurrentUser';
import useAuthContext from '@/features/auth/hooks/useAuthContext';

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserMe | null>(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      setUserDataLoading(false);
      setUserProfile(null);
      return;
    }

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
  }, [isAuthenticated]);

  return { userProfile, setUserProfile, userDataLoading };
}
