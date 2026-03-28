import type {
  InvitationListResponse,
  InvitedDashboardItem,
} from '@/features/invitations/types/invitation.types';
import { get } from '@/shared/apis/fetchInstance';

/**
 * 초대받은 대시보드 목록을 가져옵니다.
 *
 * @example
 * ```ts
 * const { invitations } = await getInvitedDashboards('프로젝트');
 * ```
 */
export async function getInvitedDashboards(
  title = ''
): Promise<{ invitations: InvitedDashboardItem[] }> {
  const searchParams = new URLSearchParams();
  const trimmedTitle = title.trim();

  if (trimmedTitle) {
    searchParams.set('title', trimmedTitle);
  }

  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const response = await get<InvitationListResponse>(`invitations${query}`);

  return {
    invitations:
      response?.invitations.map((invitation) => ({
        id: invitation.id,
        name: invitation.dashboard.title,
        inviter: invitation.inviter.nickname,
      })) ?? [],
  };
}
