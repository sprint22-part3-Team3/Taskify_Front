import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

export type CreateDashboardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    dashboardTitle: string,
    dashboardColor: DashboardColorName
  ) => Promise<void>;
};
