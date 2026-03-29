import { useCallback, useEffect, useState } from 'react';
import type { InvitedDashboardItem } from '@/features/invitations/types/invitedDashboardItem.types';
import { getInvitedDashboards } from '@/features/invitations/apis/getInvitedDashboards';
import { respondToInvitation } from '@/features/invitations/apis/respondToInvitation';
import { ApiError } from '@/shared/apis/apiError';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';
import { useModal } from '@/shared/hooks/useModal';
import { runAfterModalClose } from '@/shared/utils/modal';
import { useDebounce } from '@/shared/hooks/useDebounce';

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
  const [invitationResponseError, setInvitationResponseError] = useState('');
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

  const fetchInvitedDashboards = useCallback(async (keyword: string) => {
    setIsSearchingInvitedDashboards(true);
    setInvitedDashboardError('');
    setInvitationResponseError('');

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
  }, []);

  const handleSearchKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
    setInvitedDashboardError('');
    setInvitationResponseError('');
  };

  const handleInvitationResponse = async (
    invitationId: number,
    inviteAccepted: boolean
  ) => {
    setRespondingInvitationId(invitationId);
    setInvitationResponseError('');

    try {
      await respondToInvitation({
        invitationId,
        inviteAccepted,
      });
      setInvitedDashboardItems((previousInvitedDashboards) =>
        previousInvitedDashboards.filter(
          (invitedDashboardItem) => invitedDashboardItem.id !== invitationId
        )
      );
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.message) {
        setInvitationResponseError(error.message);
      } else {
        setInvitationResponseError(DASHBOARD_ERROR_MESSAGE.respondToInvitation);
      }
      return false;
    } finally {
      setRespondingInvitationId(null);
    }
  };

  const handleInvitationAccept = async (invitationId: number) => {
    await handleInvitationResponse(invitationId, true);
  };

  const handleConfirmRejectInvite = async () => {
    if (!selectedInvitedDashboard) {
      return;
    }

    const isInvitationResponseSuccessful = await handleInvitationResponse(
      selectedInvitedDashboard.id,
      false
    );

    if (isInvitationResponseSuccessful) {
      handleCloseDeleteModalWithReset();
    }
  };

  useEffect(() => {
    void fetchInvitedDashboards('');
  }, [fetchInvitedDashboards]);

  const debouncedKeyword = useDebounce(
    searchKeyword,
    searchKeyword === '' ? 0 : undefined
  );

  useEffect(() => {
    void fetchInvitedDashboards(debouncedKeyword);
  }, [debouncedKeyword, fetchInvitedDashboards]);

  return {
    invitedDashboardItems,
    searchKeyword,
    isSearchingInvitedDashboards,
    invitedDashboardError,
    invitationResponseError,
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
