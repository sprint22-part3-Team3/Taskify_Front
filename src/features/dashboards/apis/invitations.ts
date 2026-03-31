import { del, get, post, put } from '@/shared/apis/fetchInstance';
import type {
  CreateInvitationRequest,
  Invitation,
  InvitationListResponse,
  InvitationsResponse,
} from '@/features/dashboards/apis/invitations.types';
import type { InvitedDashboardItem } from '@/features/invitations/types/invitedDashboardItem.types';

/** 한 페이지에 보여줄 초대 내역 수 */
export const INVITATIONS_SIZE = 5;

/**
 * 대시보드 초대 목록을 조회하는 함수
 */
export async function getInvitations(
  dashboardId: string,
  page: number = 1
): Promise<InvitationsResponse | null> {
  return get<InvitationsResponse>(
    `/dashboards/${dashboardId}/invitations?page=${page}&size=${INVITATIONS_SIZE}`
  );
}

/**
 * 대시보드에 사용자를 초대하는 함수
 */
export async function createInvitation(
  dashboardId: string,
  body: CreateInvitationRequest
): Promise<Invitation | null> {
  return post<Invitation>(`/dashboards/${dashboardId}/invitations`, body);
}

/**
 * 대시보드 초대를 취소하는 함수
 */
export async function cancelInvitation(
  dashboardId: string,
  invitationId: number
): Promise<null> {
  return del<null>(`/dashboards/${dashboardId}/invitations/${invitationId}`);
}

/**
 * 내가 초대받은 대시보드 목록을 가져옵니다.
 *
 * @example
 * const { invitations } = await getInvitedDashboards('프로젝트');
 */
export async function getInvitedDashboards(
  title = '',
  options?: RequestInit,
  cursorId?: number | null
): Promise<{ invitations: InvitedDashboardItem[]; cursorId: number | null }> {
  const searchParams = new URLSearchParams();
  const trimmedTitle = title.trim();

  if (trimmedTitle) {
    searchParams.set('title', trimmedTitle);
  }

  if (cursorId !== null && cursorId !== undefined) {
    searchParams.set('cursorId', cursorId.toString());
  }

  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const response = await get<InvitationListResponse>(
    `/invitations${query}`,
    options
  );

  return {
    invitations:
      response?.invitations.map((invitation) => ({
        id: invitation.id,
        name: invitation.dashboard.title,
        inviter: invitation.inviter.nickname,
      })) ?? [],
    cursorId: response?.cursorId ?? null,
  };
}

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
  await put<unknown>(`/invitations/${invitationId}`, {
    inviteAccepted,
  });
}
