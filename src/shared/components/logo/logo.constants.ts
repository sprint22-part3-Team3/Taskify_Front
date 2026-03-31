import { LogoLg, LogoM, LogoSm } from '@/shared/assets';
import { type ComponentType, type SVGProps } from 'react';
import { type LogoSize } from '@/shared/components/logo/logo.types';

export const LOGO_MAP: Record<
  LogoSize,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  large: LogoLg,
  medium: LogoM,
  small: LogoSm,
};
