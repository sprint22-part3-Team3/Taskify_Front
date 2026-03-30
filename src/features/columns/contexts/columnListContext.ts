import { createContext } from 'react';
import type { Column } from '@/features/columns/types/cloumn.types';

export const ColumnListContext = createContext<Column[]>([]);
