import { Alert } from 'react-native';
import { NavigateToHome } from '~/domain/useCases';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';
import { PurchaseProps } from '.';

type Props = {
  coffeeSelected: string;
  paymentDetail: { creditCard: { number: string } };
  navigateToHome: NavigateToHome;
};

const usePurchaseController = ({
  coffeeSelected,
  paymentDetail,
  navigateToHome,
}: Props): PurchaseProps => {
  const getCoffee = (): Coffee => {
    return JSON.parse(coffeeSelected);
  };

  const confirmPurchase = () => {
    Alert.alert('Successful Purchase', '', [
      {
        text: 'Confirm',
        onPress: () => {},
      },
    ]);
    navigateToHome.navigate();
  };

  return { coffeeSelected: getCoffee(), confirmPurchase, paymentDetail };
};

export default usePurchaseController;
