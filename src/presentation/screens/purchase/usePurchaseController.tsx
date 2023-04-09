import { Alert } from 'react-native';
import { NavigateToHome } from '~/domain/useCases';
import { Product } from '../../../presentation/viewModels/model/homeViewModel';
import PurchaseView, { PaymentDetail } from './model';

type Props = {
  productSelected: string;
  paymentDetail: PaymentDetail;
  navigateToHome: NavigateToHome;
};

const usePurchaseController = ({
  productSelected,
  paymentDetail,
  navigateToHome,
}: Props): PurchaseView => {
  const getCoffee = (): Product => {
    return JSON.parse(productSelected);
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

  return { productSelected: getCoffee(), confirmPurchase, paymentDetail };
};

export default usePurchaseController;
