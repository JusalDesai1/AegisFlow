import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useMediaQuery = (query: Breakpoint | string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = query in breakpoints
      ? `(min-width: ${breakpoints[query as Breakpoint]}px)`
      : query;

    const mediaQueryList = window.matchMedia(mediaQuery);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export const useIsMobile = () => useMediaQuery('sm');
export const useIsTablet = () => useMediaQuery('md');
export const useIsDesktop = () => useMediaQuery('lg');
