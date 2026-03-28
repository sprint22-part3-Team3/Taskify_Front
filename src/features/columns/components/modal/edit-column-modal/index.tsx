import { useState } from 'react';
import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { useModal } from '@/shared/hooks/useModal';
import { runAfterModalClose } from '@/shared/utils/modal';
import type { EditColumnModalProps } from '@/features/columns/components/modal/edit-column-modal/editColumnModal.types';

import { deleteColumn } from '@/features/columns/apis/deleteColumn';
import { updateColumn } from '@/features/columns/apis/updateColumn';
import { checkColumnNameDuplicate } from '@/features/columns/apis/checkColumnName';
import { COLUMN_NAME_RULES } from '@/shared/utils/validators/validators.constants';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const dashboardId = Number(id);
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

  const handleClose = () => {
    onClose();
    runAfterModalClose(() => {
      handleCloseDeleteModal();
      setDraftTitle(null);
      setError('');
    });
  };

  const handleBlur = async () => {
    const trimmed = columnTitle.trim();

    // 초기값과 같으면 중복 체크 불필요
    if (trimmed === initialTitle.trim()) return;
    if (!trimmed) return;

    try {
      const isDuplicate = await checkColumnNameDuplicate(trimmed, dashboardId);
      if (isDuplicate) {
        setError('중복된 컬럼 이름입니다.');
      } else {
        setError('');
      }
    } catch {
      setError('중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await deleteColumn(columnId);
      handleClose();
    } catch {
      setError('컬럼 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled || error) return;

    const isDuplicate = await checkColumnNameDuplicate(
      columnTitle.trim(),
      dashboardId
    );
    if (isDuplicate) {
      setError('중복된 컬럼 이름입니다.');
      return;
    }

    setIsLoading(true);

    try {
      await updateColumn(columnId, { title: columnTitle.trim() });
      handleClose();
    } catch {
      setError('컬럼 수정에 실패했습니다. 다시 시도해주세요.');
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
