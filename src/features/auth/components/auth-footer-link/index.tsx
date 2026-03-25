import { Link } from 'react-router-dom';
import type { AuthFooterLinkProps } from '@/features/auth/components/auth-footer-link/authFooterLink.types';

/**
 * 인증 페이지 하단에 안내 문구와 이동 링크를 함께 보여주는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <AuthFooterLink
 *   message="아직 회원이 아니신가요?"
 *   linkText="회원가입하기"
 *   to="/signup"
 * />
 * ```
 */
function AuthFooterLink({ message, linkText, to }: AuthFooterLinkProps) {
  return (
    <div className="typo-lg-regular text-black-200 flex gap-2 text-center">
      <span>{message}</span>
      <Link
        to={to}
        className="text-primary-500 hover:text-primary-600 active:text-primary-700 underline"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default AuthFooterLink;
