import type { Comment } from '@/features/comments/types/comment.types';

export type TaskCommentItemProps = {
  comment: Comment;
  refetch: () => void;
  onDelete: (commentId: number) => void;
};
