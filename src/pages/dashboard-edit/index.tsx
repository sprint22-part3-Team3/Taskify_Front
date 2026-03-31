import BackButton from '@/shared/components/back-button';
import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { useModal } from '@/shared/hooks/useModal';
import NameSection from '@/features/dashboards/components/name-section';
import MembersSection from '@/features/members/components/members-section';
import InvitationsSection from '@/features/invitations/components/invitations-section';

export default function DashboardEditPage() {
  const {
    isOpen: isDeleteModalOpen,
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal,
  } = useModal();

  const handleDeleteDashboard = () => {
    // TODO: 대시보드 삭제 API 연동
    handleCloseDeleteModal();
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
