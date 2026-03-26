import { useEffect, useState } from 'react';
import { getMyDashboards } from '@/features/dashboards/apis/getMyDashboards';
import { getInvitedDashboards } from '@/features/dashboards/apis/getInvitedDashboards';
import type {
  DashboardItem,
  InvitedDashboardItem,
} from '@/features/dashboards/types/myDashboard.types';

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
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);
  const [invitedDashboardItems, setInvitedDashboardItems] = useState<
    InvitedDashboardItem[]
  >([]);
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMyDashboards = async () => {
      setIsLoadingDashboards(true);
      setDashboardError(null);

      try {
        const { dashboards } = await getMyDashboards();

        if (!isMounted) {
          return;
        }

        setDashboardItems(dashboards);
      } catch {
        if (!isMounted) {
          return;
        }

        setDashboardError('');
        setDashboardItems([]);
      } finally {
        if (isMounted) {
          setIsLoadingDashboards(false);
        }
      }
    };

    void loadMyDashboards();

    return () => {
      isMounted = false;
    };
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

  return {
    dashboardItems,
    invitedDashboardItems,
    isLoadingDashboards,
    dashboardError,
  };
}
