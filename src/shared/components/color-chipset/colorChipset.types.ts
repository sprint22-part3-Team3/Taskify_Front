import type { ComponentProps } from 'react';
import type {
  DashboardColor,
  DashboardColorName,
} from '@/shared/apis/dashboardColors';

export type ColorChipsetProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  colors: DashboardColor[];
  selectedColor: DashboardColorName;
  onChange: (colorId: DashboardColorName) => void;
};
