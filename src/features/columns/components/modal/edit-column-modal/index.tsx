import { useState } from 'react';
import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { runAfterModalClose } from '@/shared/utils/modal';

import type { EditColumnModalProps } from '@/features/columns/components/modal/edit-column-modal/editColumnModal.types';
import { updateColumn, deleteColumn } from '@/features/columns/apis/columns';

import { COLUMN_NAME_RULES } from '@/shared/utils/validators/validators.constants';

import { useModal } from '@/shared/hooks/useModal';
import { useColumnListContext } from '@/features/columns/hooks/useColumnListContext';
import { useToast } from '@/shared/hooks/useToast';

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
  columnId,
  initialTitle,
}: EditColumnModalProps) {
  const { columns, refetch } = useColumnListContext();
  const { showToast } = useToast();
  const [draftTitle, setDraftTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    isOpen: isDeleteModalOpen,
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal,
  } = useModal();

  const columnTitle = draftTitle ?? initialTitle;

  const isSubmitDisabled =
    !columnTitle.trim() ||
    columnTitle.trim() === initialTitle.trim() ||
    columnTitle.length > COLUMN_NAME_RULES.MAX_LENGTH ||
    !!error ||
    isLoading;

  const handleClose = (afterClose?: (() => void) | React.SyntheticEvent) => {
    onClose();
    runAfterModalClose(() => {
      handleCloseDeleteModal();
      setDraftTitle(null);
      setError('');
      if (typeof afterClose === 'function') {
        afterClose();
      }
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.getAttribute('aria-label') === '모달 닫기') return;

    const trimmed = columnTitle.trim();

    if (trimmed === initialTitle.trim()) return;
    if (!trimmed) return;

    const isDuplicate = columns.some((column) => column.title === trimmed);
    if (isDuplicate) {
      setError('중복된 컬럼 이름입니다.');
    } else {
      setError('');
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteColumn(columnId);
      showToast({
        theme: 'success',
        title: '컬럼 삭제 완료',
        message: '컬럼이 삭제되었습니다.',
      });
      handleClose(refetch);
    } catch {
      setError('컬럼 삭제에 실패했습니다. 다시 시도해주세요.');
      showToast({
        theme: 'error',
        title: '컬럼 삭제 실패',
        message: '컬럼 삭제에 실패했습니다. 다시 시도해 주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled || error) return;

    const isDuplicate = columns.some(
      (column) => column.title === columnTitle.trim()
    );
    if (isDuplicate) {
      setError('중복된 컬럼 이름입니다.');
      return;
    }

    setIsLoading(true);

    try {
      await updateColumn(columnId, { title: columnTitle.trim() });
      showToast({
        theme: 'success',
        title: '컬럼 수정 완료',
        message: '컬럼 이름이 변경되었습니다.',
      });
      refetch();
      handleClose();
    } catch {
      setError('컬럼 수정에 실패했습니다. 다시 시도해주세요.');
      showToast({
        theme: 'error',
        title: '컬럼 수정 실패',
        message: '컬럼 수정에 실패했습니다. 다시 시도해 주세요.',
      });
    } finally {
      setIsLoading(false);
    }
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
                onChange={(event) => {
                  setDraftTitle(event.target.value);
                  setError('');
                }}
                onBlur={handleBlur}
                labelClassName="typo-lg-medium md:typo-2lg-medium"
                errorMessage={error}
                maxLength={COLUMN_NAME_RULES.MAX_LENGTH}
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
              <Button
                theme="primary"
                type="submit"
                disabled={isSubmitDisabled}
                isLoading={isLoading}
              >
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
          confirmButtonProps={{
            isLoading: isLoading,
            disabled: isLoading,
          }}
          message={
            <>
              컬럼을 <span className="text-error">삭제</span> 하시겠습니까?
            </>
          }
        />
      )}
    </Modal>
  );
}

export default EditColumnModal;
