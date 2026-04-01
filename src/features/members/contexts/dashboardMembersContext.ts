import type { Member } from '@/features/members/apis/members.types';
import { createContext, useContext } from 'react';

type DashboardMembersContextValue = {
  members: Member[];
};

export const DashboardMembersContext =
  createContext<DashboardMembersContextValue | null>(null);

export const useDashboardMembersContext = () => {
  const context = useContext(DashboardMembersContext);
  if (!context) {
    throw new Error(
      'DashboardMembersContext는 DashboardMembersProvider 안에서만 사용할 수 있습니다.'
    );
  }
  return context;
};

export const useDashboardMembersContextOrDefault = () => {
  const context = useContext(DashboardMembersContext);
  return context?.members ?? [];
};
