import type { ComponentProps } from 'react';
import type { InvitedDashboardItem } from '@/features/dashboards/types/myDashboard.types';

export type InvitedDashboardItemRowProps = ComponentProps<'div'> & {
  invitedDashboardItem: InvitedDashboardItem;
};
