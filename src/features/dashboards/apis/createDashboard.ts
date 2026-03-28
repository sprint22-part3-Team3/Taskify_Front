import { DASHBOARD_COLOR_HEX } from '@/features/dashboards/constants/dashboardColorMap.constants';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { post } from '@/shared/apis/fetchInstance';

type CreateDashboardRequest = {
  title: string;
  color: DashboardColorName;
};

/**
 * 새로운 대시보드를 생성합니다.
 *
 * @example
 * ```ts
 * await createDashboard({ title: '새 프로젝트', color: 'blue' });
 * ```
 */
export async function createDashboard({
  title,
  color,
}: CreateDashboardRequest): Promise<void> {
  const response = await post<unknown>('dashboards', {
    title,
    color: DASHBOARD_COLOR_HEX[color],
  });

  if (!response) {
    throw new Error('대시보드를 생성하지 못했어요.');
  }
}
