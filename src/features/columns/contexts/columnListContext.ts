import { createContext } from 'react';
import type { Column } from '@/features/columns/types/cloumns.types';

export const ColumnListContext = createContext<Column[]>([]);
