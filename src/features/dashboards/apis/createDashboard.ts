import type { CreateDashboardRequest } from '@/features/dashboards/apis/dashboards.types';
import { DASHBOARD_COLOR_HEX } from '@/features/dashboards/constants/dashboardColorMap.constants';
import { post } from '@/shared/apis/fetchInstance';

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
  await post<unknown>('dashboards', {
    title,
    color: DASHBOARD_COLOR_HEX[color],
  });
}
