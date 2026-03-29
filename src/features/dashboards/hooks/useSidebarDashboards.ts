import { useCallback, useEffect, useState } from 'react';
import { getMyDashboards } from '@/features/dashboards/apis/getMyDashboards';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import type { SidebarDashboardItem } from '@/features/dashboards/components/layout/dashboard-sidebar/dashboardSidebar.types';
import {
  DASHBOARD_EVENTS,
  type DashboardListChangeDetail,
} from '@/features/dashboards/utils/dashboardEvents';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';
import { usePagination } from '@/shared/hooks/usePagination';

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
  const pageSize = 15;
  const [sidebarDashboards, setSidebarDashboards] = useState<
    SidebarDashboardItem[]
  >([]);
  const [isLoadingSidebarDashboards, setIsLoadingSidebarDashboards] =
    useState(true);
  const [sidebarDashboardsError, setSidebarDashboardsError] = useState<
    string | null
  >(null);
  const {
    currentPage,
    totalPages,
    syncTotalCount,
    handlePrevPage,
    handleNextPage,
  } = usePagination();

  const loadSidebarDashboards = useCallback(async () => {
    setIsLoadingSidebarDashboards(true);
    setSidebarDashboardsError(null);

    try {
      const { dashboards, totalCount } = await getMyDashboards(
        currentPage,
        pageSize
      );
      const nextTotalPages = syncTotalCount(totalCount, pageSize);

      if (currentPage > nextTotalPages) {
        return;
      }

      setSidebarDashboards(dashboards);
    } catch (error) {
      setSidebarDashboards([]);
      syncTotalCount(0, pageSize);
      setSidebarDashboardsError(
        getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.loadDashboards)
      );
    } finally {
      setIsLoadingSidebarDashboards(false);
    }
  }, [currentPage, pageSize, syncTotalCount]);

  useEffect(() => {
    void loadSidebarDashboards();
  }, [loadSidebarDashboards]);

  useEffect(() => {
    const handleDashboardListChange = (event: Event) => {
      const dashboardListChangeEvent =
        event as CustomEvent<DashboardListChangeDetail>;

      if (dashboardListChangeEvent.detail.source === 'sidebar') {
        return;
      }

      void loadSidebarDashboards();
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
  }, [loadSidebarDashboards]);

  return {
    sidebarDashboards,
    currentPage,
    totalPages,
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
    loadSidebarDashboards,
    handlePrevPage,
    handleNextPage,
  };
}
