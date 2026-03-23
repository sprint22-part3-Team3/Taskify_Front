import {
  IcAdd,
  IcArrowLeft,
  IcArrowRight,
  IcMailOff,
  IcSearch,
} from '@/shared/assets/icons';
import { ColorLabel } from '@/features/dashboards/components/color/color-label';
import { getDashboardColorHex } from '@/features/dashboards/constants/dashboardColorMap.constants';
import { Button } from '@/shared/components/button';
import {
  CURRENT_PAGE,
  DASHBOARD_ITEMS,
  INVITED_DASHBOARD_ITEMS,
  TOTAL_PAGES,
} from './myDashboard.constants';
import InvitedDashboardItemRow from './components/invitedDashboardItemRow';

function getPaginationArrowClass(isEnabled: boolean) {
  return isEnabled ? 'h-4 w-4 text-black-200' : 'h-4 w-4 text-gray-200';
}

/**
 * 내 대시보드 페이지의 본문 영역을 렌더링합니다.
 *
 * @example
 * ```tsx
 * <MyDashboardPage />
 * ```
 */
function MyDashboardPage() {
  const hasInvitedDashboards = INVITED_DASHBOARD_ITEMS.length > 0;
  const canGoPreviousPage = CURRENT_PAGE > 1;
  const canGoNextPage = CURRENT_PAGE < TOTAL_PAGES;

  return (
    <main className="min-h-dvh bg-gray-50">
      <div className="mx-auto w-full px-10 pt-10 pb-10">
        <section className="max-w-240">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <Button
              theme="outlined"
              size="icon"
              className="typo-md-semibold md:typo-lg-semibold h-14.5 w-full justify-between px-5 text-left md:h-17"
            >
              <span>새로운 대시보드</span>
              <IcAdd className="text-primary-500 h-5 w-5" />
            </Button>

            {DASHBOARD_ITEMS.map(function (dashboardItem) {
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
            <span className="typo-md-regular text-black-200">
              {CURRENT_PAGE} 페이지 중 {TOTAL_PAGES}
            </span>
            <div className="flex">
              <Button
                theme="outlined"
                size="icon"
                className="h-9 w-9 rounded-r-none border-r-0 px-0 md:h-10 md:w-10"
              >
                <IcArrowLeft
                  className={getPaginationArrowClass(canGoPreviousPage)}
                />
              </Button>
              <Button
                theme="outlined"
                size="icon"
                className="h-9 w-9 rounded-l-none px-0 md:h-10 md:w-10"
              >
                <IcArrowRight
                  className={getPaginationArrowClass(canGoNextPage)}
                />
              </Button>
            </div>
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
    </main>
  );
}

export default MyDashboardPage;
