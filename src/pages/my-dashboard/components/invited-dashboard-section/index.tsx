import { IcMailOff } from '@/shared/assets/icons';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import Title from '@/shared/components/title';
import { useInvitedDashboardList } from '@/features/dashboards/hooks/useInvitedDashboardList';
import SearchInput from '@/pages/my-dashboard/components/search-input';

/**
 * 초대받은 대시보드 목록과 검색, 수락/거절 UI를 렌더링합니다.
 *
 * @example
 * ```tsx
 * <InvitedDashboardSection />
 * ```
 */
function InvitedDashboardSection() {
  const {
    invitedDashboardItems,
    searchKeyword,
    isSearchingInvitedDashboards,
    invitedDashboardError,
    handleSearchKeywordChange,
  } = useInvitedDashboardList();
  const hasInvitedDashboards = invitedDashboardItems.length > 0;
  const shouldShowInvitedDashboardContent =
    hasInvitedDashboards ||
    Boolean(searchKeyword) ||
    Boolean(invitedDashboardError);

  return (
    <>
      <section className="mt-6 flex max-w-240 flex-col rounded-lg bg-white px-4 py-6 md:mt-4.5 md:px-7 md:py-4.5 lg:mt-8 lg:py-8">
        <Title as="h3" className="md:typo-2xl-bold typo-xl-bold">
          초대받은 대시보드
        </Title>

        {shouldShowInvitedDashboardContent ? (
          <div className="mt-6">
            <SearchInput
              placeholder="검색"
              aria-label="대시보드 검색"
              value={searchKeyword}
              onChange={(event) => {
                void handleSearchKeywordChange(event.target.value);
              }}
            />

            {isSearchingInvitedDashboards && (
              <p className="typo-md-regular mt-3 text-gray-300">
                초대 목록을 불러오는 중이에요.
              </p>
            )}

            {invitedDashboardError && (
              <p className="typo-md-regular text-error mt-3">
                {invitedDashboardError}
              </p>
            )}

            <div className="mt-4 lg:overflow-x-auto">
              <div className="lg:min-w-170">
                <table
                  className="w-full table-fixed border-collapse"
                  aria-label="초대받은 대시보드 목록"
                >
                  <thead>
                    <tr className="typo-md-regular md:typo-lg-regular text-gray-300">
                      <th
                        scope="col"
                        className="py-4 text-left font-normal lg:px-12"
                      >
                        이름
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left font-normal"
                      >
                        초대자
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left font-normal"
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {invitedDashboardItems.map((invitedDashboardItem) => {
                      return (
                        <tr
                          key={invitedDashboardItem.id}
                          className="border-b border-gray-100"
                        >
                          <td className="typo-md-regular md:typo-lg-regular text-black-200 py-5.75 lg:px-12">
                            {invitedDashboardItem.name}
                          </td>
                          <td className="typo-md-regular md:typo-lg-regular text-black-200 px-6 py-5.75">
                            {invitedDashboardItem.inviter}
                          </td>
                          <td className="py-5.75" />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {hasInvitedDashboards && (
              <div className="mt-4 flex items-center justify-end gap-3">
                <PageIndicator currentPage={1} totalPages={1} />
                <NavigationButtons
                  onPrev={() => undefined}
                  onNext={() => undefined}
                  isPrevDisabled={true}
                  isNextDisabled={true}
                />
              </div>
            )}
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
    </>
  );
}
export default InvitedDashboardSection;
