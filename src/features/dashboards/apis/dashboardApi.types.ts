export type DashboardListResponse = {
  cursorId: number | null;
  totalCount: number;
  dashboards: {
    id: number;
    title: string;
    color: string;
    createdByMe: boolean;
  }[];
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
