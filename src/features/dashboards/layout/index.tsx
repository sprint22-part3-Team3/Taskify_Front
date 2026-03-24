import Sidebar from '@/features/dashboards/layout/dashboard-sidebar';
import Header from '@/features/dashboards/layout/dashboard-header/index';
import { Outlet } from 'react-router-dom';

/**
 * 대시보드 공통 레이아웃 컴포넌트입니다.
 *
 * 사이드바, 헤더, 본문 배경색을 포함하며,
 * React Router의 Outlet을 통해 하위 페이지를 렌더링합니다.
 * 라우터에서 부모 레이아웃으로 설정하면 모든 하위 페이지에 자동 적용됩니다.
 *
 */
export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
