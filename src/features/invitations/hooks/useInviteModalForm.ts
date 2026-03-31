import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createInvitation,
  getInvitations,
  INVITATIONS_SIZE,
} from '@/features/invitations/apis/invitations';
import { validateEmail } from '@/shared/utils/validators/validateEmail';
import { ApiError } from '@/shared/apis/apiError';

export type UseInviteModalFormParams = {
  dashboardId?: string;
  isOpen: boolean;
};

export type UseInviteModalFormResult = {
  inviteEmail: string;
  inviteError: string;
  isSubmitting: boolean;
  handleEmailChange: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  resetForm: () => void;
};

export function useInviteModalForm({
  dashboardId,
  isOpen,
}: UseInviteModalFormParams): UseInviteModalFormResult {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<Set<string>>(
    () => new Set()
  );

  const normalizedEmail = useMemo(
    () => inviteEmail.trim().toLowerCase(),
    [inviteEmail]
  );

  useEffect(() => {
    if (!isOpen || !dashboardId) {
      setInvitedEmails(new Set());
      return;
    }

    const resolvedDashboardId = dashboardId;

    let isMounted = true;
    const collectedEmails = new Set<string>();

    async function fetchInvitations() {
      let page = 1;
      while (isMounted) {
        const data = await getInvitations(resolvedDashboardId, page);
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

    fetchInvitations();

    return () => {
      isMounted = false;
    };
  }, [dashboardId, isOpen]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setInviteEmail(value);
      if (inviteError) {
        setInviteError('');
      }
    },
    [inviteError]
  );

  const resetForm = useCallback(() => {
    setInviteEmail('');
    setInviteError('');
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!dashboardId) return false;

      const validation = validateEmail(inviteEmail);
      if (!validation.isValid) {
        setInviteError(validation.message);
        return false;
      }

      if (invitedEmails.has(normalizedEmail)) {
        setInviteError('이미 초대한 이메일입니다.');
        return false;
      }

      if (isSubmitting) return false;

      setIsSubmitting(true);
      setInviteError('');

      try {
        await createInvitation(dashboardId, { email: normalizedEmail });
        setInvitedEmails((prev) => {
          const next = new Set(prev);
          next.add(normalizedEmail);
          return next;
        });
        return true;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 404) {
            setInviteError('존재하지 않는 유저입니다.');
          } else if (error.status === 409) {
            setInviteError('이미 대시보드에 초대된 멤버입니다.');
          } else {
            setInviteError(
              error.message || '초대에 실패했습니다. 이메일을 확인해 주세요.'
            );
          }
        } else {
          setInviteError('초대에 실패했습니다. 이메일을 확인해 주세요.');
        }
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [dashboardId, inviteEmail, invitedEmails, normalizedEmail, isSubmitting]
  );

  return {
    inviteEmail,
    inviteError,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
    resetForm,
  };
}
