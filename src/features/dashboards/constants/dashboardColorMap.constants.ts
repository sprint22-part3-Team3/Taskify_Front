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
 * API 연결용 hex 맵 추가
 */
export const DASHBOARD_COLOR_HEX: Record<DashboardColorName, string> = {
  purple: '#a932ff',
  blue: '#01b4bb',
  yellow: '#f5d51e',
  orange: '#fb8926',
  pink: '#fc7b8f',
};
