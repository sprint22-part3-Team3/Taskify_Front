import { useNavigate, useParams } from 'react-router-dom';
import { createDashboard } from '@/features/dashboards/apis/dashboards';
import { useSidebarDashboards } from '@/features/dashboards/hooks/useSidebarDashboards';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { dispatchDashboardListChangeEvent } from '@/features/dashboards/utils/dashboardEvents';
import { useState } from 'react';

/**
 * 사이드바 렌더링에 필요한 상태와 이동 로직을 조합합니다.
 *
 * @example
 * ```tsx
 * const {
 *   sidebarDashboards,
 *   selectedDashboardId,
 *   isLoadingSidebarDashboards,
 *   sidebarDashboardsError,
 *   handleDashboardClick,
 * } = useSidebar();
 * ```
 */
export function useSidebar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    sidebarDashboards,
    currentPage,
    totalPages,
    setCurrentPage,
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
    loadSidebarDashboards,
    handlePrevPage,
    handleNextPage,
  } = useSidebarDashboards();
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);

  const selectedDashboardId = id ? Number(id) : undefined;

  const handleDashboardClick = (dashboardId: number) => {
    navigate(`/dashboard/${dashboardId}`);
  };

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

      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        await loadSidebarDashboards();
      }

      dispatchDashboardListChangeEvent({ source: 'sidebar' });
    } finally {
      setIsCreatingDashboard(false);
    }
  };

  return {
    sidebarDashboards,
    currentPage,
    totalPages,
    selectedDashboardId,
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
    isCreatingDashboard,
    handleDashboardClick,
    handleCreateDashboard,
    handlePrevPage,
    handleNextPage,
  };
}
