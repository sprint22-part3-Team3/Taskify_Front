import { useEffect, useState } from 'react';
import { getMyDashboards } from '@/features/dashboards/apis/getMyDashboards';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import type { SidebarDashboardItem } from '@/features/dashboards/components/layout/dashboard-sidebar/dashboardSidebar.types';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';

/**
 * 사이드바에 표시할 대시보드 목록 조회 상태를 관리합니다.
 *
 * @example
 * ```tsx
 * const { sidebarDashboards, isLoadingSidebarDashboards, sidebarDashboardsError } =
 *   useSidebarDashboards();
 * ```
 */
export function useSidebarDashboards() {
  const [sidebarDashboards, setSidebarDashboards] = useState<
    SidebarDashboardItem[]
  >([]);
  const [isLoadingSidebarDashboards, setIsLoadingSidebarDashboards] =
    useState(true);
  const [sidebarDashboardsError, setSidebarDashboardsError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const loadSidebarDashboards = async () => {
      setIsLoadingSidebarDashboards(true);
      setSidebarDashboardsError(null);

      try {
        const { dashboards } = await getMyDashboards();

        setSidebarDashboards(dashboards);
      } catch (error) {
        setSidebarDashboards([]);
        setSidebarDashboardsError(
          getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.loadDashboards)
        );
      } finally {
        setIsLoadingSidebarDashboards(false);
      }
    };

    void loadSidebarDashboards();
  }, []);

  return {
    sidebarDashboards,
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
  };
}
