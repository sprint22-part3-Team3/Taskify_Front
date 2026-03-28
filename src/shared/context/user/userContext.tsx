import { createContext } from 'react';
import type { UserMe } from '@/shared/types/userMe.types';

export type UserContextType = {
  userProfile: UserMe | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserMe | null>>;
  userDataLoading: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);
