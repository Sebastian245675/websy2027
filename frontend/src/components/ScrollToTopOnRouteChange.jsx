import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './Analytics';

export const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();
  useAnalytics();

  useEffect(() => {
    // Hacer scroll al top cuando cambie la ruta
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Usar 'instant' para que sea inmediato, no smooth
    });
  }, [pathname]);

  return null;
};

