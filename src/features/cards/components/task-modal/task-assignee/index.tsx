import type { TaskAssigneeProps } from '@/features/cards/components/task-modal/task-assignee/taskAssignee.types';
import Avatar from '@/shared/components/avatar';
import Title from '@/shared/components/title';
import { AVATAR_SIZES } from '@/shared/constants/avatar.constants';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import { cn } from '@/shared/utils/cn';

const TEXT_CLASS = cn(
  'typo-xs-regular text-black-200 md:typo-md-regular md:mt-1.5'
);

function TaskAssignee({ assignee, dueDate }: TaskAssigneeProps) {
  const { profileImageUrl, nickname } = assignee;
  const avatarSize = useResponsiveValue<'md' | 'lg'>(AVATAR_SIZES);

  return (
    <div className="rounded-lg border border-gray-200 px-4 py-2.25 md:py-3.75">
      <div className="flex gap-[24%] md:flex-col md:gap-4">
        <div>
          <Title as="h3" size="xs" weight="semibold" color="text-black">
            담당자
          </Title>
          <div className="flex items-center gap-2">
            <Avatar size={avatarSize} user={assignee}>
              {profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
            </Avatar>
            <p className={TEXT_CLASS}>{nickname}</p>
          </div>
        </div>
        <div>
          <Title as="h3" size="xs" weight="semibold" color="text-black">
            마감일
          </Title>
          <p className={cn(TEXT_CLASS, 'flex h-6.5 items-center md:h-auto')}>
            {dueDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export { TaskAssignee };
