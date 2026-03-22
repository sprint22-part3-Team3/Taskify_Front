import type { ComponentProps } from 'react';
import type {
  DashboardColor,
  DashboardColorName,
} from '@/features/dashboards/types/dashboardColor.types';

export type ColorChipsetProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  colors: DashboardColor[];
  selectedColor: DashboardColorName;
  onChange: (colorId: DashboardColorName) => void;
};
