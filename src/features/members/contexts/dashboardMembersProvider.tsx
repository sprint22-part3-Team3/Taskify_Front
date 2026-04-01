import type { ReactNode } from 'react';
import type { Member } from '@/features/members/apis/members.types';
import { useMemo } from 'react';
import { DashboardMembersContext } from '@/features/members/contexts/dashboardMembersContext';

type DashboardMembersProviderProps = {
  members: Member[];
  children: ReactNode;
};

export function DashboardMembersProvider({
  members,
  children,
}: DashboardMembersProviderProps) {
  const value = useMemo(() => ({ members }), [members]);

  return (
    <DashboardMembersContext.Provider value={value}>
      {children}
    </DashboardMembersContext.Provider>
  );
}
