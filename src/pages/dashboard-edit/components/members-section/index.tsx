import { Button } from '@/shared/components/button';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import Title from '@/shared/components/title';
import UserProfile from '@/shared/components/user-profile';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMembers } from '@/features/members/apis/members';
import type { Member } from '@/features/members/apis/members.types';

/** 한 페이지에 보여줄 구성원 수 */
const MEMBERS_SIZE = 4;

export default function MembersSection() {
  // URL에서 dashboardId 가져오기 (라우터가 :id로 등록되어 있으므로 id로 받음)
  const { id: dashboardId } = useParams();
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 구성원 삭제 멤버 선택 state
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const totalPages = Math.ceil(totalCount / MEMBERS_SIZE);

  // 구성원 목록 API 호출
  useEffect(() => {
    if (!dashboardId) return;

    async function fetchMembers(id: string) {
      const data = await getMembers(id, currentPage);

      if (data) {
        setMembers(data.members);
        setTotalCount(data.totalCount);
      }
    }

    fetchMembers(dashboardId);
  }, [dashboardId, currentPage]);
  // dashboardId나 currentPage가 바뀔 때마다 다시 호출

  return (
    <section className="rounded-xl bg-white px-4 pt-5 pb-2 md:px-6 lg:px-7">
      <div className="mb-6 flex items-center justify-between">
        <Title size="xl" as="h3" className="md:text-2xl">
          구성원
        </Title>
        <div className="flex items-center gap-3">
          <PageIndicator currentPage={currentPage} totalPages={totalPages} />
          <NavigationButtons
            onPrev={() => setCurrentPage((prev) => prev - 1)}
            onNext={() => setCurrentPage((prev) => prev + 1)}
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
          </li>
        ))}
      </ul>
      <DeleteModal
        className="w-xl"
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMemberId(null);
        }}
        onConfirm={() => {
          // TODO: 구성원 삭제 API 호출 (나중에 구현)
          console.log('삭제할 멤버 ID:', selectedMemberId);
          setIsDeleteModalOpen(false);
          setSelectedMemberId(null);
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
