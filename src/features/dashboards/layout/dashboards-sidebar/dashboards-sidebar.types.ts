export type Dashboard = {
  id: number;
  title: string;
  color: string;
  isOwner: boolean;
};

export type SidebarProps = {
  dashboards: Dashboard[];
  selectedId?: number;
  onAddClick?: () => void;
  onDashboardClick?: (id: number) => void;
};
