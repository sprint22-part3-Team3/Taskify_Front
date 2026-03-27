import { AddItemButton } from '@/shared/components/add-item-button';
import TodoCreateModal from '@/features/cards/components/todo-create-modal';
import { useModal } from '@/shared/hooks/useModal';

function CardAdd() {
  const {
    isOpen: isTodoCreateModalOpen,
    openModal: handleOpenTodoCreateModal,
    closeModal: handleCloseTodoCreateModal,
  } = useModal();

  return (
    <>
      <AddItemButton
        onClick={handleOpenTodoCreateModal}
        className="mb-2.5 md:mb-4"
      />
      <TodoCreateModal
        isOpen={isTodoCreateModalOpen}
        onClose={handleCloseTodoCreateModal}
      />
    </>
  );
}

export { CardAdd };
