import Sidebar from '@/features/dashboards/components/layout/dashboard-sidebar';
import Header from '@/features/dashboards/components/layout/dashboard-header/index';
import CreateDashboardModal from '@/features/dashboards/components/create-dashboard-modal';
import { useSidebar } from '@/features/dashboards/hooks/useSidebar';
import InviteModal from '@/features/invitations/components/invitations-section/invite-modal';
import { useModal } from '@/shared/hooks/useModal';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDashboardMembers } from '@/features/members/hooks/useDashboardMembers';
import { useEffect, useState } from 'react';
import {
  DASHBOARD_EVENTS,
  type DashboardTitleChangeDetail,
} from '@/features/dashboards/utils/dashboardEvents';
import { getDashboard } from '@/features/dashboards/apis/dashboards';

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
  const { id: dashboardId } = useParams<{ id: string }>();
  const {
    members: dashboardMembers,
    totalCount,
    errorMessage: memberLoadError,
    refetch: refetchMembers,
  } = useDashboardMembers(dashboardId);
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
    currentPage,
    totalPages,
    selectedDashboardId,
    isLoadingSidebarDashboards,
    sidebarDashboardsError,
    isCreatingDashboard,
    handleDashboardClick,
    handleCreateDashboard,
    handlePrevPage,
    handleNextPage,
  } = useSidebar();

  const [dashboardInfo, setDashboardInfo] = useState<{
    id: string;
    title: string;
    createdByMe: boolean;
  } | null>(null);

  const handleNavigateDashboardEdit = () => {
    if (!dashboardId) {
      return;
    }

    navigate(`/dashboard/${dashboardId}/edit`);
  };

  const handleOpenDashboardInviteModal = () => {
    if (!dashboardId) {
      return;
    }

    handleOpenInviteModal();
  };

  const handleNavigateMyPage = () => {
    navigate('/mypage');
  };

  const isMyDashboardPage = location.pathname === '/mydashboard';
  const isMyPage = location.pathname === '/mypage';
  const isSpecificDashboardPage = !isMyDashboardPage && !isMyPage;

  // Layout에서 id가 바뀔 때마다 직접 대시보드 정보 조회
  useEffect(() => {
    if (!dashboardId || isMyDashboardPage || isMyPage) return;

    async function fetchTitle(dashboardId: string) {
      const data = await getDashboard(dashboardId);
      if (data) {
        setDashboardInfo({
          id: dashboardId,
          title: data.title,
          createdByMe: data.createdByMe,
        });
      }
    }

    fetchTitle(dashboardId);
  }, [dashboardId, isMyDashboardPage, isMyPage]);

  // 대시보드 제목 변경 이벤트 수신
  useEffect(() => {
    const handleTitleChange = (event: Event) => {
      const { title: newTitle } = (
        event as CustomEvent<DashboardTitleChangeDetail>
      ).detail;
      if (dashboardId) {
        setDashboardInfo((previousDashboardInfo) => {
          if (!previousDashboardInfo) {
            return previousDashboardInfo;
          }

          return {
            ...previousDashboardInfo,
            title: newTitle,
          };
        });
      }
    };

    window.addEventListener(DASHBOARD_EVENTS.TITLE_CHANGE, handleTitleChange);

    return () => {
      window.removeEventListener(
        DASHBOARD_EVENTS.TITLE_CHANGE,
        handleTitleChange
      );
    };
  }, [dashboardId]);

  // 구성원 목록 변경 이벤트 수신
  useEffect(() => {
    window.addEventListener(
      DASHBOARD_EVENTS.MEMBER_LIST_CHANGE,
      refetchMembers
    );

    return () => {
      window.removeEventListener(
        DASHBOARD_EVENTS.MEMBER_LIST_CHANGE,
        refetchMembers
      );
    };
  }, [refetchMembers]);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar
          dashboards={sidebarDashboards}
          selectedId={selectedDashboardId}
          isLoading={isLoadingSidebarDashboards}
          errorMessage={sidebarDashboardsError}
          isPrevDisabled={currentPage === 1 || isLoadingSidebarDashboards}
          isNextDisabled={
            currentPage === totalPages || isLoadingSidebarDashboards
          }
          onAddClick={handleOpenCreateDashboardModal}
          onDashboardClick={handleDashboardClick}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            title={
              isMyDashboardPage
                ? '내 대시보드'
                : isMyPage
                  ? '계정관리'
                  : dashboardInfo?.id === dashboardId
                    ? dashboardInfo?.title
                    : ''
            }
            isOwner={
              isSpecificDashboardPage && (dashboardInfo?.createdByMe ?? false)
            }
            isTitleAlwaysVisible={!isSpecificDashboardPage}
            isActionButtonsVisible={
              isSpecificDashboardPage && (dashboardInfo?.createdByMe ?? false)
            }
            isMemberProfilesVisible={isSpecificDashboardPage}
            onManageClick={handleNavigateDashboardEdit}
            onInviteClick={handleOpenDashboardInviteModal}
            members={dashboardMembers}
            totalMemberCount={totalCount}
            memberLoadError={memberLoadError ?? ''}
            onProfileClick={handleNavigateMyPage}
          />
          <main id="main-scroll-area" className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={handleCloseInviteModal}
        dashboardId={dashboardId ?? ''}
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
