import type { AvatarUser } from '@/shared/types/user.types';

export type Card = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assignee: AvatarUser | null;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};
