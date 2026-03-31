import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import type { InviteModalProps } from '@/features/dashboards/apis/invitations.types';
import { dispatchInvitationListChangeEvent } from '@/features/dashboards/utils/dashboardEvents';
import { useInviteModalForm } from '@/features/invitations/hooks/useInviteModalForm';

export default function InviteModal({
  isOpen,
  onClose,
  dashboardId,
}: InviteModalProps) {
  const {
    inviteEmail,
    inviteError,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
    resetForm,
  } = useInviteModalForm({ dashboardId, isOpen });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const succeeded = await handleSubmit(event);
    if (succeeded) {
      handleClose();
      dispatchInvitationListChangeEvent();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-142">
      <form onSubmit={handleFormSubmit} noValidate>
        <Modal.Header title="초대하기" hasCloseIcon />
        <Modal.Main>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={inviteEmail}
            onChange={(e) => handleEmailChange(e.target.value)}
            errorMessage={inviteError}
          />
        </Modal.Main>
        <Modal.Footer>
          <Button type="button" theme="cancel" onClick={handleClose}>
            취소
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            초대
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
