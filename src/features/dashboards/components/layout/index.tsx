import Sidebar from '@/features/dashboards/components/layout/dashboard-sidebar';
import Header from '@/features/dashboards/components/layout/dashboard-header/index';
import CreateDashboardModal from '@/features/dashboards/components/create-dashboard-modal';
import { useSidebar } from '@/features/dashboards/hooks/useSidebar';
import InviteModal from '@/features/invitations/components/invitations-section/invite-modal';
import { useModal } from '@/shared/hooks/useModal';
import type { Member } from '@/features/members/apis/members.types';
import { getMembers } from '@/features/members/apis/members';
import { useEffect, useState } from 'react';
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
  const [dashboardMembers, setDashboardMembers] = useState<Member[]>([]);
  const [dashboardMemberCount, setDashboardMemberCount] = useState(0);
  const [memberLoadError, setMemberLoadError] = useState('');
  const {
    isOpen: isInviteModalOpen,
    openModal: handleOpenInviteModal,
    closeModal: handleCloseInviteModal,
  } = useModal();
  const {
    isOpen: isCreateDashboardModalOpen,
    openModal: handleOpenCreateDashboardModal,
    closeModal: handleCloseCreateDashboardModal,
  } = useModal();
  const {
    sidebarDashboards,
    selectedDashboardId,
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
    isCreatingDashboard,
    handleDashboardClick,
    handleCreateDashboard,
  } = useSidebar();

  const handleNavigateDashboardEdit = () => {
    if (!id) {
      return;
    }

    navigate(`/dashboard/${id}/edit`);
  };

  const handleOpenDashboardInviteModal = () => {
    if (!id) {
      return;
    }

    handleOpenInviteModal();
  };

  useEffect(() => {
    const dashboardId = id;
    if (!dashboardId) {
      return;
    }

    let isMounted = true;

    async function loadMembers(targetDashboardId: string) {
      setMemberLoadError('');
      try {
        const data = await getMembers(targetDashboardId);
        if (isMounted) {
          if (!data) {
            throw new Error('No member data');
          }
          setDashboardMembers(data.members);
          setDashboardMemberCount(data.totalCount);
        }
      } catch {
        if (isMounted) {
          setMemberLoadError('멤버를 불러오지 못했습니다.');
        }
      }
    }

    loadMembers(dashboardId);

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleNavigateMyPage = () => {
    navigate('/mypage');
  };

  const isMyDashboardPage = location.pathname === '/mydashboard';
  const isMyPage = location.pathname === '/mypage';

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar
          dashboards={sidebarDashboards}
          selectedId={selectedDashboardId}
          isLoading={isLoadingSidebarDashboards}
          errorMessage={sidebarDashboardsError}
          onAddClick={handleOpenCreateDashboardModal}
          onDashboardClick={handleDashboardClick}
        />
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
            members={dashboardMembers}
            totalMemberCount={dashboardMemberCount}
            memberLoadError={memberLoadError}
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
      <CreateDashboardModal
        isOpen={isCreateDashboardModalOpen}
        isCreating={isCreatingDashboard}
        onClose={handleCloseCreateDashboardModal}
        onCreate={handleCreateDashboard}
      />
    </>
  );
}
