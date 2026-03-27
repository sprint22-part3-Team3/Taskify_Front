type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type GetColumnsResponse = {
  result: string;
  // TODO : #59 머지 후, @/shared/types/column.types의 `Column[]` 으로 변경
  data: Column[];
};
