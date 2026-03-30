import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { AvatarUser } from '@/shared/types/user.types';
import { useDashboardMembers } from '@/features/members/hooks/useDashboardMembers';

/**
 * 현재 대시보드의 멤버 목록을 담당자 선택 옵션으로 변환한 훅
 */
export function useAssigneeOptions(isOpen: boolean) {
  const { id: routeDashboardId } = useParams();
  const dashboardId = isOpen ? routeDashboardId : undefined;
  const { members } = useDashboardMembers(dashboardId);

  const assigneeOptions = useMemo<AvatarUser[]>(() => {
    return members.map(({ id, nickname, profileImageUrl, userId }) => ({
      id,
      nickname,
      profileImageUrl: profileImageUrl || null,
      userId,
    }));
  }, [members]);

  return { assigneeOptions };
}
