import { useEffect, useState } from 'react';
import { useModal } from '@/shared/hooks/useModal';
import { runAfterModalClose } from '@/shared/utils/modal';
import { getInvitedDashboards } from '@/features/dashboards/apis/getInvitedDashboards';
import { respondToInvitation } from '@/features/dashboards/apis/respondToInvitation';
import type { InvitedDashboardItem } from '@/features/dashboards/types/myDashboard.types';
import { MY_DASHBOARD_ERROR_MESSAGE } from '@/pages/my-dashboard/constants/myDashboard.constants';
import { getApiErrorMessage } from '@/pages/my-dashboard/utils/getApiErrorMessage';

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
 *   respondingInvitationId,
 *   selectedInvitedDashboard,
 *   isDeleteModalOpen,
 *   handleSearchKeywordChange,
 *   handleInvitationAccept,
 *   handleRejectInvite,
 *   handleCloseDeleteModalWithReset,
 *   handleConfirmRejectInvite,
 * } = useInvitedDashboardSection(invitedDashboards);
 * ```
 */
export function useInvitedDashboardSection(
  initialInvitedDashboards: InvitedDashboardItem[]
) {
  const [invitedDashboardItems, setInvitedDashboardItems] = useState(
    initialInvitedDashboards
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchingInvitedDashboards, setIsSearchingInvitedDashboards] =
    useState(false);
  const [invitedDashboardError, setInvitedDashboardError] = useState('');
  const [respondingInvitationId, setRespondingInvitationId] = useState<
    number | null
  >(null);
  const [selectedInvitedDashboard, setSelectedInvitedDashboard] =
    useState<InvitedDashboardItem | null>(null);
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const handleRejectInvite = (invitedDashboardItem: InvitedDashboardItem) => {
    setSelectedInvitedDashboard(invitedDashboardItem);
    openDeleteModal();
  };

  const handleCloseDeleteModalWithReset = () => {
    closeDeleteModal();
    runAfterModalClose(() => {
      setSelectedInvitedDashboard(null);
    });
  };

  const handleSearchKeywordChange = async (keyword: string) => {
    setSearchKeyword(keyword);
    setIsSearchingInvitedDashboards(true);
    setInvitedDashboardError('');

    try {
      const { invitations } = await getInvitedDashboards(keyword);
      setInvitedDashboardItems(invitations);
    } catch (error) {
      setInvitedDashboardError(
        getApiErrorMessage(
          error,
          MY_DASHBOARD_ERROR_MESSAGE.loadInvitedDashboards
        )
      );
      setInvitedDashboardItems([]);
    } finally {
      setIsSearchingInvitedDashboards(false);
    }
  };

  const handleInvitationAccept = async (invitationId: number) => {
    setRespondingInvitationId(invitationId);

    try {
      await respondToInvitation({
        invitationId,
        inviteAccepted: true,
      });
      setInvitedDashboardItems((previousInvitedDashboards) =>
        previousInvitedDashboards.filter(
          (invitedDashboardItem) => invitedDashboardItem.id !== invitationId
        )
      );
    } finally {
      setRespondingInvitationId(null);
    }
  };

  const handleConfirmRejectInvite = async () => {
    if (!selectedInvitedDashboard) {
      return;
    }

    setRespondingInvitationId(selectedInvitedDashboard.id);

    try {
      await respondToInvitation({
        invitationId: selectedInvitedDashboard.id,
        inviteAccepted: false,
      });
      setInvitedDashboardItems((previousInvitedDashboards) =>
        previousInvitedDashboards.filter(
          (invitedDashboardItem) =>
            invitedDashboardItem.id !== selectedInvitedDashboard.id
        )
      );
      handleCloseDeleteModalWithReset();
    } finally {
      setRespondingInvitationId(null);
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
    respondingInvitationId,
    selectedInvitedDashboard,
    isDeleteModalOpen,
    handleSearchKeywordChange,
    handleInvitationAccept,
    handleRejectInvite,
    handleCloseDeleteModalWithReset,
    handleConfirmRejectInvite,
  };
}
