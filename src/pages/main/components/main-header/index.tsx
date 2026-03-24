import Logo from '@/shared/components/logo';
import { Link } from 'react-router-dom';

const linkStyle =
  'typo-md-regular rounded-sm py-1.5 px-2 md:px-3 md:py-2 hover:bg-primary-100 text-primary-500 transition-colors md: typo-lg-regular';

function MainHeader() {
  return (
    <header className="sticky top-0 z-200 w-full bg-gray-900 shadow-lg">
      <div className="mx-auto flex h-17.5 max-w-440 items-center justify-between px-6 md:px-8">
        <h1>
          <>
            <Logo size="small" className="md:hidden" />
            <Logo size="medium" className="hidden md:block" />
          </>
        </h1>
        <nav className="text-gray-0 -mr-2 flex gap-2 sm:-mr-3 sm:gap-3">
          <Link to="/login" className={linkStyle}>
            로그인
          </Link>
          <Link to="/signup" className={linkStyle}>
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default MainHeader;
