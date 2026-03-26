import { IcMailOff } from '@/shared/assets/icons';
import { Button } from '@/shared/components/button';
import { PageIndicator } from '@/shared/components/page-indicator';
import NavigationButtons from '@/shared/components/page-indicator/navigation-buttons';
import Title from '@/shared/components/title';
import InvitedDashboardItemRow from '@/pages/my-dashboard/components/invitedDashboardItemRow';
import SearchInput from '@/pages/my-dashboard/components/searchInput';
import type { InvitedDashboardSectionProps } from '@/pages/my-dashboard/components/invitedDashboardSection/invitedDashboardSection.types';

function InvitedDashboardSection({
  invitedDashboards,
}: InvitedDashboardSectionProps) {
  const hasInvitedDashboards = invitedDashboards.length > 0;

  return (
    <section className="mt-18.5 flex max-w-240 flex-col rounded-lg bg-white px-4 py-6 md:px-7 md:py-4.5 lg:py-8">
      <Title as="h3" className="md:typo-2xl-bold typo-xl-bold">
        초대받은 대시보드
      </Title>

      {hasInvitedDashboards ? (
        <div className="mt-6">
          <SearchInput placeholder="검색" aria-label="대시보드 검색" />

          <div className="mt-4 lg:overflow-x-auto">
            <div className="lg:min-w-170">
              <div className="md:hidden">
                {invitedDashboards.map((invitedDashboardItem) => {
                  return (
                    <InvitedDashboardItemRow
                      key={invitedDashboardItem.id}
                      invitedDashboardItem={invitedDashboardItem}
                    />
                  );
                })}
              </div>

              <table
                className="hidden w-full table-fixed border-collapse md:table"
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
                    <th scope="col" className="px-6 py-4 text-left font-normal">
                      초대자
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-normal"
                    >
                      수락 여부
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invitedDashboards.map((invitedDashboardItem) => {
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
                        <td className="py-5.75">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              theme="primary"
                              size="sm"
                              className="min-w-21"
                            >
                              수락
                            </Button>
                            <Button
                              theme="outlined"
                              size="sm"
                              className="text-primary-500 min-w-21"
                            >
                              거절
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <PageIndicator currentPage={1} totalPages={1} />
            <NavigationButtons
              onPrev={() => undefined}
              onNext={() => undefined}
              isPrevDisabled={true}
              isNextDisabled={true}
            />
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
  );
}

export default InvitedDashboardSection;
