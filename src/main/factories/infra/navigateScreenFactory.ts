import { NavigateScreenHome } from '~/data/useCases';
import { ReactNavigationAdapter } from '~/infra';

const navigateScreenFactory = () => {
  const navigate = new ReactNavigationAdapter();
  return new NavigateScreenHome(navigate);
};

export default navigateScreenFactory;
