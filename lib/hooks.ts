import { useMedia } from "use-media";

export function useBreakpoint() {
  const isSmallMobile = useMedia("(max-width: 360px)");
  const isMobile = useMedia("(min-width: 361px) and (max-width: 768px)");
  const isTablet = useMedia("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMedia("(min-width: 1025px)");

  return { isSmallMobile, isMobile, isTablet, isDesktop };
}
