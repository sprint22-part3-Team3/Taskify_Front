import Sidebar from '@/features/dashboards/components/layout/dashboard-sidebar';
import Header from '@/features/dashboards/components/layout/dashboard-header/index';
import InviteModal from '@/pages/dashboard-edit/components/invitations-section/invite-modal';
import { useModal } from '@/shared/hooks/useModal';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

/**
 * 대시보드 공통 레이아웃 컴포넌트입니다.
 *
 * 사이드바, 헤더, 본문 배경색을 포함하며,
 * React Router의 Outlet을 통해 하위 페이지를 렌더링합니다.
 * 라우터에서 부모 레이아웃으로 설정하면 모든 하위 페이지에 자동 적용됩니다.
 *
 */
export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isOpen: isInviteModalOpen,
    openModal: handleOpenInviteModal,
    closeModal: handleCloseInviteModal,
  } = useModal();

  const handleNavigateDashboardEdit = () => {
    if (!id) {
      return;
    }

    navigate(`/dashboard/:id/edit`);
  };

  const handleOpenDashboardInviteModal = () => {
    if (!id) {
      return;
    }

    handleOpenInviteModal();
  };

  const handleNavigateMyPage = () => {
    navigate('/mypage');
  };

  const isMyDashboardPage = location.pathname === '/mydashboard';
  const isMyPage = location.pathname === '/mypage';

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            title={
              isMyDashboardPage
                ? '내 대시보드'
                : isMyPage
                  ? '계정관리'
                  : undefined
            }
            isOwner={!isMyDashboardPage && !isMyPage}
            isTitleAlwaysVisible={isMyDashboardPage || isMyPage}
            isActionButtonsVisible={!isMyDashboardPage && !isMyPage}
            isMemberProfilesVisible={!isMyDashboardPage && !isMyPage}
            onManageClick={handleNavigateDashboardEdit}
            onInviteClick={handleOpenDashboardInviteModal}
            onProfileClick={handleNavigateMyPage}
          />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={handleCloseInviteModal}
      />
    </>
  );
}
