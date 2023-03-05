import { NavigateScreenPurchase } from '~/data/useCases';
import { ReactNavigationAdapter } from '~/infra';

const navigateScreenPurchaseFactory = () => {
  const navigate = new ReactNavigationAdapter();
  return new NavigateScreenPurchase(navigate);
};

export default navigateScreenPurchaseFactory;
