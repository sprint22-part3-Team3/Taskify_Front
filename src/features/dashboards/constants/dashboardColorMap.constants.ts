import { COLORS } from '@/shared/constants/color.constants';
import type {
  DashboardColor,
  DashboardColorName,
} from '@/features/dashboards/types/dashboardColor.types';

/**
 * 공통 색상 이름 목록을 기준으로 대시보드 색상 맵을 생성합니다.
 */
export const DASHBOARD_COLOR_MAP: Record<DashboardColorName, string> =
  Object.fromEntries(
    COLORS.map((color) => [color, `var(--color-${color})`])
  ) as Record<DashboardColorName, string>;

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
