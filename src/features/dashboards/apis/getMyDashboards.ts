import type {
  DashboardItem,
  DashboardListResponse,
} from '@/features/dashboards/types/dashboard.types';
import { COLORS } from '@/shared/constants/color.constants';
import { get } from '@/shared/apis/fetchInstance';

const dashboardColors = [...COLORS];

/**
 * 내 대시보드 목록을 가져옵니다.
 *
 * @example
 * ```ts
 * const { dashboards } = await getMyDashboards();
 * ```
 */
export async function getMyDashboards(
  page = 1,
  size = 5
): Promise<{ dashboards: DashboardItem[] }> {
  const response = await get<DashboardListResponse>(
    `dashboards?navigationMethod=pagination&page=${page}&size=${size}`
  );

  return {
    dashboards:
      response?.dashboards.map((dashboard, dashboardIndex) => {
        const matchedDashboardColor = dashboardColors.find(
          (dashboardColor) => dashboardColor === dashboard.color
        );

        return {
          id: dashboard.id,
          title: dashboard.title,
          color:
            matchedDashboardColor ??
            dashboardColors[dashboardIndex % dashboardColors.length],
        };
      }) ?? [],
  };
}
