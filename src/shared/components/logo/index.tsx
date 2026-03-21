import { Link } from 'react-router-dom';
import { LOGO_MAP } from '@/shared/components/logo/logo.constants';
import { type LogoProps } from '@/shared/components/logo/logo.types';

/**
 * 사이즈별 로고 이미지를 홈 링크로 감싸는 컴포넌트입니다.
 *
 * size prop으로 로고 크기를 지정할 수 있으며,
 * 클릭 시 홈('/')으로 이동합니다.
 *
 * @example
 * ```tsx
 * <Logo size="large" className="header-logo" />
 * ```
 */
function Logo({ size = 'medium', className }: LogoProps) {
  const LogoImage = LOGO_MAP[size];

  return (
    <Link to="/" className={className} aria-label="홈으로 이동">
      <LogoImage />
    </Link>
  );
}

export default Logo;
