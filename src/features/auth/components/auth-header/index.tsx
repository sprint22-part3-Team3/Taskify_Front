import Logo from '@/shared/components/logo';

/**
 * 인증 페이지 상단에 로고와 안내 문구를 보여주는 컴포넌트입니다.
 *
 * @example
 * <AuthHeader message="첫 방문을 환영합니다!" />
 */
function AuthHeader({
  message = '오늘도 만나서 반가워요!',
}: {
  message?: string;
}) {
  return (
    <header className="mb-6 flex w-full flex-col items-center text-center md:mb-7.5">
      <Logo
        size="large"
        className="inline-block w-49 [&>svg]:h-auto [&>svg]:w-full"
      />
      <p className="typo-xl-medium mt-2.5 text-black">{message}</p>
    </header>
  );
}

export default AuthHeader;
