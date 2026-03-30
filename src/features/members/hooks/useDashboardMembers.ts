import { useCallback } from 'react';
import { useGetData } from '@/shared/hooks/useGetData';
import type { MembersResponse } from '@/features/members/apis/members.types';
import {
  getMembers,
  MEMBERS_SELECT_SIZE,
} from '@/features/members/apis/members';

const DEFAULT_PAGE = 1;

export function useDashboardMembers(
  dashboardId?: string,
  page = DEFAULT_PAGE,
  size = MEMBERS_SELECT_SIZE
) {
  const fetchFn = useCallback(() => {
    if (!dashboardId) {
      return Promise.resolve(null as MembersResponse | null);
    }

    return getMembers(dashboardId, page, size);
  }, [dashboardId, page, size]);

  const dependencyId = dashboardId ? Number(dashboardId) : Number.NaN;

  const { result, errorMessage, isLoading, refetch } =
    useGetData<MembersResponse | null>({
      fetchFn,
      dependencyId,
      notFoundMessage: '대시보드를 찾을 수 없거나 접근 권한이 없습니다.',
    });

  return {
    members: result?.members || [],
    totalCount: result?.totalCount || 0,
    isLoading,
    errorMessage,
    refetch,
  };
}
