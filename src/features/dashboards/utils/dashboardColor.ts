import {
  DASHBOARD_COLORS,
  DASHBOARD_COLOR_HEX,
  DASHBOARD_COLOR_MAP,
} from '@/features/dashboards/constants/dashboardColorMap.constants';
import type {
  DashboardColor,
  DashboardColorName,
} from '@/features/dashboards/types/dashboardColor.types';

/**
 * 대시보드에서 사용할 색상 목록을 조회합니다.
 */
export function getDashboardColors(): DashboardColor[] {
  return DASHBOARD_COLORS;
}

/**
 * 선택된 대시보드 색상 이름에 해당하는 hex 값을 조회합니다.
 */
export function getDashboardColorHex(colorId: DashboardColorName): string {
  return DASHBOARD_COLOR_MAP[colorId];
}

/**
 * API에서 받은 hex 값에 해당하는 대시보드 색상 이름을 조회합니다.
 */
export const getDashboardColorName = (() => {
  const hexToNameMap = Object.fromEntries(
    Object.entries(DASHBOARD_COLOR_HEX).map(([dashboardColorName, hex]) => [
      hex.toLowerCase(),
      dashboardColorName,
    ])
  ) as Record<string, DashboardColorName>;

  return (colorHex: string): DashboardColorName | null => {
    return hexToNameMap[colorHex.toLowerCase()] ?? null;
  };
})();
