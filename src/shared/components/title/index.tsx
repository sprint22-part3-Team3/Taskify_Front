import type { TitleProps } from '@/shared/components/title/title.types';
import {
  TITLE_SIZE_MAP,
  TITLE_WEIGHT_MAP,
} from '@/shared/components/title/title.constants';
import { cn } from '@/shared/utils/cn';

/**
 * 타이틀 컴포넌트
 *
 * @example 기본 사용 예시
 * ```tsx
 * <Title as="h1" size="lg" weight="bold">페이지 제목</Title>
 * ```
 **/

function Title({
  as = 'h2',
  size = 'md',
  weight = 'bold',
  color = 'text-black-200',
  children,
  className,
}: TitleProps) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        TITLE_SIZE_MAP[size],
        TITLE_WEIGHT_MAP[weight],
        color,
        className
      )}
    >
      {children}
    </Tag>
  );
}

export default Title;
