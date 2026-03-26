import type { AuthHeaderProps } from '@/features/auth/components/auth-header/authHeader.types';
import Logo from '@/shared/components/logo';
import { cn } from '@/shared/utils/cn';

/**
 * 인증 페이지 상단에 로고와 안내 문구를 보여주는 컴포넌트입니다.
 *
 * @example
 * <AuthHeader message="첫 방문을 환영합니다!" />
 */
function AuthHeader({ message, className }: AuthHeaderProps) {
  return (
    <header
      className={cn(
        'mb-6 flex w-full flex-col items-center text-center md:mb-7.5',
        className
      )}
    >
      <Logo
        size="large"
        className="inline-block w-49 [&>svg]:h-auto [&>svg]:w-full"
      />
      <p className="typo-xl-medium mt-2.5 text-black">{message}</p>
    </header>
  );
}

export default AuthHeader;
