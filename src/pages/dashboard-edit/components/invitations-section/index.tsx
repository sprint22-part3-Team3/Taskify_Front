import { Button } from '@/shared/components/button';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import Title from '@/shared/components/title';
import { useState } from 'react';
import { MOCK_INVITATIONS } from '@/pages/dashboard-edit/mock';
import InviteModal from '@/pages/dashboard-edit/components/invitations-section/invite-modal';

export default function InvitationsSection() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleOpenInviteModal = () => setIsInviteModalOpen(true);
  const handleCloseInviteModal = () => setIsInviteModalOpen(false);

  return (
    <section className="rounded-xl bg-white px-4 pt-5 md:px-6 lg:px-7">
      <div className="mb-6 flex items-center justify-between">
        <Title size="xl" as="h3" className="md:text-2xl">
          초대 내역
        </Title>
        <div className="flex items-center gap-3">
          <PageIndicator currentPage={1} totalPages={1} />
          <NavigationButtons
            onPrev={() => {}}
            onNext={() => {}}
            isPrevDisabled={true} // TODO: 페이지네이션 로직 구현
            isNextDisabled={true}
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
        {MOCK_INVITATIONS.map((email) => (
          <li
            key={email}
            className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0"
          >
            <span className="text-black-200 text-sm">{email}</span>
            <Button
              type="button"
              theme="secondary"
              size="sm"
              className="px-3.5 md:px-7"
            >
              취소
            </Button>
          </li>
        ))}
      </ul>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={handleCloseInviteModal}
      />
    </section>
  );
}
