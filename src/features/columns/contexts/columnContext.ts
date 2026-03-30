import type { Column } from '@/features/columns/types/column.types';
import { createContext } from 'react';

export const ColumnContext = createContext<Column | null>(null);
