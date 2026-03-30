import { del } from '@/shared/apis/fetchInstance';

/**
 * 대시보드를 삭제하는 함수
 */
export async function deleteDashboard(dashboardId: string): Promise<null> {
  return del<null>(`dashboards/${dashboardId}`);
}
