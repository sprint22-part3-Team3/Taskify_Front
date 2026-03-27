export type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type GetColumnsResponse = {
  result: string;
  data: Column[];
};
