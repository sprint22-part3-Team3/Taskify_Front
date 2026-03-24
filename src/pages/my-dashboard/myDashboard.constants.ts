import type { DashboardItem, InvitedDashboardItem } from './myDashboard.types';

/**
 * 암시 데이터 파일
 */

export const DASHBOARD_ITEMS: DashboardItem[] = [
  { id: 1, title: '비브리지', color: 'blue' },
  { id: 2, title: '코드잇', color: 'pink' },
  { id: 3, title: '3분기 계획', color: 'orange' },
  { id: 4, title: '회의록', color: 'yellow' },
  { id: 5, title: '중요 문서함', color: 'purple' },
];

export const CURRENT_PAGE = 1;
export const TOTAL_PAGES = 1;

export const INVITED_DASHBOARD_ITEMS: InvitedDashboardItem[] = [
  { id: 1, name: '프로덕트 디자인', inviter: '손동희' },
  { id: 2, name: '새로운 기획 문서', inviter: '안귀영' },
  { id: 3, name: '유닛 A', inviter: '장혁' },
  { id: 4, name: '유닛 B', inviter: '강나무' },
  { id: 5, name: '유닛 C', inviter: '김태현' },
  { id: 6, name: '유닛 D', inviter: '김태현' },
];
