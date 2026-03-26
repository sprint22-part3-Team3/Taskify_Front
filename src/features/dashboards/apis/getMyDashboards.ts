import type {
  DashboardItem,
  DashboardListResponse,
} from '@/features/dashboards/types/myDashboard.types';
import { get } from '@/shared/apis/fetchInstance';

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
      response?.dashboards.map((dashboard) => ({
        id: dashboard.id,
        title: dashboard.title,
        color: dashboard.color,
        createdByMe: dashboard.createdByMe,
      })) ?? [],
  };
}
