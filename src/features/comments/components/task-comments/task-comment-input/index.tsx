import type { TaskCommentInputProps } from '@/features/comments/components/task-comments/task-comment-input/taskCommentInput.types';
import { useState, type SubmitEvent } from 'react';
import { Button } from '@/shared/components/button';
import TextArea from '@/shared/components/text-area';

function TaskCommentInput({ onSubmit }: TaskCommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4 md:mb-6">
      <TextArea
        value={content}
        onChange={setContent}
        placeholder="댓글 작성하기"
        className="typo-md-regular placeholder:typo-md-regular h-17.5 md:h-27.5"
      />
      <Button
        type="submit"
        theme="secondary"
        size="sm"
        className="typo-xs-medium absolute right-3 bottom-3 h-7 md:h-8"
        disabled={!content.trim()}
      >
        입력
      </Button>
    </form>
  );
}

export { TaskCommentInput };
