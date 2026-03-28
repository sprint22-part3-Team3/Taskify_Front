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
