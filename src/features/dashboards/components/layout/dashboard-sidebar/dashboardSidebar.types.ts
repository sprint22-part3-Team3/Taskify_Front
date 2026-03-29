import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

export type SidebarDashboardItem = {
  id: number;
  title: string;
  color: DashboardColorName;
  createdByMe: boolean;
};

export type SidebarProps = {
  dashboards: SidebarDashboardItem[];
  selectedId?: number;
  isLoading?: boolean;
  errorMessage?: string | null;
  onAddClick?: () => void;
  onDashboardClick?: (id: number) => void;
};
