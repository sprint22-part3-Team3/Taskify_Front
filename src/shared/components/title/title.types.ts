import type { ReactNode } from 'react';

export type HeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TitleSize =
  | 'xs' /* 12px */
  | 'sm' /* 13px */
  | 'md' /* 14px */
  | 'lg' /* 16px */
  | '2lg' /* 18px */
  | 'xl' /* 20px */
  | '2xl' /* 24px */
  | '3xl'; /* 32px */

export type TitleWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type TitleProps = {
  as?: HeadingTag;
  size?: TitleSize;
  weight?: TitleWeight;
  children: ReactNode;
  className?: string;
};
