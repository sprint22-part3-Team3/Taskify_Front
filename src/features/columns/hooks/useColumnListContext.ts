import { useContext } from 'react';
import { ColumnListContext } from '@/features/columns/contexts/columnListContext';

export const useColumnListContext = () => useContext(ColumnListContext);
