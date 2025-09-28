import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Optimized scroll to top function
  const scrollToTop = () => {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    });
  };

  useEffect(() => {
    // Immediate scroll without delay for better performance
    scrollToTop();
  }, [pathname]);

  // Removed heavy event listener that was causing lag

  return null;
};

export default ScrollToTop;
