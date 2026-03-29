import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { useState } from 'react';
import { createInvitation } from '@/features/invitations/apis/createInvitations';

type InviteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string;
  onInviteSuccess: () => void;
};

/**
 * 대시보드에 사용자를 초대하는 모달 컴포넌트입니다.
 *
 * 이메일을 입력하고 '생성' 버튼을 클릭하면 POST API로 초대 요청을 보냅니다.
 * 성공 시 모달을 닫고 초대 목록을 리패칭합니다.
 */
export default function InviteModal({
  isOpen,
  onClose,
  dashboardId,
  onInviteSuccess,
}: InviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setInviteEmail('');
    setInviteError('');
    onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inviteEmail.trim()) {
      setInviteError('이메일을 입력해 주세요.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setInviteError('');

    try {
      await createInvitation(dashboardId, { email: inviteEmail });

      handleClose();
      onInviteSuccess();
    } catch {
      setInviteError('초대에 실패했습니다. 이메일을 확인해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-142">
      <form onSubmit={handleSubmit} noValidate>
        <Modal.Header title="초대하기" hasCloseIcon />
        <Modal.Main>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={inviteEmail}
            onChange={(e) => {
              setInviteEmail(e.target.value);
              if (inviteError) setInviteError('');
            }}
            errorMessage={inviteError}
          />
        </Modal.Main>
        <Modal.Footer>
          <Button type="button" theme="cancel" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            생성
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
