import { get } from '@/shared/apis/fetchInstance';
import type { MembersResponse } from '@/features/members/apis/members.types';

/** 구성원 목록 조회 시 기본 페이지 사이즈 */
export const MEMBERS_SIZE = 4;
/** 담당자 드롭다운에서 사용할 페이지 사이즈 */
export const MEMBERS_SELECT_SIZE = 20;

/**
 * 대시보드 구성원 목록을 조회하는 함수
 */
export async function getMembers(
  dashboardId: string,
  page: number = 1,
  size: number = MEMBERS_SIZE
): Promise<MembersResponse | null> {
  const params = new URLSearchParams({
    dashboardId,
    page: page.toString(),
    size: size.toString(),
  });

  return get<MembersResponse>(`members?${params.toString()}`);
}
