import { cn } from '@/shared/utils/cn';
import { useAvatarUser } from '@/shared/context/avatar/avatarContext';
import type { AvatarImageProps } from './avatarImage.types';

export default function AvatarImage({ className }: AvatarImageProps) {
  const avatarUser = useAvatarUser();
  const profileImageSrc = avatarUser?.profileImageUrl;
  const profileImageAlt = avatarUser ? `${avatarUser.nickname} 프로필` : '';

  if (!profileImageSrc) {
    return null;
  }

  return (
    <img
      className={cn(
        'h-full w-full rounded-full object-cover ring-1 ring-gray-50 ring-inset',
        className
      )}
      src={profileImageSrc}
      alt={profileImageAlt}
    />
  );
}
