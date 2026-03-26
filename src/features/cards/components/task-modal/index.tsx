import type { TaskModalProps } from '@/features/cards/components/task-modal/taskModal.types';
import { useState } from 'react';
import { Modal } from '@/shared/components/modal';
import { TaskMeta } from '@/features/columns/components/task-meta';
import { TaskComments } from '@/features/comments/components/task-comments';
import { TaskContent } from '@/features/cards/components/task-modal/task-content';
import { TaskAssignee } from '@/features/cards/components/task-modal/task-assignee';
import { TaskMenu } from '@/features/cards/components/task-modal/task-menu';

function TaskModal({ isOpen, closeModal, card }: TaskModalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    id,
    title,
    description,
    tags,
    dueDate,
    assignee,
    imageUrl,
    columnId,
  } = card;

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
      {isMenuOpen && <TaskMenu />}
      <Modal.Main className="mb-0">
        <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-3.25 lg:gap-10">
          <div className="flex grow flex-col gap-4">
            <TaskMeta columnId={columnId} tags={tags} />
            <TaskContent
              description={description}
              title={title}
              imageUrl={imageUrl}
            />
            <TaskComments id={id} />
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
