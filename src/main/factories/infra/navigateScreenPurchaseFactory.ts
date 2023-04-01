import { NavigateScreen } from '~/data/navigate';
import { NavigateScreenPurchase } from '~/data/useCases';

const navigateScreenPurchaseFactory = (navigate: NavigateScreen) => {
  return new NavigateScreenPurchase(navigate);
};

export default navigateScreenPurchaseFactory;
