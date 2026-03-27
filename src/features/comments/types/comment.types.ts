import type { AvatarUser } from '@/shared/types/user.types';

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: AvatarUser;
};
