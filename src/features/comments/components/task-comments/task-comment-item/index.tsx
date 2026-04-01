import { putComment } from '@/features/comments/apis/comments';
import type { TaskCommentItemProps } from '@/features/comments/components/task-comments/task-comment-item/taskCommentItem.types';
import { COMMENT_MESSAGES } from '@/features/comments/constants/commentMessage.constants';
import Avatar from '@/shared/components/avatar';
import { TASK_MODAL_AVATAR_SIZE } from '@/shared/components/avatar/avatar.constants';
import { Button } from '@/shared/components/button';
import TextArea from '@/shared/components/text-area';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import { cn } from '@/shared/utils/cn';
import { formatDateTimeValue } from '@/shared/utils/date';
import { useState } from 'react';

const TEXT_BUTTON_CLASS = cn(
  'cursor-pointer text-gray-300 underline',
  'hover:text-gray-400'
);

/**
 * 개별 댓글 항목을 렌더링하는 컴포넌트입니다.
 * 내부적으로 댓글 수정 로직(상태 관리 및 API)을 처리하며, 삭제 이벤트는 상위 컴포넌트로 위임합니다.
 */
function TaskCommentItem({ comment, refetch, onDelete }: TaskCommentItemProps) {
  const { id, author, createdAt, content } = comment;

  const avatarSize = useResponsiveValue<'md' | 'lg'>(TASK_MODAL_AVATAR_SIZE);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [editError, setEditError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditContent(content);
    setEditError(null);
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    if (!editContent.trim() || isSaving) return;

    setIsSaving(true);
    setEditError(null);

    try {
      await putComment({ id, content: editContent });
      refetch();
      setIsEditing(false);
    } catch {
      setEditError(COMMENT_MESSAGES.ERROR.UPDATE);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div>
        <Avatar size={avatarSize} user={author}>
          {author.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
        </Avatar>
      </div>
      <div className="w-full">
        <div className="mb-0.5 flex h-6.5 items-center gap-2 md:mb-0 md:h-8.5">
          <p className="text-black-200 typo-xs-semibold md:typo-lg-semibold">
            {author.nickname}
          </p>
          <p className="text-2xs md:typo-xs-regular text-gray-300">
            {formatDateTimeValue(new Date(createdAt))}
          </p>
        </div>

        {isEditing ? (
          <div className="mt-2 mb-2 w-full md:mb-2.5">
            <TextArea
              value={editContent}
              onChange={setEditContent}
              className="typo-md-regular h-17.5 md:h-27.5"
              error={editError ?? undefined}
            />
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                theme="primary"
                onClick={handleEditSave}
                disabled={!editContent.trim() || isSaving}
                isLoading={isSaving}
              >
                저장
              </Button>
              <Button size="sm" theme="outlined" onClick={handleEditCancel}>
                취소
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-black-200 typo-xs-regular md:typo-md-regular mb-2 wrap-anywhere whitespace-pre-wrap md:mb-2.5">
              {content}
            </p>
            <ul className="text-2xs md:typo-xs-regular flex gap-2">
              <li>
                <button
                  type="button"
                  className={TEXT_BUTTON_CLASS}
                  onClick={handleEdit}
                >
                  수정
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={TEXT_BUTTON_CLASS}
                  onClick={() => onDelete(id)}
                >
                  삭제
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export { TaskCommentItem };
