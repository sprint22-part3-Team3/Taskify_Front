import type { DashboardListResponse } from '@/features/dashboards/apis/dashboards.types';
import type { DashboardItem } from '@/features/dashboards/types/myDashboard.types';
import { getDashboardColorName } from '@/features/dashboards/utils/dashboardColor';
import { COLORS } from '@/shared/constants/color.constants';
import { get } from '@/shared/apis/fetchInstance';

const dashboardColors = [...COLORS];

/**
 * 내 대시보드 목록을 가져옵니다.
 *
 * @example
 * const { dashboards } = await getMyDashboards();
 */
export async function getMyDashboards(
  page = 1,
  size = 5
): Promise<{
  dashboards: DashboardItem[];
}> {
  const response = await get<DashboardListResponse>(
    `dashboards?navigationMethod=pagination&page=${page}&size=${size}`
  );

  return {
    dashboards:
      response?.dashboards.map((dashboard, dashboardIndex) => {
        const matchedDashboardColor = getDashboardColorName(dashboard.color);

        return {
          id: dashboard.id,
          title: dashboard.title,
          color:
            matchedDashboardColor ??
            dashboardColors[dashboardIndex % dashboardColors.length],
          createdByMe: dashboard.createdByMe,
        };
      }) ?? [],
  };
}
