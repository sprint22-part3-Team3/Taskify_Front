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
