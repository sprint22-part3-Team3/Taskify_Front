import { Button } from '@/shared/components/button';
import NotFoundLogo from '@/shared/assets/logos/logo-not-found.svg?react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="bg-primary-500 relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(255_255_255/0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgb(0_0_0/0.12),transparent_34%)]" />
      <div className="absolute -top-18 -left-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -right-10 -bottom-16 h-64 w-64 rounded-full bg-black/10 blur-2xl" />

      <section className="z-base relative flex w-full max-w-3xl flex-col items-center px-8 py-12 text-center md:px-12 md:py-16">
        <Link to="/" className="mb-8" aria-label="홈으로 이동">
          <NotFoundLogo className="h-auto w-19.5 text-white" />
        </Link>
        <p className="typo-md-semibold rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white/90">
          Page Not Found
        </p>
        <h1 className="mt-6 text-[88px] leading-none font-black tracking-[-0.06em] md:text-[144px]">
          404
        </h1>
        <p className="typo-2lg-medium md:typo-2xl-bold mt-4 text-white/90">
          요청하신 페이지를 찾을 수 없어요.
        </p>

        <div className="mt-10 flex w-full max-w-sm">
          <Button as={Link} to="/" theme="secondary" className="h-12 w-full">
            홈으로 이동
          </Button>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
