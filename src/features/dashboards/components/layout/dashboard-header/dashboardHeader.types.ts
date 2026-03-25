import type { AvatarUser } from '@/shared/types/user.types';

export type HeaderProps = {
  title?: string;
  isOwner?: boolean;
  members?: AvatarUser[];
  totalMemberCount?: number;
  userName?: string;
  profileImage?: string;
  onManageClick?: () => void;
  onInviteClick?: () => void;
};
