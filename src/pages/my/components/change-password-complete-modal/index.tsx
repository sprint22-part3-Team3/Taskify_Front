import { Modal } from '@/shared/components/modal';
import { Button } from '@/shared/components/button';
import type { ChangePasswordCompleteModalProps } from '@/pages/my/components/change-password-complete-modal/changePasswordCompleteModal.types';

export default function ChangePasswordCompleteModal({
  isOpen,
  onClose,
}: ChangePasswordCompleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-73.75 md:w-130">
      <Modal.Main>
        <p className="typo-xl-medium text-center">
          비밀번호가 성공적으로 변경되었습니다.
        </p>
      </Modal.Main>
      <Modal.Footer>
        <Button theme="primary" onClick={onClose}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
