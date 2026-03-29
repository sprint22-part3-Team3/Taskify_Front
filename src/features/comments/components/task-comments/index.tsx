import type { TaskCommentsProps } from '@/features/comments/components/task-comments/taskComments.types';
import Title from '@/shared/components/title';
import { TaskCommentItem } from '@/features/comments/components/task-comments/task-comment-item';
import { useCommentList } from '@/features/comments/hooks/useCommentList';
import { TaskCommentInput } from '@/features/comments/components/task-comments/task-comment-input';

function TaskComments({ id }: TaskCommentsProps) {
  const { comments, isLoading, errorMessage } = useCommentList(id);

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

  const handleSubmitComment = (content: string) => {
    // TODO: 댓글 작성 API 호출 로직 연결
    console.log('제출된 댓글:', content);
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
      <TaskCommentInput onSubmit={handleSubmitComment} />
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
