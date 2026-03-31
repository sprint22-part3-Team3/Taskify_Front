import type {
  CreateDashboardRequest,
  Dashboard,
  DashboardListResponse,
  UpdateDashboardRequest,
} from '@/features/dashboards/apis/dashboards.types';
import { DASHBOARD_COLOR_HEX } from '@/features/dashboards/constants/dashboardColorMap.constants';
import type { DashboardItem } from '@/features/dashboards/types/myDashboard.types';
import { getDashboardColorName } from '@/features/dashboards/utils/dashboardColor';
import { COLORS } from '@/shared/constants/color.constants';
import { del, get, post, put } from '@/shared/apis/fetchInstance';

const dashboardColors = [...COLORS];

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
  await post<unknown>('/dashboards', {
    title,
    color: DASHBOARD_COLOR_HEX[color],
  });
}

/**
 * 대시보드 상세 정보를 조회하는 함수
 */
export async function getDashboard(
  dashboardId: string
): Promise<Dashboard | null> {
  return get<Dashboard>(`/dashboards/${dashboardId}`);
}

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
    `/dashboards?navigationMethod=pagination&page=${page}&size=${size}`
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

/**
 * 대시보드 제목 또는 색상을 수정하는 함수
 */
export async function updateDashboard(
  dashboardId: string,
  body: UpdateDashboardRequest
): Promise<Dashboard | null> {
  return put<Dashboard>(`/dashboards/${dashboardId}`, body);
}

/**
 * 대시보드를 삭제하는 함수
 */
export async function deleteDashboard(dashboardId: string): Promise<void> {
  await del(`/dashboards/${dashboardId}`);
}
