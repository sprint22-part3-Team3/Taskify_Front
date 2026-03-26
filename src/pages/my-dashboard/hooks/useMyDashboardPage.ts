import { useEffect, useState } from 'react';
import { createDashboard } from '@/features/dashboards/apis/createDashboard';
import { getMyDashboards } from '@/features/dashboards/apis/getMyDashboards';
import { getInvitedDashboards } from '@/features/dashboards/apis/getInvitedDashboards';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import type {
  DashboardItem,
  InvitedDashboardItem,
} from '@/features/dashboards/types/myDashboard.types';
import { useModal } from '@/shared/hooks/useModal';

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
    } catch {
      setDashboardError('내 대시보드 목록을 불러오지 못했어요.');
      setDashboardItems([]);
    } finally {
      setIsLoadingDashboards(false);
    }
  };

  useEffect(() => {
    void loadMyDashboards();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadInvitedDashboards = async () => {
      try {
        const { invitations } = await getInvitedDashboards();

        if (!isMounted) {
          return;
        }

        setInvitedDashboardItems(invitations);
      } catch {
        if (isMounted) {
          setInvitedDashboardItems([]);
        }
      }
    };

    void loadInvitedDashboards();

    return () => {
      isMounted = false;
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
