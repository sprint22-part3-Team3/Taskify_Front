/** 초대 관련 사용자 정보 (초대한 사람 / 초대받은 사람) */
export type InvitationUser = {
  nickname: string;
  email: string;
  id: number;
};

/** 초대 관련 대시보드 정보 */
export type InvitationDashboard = {
  title: string;
  id: number;
};

/** 초대 한 건의 정보 */
export type Invitation = {
  id: number;
  inviter: InvitationUser;
  teamId: string;
  dashboard: InvitationDashboard;
  invitee: InvitationUser;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

/** GET /dashboards/{dashboardId}/invitations 응답 */
export type InvitationsResponse = {
  totalCount: number;
  invitations: Invitation[];
};

/** POST /dashboards/{dashboardId}/invitations 요청 body */
export type CreateInvitationRequest = {
  email: string;
};
