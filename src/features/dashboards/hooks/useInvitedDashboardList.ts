import { useEffect, useState } from 'react';
import type { InvitedDashboardItem } from '@/features/invitations/apis/inviations.types';
import { getInvitedDashboards } from '@/features/invitations/apis/getInvitedDashboards';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';

/**
 * 초대받은 대시보드 섹션의 검색과 초대 응답 상태를 관리합니다.
 *
 * @example
 * ```tsx
 * const {
 *   invitedDashboardItems,
 *   searchKeyword,
 *   isSearchingInvitedDashboards,
 *   invitedDashboardError,
 *   handleSearchKeywordChange,
 * } = useInvitedDashboardList();
 * ```
 */
export function useInvitedDashboardList() {
  const [invitedDashboardItems, setInvitedDashboardItems] = useState<
    InvitedDashboardItem[]
  >([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchingInvitedDashboards, setIsSearchingInvitedDashboards] =
    useState(false);
  const [invitedDashboardError, setInvitedDashboardError] = useState('');

  const handleSearchKeywordChange = async (keyword: string) => {
    setSearchKeyword(keyword);
    setIsSearchingInvitedDashboards(true);
    setInvitedDashboardError('');

    try {
      const { invitations } = await getInvitedDashboards(keyword);
      setInvitedDashboardItems(invitations);
    } catch (error) {
      setInvitedDashboardError(
        getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.loadInvitedDashboards)
      );
      setInvitedDashboardItems([]);
    } finally {
      setIsSearchingInvitedDashboards(false);
    }
  };

  useEffect(() => {
    void handleSearchKeywordChange('');
  }, []);

  return {
    invitedDashboardItems,
    searchKeyword,
    isSearchingInvitedDashboards,
    invitedDashboardError,
    handleSearchKeywordChange,
  };
}
