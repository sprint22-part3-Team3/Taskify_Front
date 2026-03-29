import { Link } from 'react-router-dom';
import { IcArrowRight } from '@/shared/assets/icons';
import CreateDashboardModal from '@/features/dashboards/components/create-dashboard-modal';
import { ColorLabel } from '@/features/dashboards/components/color/color-label';
import { useDashboardList } from '@/features/dashboards/hooks/useDashboardList';
import { getDashboardColorHex } from '@/features/dashboards/utils/dashboardColor';
import { Button } from '@/shared/components/button';
import { PageIndicator } from '@/shared/components/page-indicator';
import AddDashboardButton from '@/pages/my-dashboard/components/add-dashboard-button';
import InvitedDashboardSection from '@/pages/my-dashboard/components/invited-dashboard-section';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import { useModal } from '@/shared/hooks/useModal';

/**
 * 내가 생성한 대시보드 목록과 초대받은 대시보드를 확인하는 페이지입니다.
 *
 * @example
 * ```tsx
 * <MyDashboardPage />
 * ```
 */
function MyDashboardPage() {
  const {
    isOpen: isCreateDashboardModalOpen,
    openModal: openCreateDashboardModal,
    closeModal: closeCreateDashboardModal,
  } = useModal();
  const {
    dashboardItems,
    isLoadingDashboards,
    isCreatingDashboard,
    dashboardError,
    handleCreateDashboard,
  } = useDashboardList();

  return (
    <div className="mx-auto w-full px-4 pt-6 pb-10 md:px-10 md:pt-10">
      <section className="max-w-240">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {dashboardItems.map((dashboardItem) => {
            return (
              <Button
                key={dashboardItem.id}
                as={Link}
                to={`/dashboard/${dashboardItem.id}`}
                theme="outlined"
                size="icon"
                className="h-14.5 w-full justify-between bg-white px-5 md:h-17"
              >
                <div className="flex items-center gap-2">
                  <ColorLabel
                    color={getDashboardColorHex(dashboardItem.color)}
                    label={dashboardItem.title}
                    labelClassName="typo-md-semibold md:typo-lg-semibold text-black-200"
                  />
                </div>
                <IcArrowRight className="text-black-200 h-3.5" />
              </Button>
            );
          })}

          <AddDashboardButton onClick={openCreateDashboardModal} />
        </div>

        {isLoadingDashboards && (
          <p className="typo-md-regular mt-4 text-gray-400">
            대시보드 목록을 불러오는 중이에요.
          </p>
        )}

        {dashboardError && (
          <p className="typo-md-regular text-error mt-4">{dashboardError}</p>
        )}

        {dashboardItems.length > 0 && (
          <div className="mt-4 flex items-center justify-end gap-3 md:mt-3">
            <PageIndicator currentPage={1} totalPages={1} />
            <NavigationButtons
              onPrev={() => undefined}
              onNext={() => undefined}
              isPrevDisabled={true}
              isNextDisabled={true}
            />
          </div>
        )}
      </section>

      <InvitedDashboardSection />
      <CreateDashboardModal
        isOpen={isCreateDashboardModalOpen}
        isCreating={isCreatingDashboard}
        onClose={closeCreateDashboardModal}
        onCreate={handleCreateDashboard}
      />
    </div>
  );
}

export default MyDashboardPage;
