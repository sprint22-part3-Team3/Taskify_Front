import type { Comment } from '@/features/comments/types/comment.types';

export type GetCommentsParams = {
  cardId: number;
  size?: number;
};

export type GetCommentsResponse = {
  cursorId: number | null;
  comments: Comment[];
};

export type PostCommentParams = {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
};

export type PostCommentResponse = Comment;
