import { getDashboardColorHex } from '@/features/dashboards/constants/dashboardColorMap.constants';
import {
  TAG_BACKGROUND_OPACITY_PERCENT,
  TAG_TEXT_DEFAULT_COLOR,
} from '@/shared/components/tag/tag.constants';
import { type TagProps } from '@/shared/components/tag/tag.types';
import { cn } from '@/shared/utils/cn';

const getTagBackgroundColor = (textColor: string): string => {
  return `color-mix(in srgb, ${textColor} ${TAG_BACKGROUND_OPACITY_PERCENT}%, transparent)`;
};

/**
 * 대시보드 색상 기반 텍스트 컬러를 적용하는 공용 Tag 컴포넌트입니다.
 * 배경은 텍스트 색상의 10% 농도로 자동 계산됩니다.
 *
 * @example
 * <Tag color="orange">프로젝트</Tag>
 */
function Tag({
  children,
  color = TAG_TEXT_DEFAULT_COLOR,
  className,
  style,
  ...props
}: TagProps) {
  const textColor = getDashboardColorHex(color);
  const backgroundColor = getTagBackgroundColor(textColor);

  return (
    <span
      className={cn(
        'typo-md-regular inline-flex items-center rounded-sm px-2 py-1',
        className
      )}
      style={{
        color: textColor,
        backgroundColor,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

export { Tag };
export type { TagProps };
