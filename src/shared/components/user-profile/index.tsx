import Avatar from '@/shared/components/avatar';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import { RESPONSIVE_AVATAR_SIZE } from '@/shared/constants/profile.constants';
import { cn } from '@/shared/utils/cn';
import type { UserProfileProps } from './userProfile.types';

/**
 * @example
 *
 * <UserProfile
 *   user={user}
 *   size="md"
 *   nicknameClassName="typo-md-regular md:typo-lg-regular"
 * />
 */
function UserProfile({
  user,
  size,
  className = '',
  nicknameClassName = '',
}: UserProfileProps) {
  const responsiveAvatarSize = useResponsiveValue(RESPONSIVE_AVATAR_SIZE);
  const avatarSize = size ?? responsiveAvatarSize;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar user={user} size={avatarSize}>
        {user.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
      </Avatar>
      <span className={cn('typo-lg-medium text-black-200', nicknameClassName)}>
        {user.nickname}
      </span>
    </div>
  );
}

export default UserProfile;
