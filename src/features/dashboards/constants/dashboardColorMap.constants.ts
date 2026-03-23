import type {
  DashboardColor,
  DashboardColorName,
} from '@/features/dashboards/types/dashboardColor.types';

/**
 * 대시보드에서 선택 가능한 색상 도메인 정의입니다.
 * 타입에 색상을 추가하면 이 맵에도 반드시 추가되도록 강제합니다.
 */
export const DASHBOARD_COLOR_MAP: Record<DashboardColorName, string> = {
  pink: 'var(--color-pink)',
  orange: 'var(--color-orange)',
  yellow: 'var(--color-yellow)',
  blue: 'var(--color-blue)',
  purple: 'var(--color-purple)',
};

export const DASHBOARD_COLORS: DashboardColor[] = (
  Object.entries(DASHBOARD_COLOR_MAP) as [DashboardColorName, string][]
).map(([id, hex]) => ({ id, hex }));

/**
 * 대시보드에서 사용할 색상 목록을 조회합니다.
 */
export const getDashboardColors = function (): DashboardColor[] {
  return DASHBOARD_COLORS;
};

/**
 * 선택된 대시보드 색상 이름에 해당하는 hex 값을 조회합니다.
 */
export const getDashboardColorHex = function (
  colorId: DashboardColorName
): string {
  return DASHBOARD_COLOR_MAP[colorId];
};
