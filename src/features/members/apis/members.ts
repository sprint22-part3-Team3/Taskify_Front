import { get } from '@/shared/apis/fetchInstance';
import type { MembersResponse } from '@/features/members/apis/members.types';

/** 한 페이지에 보여줄 구성원 수 */
export const MEMBERS_SIZE = 4;

/**
 * 대시보드 구성원 목록을 조회하는 함수
 */
export async function getMembers(
  dashboardId: string,
  page: number = 1
): Promise<MembersResponse | null> {
  return get<MembersResponse>(
    `members?dashboardId=${dashboardId}&page=${page}&size=${MEMBERS_SIZE}`
  );
}
