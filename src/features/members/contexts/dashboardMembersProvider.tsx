import type { ReactNode } from 'react';
import type { Member } from '@/features/members/apis/members.types';
import { useMemo } from 'react';
import { DashboardMembersContext } from '@/features/members/contexts/dashboardMembersContext';

type DashboardMembersProviderProps = {
  members: Member[];
  totalCount: number;
  children: ReactNode;
};

export function DashboardMembersProvider({
  members,
  totalCount,
  children,
}: DashboardMembersProviderProps) {
  const value = useMemo(() => ({ members, totalCount }), [members, totalCount]);

  return (
    <DashboardMembersContext.Provider value={value}>
      {children}
    </DashboardMembersContext.Provider>
  );
}
