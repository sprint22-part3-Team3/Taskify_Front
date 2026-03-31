import type { AvatarSize } from '@/shared/components/avatar/avatar.types';
import type { AvatarUser } from '@/shared/types/user.types';

export type UserProfileProps = {
  user: AvatarUser;
  size?: AvatarSize;
  className?: string;
  nicknameClassName?: string;
};
