export type DashboardColorName =
  | 'pink'
  | 'orange'
  | 'yellow'
  | 'blue'
  | 'purple';

export type DashboardColor = {
  id: DashboardColorName;
  hex: string;
};
