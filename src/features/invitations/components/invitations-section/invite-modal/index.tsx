import { Button } from '@/shared/components/button';
import Input from '@/shared/components/input';
import { Modal } from '@/shared/components/modal';
import { useEffect, useState } from 'react';
import {
  createInvitation,
  getInvitations,
  INVITATIONS_SIZE,
} from '@/features/dashboards/apis/invitations';
import { validateEmail } from '@/shared/utils/validators/validateEmail';
import type { InviteModalProps } from '@/features/dashboards/apis/invitations.types';
import { dispatchInvitationListChangeEvent } from '@/features/dashboards/utils/dashboardEvents';

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
}: InviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<Set<string>>(
    () => new Set()
  );

  const handleClose = () => {
    setInviteEmail('');
    setInviteError('');
    onClose();
  };

  useEffect(() => {
    if (!isOpen || !dashboardId) {
      setInvitedEmails(new Set());
      return;
    }

    const safeDashboardId = dashboardId;

    let isMounted = true;
    const collectedEmails = new Set<string>();

    async function fetchAllInvitations() {
      let page = 1;
      while (isMounted) {
        const data = await getInvitations(safeDashboardId, page);
        if (!isMounted || !data) break;

        for (const invitation of data.invitations) {
          collectedEmails.add(invitation.invitee.email.toLowerCase());
        }

        if (data.invitations.length < INVITATIONS_SIZE) break;
        page += 1;
      }

      if (isMounted) {
        setInvitedEmails(collectedEmails);
      }
    }

    fetchAllInvitations();

    return () => {
      isMounted = false;
    };
  }, [dashboardId, isOpen]);

  const normalizedEmail = inviteEmail.trim().toLowerCase();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dashboardId) return;

    const emailValidation = validateEmail(inviteEmail);
    if (!emailValidation.isValid) {
      setInviteError(emailValidation.message);
      return;
    }

    if (invitedEmails.has(normalizedEmail)) {
      setInviteError('이미 초대한 이메일입니다.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setInviteError('');

    try {
      await createInvitation(dashboardId, { email: inviteEmail });

      setInvitedEmails((prev) => {
        const next = new Set(prev);
        next.add(normalizedEmail);
        return next;
      });

      handleClose();
      dispatchInvitationListChangeEvent();
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
