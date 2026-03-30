import type { TaskCommentsProps } from '@/features/comments/components/task-comments/taskComments.types';
import Title from '@/shared/components/title';
import { TaskCommentItem } from '@/features/comments/components/task-comments/task-comment-item';
import { useCommentList } from '@/features/comments/hooks/useCommentList';
import { TaskCommentInput } from '@/features/comments/components/task-comments/task-comment-input';
import { postComment } from '@/features/comments/apis/comments';
import { useState } from 'react';
import { useDashboardId } from '@/shared/hooks/useDashboardId';
import { COMMENT_MESSAGES } from '@/features/comments/constants/commentMessage.constants';

/**
 * 할 일 카드의 댓글 목록을 렌더링하고 새 댓글을 작성하는 영역입니다.
 * 내부적으로 댓글 목록 조회 및 생성 API 로직을 제어합니다.
 */
function TaskComments({ id: cardId, columnId }: TaskCommentsProps) {
  const dashboardId = useDashboardId();
  const { comments, isLoading, errorMessage, refetch } = useCommentList(cardId);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // TODO : 로딩 화면 처리
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  // TODO : 에러 화면 처리
  if (errorMessage)
    return (
      <div className="flex items-center justify-center">
        <p>⚠️ {errorMessage}</p>
      </div>
    );

  const handleSubmitComment = async (content: string) => {
    try {
      setSubmitError(null);
      await postComment({ content, cardId, columnId, dashboardId });
      refetch();
      return true;
    } catch {
      setSubmitError(COMMENT_MESSAGES.ERROR.SUBMIT);
      return false;
    }
  };

  return (
    <section>
      <Title
        as="h3"
        size="md"
        weight="medium"
        className="md:typo-lg-medium mb-1"
      >
        댓글
      </Title>
      <TaskCommentInput onSubmit={handleSubmitComment} error={submitError} />
      <ul className="flex flex-col gap-4">
        {comments.map((comment) => (
          <li key={comment.id} className="flex gap-2 md:gap-2.5">
            <TaskCommentItem comment={comment} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export { TaskComments };
