import type { TitleProps } from '@/shared/components/title/title.types';
import {
  TITLE_SIZE_MAP,
  TITLE_WEIGHT_MAP,
} from '@/shared/components/title/title.constants';

/**
 * 타이틀 컴포넌트
 *
 * @remarks
 * - 페이지 내에서 제목을 표시하는 컴포넌트입니다.
 * - `as` prop을 통해 제목 태그(h1, h2, h3 등)를 선택할 수 있습니다.
 * - `size` prop을 통해 제목의 크기를 조절할 수 있습니다.
 * - `weight` prop을 통해 제목의 글자 두께를 조절할 수 있습니다.
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
  children,
  className = '',
}: TitleProps) {
  const Tag = as;

  return (
    <Tag
      className={`${TITLE_SIZE_MAP[size]} ${TITLE_WEIGHT_MAP[weight]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export default Title;
