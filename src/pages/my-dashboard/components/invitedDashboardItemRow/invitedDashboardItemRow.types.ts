import type { ComponentProps } from 'react';
import type { InvitedDashboardItem } from '@/pages/my-dashboard/myDashboard.types';

export type InvitedDashboardItemRowProps = ComponentProps<'div'> & {
  invitedDashboardItem: InvitedDashboardItem;
  onReject: (invitedDashboardItem: InvitedDashboardItem) => void;
};
