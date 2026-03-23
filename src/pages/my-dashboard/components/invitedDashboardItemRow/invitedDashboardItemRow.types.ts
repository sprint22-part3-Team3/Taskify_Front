import type { ComponentProps } from 'react';
import type { InvitedDashboardItem } from '../../myDashboard.types';

export type InvitedDashboardItemRowProps = ComponentProps<'div'> & {
  invitedDashboardItem: InvitedDashboardItem;
};
