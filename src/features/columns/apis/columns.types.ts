import type { Column } from '@/features/columns/types/cloumn.types';

export type getColumnsParams = {
  dashboardId: number;
};

export type GetColumnsResponse = {
  result: string;
  data: Column[];
};

export type CreateColumnRequest = {
  title: string;
  dashboardId: number;
};

export type UpdateColumnRequest = {
  title: string;
};
