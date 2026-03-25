import { useState } from 'react';
import DeleteModal from '@/features/columns/components/modal/delete-modal';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import type { EditColumnModalProps } from '@/features/columns/components/modal/edit-column-modal/editColumnModal.types';

/**
 * 컬럼 이름을 수정하거나 삭제할 수 있는 모달입니다.
 *
 * @example
 * ```tsx
 * <EditColumnModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   initialTitle="Done"
 * />
 * ```
 */
function EditColumnModal({
  isOpen,
  onClose,
  initialTitle,
}: EditColumnModalProps) {
  const [draftTitle, setDraftTitle] = useState<string | null>(null);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const columnTitle = draftTitle ?? initialTitle;
  const isSubmitDisabled = !columnTitle.trim();

  const handleOpenDeleteModal = () => {
    setIsDeleteConfirmModalOpen(true);
  };

  const handleClose = () => {
    setIsDeleteConfirmModalOpen(false);
    setDraftTitle(null);
    onClose();
  };

  const handleDelete = () => {
    // TODO: 컬럼 삭제 API 연동
    handleClose();
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    // TODO: 컬럼 수정 API 연동
    handleClose();
  };

  return (
    <>
      <Modal isOpen={isOpen && !isDeleteConfirmModalOpen} onClose={handleClose}>
        <Modal.Header title="컬럼 수정" hasCloseIcon />

        <form onSubmit={handleSubmit}>
          <Modal.Main>
            <Input
              label="이름"
              value={columnTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              labelClassName="typo-lg-medium md:typo-2lg-medium"
            />
          </Modal.Main>

          <Modal.Footer>
            <Button
              theme="cancel"
              type="button"
              onClick={handleOpenDeleteModal}
            >
              삭제
            </Button>
            <Button theme="primary" type="submit" disabled={isSubmitDisabled}>
              변경
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <DeleteModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default EditColumnModal;
