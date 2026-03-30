import { get, post } from '@/shared/apis/fetchInstance';
import type {
  Invitation,
  CreateInvitationRequest,
  InvitationsResponse,
} from './invitations.types';

/** 한 페이지에 보여줄 초대 내역 수 */
export const INVITATIONS_SIZE = 5;

/**
 * 대시보드 초대 목록을 조회하는 함수
 */
export async function getInvitations(
  dashboardId: string,
  page: number = 1
): Promise<InvitationsResponse | null> {
  return get<InvitationsResponse>(
    `dashboards/${dashboardId}/invitations?page=${page}&size=${INVITATIONS_SIZE}`
  );
}

/**
 * 대시보드에 사용자를 초대하는 함수
 */
export async function createInvitation(
  dashboardId: string,
  body: CreateInvitationRequest
): Promise<Invitation | null> {
  return post<Invitation>(`dashboards/${dashboardId}/invitations`, body);
}
