import { useCallback, useEffect, useState } from 'react';
import {
  createDashboard,
  getMyDashboards,
} from '@/features/dashboards/apis/dashboards';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import type { DashboardItem } from '@/features/dashboards/types/myDashboard.types';
import {
  DASHBOARD_EVENTS,
  type DashboardListChangeDetail,
  dispatchDashboardListChangeEvent,
} from '@/features/dashboards/utils/dashboardEvents';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';
import { usePagination } from '@/shared/hooks/usePagination';
import { useToast } from '@/shared/hooks/useToast';

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
  const PAGE_SIZE = 5;
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(true);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    syncTotalCount,
    handlePrevPage,
    handleNextPage,
  } = usePagination();
  const { showToast } = useToast();

  const loadDashboardItems = useCallback(async () => {
    setIsLoadingDashboards(true);
    setDashboardError(null);

    try {
      const { dashboards, totalCount } = await getMyDashboards(
        currentPage,
        PAGE_SIZE
      );
      const nextTotalPages = syncTotalCount(totalCount, PAGE_SIZE);

      if (currentPage > nextTotalPages) {
        return;
      }

      setDashboardItems(dashboards);
    } catch (error) {
      setDashboardError(
        getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.loadDashboards)
      );
      setDashboardItems([]);
      syncTotalCount(0, PAGE_SIZE);
    } finally {
      setIsLoadingDashboards(false);
    }
  }, [currentPage, PAGE_SIZE, syncTotalCount]);

  useEffect(() => {
    void loadDashboardItems();
  }, [loadDashboardItems]);

  useEffect(() => {
    const handleDashboardListChange = (event: Event) => {
      const dashboardListChangeEvent =
        event as CustomEvent<DashboardListChangeDetail>;

      if (dashboardListChangeEvent.detail.source === 'dashboard-list') {
        return;
      }

      if (currentPage !== 1) {
        setCurrentPage(1);
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
  }, [currentPage, loadDashboardItems, setCurrentPage]);

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

      showToast({
        theme: 'success',
        title: '대시보드 생성 완료',
        message: '새로운 대시보드가 생성되었습니다.',
      });

      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        await loadDashboardItems();
      }

      dispatchDashboardListChangeEvent({ source: 'dashboard-list' });
    } finally {
      setIsCreatingDashboard(false);
    }
  };

  return {
    dashboardItems,
    currentPage,
    totalPages,
    isLoadingDashboards,
    isCreatingDashboard,
    dashboardError,
    handleCreateDashboard,
    handlePrevPage,
    handleNextPage,
  };
}
