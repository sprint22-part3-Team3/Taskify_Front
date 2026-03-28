import type { ComponentProps } from 'react';
import type { InvitedDashboardItem } from '@/features/invitations/apis/inviations.types';

export type InvitedDashboardItemRowProps = ComponentProps<'div'> & {
  invitedDashboardItem: InvitedDashboardItem;
  onAccept: (invitationId: number) => void;
  onReject: (invitedDashboardItem: InvitedDashboardItem) => void;
  isResponding?: boolean;
};
