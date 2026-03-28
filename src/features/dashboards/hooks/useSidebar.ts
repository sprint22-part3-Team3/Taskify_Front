import { useNavigate, useParams } from 'react-router-dom';
import { useSidebarDashboards } from '@/features/dashboards/hooks/useSidebarDashboards';

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
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
  } = useSidebarDashboards();

  const selectedDashboardId = id ? Number(id) : undefined;

  const handleDashboardClick = (dashboardId: number) => {
    navigate(`/dashboard/${dashboardId}`);
  };

  return {
    sidebarDashboards,
    selectedDashboardId,
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
    handleDashboardClick,
  };
}
