import type { TaskAssigneeProps } from '@/features/cards/components/task-modal/task-assignee/taskAssignee.types';
import Avatar from '@/shared/components/avatar';
import { TASK_MODAL_AVATAR_SIZE } from '@/shared/components/avatar/avatar.constants';
import Title from '@/shared/components/title';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import { cn } from '@/shared/utils/cn';

const TEXT_CLASS = cn('typo-xs-regular text-black-200 md:typo-md-regular');

function TaskAssignee({ assignee, dueDate }: TaskAssigneeProps) {
  const avatarSize = useResponsiveValue<'md' | 'lg'>(TASK_MODAL_AVATAR_SIZE);

  const { profileImageUrl, nickname } = assignee || {};

  return (
    <div className="rounded-lg border border-gray-200 px-4 py-2.25 md:py-3.75">
      <div className="flex justify-between md:flex-col md:justify-start md:gap-4">
        {assignee && (
          <div>
            <Title as="h3" size="xs" weight="semibold" color="text-black">
              담당자
            </Title>
            <div className="flex items-center gap-2 md:mt-1.5">
              <Avatar size={avatarSize} user={assignee}>
                {profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
              </Avatar>
              <p className={TEXT_CLASS}>{nickname}</p>
            </div>
          </div>
        )}
        {dueDate && (
          <div>
            <Title as="h3" size="xs" weight="semibold" color="text-black">
              마감일
            </Title>
            <p
              className={cn(
                TEXT_CLASS,
                'flex h-6.5 items-center md:mt-1.5 md:h-auto'
              )}
            >
              {dueDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { TaskAssignee };
