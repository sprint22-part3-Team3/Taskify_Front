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
import { delCard } from '@/features/cards/apis/cards';
import { MODAL_CLOSE_DELAY } from '@/shared/constants/modal.constants';
import { useCardRefetchContext } from '@/features/cards/hooks/useCardRefetchContext';

function TaskModal({
  isOpen,
  closeModal,
  card,
  onCardUpdated,
}: TaskModalProps) {
  const { refetch } = useCardRefetchContext();
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
  const [hasDeleteError, setHasDeleteError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
  const handleDeleteCancel = () => {
    handleCloseDeleteModal();
    setTimeout(() => {
      setHasDeleteError(false);
    }, MODAL_CLOSE_DELAY);
  };
  const handleDeleteCard = async () => {
    setIsDeleting(true);

    try {
      await delCard(id);
      handleCloseDeleteModal();
      handleCloseModal();
      setTimeout(() => {
        refetch();
      }, MODAL_CLOSE_DELAY);
    } catch {
      setHasDeleteError(true);
    } finally {
      setIsDeleting(false);
    }
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
              <TaskComments id={id} columnId={columnId} />
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
        onCardUpdated={onCardUpdated}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteCard}
        className="w-73.75 md:w-130"
        confirmButtonProps={{
          isLoading: isDeleting,
          disabled: isDeleting,
        }}
        message={
          <>
            할 일 카드를 <span className="text-error">삭제</span>하시겠습니까?
            {hasDeleteError && (
              <span className="typo-sm-medium text-error mt-1 block">
                <span className="inline-block">카드 삭제에 실패했습니다.</span>
                <span className="inline-block">
                  잠시 후 다시 시도해 주세요.
                </span>
              </span>
            )}
          </>
        }
      />
    </>
  );
}

export { TaskModal };
