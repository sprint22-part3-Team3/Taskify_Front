import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import type { InviteModalProps } from '@/features/invitations/apis/invitations.types';
import { dispatchInvitationListChangeEvent } from '@/features/dashboards/utils/dashboardEvents';
import { runAfterModalClose } from '@/shared/utils/modal';
import { useInviteModalForm } from '@/features/invitations/hooks/useInviteModalForm';

/**
 * 대시보드에 사용자를 초대하는 모달 컴포넌트입니다.
 *
 * 이 모달에서는 이메일을 입력하고 제출하면 `useInviteModalForm` 훅을 통해 중복
 * 체크와 정규화된 API 요청을 수행합니다.
 */
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
    onClose();
    runAfterModalClose(resetForm);
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
