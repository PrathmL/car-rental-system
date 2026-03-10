import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from 'aos';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top instantly
    window.scrollTo(0, 0);
    
    // Tiny delay to ensure the DOM has updated before AOS recalculates
    const timeoutId = setTimeout(() => {
      AOS.refresh();
      // Also re-init just in case elements were completely replaced
      AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [location]);

  return null;
};

export default ScrollToTop;
