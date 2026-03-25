import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';

const TAG_COLORS: DashboardColorName[] = [
  'purple',
  'blue',
  'yellow',
  'orange',
  'pink',
];

/**
 * 태그의 텍스트를 기반으로 항상 동일한 색상을 반환하는 함수
 */
export const getTagColor = (tagText: string): DashboardColorName => {
  let hash = 0;

  for (let i = 0; i < tagText.length; i++) {
    hash += tagText.charCodeAt(i);
  }

  const index = hash % TAG_COLORS.length;
  return TAG_COLORS[index];
};
