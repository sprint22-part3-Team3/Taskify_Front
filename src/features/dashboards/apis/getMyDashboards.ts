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
  totalCount: number;
  dashboards: DashboardItem[];
}> {
  const response = await get<DashboardListResponse>(
    `dashboards?navigationMethod=pagination&page=${page}&size=${size}`
  );

  return {
    totalCount: response?.totalCount ?? 0,
    dashboards: (response?.dashboards ?? []).map((dashboard) => {
      const matchedDashboardColor = getDashboardColorName(dashboard.color);

      return {
        id: dashboard.id,
        title: dashboard.title,
        colorHex: dashboard.color,
        color: matchedDashboardColor ?? dashboardColors[0],
        createdByMe: dashboard.createdByMe,
      };
    }),
  };
}
