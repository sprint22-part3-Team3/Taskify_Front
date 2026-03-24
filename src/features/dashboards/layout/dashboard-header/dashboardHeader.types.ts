import type { AvatarUser } from '@/shared/types/user.types';

export type HeaderProps = {
  title?: string; // 선택으로 변경
  isOwner?: boolean;
  members?: AvatarUser[];
  totalMemberCount?: number;
  userName?: string; // 선택으로 변경
  profileImage?: string;
  onManageClick?: () => void;
  onInviteClick?: () => void;
};
