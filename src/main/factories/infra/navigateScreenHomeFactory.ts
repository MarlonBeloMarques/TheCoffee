import { NavigateScreen } from '~/data/navigate';
import { NavigateScreenHome } from '~/data/useCases';

const navigateScreenHomeFactory = (navigate: NavigateScreen) => {
  return new NavigateScreenHome(navigate);
};

export default navigateScreenHomeFactory;
