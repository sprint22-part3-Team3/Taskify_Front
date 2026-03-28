import type { AvatarUser } from '@/shared/types/user.types';

export type HeaderProps = {
  title?: string;
  isOwner?: boolean;
  members?: AvatarUser[];
  totalMemberCount?: number;
  userName?: string;
  profileImage?: string;
  isTitleVisible?: boolean;
  isTitleAlwaysVisible?: boolean;
  isActionButtonsVisible?: boolean;
  isMemberProfilesVisible?: boolean;
  onManageClick?: () => void;
  onInviteClick?: () => void;
  onProfileClick?: () => void;
};
