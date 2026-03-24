import { imgHero } from '@/shared/assets/images';
import { Button } from '@/shared/components/button';
import Logo from '@/shared/components/logo';
import Title from '@/shared/components/title';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-70px)] justify-center bg-white">
      <div className="mx-auto flex w-full max-w-350 items-center justify-center px-6 md:px-8 lg:px-0">
        <div className="flex w-full flex-col items-center text-center">
          <Title as="h2" className="flex flex-col items-center">
            <span className="typo-2lg-bold from-primary-800 to-primary-500 md:typo-2xl-bold lg:typo-2xl-bold bg-linear-to-r bg-clip-text tracking-wide text-transparent">
              Simplify Your Tasks
            </span>

            <span className="mt-3">
              <Logo
                size="medium"
                className="inline-block w-70 max-w-full md:w-90 lg:w-105 [&>svg]:h-auto [&>svg]:w-full"
              />
            </span>

            <span className="typo-2lg-semibold text-black-100 md:typo-2xl-semibold lg:typo-2xl-semibold mt-5">
              작업을 더 쉽고 단순하게
            </span>
          </Title>

          <div className="relative mt-15 w-full md:mt-5 lg:mt-0">
            <img
              src={imgHero}
              alt="Taskify를 사용하는 팀 협업 일러스트"
              className="w-full object-contain"
            />

            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-7">
              <Button
                as={Link}
                to="/login"
                theme="primary"
                size="lg"
                className="typo-md-semibold md:typo-lg-semibold lg:typo-2lg-semibold px-5 md:px-20 lg:px-25"
              >
                지금 시작하기
              </Button>
              <Button
                as={Link}
                to="#"
                theme="secondary"
                size="lg"
                className="typo-md-semibold md:typo-lg-semibold lg:typo-2lg-semibold px-5 md:px-20 lg:px-25"
              >
                주요 기능 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
