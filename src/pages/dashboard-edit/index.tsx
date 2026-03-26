import BackButton from '@/shared/components/back-button';
import { Button } from '@/shared/components/button';
import NameSection from '@/pages/dashboard-edit/components/name-section';
import MembersSection from '@/pages/dashboard-edit/components/members-section';
import InvitationsSection from '@/pages/dashboard-edit/components/invitations-section';

export default function DashboardEditPage() {
  return (
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
      >
        대시보드 삭제하기
      </Button>
    </div>
  );
}
