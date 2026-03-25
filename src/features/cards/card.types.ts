// 1. Base Data Types
export type Assignee = {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
};

export type Card = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

export type CardColumn = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

// 2. Component Props Types
export type CardProps = {
  card: Card;
};

export type CardListProps = {
  column: CardColumn;
};

export type CardListHeaderProps = {
  title: string;
  cardTotalCount: number;
};
