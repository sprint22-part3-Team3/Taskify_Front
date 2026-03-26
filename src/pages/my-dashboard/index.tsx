import { useState } from 'react';
import { Button } from '@/shared/components/button';
import TodoCreateModal from '@/features/cards/components/todo-create-modal';
import TodoEditModal from '@/features/cards/components/todo-edit-modal';

function MyDashboardPage() {
  const [isTodoCreateModalOpen, setIsTodoCreateModalOpen] = useState(false);
  const [isTodoEditModalOpen, setIsTodoEditModalOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-dvh items-start bg-gray-50 p-6 md:p-10">
        <div className="flex w-full max-w-120 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
          <h1 className="typo-xl-bold text-black-200 md:typo-2xl-bold">
            My Dashboard Page
          </h1>
          <p className="typo-md-regular md:typo-lg-regular text-gray-400">
            카드 모달을 미리 확인할 수 있는 임시 연결 화면입니다.
          </p>
          <div className="flex flex-col gap-3 md:flex-row">
            <Button
              theme="primary"
              onClick={() => setIsTodoCreateModalOpen(true)}
            >
              할 일 생성 모달 보기
            </Button>
            <Button
              theme="outlined"
              onClick={() => setIsTodoEditModalOpen(true)}
            >
              할 일 수정 모달 보기
            </Button>
          </div>
        </div>
      </div>

      <TodoCreateModal
        isOpen={isTodoCreateModalOpen}
        onClose={() => setIsTodoCreateModalOpen(false)}
      />
      <TodoEditModal
        isOpen={isTodoEditModalOpen}
        onClose={() => setIsTodoEditModalOpen(false)}
      />
    </>
  );
}

export default MyDashboardPage;
