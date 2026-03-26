import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { useState } from 'react';

type InviteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');

  const handleClose = () => {
    setInviteEmail('');
    setInviteError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-142">
      <form>
        <Modal.Header title="초대하기" hasCloseIcon />
        <Modal.Main>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            errorMessage={inviteError}
          />
        </Modal.Main>
        <Modal.Footer>
          <Button type="button" theme="cancel" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit">생성</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
