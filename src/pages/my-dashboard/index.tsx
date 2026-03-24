import { useState } from 'react';
import { Button } from '@/shared/components/button';
import TodoCreateModal from '@/features/cards/components/todo-create-modal';
import TodoEditModal from '@/features/cards/components/todo-edit-modal';

function MyDashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-240 flex-col gap-4 px-4 py-10">
      <h1 className="typo-2xl-bold text-black-200">내 대시보드 모달 확인</h1>
      <div className="flex flex-wrap gap-3">
        <Button theme="primary" onClick={() => setIsCreateModalOpen(true)}>
          할 일 생성 모달 열기
        </Button>
        <Button theme="outlined" onClick={() => setIsEditModalOpen(true)}>
          할 일 수정 모달 열기
        </Button>
      </div>

      <TodoCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <TodoEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </main>
  );
}

export default MyDashboardPage;
