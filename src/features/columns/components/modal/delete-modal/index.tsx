import { Button } from '@/shared/components/button';
import { Modal } from '@/shared/components/modal';

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * 컬럼 삭제 전 확인을 받는 모달입니다.
 *
 * @example
 * ```tsx
 * <DeleteModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onConfirm={handleDelete}
 * />
 * ```
 */
function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-73.75 md:w-130">
      <p className="typo-xl-medium text-black-200 md:typo-xl-medium pb-10 text-center">
        컬럼을 모두 <span className="text-error">삭제</span> 하시겠습니까?
      </p>

      <Modal.Footer>
        <Button theme="cancel" type="button" onClick={onClose}>
          취소
        </Button>
        <Button theme="primary" type="button" onClick={onConfirm}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
