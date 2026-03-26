import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { DASHBOARD_COLOR_HEX } from '@/features/dashboards/constants/dashboardColorMap.constants';
import { post } from '@/shared/apis/fetchInstance';

type CreateDashboardRequest = {
  title: string;
  color: DashboardColorName;
};

const DASHBOARD_TEAM_ID = import.meta.env.VITE_TEAM_ID ?? '22-3';

/**
 * 새로운 대시보드를 생성합니다.
 *
 * @example
 * ```tsx
 * await createDashboard({ title: '새 프로젝트', color: 'blue' });
 * ```
 */
export async function createDashboard({
  title,
  color,
}: CreateDashboardRequest) {
  await post<unknown>(`${DASHBOARD_TEAM_ID}/dashboards`, {
    title,
    color: DASHBOARD_COLOR_HEX[color],
  });
}
