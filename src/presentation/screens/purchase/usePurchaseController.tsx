import { Alert } from 'react-native';
import { Navigate } from '~/domain/useCases';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';
import { PurchaseProps } from '.';

type Props = {
  coffeeSelected: string;
  paymentDetail: { creditCard: { number: string } };
  navigate: Navigate;
};

const usePurchaseController = ({
  coffeeSelected,
  paymentDetail,
  navigate,
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
    navigate.navigateToHome();
  };

  return { coffeeSelected: getCoffee(), confirmPurchase, paymentDetail };
};

export default usePurchaseController;
