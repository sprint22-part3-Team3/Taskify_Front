import { useState } from 'react';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import type { CreateColumnModalProps } from '@/features/columns/components/modal/create-column-modal/createColumnModal.types';

import { createColumn } from '@/features/columns/apis/createColum';
import { useColumnNameValidation } from '@/shared/hooks/useColumnNameValidation';
import { checkColumnNameDuplicate } from '@/features/columns/apis/checkColumnName';
import { useParams } from 'react-router-dom';

/**
 * 새 컬럼 이름을 입력받는 생성 모달입니다.
 *
 * @example
 * ```tsx
 * <CreateColumnModal isOpen={isOpen} onClose={handleClose} />
 * ```
 */

function CreateColumnModal({ isOpen, onClose }: CreateColumnModalProps) {
  const { id } = useParams();
  const dashboardId = Number(id);
  const columnNameField = useColumnNameValidation({
    checkFn: checkColumnNameDuplicate,
  });

  const [isLoading, setIsLoading] = useState(false);

  const isCreateDisabled = !columnNameField.isValid || isLoading;

  const handleClose = () => {
    columnNameField.reset();
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreateDisabled) return;
    if (columnNameField.error) return;

    setIsLoading(true);

    try {
      await createColumn({
        title: columnNameField.value.trim(),
        dashboardId: dashboardId,
      });
      handleClose();
    } catch {
      // 생성 실패는 서버 에러 → 중복 외 예외 처리
      // columnNameField.setError('중복된 컬럼 이름입니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="w-73.75 md:w-130">
      <Modal.Header title="새 컬럼 생성" />

      <form onSubmit={handleSubmit}>
        <Modal.Main>
          <Input
            label="이름"
            value={columnNameField.value}
            onChange={columnNameField.onChange}
            onBlur={columnNameField.onBlur}
            placeholder="컬럼 이름을 입력해 주세요."
            labelClassName="typo-lg-medium md:typo-2lg-medium"
            errorMessage={columnNameField.error}
          />
        </Modal.Main>

        <Modal.Footer>
          <Button theme="cancel" type="button" onClick={handleClose}>
            취소
          </Button>
          <Button theme="primary" type="submit" disabled={isCreateDisabled}>
            생성
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateColumnModal;
