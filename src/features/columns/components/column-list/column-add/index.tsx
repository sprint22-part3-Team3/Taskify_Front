import { useState } from 'react';
import CreateColumnModal from '@/features/columns/components/modal/create-column-modal';
import { AddItemButton } from '@/shared/components/add-item-button';

function ColumnAdd() {
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);

  const handleAddColumn = () => {
    setIsCreateColumnModalOpen(true);
  };

  const handleCloseCreateColumnModal = () => {
    setIsCreateColumnModalOpen(false);
  };

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
