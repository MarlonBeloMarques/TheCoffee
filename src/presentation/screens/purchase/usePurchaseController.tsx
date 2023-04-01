import { Alert } from 'react-native';
import { NavigateToHome } from '~/domain/useCases';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';
import PurchaseView, { PaymentDetail } from './model';

type Props = {
  coffeeSelected: string;
  paymentDetail: PaymentDetail;
  navigateToHome: NavigateToHome;
};

const usePurchaseController = ({
  coffeeSelected,
  paymentDetail,
  navigateToHome,
}: Props): PurchaseView => {
  const getCoffee = (): Coffee => {
    return JSON.parse(coffeeSelected);
  };

  const confirmPurchase = () => {
    Alert.alert('Successful Purchase', '', [
      {
        text: 'Confirm',
        onPress: () => {
          console.log('confirm purchase clicked');
        },
      },
    ]);
    navigateToHome.navigate();
  };

  return { coffeeSelected: getCoffee(), confirmPurchase, paymentDetail };
};

export default usePurchaseController;
