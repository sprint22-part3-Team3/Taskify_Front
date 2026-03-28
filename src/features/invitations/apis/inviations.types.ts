export type InvitedDashboardItem = {
  id: number;
  name: string;
  inviter: string;
};

export type InvitationListResponse = {
  cursorId: number | null;
  invitations: {
    id: number;
    inviter: {
      nickname: string;
    };
    dashboard: {
      title: string;
    };
  }[];
};
