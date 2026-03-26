import type {
  DashboardItem,
  DashboardListResponse,
} from '@/features/dashboards/types/myDashboard.types';
import { get } from '@/shared/apis/fetchInstance';

const DASHBOARD_TEAM_ID = import.meta.env.VITE_TEAM_ID ?? '22-3';

/**
 * 내 대시보드 목록을 가져옵니다.
 *
 * @example
 * const { dashboards } = await getMyDashboards();
 */
export async function getMyDashboards(): Promise<{
  dashboards: DashboardItem[];
}> {
  const response = await get<DashboardListResponse>(
    `${DASHBOARD_TEAM_ID}/dashboards?navigationMethod=pagination&page=1&size=5`
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
