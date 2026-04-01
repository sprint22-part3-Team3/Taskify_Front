import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 라우트(경로) 이동 시 스크롤을 최상단으로 초기화하는 공통 컴포넌트입니다.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-area');
    if (scrollContainer) {
      scrollContainer.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
