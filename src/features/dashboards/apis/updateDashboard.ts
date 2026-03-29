import { put } from '@/shared/apis/fetchInstance';
import type { Dashboard, UpdateDashboardRequest } from './dashboards.types';

/**
 * 대시보드 제목 또는 색상을 수정하는 함수
 */
export async function updateDashboard(
  dashboardId: string,
  body: UpdateDashboardRequest
): Promise<Dashboard | null> {
  return put<Dashboard>(`dashboards/${dashboardId}`, body);
}
