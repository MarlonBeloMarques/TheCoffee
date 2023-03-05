import { useCallback, useEffect } from 'react';
import { NavigateToHome } from '~/domain/useCases';

const useWelcomeController = (navigateToHome: NavigateToHome) => {
  const navigate = useCallback(() => {
    navigateToHome.navigate();
  }, [navigateToHome]);

  useEffect(() => {
    setTimeout(() => {
      navigate();
    }, 3000);
  }, [navigate]);
};

export default useWelcomeController;
