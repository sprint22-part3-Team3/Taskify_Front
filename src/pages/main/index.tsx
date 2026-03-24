import MainFooter from '@/pages/main/components/main-footer';
import HeroSection from '@/pages/main/components/hero-section';
import MainHeader from '@/pages/main/components/main-header';

function MainPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <HeroSection />
      </div>
      <MainFooter />
    </div>
  );
}

export default MainPage;
