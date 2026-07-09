'use client'
import { useCallback, useEffect, useState } from 'react';

const TABLET_WIDTH = 1200;
const MOBILE_WIDTH = 568;

const useResponsive = () => {
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const handleResize = useCallback(() => {
    setIsTablet(window.outerWidth > MOBILE_WIDTH
      && window.outerWidth <= TABLET_WIDTH);
    setIsMobile(window.outerWidth <= MOBILE_WIDTH);
    setIsMobileDevice((window
      .matchMedia('(pointer: coarse)').matches));
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener(
      'resize',
      handleResize,
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleResize,
      );
    };
  }, [handleResize]);

  return ({
    isMobile,
    isMobileDevice,
    isTablet,
  });
};

export { useResponsive };
