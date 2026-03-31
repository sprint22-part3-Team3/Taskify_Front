import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

export type CreateDashboardModalProps = {
  isOpen: boolean;
  isCreating: boolean;
  onClose: () => void;
  onCreate: (
    dashboardTitle: string,
    dashboardColor: DashboardColorName
  ) => Promise<void>;
};
