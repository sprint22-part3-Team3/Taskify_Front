import { useState } from 'react';
import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import type { CreateColumnModalProps } from '@/features/columns/components/modal/create-column-modal/createColumnModal.types';

/**
 * 새 컬럼 이름을 입력받는 생성 모달입니다.
 *
 * @example
 * ```tsx
 * <CreateColumnModal isOpen={isOpen} onClose={handleClose} />
 * ```
 */
function CreateColumnModal({ isOpen, onClose }: CreateColumnModalProps) {
  const [columnTitle, setColumnTitle] = useState('');
  const isCreateDisabled = !columnTitle.trim();

  const handleClose = () => {
    setColumnTitle('');
    onClose();
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreateDisabled) {
      return;
    }

    // TODO: 새 컬럼 생성 API 연동
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="w-73.75 md:w-130">
      <Modal.Header title="새 컬럼 생성" />

      <form onSubmit={handleSubmit}>
        <Modal.Main>
          <Input
            label="이름"
            value={columnTitle}
            onChange={(event) => setColumnTitle(event.target.value)}
            placeholder="컬럼 이름을 입력해 주세요."
            labelClassName="typo-lg-medium md:typo-2lg-medium"
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
