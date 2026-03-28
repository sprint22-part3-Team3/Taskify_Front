import type { TaskModalProps } from '@/features/cards/components/task-modal/taskModal.types';
import { useState } from 'react';
import { Modal } from '@/shared/components/modal';
import DeleteModal from '@/shared/components/modal/delete-modal';
import { TaskMeta } from '@/features/cards/components/task-modal/task-meta';
import { TaskComments } from '@/features/comments/components/task-comments';
import { TaskContent } from '@/features/cards/components/task-modal/task-content';
import { TaskAssignee } from '@/features/cards/components/task-modal/task-assignee';
import { TaskMenu } from '@/features/cards/components/task-modal/task-menu';
import TodoEditModal from '@/features/cards/components/todo-edit-modal';
import { useModal } from '@/shared/hooks/useModal';

function TaskModal({ isOpen, closeModal, card }: TaskModalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isOpen: isEditModalOpen,
    openModal: handleOpenEditModal,
    closeModal: handleCloseEditModal,
  } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal,
  } = useModal();
  const { id, title, description, tags, dueDate, assignee, imageUrl } = card;

  const handleClickMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseModal = () => {
    closeModal();
    setIsMenuOpen(false);
  };
  const handleClickEditMenu = () => {
    setIsMenuOpen(false);
    handleOpenEditModal();
  };
  const handleClickDeleteMenu = () => {
    setIsMenuOpen(false);
    handleOpenDeleteModal();
  };
  const handleDeleteCard = () => {
    // TODO: 카드 삭제 API 연동
    handleCloseDeleteModal();
    handleCloseModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
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
        {isMenuOpen && (
          <TaskMenu
            onEdit={handleClickEditMenu}
            onDelete={handleClickDeleteMenu}
          />
        )}
        <Modal.Main className="mb-0">
          <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-3.25 lg:gap-10">
            <div className="flex grow flex-col gap-4">
              <TaskMeta tags={tags} />
              <TaskContent
                description={description}
                title={title}
                imageUrl={imageUrl}
              />
              <TaskComments id={id} />
            </div>
            {(assignee || dueDate) && (
              <aside className="w-full shrink-0 md:w-[30%]">
                <TaskAssignee assignee={assignee} dueDate={dueDate} />
              </aside>
            )}
          </div>
        </Modal.Main>
      </Modal>
      <TodoEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        card={card}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteCard}
        className="w-73.75 md:w-130"
        message={
          <>
            <span className="text-error">할 일 카드</span>를 삭제하시겠습니까?
          </>
        }
      />
    </>
  );
}

export { TaskModal };
