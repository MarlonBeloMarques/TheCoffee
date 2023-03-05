import { NavigateScreenHome } from '~/data/useCases';
import { ReactNavigationAdapter } from '~/infra';

const navigateScreenHomeFactory = () => {
  const navigate = new ReactNavigationAdapter();
  return new NavigateScreenHome(navigate);
};

export default navigateScreenHomeFactory;
