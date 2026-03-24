import type { DashboardLayoutProps } from '@/features/dashboards/layout/dashboardLayout.types';
import Sidebar from '@/features/dashboards/layout/dashboard-sidebar';
import Header from '@/features/dashboards/layout/dashboard-header/Index';

/**
 * 대시보드 공통 레이아웃 컴포넌트입니다.
 *
 * 사이드바, 헤더, 본문 배경색을 포함하며,
 * 컬럼, 카드 등 본문 콘텐츠는 children으로 전달받습니다.
 *
 * @example
 * ```tsx
 * <DashboardLayout>
 *   <DashboardContent />
 * </DashboardLayout>
 * ```
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
