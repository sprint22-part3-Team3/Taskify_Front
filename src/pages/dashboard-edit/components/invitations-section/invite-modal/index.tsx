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

  const handleInviteSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inviteEmail.trim()) {
      setInviteError('이메일을 입력해 주세요.');
      return;
    }
    if (!emailRegex.test(inviteEmail)) {
      setInviteError('이메일 형식을 확인해 주세요.');
      return;
    }
    setInviteError('');
    // TODO: API 호출
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-142">
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
        <Button theme="cancel" onClick={handleClose}>
          취소
        </Button>
        <Button onClick={handleInviteSubmit}>생성</Button>
      </Modal.Footer>
    </Modal>
  );
}
