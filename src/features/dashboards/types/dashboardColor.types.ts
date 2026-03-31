import type { COLORS } from '@/shared/constants/color.constants';

export type DashboardColorName = (typeof COLORS)[number];

export type DashboardColor = {
  id: DashboardColorName;
  hex: string;
};
