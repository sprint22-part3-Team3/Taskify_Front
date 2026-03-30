import { get } from '@/shared/apis/fetchInstance';
import type { Dashboard } from './dashboards.types';

/**
 * 대시보드 상세 정보를 조회하는 함수
 */
export async function getDashboard(
  dashboardId: string
): Promise<Dashboard | null> {
  return get<Dashboard>(`dashboards/${dashboardId}`);
}
