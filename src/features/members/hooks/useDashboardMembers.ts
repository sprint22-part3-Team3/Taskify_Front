import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Member } from '@/features/members/apis/members.types';
import { getMembers } from '@/features/members/apis/members';
import type { AvatarUser } from '@/shared/types/user.types';

const toAvatarUser = (member: Member): AvatarUser => ({
  id: member.userId ?? member.id,
  nickname: member.nickname,
  profileImageUrl: member.profileImageUrl ?? null,
  userId: member.userId,
});

export function useDashboardMembers() {
  const { id: dashboardId } = useParams<{ id: string }>();
  const [members, setMembers] = useState<AvatarUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dashboardId) {
      setMembers([]);
      setTotalCount(0);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const targetDashboardId = dashboardId;

    async function load() {
      try {
        const data = await getMembers(targetDashboardId);
        if (!isMounted) {
          return;
        }
        if (!data) {
          setMembers([]);
          setTotalCount(0);
          return;
        }

        setMembers(data.members.map(toAvatarUser));
        setTotalCount(data.totalCount);
      } catch {
        if (isMounted) {
          setError('멤버를 불러오지 못했습니다.');
          setMembers([]);
          setTotalCount(0);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, [dashboardId]);

  return useMemo(
    () => ({ members, totalCount, isLoading, error }),
    [members, totalCount, isLoading, error]
  );
}
