import { useState } from 'react';

/**
 * 모달의 애니메이션을 위해 언마운트 타이밍을 지연시키는 커스텀 훅입니다.
 */
export const useModalAnimation = (isOpen: boolean) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  if (isOpen && !isRendered) {
    setIsRendered(true);
  }

  const isClosing = !isOpen && isRendered;

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsRendered(false);
    }
  };

  return { isRendered, isClosing, handleAnimationEnd };
};
