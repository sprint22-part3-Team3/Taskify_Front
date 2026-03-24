import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

export type DashboardItem = {
  id: number;
  title: string;
  color: DashboardColorName;
};

export type InvitedDashboardItem = {
  id: number;
  name: string;
  inviter: string;
};
