import type { Column } from '@/features/columns/types/column.types';
import type { Comment } from '@/features/comments/types/comment.types';
import type { DashboardListResponse } from '@/features/dashboards/apis/dashboards.types';

// GET
export type GetCommentsParams = Pick<Comment, 'cardId'> & {
  size?: number;
  cursorId?: number | null;
};

export type GetCommentsResponse = {
  cursorId: number | null;
  comments: Comment[];
};

// POST
export type PostCommentParams = Pick<Comment, 'content' | 'cardId'> & {
  columnId: Column['id'];
  dashboardId: DashboardListResponse['dashboards'][number]['id'];
};

export type PostCommentResponse = Comment;

// PUT
export type PutCommentParams = Pick<Comment, 'id' | 'content'>;

export type PutCommentResponse = Comment;

// DELETE
export type DelCommentParams = Pick<Comment, 'id'>;
