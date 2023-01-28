import { useEffect } from 'react';
import { Navigate } from '~/domain/useCases';

const useViewModel = (navigate: Navigate) => {
  useEffect(() => {
    setTimeout(() => {
      navigateToHome();
    }, 5000);
  }, []);

  const navigateToHome = () => {
    navigate.navigateToHome();
  };
};

export default useViewModel;
