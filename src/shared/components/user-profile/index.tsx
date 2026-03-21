import Avatar from '@/shared/components/avatar';
import useResponsiveValue from '@/shared/hooks/useResponsiveValue';
import type { AvatarSize } from '@/shared/components/avatar/avatar.types';
import { cn } from '@/shared/utils/cn';
import type { UserProfileProps } from './userProfile.types';

/**
 * @example
 *
 * <UserProfile
 *   user={user}
 *   nicknameClassName="typo-md-regular md:typo-lg-regular"
 * />
 */
function UserProfile({
  user,
  className = '',
  nicknameClassName = '',
}: UserProfileProps) {
  const avatarSize = useResponsiveValue<AvatarSize>({
    mobile: 'lg',
    tablet: 'xl',
    desktop: 'xl',
  });

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
