// src/hooks/useResponsiveFlags.js
import { useMediaQuery } from "react-responsive";

/**
 * A custom hook to provide responsive flags based on common screen sizes.
 * @returns {object} An object containing boolean flags for different screen sizes.
 */
export const useResponsiveFlags = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMidScreen = useMediaQuery({ query: "(max-width: 1500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return {
    isTablet,
    isMidScreen,
    isMobile,
  };
};
