import MainFooter from '@/pages/main/components/main-footer';
import HeroSection from '@/pages/main/components/hero-section';
import IntroSection from '@/pages/main/components/intro-section';
import MainHeader from '@/pages/main/components/main-header';
import ServiceSection from '@/pages/main/components/service-section';

function MainPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <HeroSection />
        <IntroSection />
        <ServiceSection />
      </div>
      <MainFooter />
    </div>
  );
}

export default MainPage;
