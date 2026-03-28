import type { Comment } from '@/features/comments/types/comment.types';

export type GetCommentsParams = {
  cardId: number;
  size?: number;
};

export type GetCommentsResponse = {
  cursorId: number | null;
  comments: Comment[];
};
