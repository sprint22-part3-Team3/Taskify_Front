import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/features/users/apis/users';
import type { UserMe } from '@/features/users/apis/userMe.types';

export function useCurrentUser() {
  const [user, setUser] = useState<UserMe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCurrentUser();
        if (res) setUser(res);
      } catch {
        setErrorMessage('유저 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { user, isLoading, errorMessage };
}
