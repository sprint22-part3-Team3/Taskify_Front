import AvatarFallback from '@/shared/components/avatar/avatar-fallback';
import AvatarImage from '@/shared/components/avatar/avatar-image';
import { AVATAR_SIZE_CLASS_NAMES } from '@/shared/components/avatar/avatar.constants';
import { AvatarSizeProvider } from '@/shared/context/avatar/avatarProvider';
import { cn } from '@/shared/utils/cn';
import type { AvatarComponent, AvatarProps } from './avatar.types';

/**
 * @example
 *
 * <Avatar user={user} size="md">
 *   {user.profileImageUrl ? (
 *     <Avatar.Img />
 *   ) : (
 *     <Avatar.Fallback />
 *   )}
 * </Avatar>
 */
const Avatar = (({ children, user, size = 'md', className }: AvatarProps) => {
  return (
    <AvatarSizeProvider size={size} user={user}>
      <div
        className={cn(
          'pointer-events-none shrink-0 overflow-hidden rounded-full',
          AVATAR_SIZE_CLASS_NAMES[size],
          className
        )}
      >
        {children}
      </div>
    </AvatarSizeProvider>
  );
}) as AvatarComponent;

Avatar.Img = AvatarImage;
Avatar.Fallback = AvatarFallback;

export default Avatar;
