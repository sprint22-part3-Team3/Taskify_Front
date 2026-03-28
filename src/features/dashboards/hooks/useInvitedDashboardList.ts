import { useEffect, useState } from 'react';
import { useModal } from '@/shared/hooks/useModal';
import { runAfterModalClose } from '@/shared/utils/modal';
import type { InvitedDashboardItem } from '@/features/invitations/types/invitation.types';
import { getInvitedDashboards } from '@/features/invitations/apis/getInvitedDashboards';
import { respondToInvitation } from '@/features/invitations/apis/respondToInvitation';
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
 *   respondingInvitationId,
 *   selectedInvitedDashboard,
 *   isDeleteModalOpen,
 *   handleSearchKeywordChange,
 *   handleInvitationAccept,
 *   handleRejectInvite,
 *   handleCloseDeleteModalWithReset,
 *   handleConfirmRejectInvite,
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
        getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.loadInvitedDashboards)
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
