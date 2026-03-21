import { cn } from '@/shared/utils/cn';
import { avatarSizeClassNames } from '@/shared/components/avatar/avatar.constants';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import {
  AVATAR_GROUP_VISIBLE_COUNT,
  avatarGroupBadgeTextClassNames,
  avatarGroupGapClassNames,
} from './avatarGroup.constants';
import type { AvatarGroupProps } from './avatarGroup.types';

/**
 * @example
 *
 * const users = membersResponse.members.map((member) => ({
 *   id: member.id,
 *   avatar: (
 *     <Avatar user={member} size="md">
 *       {member.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
 *     </Avatar>
 *   ),
 * }));
 *
 * <AvatarGroup users={users} totalCount={membersResponse.totalCount} size="md" />
 */
function AvatarGroup({
  users,
  restCount = 0,
  totalCount,
  size = 'md',
  className = '',
}: AvatarGroupProps) {
  const maxToShow = useResponsiveValue({
    mobile: AVATAR_GROUP_VISIBLE_COUNT.mobile,
    tablet: AVATAR_GROUP_VISIBLE_COUNT.tablet,
    desktop: AVATAR_GROUP_VISIBLE_COUNT.desktop,
  });

  if (!users) {
    return null;
  }

  const resolvedTotalCount = totalCount ?? users.length + restCount;
  const visibleUsers = users.slice(0, maxToShow);
  const rest = Math.max(resolvedTotalCount - visibleUsers.length, 0);

  return (
    <div
      className={cn(
        'flex items-center',
        avatarGroupGapClassNames[size],
        className
      )}
    >
      {visibleUsers.map((user) => (
        <div key={user.id}>{user.avatar}</div>
      ))}

      {rest > 0 && (
        <div
          className={cn(
            'bg-primary-100 text-primary-500 flex shrink-0 items-center justify-center rounded-full leading-none',
            avatarSizeClassNames[size],
            avatarGroupBadgeTextClassNames[size]
          )}
        >
          +{rest}
        </div>
      )}
    </div>
  );
}
export default AvatarGroup;
