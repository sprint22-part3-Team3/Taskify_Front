import type { Column } from '@/features/columns/types/cloumn.types';
import { createContext } from 'react';

export const ColumnContext = createContext<Column | null>(null);
