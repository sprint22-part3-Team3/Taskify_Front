import { useEffect, useState } from 'react';
import { createDashboard } from '@/features/dashboards/apis/createDashboard';
import { getMyDashboards } from '@/features/dashboards/apis/getMyDashboards';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import type { DashboardItem } from '@/features/dashboards/types/myDashboard.types';
import {
  DASHBOARD_EVENTS,
  dispatchDashboardListChangeEvent,
} from '@/features/dashboards/utils/dashboardEvents';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';

/**
 * 내 대시보드 목록 조회와 생성 후 갱신 상태를 관리합니다.
 *
 * @example
 * ```tsx
 * const {
 *   dashboardItems,
 *   isLoadingDashboards,
 *   isCreatingDashboard,
 *   dashboardError,
 *   handleCreateDashboard,
 * } = useDashboardList();
 * ```
 */
export function useDashboardList() {
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(true);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  const loadDashboardItems = async () => {
    setIsLoadingDashboards(true);
    setDashboardError(null);

    try {
      const { dashboards } = await getMyDashboards();
      setDashboardItems(dashboards);
    } catch (error) {
      setDashboardError(
        getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.loadDashboards)
      );
      setDashboardItems([]);
    } finally {
      setIsLoadingDashboards(false);
    }
  };

  useEffect(() => {
    void loadDashboardItems();
  }, []);

  useEffect(() => {
    const handleDashboardListChange = (event: Event) => {
      const dashboardListChangeEvent = event as CustomEvent<{
        source: 'dashboard-list' | 'sidebar';
      }>;

      if (dashboardListChangeEvent.detail.source === 'dashboard-list') {
        return;
      }

      void loadDashboardItems();
    };

    window.addEventListener(
      DASHBOARD_EVENTS.LIST_CHANGE,
      handleDashboardListChange
    );

    return () => {
      window.removeEventListener(
        DASHBOARD_EVENTS.LIST_CHANGE,
        handleDashboardListChange
      );
    };
  }, []);

  const handleCreateDashboard = async (
    dashboardTitle: string,
    dashboardColor: DashboardColorName
  ) => {
    setIsCreatingDashboard(true);

    try {
      await createDashboard({
        title: dashboardTitle,
        color: dashboardColor,
      });
      await loadDashboardItems();
      dispatchDashboardListChangeEvent({ source: 'dashboard-list' });
    } finally {
      setIsCreatingDashboard(false);
    }
  };

  return {
    dashboardItems,
    isLoadingDashboards,
    isCreatingDashboard,
    dashboardError,
    handleCreateDashboard,
  };
}
