import { put } from '@/shared/apis/fetchInstance';

type RespondToInvitationRequest = {
  invitationId: number;
  inviteAccepted: boolean;
};

/**
 * 받은 초대에 대해 수락 또는 거절 응답을 전송합니다.
 *
 * @example
 * ```ts
 * await respondToInvitation({ invitationId: 1, inviteAccepted: true });
 * ```
 */
export async function respondToInvitation({
  invitationId,
  inviteAccepted,
}: RespondToInvitationRequest): Promise<void> {
  await put<unknown>(`invitations/${invitationId}`, {
    inviteAccepted,
  });
}
