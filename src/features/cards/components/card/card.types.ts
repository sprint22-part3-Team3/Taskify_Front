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

export type CardProps = {
  card: Card;
};
