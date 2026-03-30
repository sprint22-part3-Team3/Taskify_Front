import { createContext } from 'react';
import type { Column } from '@/features/columns/types/column.types';

export const ColumnListContext = createContext<Column[]>([]);
