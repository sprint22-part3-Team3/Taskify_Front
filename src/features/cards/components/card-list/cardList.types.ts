export type CardColumn = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type CardListProps = {
  column: CardColumn;
};
