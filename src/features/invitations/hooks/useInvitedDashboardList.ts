import { useCallback, useEffect, useRef, useState } from 'react';
import type { InvitedDashboardItem } from '@/features/invitations/types/invitedDashboardItem.types';
import {
  getInvitedDashboards,
  respondToInvitation,
} from '@/features/invitations/apis/invitations';
import { ApiError } from '@/shared/apis/apiError';
import { DASHBOARD_ERROR_MESSAGE } from '@/features/dashboards/constants/dashboardErrorMessage.constants';
import { getApiErrorMessage } from '@/features/dashboards/utils/getApiErrorMessage';
import { useModal } from '@/shared/hooks/useModal';
import { runAfterModalClose } from '@/shared/utils/modal';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { dispatchDashboardListChangeEvent } from '@/features/dashboards/utils/dashboardEvents';
import { useToast } from '@/shared/hooks/useToast';

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
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState<string | null>(null);
  const loading = useRef(false);
  const searchAbortController = useRef<AbortController | null>(null);

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

  const debouncedKeyword = useDebounce(
    searchKeyword,
    searchKeyword === '' ? 0 : undefined
  );

  const { showToast } = useToast();

  const fetchInvitedDashboards = useCallback(async (keyword: string) => {
    searchAbortController.current?.abort();

    const abortController = new AbortController();
    searchAbortController.current = abortController;

    setIsSearchingInvitedDashboards(true);
    setInvitedDashboardError('');
    setAddErrorMessage(null);
    setCursorId(null);

    try {
      const { invitations, cursorId: nextCursorId } =
        await getInvitedDashboards(keyword, {
          signal: abortController.signal,
        });

      if (abortController.signal.aborted) {
        return;
      }

      setInvitedDashboardItems(invitations);
      setCursorId(nextCursorId);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setInvitedDashboardError(
        getApiErrorMessage(error, DASHBOARD_ERROR_MESSAGE.loadInvitedDashboards)
      );
      setInvitedDashboardItems([]);
    } finally {
      if (searchAbortController.current === abortController) {
        setIsSearchingInvitedDashboards(false);
      }
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (cursorId === null || loading.current) return;

    const abortController =
      searchAbortController.current ?? new AbortController();

    if (!searchAbortController.current) {
      searchAbortController.current = abortController;
    }

    loading.current = true;
    setIsAddLoading(true);
    setAddErrorMessage(null);

    try {
      const { invitations, cursorId: nextCursor } = await getInvitedDashboards(
        debouncedKeyword,
        {
          signal: abortController.signal,
        },
        cursorId
      );

      if (abortController.signal.aborted) {
        return;
      }

      setInvitedDashboardItems((prev) => [...prev, ...invitations]);
      setCursorId(nextCursor);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      let message = '알 수 없는 에러가 발생했습니다.';
      if (error instanceof ApiError && error.status === 404) {
        message = '추가 데이터를 찾을 수 없습니다.';
      } else if (error instanceof Error) {
        message = error.message;
      }
      setAddErrorMessage(message);
      showToast({
        theme: 'error',
        title: '초대 목록 로드 실패',
        message,
      });
    } finally {
      loading.current = false;
      setIsAddLoading(false);
    }
  }, [cursorId, debouncedKeyword, showToast]);

  const handleSearchKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
    setInvitedDashboardError('');
  };

  const handleInvitationResponse = async (
    invitationId: number,
    inviteAccepted: boolean
  ) => {
    setRespondingInvitationId(invitationId);

    try {
      await respondToInvitation({
        invitationId,
        inviteAccepted,
      });

      if (inviteAccepted) {
        await fetchInvitedDashboards(debouncedKeyword);
        dispatchDashboardListChangeEvent({ source: 'invitation' });
        showToast({
          theme: 'success',
          title: '초대 수락 완료',
          message: '대시보드 초대를 수락했습니다.',
        });
      } else {
        setInvitedDashboardItems((previousInvitedDashboards) =>
          previousInvitedDashboards.filter(
            (invitedDashboardItem) => invitedDashboardItem.id !== invitationId
          )
        );
        showToast({
          theme: 'success',
          title: '초대 거절 완료',
          message: '해당 초대를 거절했습니다.',
        });
      }

      return true;
    } catch (error) {
      if (error instanceof ApiError && error.message) {
        showToast({
          theme: 'error',
          title: '초대 응답 실패',
          message: error.message,
        });
      } else {
        showToast({
          theme: 'error',
          title: '초대 응답 실패',
          message: DASHBOARD_ERROR_MESSAGE.respondToInvitation,
        });
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
    void fetchInvitedDashboards(debouncedKeyword);
  }, [debouncedKeyword, fetchInvitedDashboards]);

  useEffect(() => {
    return () => {
      searchAbortController.current?.abort();
    };
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
    cursorId,
    isAddLoading,
    loadMore,
    addErrorMessage,
  };
}
