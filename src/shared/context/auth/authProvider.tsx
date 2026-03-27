import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@/shared/context/auth/authContext';
import {
  AUTH_EVENTS,
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/shared/utils/token';
import type { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    getAccessToken()
  );

  const handleSetAuthToken = (nextAccessToken: string) => {
    setAccessToken(nextAccessToken);
  };

  const handleClearAuth = () => {
    removeAccessToken();
  };

  useEffect(() => {
    const syncAccessToken = () => {
      setAccessTokenState(getAccessToken());
    };

    window.addEventListener(AUTH_EVENTS.TOKEN_CHANGE, syncAccessToken);
    window.addEventListener('storage', syncAccessToken);

    return () => {
      window.removeEventListener(AUTH_EVENTS.TOKEN_CHANGE, syncAccessToken);
      window.removeEventListener('storage', syncAccessToken);
    };
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(accessToken),
      setAuthToken: handleSetAuthToken,
      clearAuth: handleClearAuth,
    }),
    [accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
