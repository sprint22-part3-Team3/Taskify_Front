import { useState } from 'react';
import { IcArrowRight } from '@/shared/assets/icons';
import { ColorLabel } from '@/features/dashboards/components/color/color-label';
import { getDashboardColorHex } from '@/features/dashboards/constants/dashboardColorMap.constants';
import { Button } from '@/shared/components/button';
import { PageIndicator } from '@/shared/components/page-indicator';
import {
  CURRENT_PAGE,
  DASHBOARD_ITEMS,
  INVITED_DASHBOARD_ITEMS,
  TOTAL_PAGES,
} from '@/pages/my-dashboard/myDashboard.mock';
import AddDashboardButton from '@/pages/my-dashboard/components/addDashboardButton';
import InvitedDashboardSection from '@/pages/my-dashboard/components/invitedDashboardSection';

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

  const canGoPreviousPage = currentPage > 1;
  const canGoNextPage = currentPage < TOTAL_PAGES;

  return (
    <div className="mx-auto w-full px-4 pt-6 pb-10 md:px-10 md:pt-10">
      <section className="max-w-240">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <AddDashboardButton />

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
                <IcArrowRight className="text-black-200 h-3.5" />
              </Button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <PageIndicator
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() =>
              setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))
            }
            isPrevDisabled={!canGoPreviousPage}
            isNextDisabled={!canGoNextPage}
          />
        </div>
      </section>

      <InvitedDashboardSection invitedDashboards={INVITED_DASHBOARD_ITEMS} />
    </div>
  );
}

export default MyDashboardPage;
