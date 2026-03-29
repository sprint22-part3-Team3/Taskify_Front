import type { DashboardItem } from '@/features/dashboards/types/myDashboard.types';

export type SidebarDashboardItem = DashboardItem;

export type SidebarProps = {
  dashboards: SidebarDashboardItem[];
  selectedId?: number;
  isLoading?: boolean;
  errorMessage?: string | null;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  onAddClick?: () => void;
  onDashboardClick?: (id: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
};
