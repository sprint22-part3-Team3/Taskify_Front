import type { DashboardColor } from '@/features/dashboards/types/dashboardColor.types';

export const COLORS = ['purple', 'blue', 'yellow', 'orange', 'pink'] as const;

export const DASHBOARD_COLORS: DashboardColor[] = [
  { id: 'purple', hex: '#a932ff' },
  { id: 'blue', hex: '#01b4bb' },
  { id: 'yellow', hex: '#f5d51e' },
  { id: 'orange', hex: '#fb8926' },
  { id: 'pink', hex: '#fc7b8f' },
];
