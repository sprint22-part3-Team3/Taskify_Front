import { createContext } from 'react';

export type CardRefetchContextType = {
  refetch: () => void;
};

export const CardRefetchContext = createContext<CardRefetchContextType | null>(
  null
);
