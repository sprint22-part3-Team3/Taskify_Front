import type { AvatarUser } from '@/shared/types/user.types';

export type UserProfileProps = {
  user: AvatarUser;
  className?: string;
  nicknameClassName?: string;
};
