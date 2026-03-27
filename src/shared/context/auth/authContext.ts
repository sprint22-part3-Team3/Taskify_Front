import { createContext } from 'react';

export type AuthContextValue = {
  isAuthenticated: boolean;
  setAuthToken: (accessToken: string) => void;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
