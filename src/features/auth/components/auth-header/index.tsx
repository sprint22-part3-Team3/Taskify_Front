import Logo from '@/shared/components/logo';

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
