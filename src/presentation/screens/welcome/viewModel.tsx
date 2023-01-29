import { useCallback, useEffect } from 'react';
import { Navigate } from '~/domain/useCases';

const useViewModel = (navigate: Navigate) => {
  const navigateToHome = useCallback(() => {
    navigate.navigateToHome();
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      navigateToHome();
    }, 5000);
  }, [navigateToHome]);
};

export default useViewModel;
