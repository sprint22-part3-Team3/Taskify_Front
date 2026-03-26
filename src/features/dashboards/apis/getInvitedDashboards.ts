import type {
  InvitationListResponse,
  InvitedDashboardItem,
} from '@/features/dashboards/types/myDashboard.types';
import { get } from '@/shared/apis/fetchInstance';

const DASHBOARD_TEAM_ID = import.meta.env.VITE_TEAM_ID ?? '22-3';

/**
 * 내가 초대받은 대시보드 목록을 가져옵니다.
 *
 * @example
 * const { invitations } = await getInvitedDashboards('프로젝트');
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
  const response = await get<InvitationListResponse>(
    `${DASHBOARD_TEAM_ID}/invitations${query}`
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
