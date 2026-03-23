import type { ComponentProps, ReactNode } from 'react';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

export type TagProps = Omit<ComponentProps<'span'>, 'color' | 'children'> & {
  children: ReactNode;
  color?: DashboardColorName;
  className?: string;
};
