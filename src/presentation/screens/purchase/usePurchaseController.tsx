import { Alert } from 'react-native';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';
import { PurchaseProps } from '.';

type Props = {
  coffeeSelected: string;
  paymentDetail: { creditCard: { number: string } };
};

const usePurchaseController = ({
  coffeeSelected,
  paymentDetail,
}: Props): PurchaseProps => {
  const getCoffee = (): Coffee => {
    return JSON.parse(coffeeSelected);
  };

  const confirmPurchase = () => {
    Alert.alert('Successful Purchase', '', [
      { text: 'Confirm', onPress: () => {} },
    ]);
  };

  return { coffeeSelected: getCoffee(), confirmPurchase, paymentDetail };
};

export default usePurchaseController;
