import type { TaskModalProps } from '@/features/cards/components/task-modal/taskModal.types';
import { Modal } from '@/shared/components/modal';
import { TaskMeta } from '@/features/columns/components/task-meta';
import { TaskComments } from '@/features/comments/components/task-comments';
import { TaskContent } from '@/features/cards/components/task-modal/task-content';
import { TaskAssignee } from '@/features/cards/components/task-modal/task-assignee';
import { useState } from 'react';
import { cn } from '@/shared/utils/cn';

const DROP_MENU_CLASS = cn(
  'typo-md-regular text-black-200 hover:bg-primary-500/8 hover:text-primary-500 flex h-8 w-full cursor-pointer items-center justify-center rounded-sm'
);

function TaskModal({ isOpen, closeModal, card }: TaskModalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { title, description, tags, dueDate, assignee, imageUrl, columnId } =
    card;

  const handleClickMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-81.75 px-4 py-4 md:max-w-169.5 md:px-8 md:py-6 lg:max-w-182.5 lg:py-7.5 lg:pr-4 lg:pl-4.5"
    >
      <div className="relative">
        <Modal.Header
          hasCloseIcon
          hasMenuIcon
          title={title}
          onClickMenu={handleClickMenu}
          className="lg:pr-5.5"
        />
      </div>
      {/* TODO : 드롭다운 메뉴 별도 컴포넌트로 분리 */}
      {isMenuOpen && (
        <div className="shadow-dropdown absolute top-10 right-12 z-10 w-23.25 overflow-hidden rounded-md border border-gray-200 bg-white px-1.5 py-1.75 md:top-14.5 md:right-20 lg:top-16.25 lg:right-21.25">
          <button type="button" className={DROP_MENU_CLASS}>
            수정하기
          </button>
          <button type="button" className={DROP_MENU_CLASS}>
            삭제하기
          </button>
        </div>
      )}
      <Modal.Main className="mb-0">
        <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-3.25 lg:gap-10">
          <div className="flex grow flex-col gap-4">
            <TaskMeta columnId={columnId} tags={tags} />
            <TaskContent
              description={description}
              title={title}
              imageUrl={imageUrl}
            />
            <TaskComments card={card} />
          </div>
          <aside className="w-full shrink-0 md:w-[30%]">
            <TaskAssignee assignee={assignee} dueDate={dueDate} />
          </aside>
        </div>
      </Modal.Main>
    </Modal>
  );
}

export { TaskModal };
