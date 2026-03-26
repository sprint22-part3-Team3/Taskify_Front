import type { TaskCommentItemProps } from '@/features/comments/components/task-comments/task-comment-item/taskCommentItem.types';
import Avatar from '@/shared/components/avatar';
import { AVATAR_SIZES } from '@/shared/constants/avatar.constants';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import { cn } from '@/shared/utils/cn';
import { formatDateTimeValue } from '@/shared/utils/date';

const TEXT_BUTTON_CLASS = cn(
  'cursor-pointer text-gray-300',
  'hover:text-gray-400 hover:underline'
);

function TaskCommentItem({ comment }: TaskCommentItemProps) {
  const { author, createdAt, content } = comment;

  const avatarSize = useResponsiveValue<'md' | 'lg'>(AVATAR_SIZES);

  return (
    <>
      <div>
        <Avatar size={avatarSize} user={author}>
          {author.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
        </Avatar>
      </div>
      <div>
        <div className="mb-0.5 flex h-6.5 items-center gap-2 md:mb-0 md:h-8.5">
          <p className="text-black-200 typo-xs-semibold md:typo-lg-semibold">
            {author.nickname}
          </p>
          <p className="text-2xs md:typo-xs-regular text-gray-300">
            {formatDateTimeValue(new Date(createdAt))}
          </p>
        </div>
        <p className="typo-xs-regular text-black-200 md:typo-md-regular mb-2 md:mb-2.5">
          {content}
        </p>
        <ul className="text-2xs md:typo-xs-regular flex gap-2">
          <li>
            <button type="button" className={TEXT_BUTTON_CLASS}>
              수정
            </button>
          </li>
          <li>
            <button type="button" className={TEXT_BUTTON_CLASS}>
              삭제
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export { TaskCommentItem };
