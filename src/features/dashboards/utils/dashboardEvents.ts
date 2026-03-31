const DASHBOARD_LIST_CHANGE_EVENT = 'dashboard-list-change';
const DASHBOARD_TITLE_CHANGE_EVENT = 'dashboard-title-change';
const INVITATION_LIST_CHANGE_EVENT = 'invitation-list-change';

type DashboardListChangeSource = 'dashboard-list' | 'sidebar' | 'invitation';

export type DashboardTitleChangeDetail = {
  title: string;
};

export type DashboardListChangeDetail = {
  source: DashboardListChangeSource;
};

/**
 * 대시보드 목록, 헤더 타이틀 갱신 이벤트 이름입니다.
 */
export const DASHBOARD_EVENTS = {
  LIST_CHANGE: DASHBOARD_LIST_CHANGE_EVENT,
  TITLE_CHANGE: DASHBOARD_TITLE_CHANGE_EVENT,
  INVITATION_LIST_CHANGE: INVITATION_LIST_CHANGE_EVENT,
} as const;

export const dispatchDashboardTitleChangeEvent = (
  detail: DashboardTitleChangeDetail
) => {
  window.dispatchEvent(
    new CustomEvent<DashboardTitleChangeDetail>(DASHBOARD_TITLE_CHANGE_EVENT, {
      detail,
    })
  );
};

/**
 * 대시보드 생성/수정 후 목록 재조회가 필요할 때 이벤트를 발행합니다.
 */
export const dispatchDashboardListChangeEvent = (
  detail: DashboardListChangeDetail
) => {
  window.dispatchEvent(
    new CustomEvent<DashboardListChangeDetail>(DASHBOARD_LIST_CHANGE_EVENT, {
      detail,
    })
  );
};

/**
 * 초대 목록 갱신이 필요할 때 이벤트를 발행합니다.
 */
export const dispatchInvitationListChangeEvent = () => {
  window.dispatchEvent(new Event(INVITATION_LIST_CHANGE_EVENT));
};
