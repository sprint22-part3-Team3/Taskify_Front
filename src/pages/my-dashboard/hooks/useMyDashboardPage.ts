import { useEffect, useState } from 'react';
import { createDashboard } from '@/features/dashboards/apis/createDashboard';
import { getMyDashboards } from '@/features/dashboards/apis/getMyDashboards';
import { getInvitedDashboards } from '@/features/dashboards/apis/getInvitedDashboards';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import type {
  DashboardItem,
  InvitedDashboardItem,
} from '@/features/dashboards/types/myDashboard.types';
import { MY_DASHBOARD_ERROR_MESSAGE } from '@/pages/my-dashboard/constants/myDashboard.constants';
import { useModal } from '@/shared/hooks/useModal';
import { getApiErrorMessage } from '@/pages/my-dashboard/utils/getApiErrorMessage';

/**
 * 내 대시보드 페이지에 필요한 목록 조회 상태를 관리합니다.
 *
 * @example
 * ```tsx
 * const {
 *   dashboardItems,
 *   invitedDashboardItems,
 *   isLoadingDashboards,
 *   dashboardError,
 * } = useMyDashboardPage();
 * ```
 */
export function useMyDashboardPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);
  const [invitedDashboardItems, setInvitedDashboardItems] = useState<
    InvitedDashboardItem[]
  >([]);
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(true);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  const loadMyDashboards = async () => {
    setIsLoadingDashboards(true);
    setDashboardError(null);

    try {
      const { dashboards } = await getMyDashboards();

      setDashboardItems(dashboards);
    } catch (error) {
      setDashboardError(
        getApiErrorMessage(error, MY_DASHBOARD_ERROR_MESSAGE.loadDashboards)
      );
      setDashboardItems([]);
    } finally {
      setIsLoadingDashboards(false);
    }
  };

  useEffect(() => {
    void loadMyDashboards();
  }, []);

  useEffect(() => {
    const invitedDashboardsController = new AbortController();

    const loadInvitedDashboards = async () => {
      try {
        const { invitations } = await getInvitedDashboards('', {
          signal: invitedDashboardsController.signal,
        });

        setInvitedDashboardItems(invitations);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setInvitedDashboardItems([]);
      }
    };

    void loadInvitedDashboards();

    return () => {
      invitedDashboardsController.abort();
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
      await loadMyDashboards();
    } finally {
      setIsCreatingDashboard(false);
    }
  };

  return {
    dashboardItems,
    invitedDashboardItems,
    isLoadingDashboards,
    isCreateDashboardModalOpen: isOpen,
    isCreatingDashboard,
    dashboardError,
    openCreateDashboardModal: openModal,
    closeCreateDashboardModal: closeModal,
    handleCreateDashboard,
  };
}
