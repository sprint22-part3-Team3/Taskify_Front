import { useState } from 'react';
import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { useModal } from '@/shared/hooks/useModal';
import { MODAL_CLOSE_DELAY } from '@/features/columns/components/modal/edit-column-modal/editColumnModal.constants';
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
  const {
    isOpen: isDeleteModalOpen,
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal,
  } = useModal();
  const columnTitle = draftTitle ?? initialTitle;
  const isSubmitDisabled = !columnTitle.trim();

  const handleClose = () => {
    setDraftTitle(null);
    onClose();
    window.setTimeout(() => {
      handleCloseDeleteModal();
    }, MODAL_CLOSE_DELAY);
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
    <Modal isOpen={isOpen} onClose={handleClose} className="w-73.75 md:w-130">
      {!isDeleteModalOpen && (
        <>
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
        </>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          renderInModal={false}
          onClose={handleClose}
          onConfirm={handleDelete}
          message={
            <>
              컬럼을 모두 <span className="text-error">삭제</span> 하시겠습니까?
            </>
          }
        />
      )}
    </Modal>
  );
}

export default EditColumnModal;
