import { IcMailOff } from '@/shared/assets/icons';
import { Button } from '@/shared/components/button';
import DeleteModal from '@/shared/components/modal/delete-modal';
import Title from '@/shared/components/title';
import { useInvitedDashboardList } from '@/features/invitations/hooks/useInvitedDashboardList';
import InvitedDashboardItemRow from '@/pages/my-dashboard/components/invited-dashboard-item-row';
import SearchInput from '@/pages/my-dashboard/components/search-input';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

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
    invitationResponseError,
    respondingInvitationId,
    selectedInvitedDashboard,
    isDeleteModalOpen,
    handleSearchKeywordChange,
    handleInvitationAccept,
    handleRejectInvite,
    handleCloseDeleteModalWithReset,
    handleConfirmRejectInvite,
    cursorId,
    isAddLoading,
    loadMore,
    addErrorMessage,
  } = useInvitedDashboardList();
  const hasInvitedDashboards = invitedDashboardItems.length > 0;
  const shouldShowInvitedDashboardContent =
    hasInvitedDashboards ||
    Boolean(searchKeyword) ||
    Boolean(invitedDashboardError);
  const isResponding = Boolean(
    selectedInvitedDashboard &&
    respondingInvitationId === selectedInvitedDashboard.id
  );
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasCursorId: cursorId !== null,
    isFetching: isAddLoading,
  });

  return (
    <>
      <section className="mt-6 flex max-w-240 flex-col rounded-lg bg-white px-4 py-6 md:mt-10 md:px-7 md:py-4.5 lg:mt-10 lg:py-8">
        <Title as="h3" size="xl" weight="bold" className="md:typo-2xl-bold">
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

            {invitationResponseError && (
              <p className="typo-md-regular text-error mt-3">
                {invitationResponseError}
              </p>
            )}

            <div className="mt-4 lg:overflow-x-auto">
              <div className="lg:min-w-170">
                <div className="md:hidden">
                  {invitedDashboardItems.map((invitedDashboardItem) => {
                    return (
                      <InvitedDashboardItemRow
                        key={invitedDashboardItem.id}
                        invitedDashboardItem={invitedDashboardItem}
                        onAccept={handleInvitationAccept}
                        onReject={handleRejectInvite}
                        isResponding={
                          respondingInvitationId === invitedDashboardItem.id
                        }
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
                      <th
                        scope="col"
                        className="px-6 py-4 text-left font-normal"
                      >
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
                          <td className="py-5.75">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                theme="primary"
                                size="sm"
                                className="min-w-21"
                                disabled={
                                  respondingInvitationId ===
                                  invitedDashboardItem.id
                                }
                                onClick={() =>
                                  handleInvitationAccept(
                                    invitedDashboardItem.id
                                  )
                                }
                              >
                                수락
                              </Button>
                              <Button
                                theme="outlined"
                                size="sm"
                                className="text-primary-500 min-w-21"
                                disabled={
                                  respondingInvitationId ===
                                  invitedDashboardItem.id
                                }
                                onClick={() =>
                                  handleRejectInvite(invitedDashboardItem)
                                }
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
                <div className="mt-4 flex flex-col items-center justify-center gap-2">
                  {isAddLoading ? (
                    // TODO: 로딩 화면 처리
                    <p className="typo-sm-medium">Loading...</p>
                  ) : addErrorMessage ? (
                    <p className="typo-sm-medium text-error">
                      {addErrorMessage}
                    </p>
                  ) : (
                    cursorId !== null && (
                      <div ref={loadMoreRef} className="h-4 w-full" />
                    )
                  )}
                </div>
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModalWithReset}
        onConfirm={handleConfirmRejectInvite}
        className="max-w-142"
        confirmButtonProps={{
          isLoading: isResponding,
          disabled: isResponding,
        }}
        message={
          <>
            {selectedInvitedDashboard?.name ?? '초대받은 대시보드'}를{' '}
            <span className="text-error">거절</span> 하시겠습니까?
          </>
        }
        confirmText="거절"
      />
    </>
  );
}
export default InvitedDashboardSection;
