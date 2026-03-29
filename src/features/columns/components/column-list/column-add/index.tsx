import CreateColumnModal from '@/features/columns/components/modal/create-column-modal';
import { AddItemButton } from '@/shared/components/add-item-button';
import { useModal } from '@/shared/hooks/useModal';

function ColumnAdd() {
  const {
    isOpen: isCreateColumnModalOpen,
    openModal: handleAddColumn,
    closeModal: handleCloseCreateColumnModal,
  } = useModal();

  return (
    <>
      <AddItemButton onClick={handleAddColumn} className="h-16.5 md:h-17.5">
        새로운 컬럼 추가하기
      </AddItemButton>
      <CreateColumnModal
        isOpen={isCreateColumnModalOpen}
        onClose={handleCloseCreateColumnModal}
      />
    </>
  );
}

export { ColumnAdd };
