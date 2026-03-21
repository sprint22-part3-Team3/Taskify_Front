import { useAvatarUser } from '@/shared/context/avatar/avatarContext';
import type { AvatarImageProps } from './avatarImage.types';

export default function AvatarImage({
  className = 'h-full w-full rounded-full object-cover ring-1 ring-inset ring-gray-50',
}: AvatarImageProps) {
  const avatarUser = useAvatarUser();
  const profileImageSrc = avatarUser?.profileImageUrl;
  const profileImageAlt = avatarUser ? `${avatarUser.nickname} 프로필` : '';

  if (!profileImageSrc) {
    return null;
  }

  return (
    <img className={className} src={profileImageSrc} alt={profileImageAlt} />
  );
}
