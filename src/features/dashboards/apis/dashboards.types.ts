import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

export type CreateDashboardRequest = {
  title: string;
  color: DashboardColorName;
};

export type DashboardListResponse = {
  cursorId: number | null;
  totalCount: number;
  dashboards: {
    id: number;
    title: string;
    color: string;
    createdByMe: boolean;
  }[];
};
