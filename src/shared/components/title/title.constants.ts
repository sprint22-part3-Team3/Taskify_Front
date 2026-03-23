import type {
  TitleSize,
  TitleWeight,
} from '@/shared/components/title/title.types';

export const TITLE_SIZE_MAP: Record<TitleSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  '2lg': 'text-2lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

export const TITLE_WEIGHT_MAP: Record<TitleWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};
