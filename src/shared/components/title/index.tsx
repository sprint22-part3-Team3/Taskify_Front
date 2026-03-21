import type { TitleProps } from '@/shared/components/title/title.types';
import {
  SIZE_MAP,
  WEIGHT_MAP,
} from '@/shared/components/title/title.constants';

// Title component that renders a heading element with customizable size and weight

// Props:
// - as: the HTML heading tag to use (default: 'h2')
// - size: the size of the title (default: 'md')
// - weight: the font weight of the title (default: 'bold')
// - children: the content of the title
// - className: additional CSS classes to apply to the title

// The component uses the SIZE_MAP and WEIGHT_MAP constants to determine the appropriate CSS classes based on the size and weight props. It then renders the specified heading tag with the combined classes and children content.

// Example usage:
// <Title as="h3" size="lg" weight="semibold" className="text-blue-500">
//   This is a large, semibold title with blue text.
// </Title>

function Title({
  as = 'h2',
  size = 'md',
  weight = 'bold',
  children,
  className = '',
}: TitleProps) {
  const Tag = as;

  return (
    <Tag className={`${SIZE_MAP[size]} ${WEIGHT_MAP[weight]} ${className}`}>
      {children}
    </Tag>
  );
}

export default Title;
