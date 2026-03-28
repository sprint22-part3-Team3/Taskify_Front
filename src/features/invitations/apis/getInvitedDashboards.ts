import type { InvitationListResponse } from '@/features/invitations/apis/invitations.types';
import type { InvitedDashboardItem } from '@/features/invitations/types/invitedDashboardItem.types';
import { get } from '@/shared/apis/fetchInstance';

/**
 * 내가 초대받은 대시보드 목록을 가져옵니다.
 *
 * @example
 * const { invitations } = await getInvitedDashboards('프로젝트');
 */
export async function getInvitedDashboards(
  title = '',
  options?: RequestInit
): Promise<{ invitations: InvitedDashboardItem[] }> {
  const searchParams = new URLSearchParams();
  const trimmedTitle = title.trim();

  if (trimmedTitle) {
    searchParams.set('title', trimmedTitle);
  }

  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const response = await get<InvitationListResponse>(
    `invitations${query}`,
    options
  );

  return {
    invitations:
      response?.invitations.map((invitation) => ({
        id: invitation.id,
        name: invitation.dashboard.title,
        inviter: invitation.inviter.nickname,
      })) ?? [],
  };
}
