import { cloneElement, isValidElement, type ReactElement } from 'react';
import { cn } from '@/shared/utils/cn';
import { AVATAR_SIZE_CLASS_NAMES } from '@/shared/components/avatar/avatar.constants';
import { RESPONSIVE_AVATAR_SIZE } from '@/shared/constants/profile.constants';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import {
  AVATAR_GROUP_BADGE_TEXT_CLASS_NAMES,
  AVATAR_GROUP_GAP_CLASS_NAMES,
  AVATAR_GROUP_VISIBLE_COUNT,
} from './avatarGroup.constants';
import type { AvatarGroupProps } from './avatarGroup.types';

/**
 * @example
 *
 * const users = membersResponse.members.map((member) => ({
 *   id: member.id,
 *   avatar: (
 *     <Avatar user={member} size="lg">
 *       {member.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
 *     </Avatar>
 *   ),
 * }));
 *
 * <AvatarGroup users={users} totalCount={membersResponse.totalCount} />
 */
function AvatarGroup({
  users,
  restCount = 0,
  totalCount,
  className,
}: AvatarGroupProps) {
  const maxToShow = useResponsiveValue({
    mobile: AVATAR_GROUP_VISIBLE_COUNT.mobile,
    tablet: AVATAR_GROUP_VISIBLE_COUNT.tablet,
    desktop: AVATAR_GROUP_VISIBLE_COUNT.desktop,
  });
  const avatarGroupSize = useResponsiveValue(RESPONSIVE_AVATAR_SIZE);

  if (!users || users.length === 0) {
    return null;
  }

  const displayTotalCount = totalCount ?? users.length + restCount;
  const visibleUsers = users.slice(0, maxToShow);
  const rest = Math.max(displayTotalCount - visibleUsers.length, 0);

  return (
    <div
      className={cn(
        'flex items-center',
        AVATAR_GROUP_GAP_CLASS_NAMES[avatarGroupSize],
        className
      )}
    >
      {visibleUsers.map((user) => (
        <div key={user.id}>
          {isValidElement(user.avatar)
            ? cloneElement(
                user.avatar as ReactElement<{ size?: typeof avatarGroupSize }>,
                {
                  size: avatarGroupSize,
                }
              )
            : user.avatar}
        </div>
      ))}

      {rest > 0 && (
        <div
          className={cn(
            'bg-primary-100 text-primary-500 flex shrink-0 items-center justify-center rounded-full leading-none',
            AVATAR_SIZE_CLASS_NAMES[avatarGroupSize],
            AVATAR_GROUP_BADGE_TEXT_CLASS_NAMES[avatarGroupSize]
          )}
        >
          +{rest}
        </div>
      )}
    </div>
  );
}
export default AvatarGroup;
