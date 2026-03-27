import type { Column } from '@/features/columns/types/column.types';

export type getColumnsParams = {
  dashboardId: number;
  token: string | null;
};

export type GetColumnsResponse = {
  result: string;
  data: Column[];
};
