import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { PageIndicator } from '@/shared/components/page-indicator';
import Title from '@/shared/components/title';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InviteModal from '@/features/invitations/components/invitations-section/invite-modal';
import { useModal } from '@/shared/hooks/useModal';
import { runAfterModalClose } from '@/shared/utils/modal';
import {
  getInvitations,
  INVITATIONS_SIZE,
} from '@/features/invitations/apis/invitations';
import type { Invitation } from '@/features/invitations/apis/invitations.types';

/**
 * 대시보드 초대 내역을 표시하는 섹션 컴포넌트입니다.
 *
 * API를 통해 초대 목록을 조회하고, 페이지네이션과 초대/취소 기능을 제공합니다.
 */
export default function InvitationsSection() {
  const { id: dashboardId } = useParams();

  // 초대 내역 데이터
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [refreshKey, setRefreshKey] = useState(0);

  // 초대 성공 후 리패칭
  const handleInviteSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // 취소할 초대 정보
  const [selectedInvitationId, setSelectedInvitationId] = useState<
    number | null
  >(null);
  const [selectedInvitationEmail, setSelectedInvitationEmail] = useState<
    string | null
  >(null);

  const {
    isOpen: isInviteModalOpen,
    openModal: handleOpenInviteModal,
    closeModal: handleCloseInviteModal,
  } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal,
  } = useModal();

  const totalPages = Math.max(1, Math.ceil(totalCount / INVITATIONS_SIZE));

  // 초대 내역 목록 불러오기
  useEffect(() => {
    if (!dashboardId) return;

    async function fetchInvitations(id: string) {
      const data = await getInvitations(id, currentPage);

      if (data) {
        setInvitations(data.invitations);
        setTotalCount(data.totalCount);
      }
    }

    fetchInvitations(dashboardId);
  }, [dashboardId, currentPage, refreshKey]);

  // 초대 취소 버튼 클릭
  const handleCancelInvitation = (invitation: Invitation) => {
    setSelectedInvitationId(invitation.id);
    setSelectedInvitationEmail(invitation.invitee.email);
    handleOpenDeleteModal();
  };

  // 취소 모달 닫기
  const handleCloseDeleteInvitationModal = () => {
    handleCloseDeleteModal();
    runAfterModalClose(() => {
      setSelectedInvitationId(null);
      setSelectedInvitationEmail(null);
    });
  };

  // 초대 취소 확인
  const handleConfirmCancelInvitation = () => {
    // TODO: 초대 취소 API 연동 (DELETE)
    console.log('취소할 초대 ID:', selectedInvitationId);
    handleCloseDeleteInvitationModal();
  };

  return (
    <section className="rounded-xl bg-white px-4 pt-5 md:px-6 lg:px-7">
      <div className="mb-6 flex items-center justify-between">
        <Title size="xl" as="h3" className="md:text-2xl">
          초대 내역
        </Title>
        <div className="flex items-center gap-3">
          <PageIndicator
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((prev) => prev - 1)}
            onNext={() => setCurrentPage((prev) => prev + 1)}
            isPrevDisabled={currentPage === 1}
            isNextDisabled={currentPage >= totalPages}
          />
          <Button
            type="button"
            size="sm"
            className="hidden md:inline-flex md:w-26.25"
            onClick={handleOpenInviteModal}
          >
            초대하기
          </Button>
        </div>
      </div>

      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-gray-400">이메일</span>
        <Button
          type="button"
          size="sm"
          className="typo-xs-medium w-21 md:hidden"
          onClick={handleOpenInviteModal}
        >
          초대하기
        </Button>
      </div>

      <ul>
        {invitations.map((invitation) => (
          <li
            key={invitation.id}
            className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0"
          >
            <span className="text-black-200 text-sm">
              {invitation.invitee.email}
            </span>
            <Button
              type="button"
              theme="secondary"
              size="sm"
              className="px-3.5 md:px-7"
              onClick={() => handleCancelInvitation(invitation)}
            >
              취소
            </Button>
          </li>
        ))}
      </ul>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={handleCloseInviteModal}
        dashboardId={dashboardId ?? ''}
        onInviteSuccess={handleInviteSuccess}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteInvitationModal}
        onConfirm={handleConfirmCancelInvitation}
        className="max-w-142"
        message={
          <>
            {selectedInvitationEmail ?? '초대 내역'}을{' '}
            <span className="text-error">취소</span> 하시겠습니까?
          </>
        }
        confirmText="취소"
      />
    </section>
  );
}
