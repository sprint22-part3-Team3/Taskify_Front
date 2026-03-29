import type { TaskCommentInputProps } from '@/features/comments/components/task-comments/task-comment-input/taskCommentInput.types';
import { useState, type SubmitEvent } from 'react';
import { Button } from '@/shared/components/button';
import TextArea from '@/shared/components/text-area';
import { cn } from '@/shared/utils/cn';

/**
 * 댓글 내용을 입력받고 제출하는 폼 컴포넌트입니다.
 * 내용이 비어있거나 공백만 있을 경우 제출 버튼이 자동으로 비활성화됩니다.
 */
function TaskCommentInput({ onSubmit, error }: TaskCommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    const success = await onSubmit(content);
    if (success) setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4 md:mb-6">
      <TextArea
        value={content}
        onChange={setContent}
        placeholder="댓글 작성하기"
        className="typo-md-regular placeholder:typo-md-regular h-17.5 md:h-27.5"
        error={error ?? undefined}
      />
      <Button
        type="submit"
        theme="secondary"
        size="sm"
        className={cn(
          'typo-xs-medium absolute right-3 h-7 md:h-8',
          error ? 'bottom-10' : 'bottom-3'
        )}
        disabled={!content.trim()}
      >
        입력
      </Button>
    </form>
  );
}

export { TaskCommentInput };
