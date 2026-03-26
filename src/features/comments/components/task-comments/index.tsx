import type { TaskCommentsProps } from '@/features/comments/components/task-comments/taskComments.types';
import { Button } from '@/shared/components/button';
import TextArea from '@/shared/components/text-area';
import Title from '@/shared/components/title';
import { useState } from 'react';
import { DUMMY_COMMENTS } from '@/features/comments/dummyComments';
import { TaskCommentItem } from '@/features/comments/components/task-comments/task-comment-item';

// TODO : API 연동 [ Comments ]
function TaskComments({ card }: TaskCommentsProps) {
  const [content, setContent] = useState('');

  const comments = DUMMY_COMMENTS.comments.filter(
    (comment) => comment.cardId === card.id
  );

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
      <div className="relative mb-4 md:mb-6">
        <TextArea
          value={content}
          onChange={setContent}
          placeholder="댓글 작성하기"
          className="typo-md-regular placeholder:typo-md-regular h-17.5 md:h-27.5"
        />
        <Button
          theme="secondary"
          size="sm"
          className="typo-xs-medium absolute right-3 bottom-3 h-7 md:h-8"
        >
          입력
        </Button>
      </div>
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
