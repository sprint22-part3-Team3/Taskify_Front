import { useEffect, useState } from 'react';

type ResponsiveValue<T> = {
  mobile: T;
  tablet: T;
  desktop: T;
};

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

export function getResponsiveValue<T>(
  values: ResponsiveValue<T>,
  width: number
): T {
  if (width >= DESKTOP_BREAKPOINT) {
    return values.desktop;
  }

  if (width >= TABLET_BREAKPOINT) {
    return values.tablet;
  }

  return values.mobile;
}

export default function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
  const { mobile, tablet, desktop } = values;

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return mobile;
    }

    return getResponsiveValue({ mobile, tablet, desktop }, window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setValue(
        getResponsiveValue({ mobile, tablet, desktop }, window.innerWidth)
      );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobile, tablet, desktop]);

  return value;
}
