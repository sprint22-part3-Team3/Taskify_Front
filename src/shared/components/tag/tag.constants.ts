import { type DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

/**
 * 태그의 기본 텍스트 색상입니다.
 */
export const TAG_TEXT_DEFAULT_COLOR: DashboardColorName = 'blue';

const TAG_BACKGROUND_OPACITY_PERCENT = 10;

/**
 * 전달된 텍스트 색상을 기준으로 10% 농도의 배경색을 생성합니다.
 */
export const getTagBackgroundColor = function (textColor: string): string {
  return `color-mix(in srgb, ${textColor} ${TAG_BACKGROUND_OPACITY_PERCENT}%, transparent)`;
};
