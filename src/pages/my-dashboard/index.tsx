import { useState } from 'react';
import {
  IcAdd,
  IcArrowRight,
  IcMailOff,
  IcSearch,
} from '@/shared/assets/icons';
import { ColorLabel } from '@/features/dashboards/components/color/color-label';
import { getDashboardColorHex } from '@/features/dashboards/constants/dashboardColorMap.constants';
import { Button } from '@/shared/components/button';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import {
  CURRENT_PAGE,
  DASHBOARD_ITEMS,
  INVITED_DASHBOARD_ITEMS,
  TOTAL_PAGES,
} from '@/pages/my-dashboard/myDashboard.constants';
import InvitedDashboardItemRow from '@/pages/my-dashboard/components/invitedDashboardItemRow';

/**
 * 내가 생성한 대시보드 목록과 초대받은 대시보드를 확인하는 페이지입니다.
 *
 * @example
 * ```tsx
 * <MyDashboardPage />
 * ```
 */
function MyDashboardPage() {
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);

  const hasInvitedDashboards = INVITED_DASHBOARD_ITEMS.length > 0;
  const canGoPreviousPage = currentPage > 1;
  const canGoNextPage = currentPage < TOTAL_PAGES;

  return (
    <div className="mx-auto w-full px-4 pt-6 pb-10 md:px-10 md:pt-10">
      <section className="max-w-240">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Button
            theme="outlined"
            size="icon"
            className="typo-md-semibold md:typo-lg-semibold h-14.5 w-full justify-between px-5 text-left md:h-17"
          >
            <span>새로운 대시보드</span>
            <div className="bg-primary-500/10 flex h-5 w-5 items-center justify-center rounded-sm md:h-5.5 md:w-5.5">
              <IcAdd className="text-primary-500 h-2.25 w-2.25 md:h-2.5 md:w-2.5" />
            </div>
          </Button>

          {DASHBOARD_ITEMS.map((dashboardItem) => {
            return (
              <Button
                key={dashboardItem.id}
                theme="outlined"
                size="icon"
                className="h-14.5 w-full justify-between px-5 md:h-17"
              >
                <div className="flex items-center gap-2">
                  <ColorLabel
                    color={getDashboardColorHex(dashboardItem.color)}
                    label={dashboardItem.title}
                    labelClassName="typo-md-semibold md:typo-lg-semibold text-black-200"
                  />
                </div>
                <IcArrowRight className="text-black-200 h-4.5 w-4.5" />
              </Button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <PageIndicator currentPage={currentPage} totalPages={TOTAL_PAGES} />
          <NavigationButtons
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() =>
              setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))
            }
            isPrevDisabled={!canGoPreviousPage}
            isNextDisabled={!canGoNextPage}
          />
        </div>
      </section>

      <section className="mt-10 flex max-w-240 flex-col rounded-lg bg-white px-4 py-6 md:px-10 md:py-4.5 lg:py-8">
        <h2 className="typo-md-bold text-black-200 md:typo-xl-bold">
          초대받은 대시보드
        </h2>

        {hasInvitedDashboards ? (
          <div className="mt-6">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-4 md:h-10">
              <IcSearch className="w-5.5 text-gray-300 md:w-6" />
              <input
                type="text"
                placeholder="검색"
                className="typo-md-regular md:typo-lg-regular text-black-200 w-full placeholder:text-gray-300 focus:outline-none"
              />
            </div>

            <div className="mt-4 lg:overflow-x-auto">
              <div className="lg:min-w-170">
                <div className="typo-md-regular md:typo-lg-regular hidden grid-cols-3 px-6 py-4 text-gray-300 md:grid">
                  <span>이름</span>
                  <span>초대자</span>
                  <span>수락 여부</span>
                </div>

                {INVITED_DASHBOARD_ITEMS.map((invitedDashboardItem) => {
                  return (
                    <InvitedDashboardItemRow
                      key={invitedDashboardItem.id}
                      invitedDashboardItem={invitedDashboardItem}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-81.75 flex-col items-center justify-center gap-6 md:h-97.5">
            <IcMailOff className="h-15 w-15 text-gray-200 md:h-18 md:w-18" />
            <p className="typo-xs-regular md:typo-lg-regular text-gray-300">
              아직 초대받은 대시보드가 없어요
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default MyDashboardPage;
