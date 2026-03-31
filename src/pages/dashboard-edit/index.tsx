import BackButton from '@/shared/components/back-button';
import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { useModal } from '@/shared/hooks/useModal';
import NameSection from '@/features/dashboards/components/name-section';
import MembersSection from '@/features/members/components/members-section';
import InvitationsSection from '@/features/invitations/components/invitations-section';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteDashboard } from '@/features/dashboards/apis/dashboards';
import { dispatchDashboardListChangeEvent } from '@/features/dashboards/utils/dashboardEvents';

export default function DashboardEditPage() {
  const { id: dashboardId } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    isOpen: isDeleteModalOpen,
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal,
  } = useModal();

  const handleDeleteDashboard = async () => {
    if (!dashboardId) return;

    setIsDeleting(true);

    try {
      await deleteDashboard(dashboardId);
      dispatchDashboardListChangeEvent({ source: 'dashboard-list' });
      navigate('/mydashboard');
    } catch {
      alert('대시보드 삭제에 실패했습니다.');
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex max-w-155 flex-col gap-4 p-5">
        <BackButton />
        <NameSection />
        <MembersSection />
        <InvitationsSection />
        <Button
          type="button"
          theme="outlined"
          size="md"
          className="w-full md:w-80"
          onClick={handleOpenDeleteModal}
        >
          대시보드 삭제하기
        </Button>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteDashboard}
        confirmButtonProps={{
          isLoading: isDeleting,
          disabled: isDeleting,
        }}
        className="max-w-142"
        message={
          <>
            대시보드를 <span className="text-error">삭제</span> 하시겠습니까?
          </>
        }
      />
    </>
  );
}
