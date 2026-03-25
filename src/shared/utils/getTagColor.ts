import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { COLORS } from '@/shared/constants/color.constants';

/**
 * 태그의 텍스트를 기반으로 항상 동일한 색상을 반환하는 함수
 */
export const getTagColor = (tagText: string): DashboardColorName => {
  let hash = 0;

  for (let i = 0; i < tagText.length; i++) {
    hash += tagText.charCodeAt(i);
  }

  const index = hash % COLORS.length;
  return COLORS[index];
};
