import { Button } from '@/shared/components/button';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import Title from '@/shared/components/title';
import UserProfile from '@/shared/components/user-profile';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import type { Member } from '@/features/members/apis/members.types';
import {
  deleteMember,
  getMembers,
  MEMBERS_SIZE,
} from '@/features/members/apis/members';
import { usePagination } from '@/shared/hooks/usePagination';
import { dispatchMemberListChangeEvent } from '@/features/dashboards/utils/dashboardEvents';
import { ToastContext } from '@/shared/context/toast/toastContext';

export default function MembersSection() {
  // URL에서 dashboardId 가져오기
  const { id: dashboardId } = useParams();
  const [members, setMembers] = useState<Member[]>([]);
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    syncTotalCount,
    handlePrevPage,
    handleNextPage,
  } = usePagination();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 구성원 삭제 멤버 선택 state
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMemberId(null);
  };
  const { showToast } = useContext(ToastContext)!;
  const handleConfirmDelete = async () => {
    if (!selectedMemberId || !dashboardId) return;

    setIsDeleting(true);

    try {
      await deleteMember(selectedMemberId);

      const isLastItemOnPage = members.length === 1;
      const shouldGoBack = isLastItemOnPage && currentPage > 1;

      if (shouldGoBack) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else {
        const data = await getMembers(dashboardId, currentPage);
        if (data) {
          setMembers(data.members);
          syncTotalCount(data.totalCount, MEMBERS_SIZE);
        }
      }

      dispatchMemberListChangeEvent();
      handleCloseDeleteModal();

      showToast({
        theme: 'success',
        title: '구성원 삭제 완료',
        message: '구성원이 삭제되었습니다.',
      });
    } catch {
      showToast({
        theme: 'error',
        title: '구성원 삭제 실패',
        message: '구성원 삭제에 실패했습니다.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // 구성원 목록 API 호출
  useEffect(() => {
    const currentDashboardId = dashboardId;
    if (!currentDashboardId) return;

    async function fetchMembers(targetDashboardId: string) {
      const data = await getMembers(targetDashboardId, currentPage);

      if (data) {
        setMembers(data.members);
        syncTotalCount(data.totalCount, MEMBERS_SIZE);
      }
    }

    fetchMembers(currentDashboardId);
  }, [dashboardId, currentPage, syncTotalCount]);

  return (
    <section className="rounded-xl bg-white px-4 pt-5 pb-2 md:px-6 lg:px-7">
      <div className="mb-6 flex items-center justify-between">
        <Title size="xl" as="h3" className="md:text-2xl">
          구성원
        </Title>
        <div className="flex items-center gap-3">
          <PageIndicator currentPage={currentPage} totalPages={totalPages} />
          <NavigationButtons
            onPrev={handlePrevPage}
            onNext={handleNextPage}
            isPrevDisabled={currentPage === 1}
            isNextDisabled={currentPage >= totalPages}
          />
        </div>
      </div>

      <span className="mb-2 block text-sm text-gray-400">이름</span>

      <ul>
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0"
          >
            <UserProfile
              user={member}
              className="typo-lg-regular md:typo-lg-regular"
            />
            {!member.isOwner && (
              <Button
                type="button"
                theme="danger"
                size="sm"
                className="px-3.5 md:px-7"
                onClick={() => {
                  setSelectedMemberId(member.id);
                  setIsDeleteModalOpen(true);
                }}
              >
                삭제
              </Button>
            )}
          </li>
        ))}
      </ul>
      <DeleteModal
        className="w-xl"
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        confirmButtonProps={{
          isLoading: isDeleting,
          disabled: isDeleting,
        }}
        message={
          <>
            구성원을 <span className="text-error">삭제</span>하시겠습니까?
          </>
        }
      />
    </section>
  );
}
