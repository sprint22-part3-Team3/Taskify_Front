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

/** 대시보드 상세 조회 응답 */
export type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

/** 대시보드 수정 요청 body */
export type UpdateDashboardRequest = {
  title: string;
  color: string;
};
