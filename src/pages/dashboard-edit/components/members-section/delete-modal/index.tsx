import { Button } from '@/shared/components/button';
import { Modal } from '@/shared/components/modal';

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DeleteModal({ isOpen, onClose }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-142">
      <h3 className="typo-xl-medium md:typo-xl-medium text-black-200 pb-10 text-center">
        구성원을 <span className="text-error">삭제</span> 하시겠습니까?
      </h3>
      <Modal.Footer>
        <Button theme="cancel" onClick={onClose}>
          취소
        </Button>
        <Button>삭제</Button>
      </Modal.Footer>
    </Modal>
  );
}
