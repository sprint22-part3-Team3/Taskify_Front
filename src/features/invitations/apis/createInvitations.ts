import { post } from '@/shared/apis/fetchInstance';
import type {
  Invitation,
  CreateInvitationRequest,
} from './getInvitations.types';

/**
 * 대시보드에 사용자를 초대하는 함수
 */
export async function createInvitation(
  dashboardId: string,
  body: CreateInvitationRequest
): Promise<Invitation | null> {
  return post<Invitation>(`dashboards/${dashboardId}/invitations`, body);
}
