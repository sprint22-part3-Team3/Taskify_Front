import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import Title from '@/shared/components/title';
import UserProfile from '@/shared/components/user-profile';
import { MOCK_MEMBERS } from '@/pages/dashboard-edit/mock';
import { useState } from 'react';

export default function MembersSection() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleConfirmDeleteMember = () => {
    // TODO: 구성원 삭제 API 연동
    handleCloseDeleteModal();
  };

  return (
    <>
      <section className="rounded-xl bg-white px-4 pt-5 pb-2 md:px-6 lg:px-7">
        <div className="mb-6 flex items-center justify-between">
          <Title size="xl" as="h3" className="md:text-2xl">
            구성원
          </Title>
          <div className="flex items-center gap-3">
            <PageIndicator currentPage={1} totalPages={1} />
            <NavigationButtons
              onPrev={() => {}}
              onNext={() => {}}
              isPrevDisabled={true} // TODO: 페이지네이션 로직 구현
              isNextDisabled={true}
            />
          </div>
        </div>

        <span className="mb-2 block text-sm text-gray-400">이름</span>

        <ul>
          {MOCK_MEMBERS.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0"
            >
              <UserProfile
                user={member}
                className="typo-lg-regular md:typo-lg-regular"
              />
              <Button
                type="button"
                theme="danger"
                size="sm"
                className="px-3.5 md:px-7"
                onClick={handleOpenDeleteModal}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteMember}
        className="max-w-142"
        message={
          <>
            구성원을 <span className="text-error">삭제</span> 하시겠습니까?
          </>
        }
      />
    </>
  );
}
