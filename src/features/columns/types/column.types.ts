export type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateColumnRequest = {
  title: string;
  dashboardId: number;
};

export type UpdateColumnRequest = {
  title: string;
};
