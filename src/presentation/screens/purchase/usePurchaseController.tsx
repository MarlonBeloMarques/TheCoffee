import { Alert } from 'react-native';
import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';
import { PurchaseProps } from '.';

type Props = {
  coffeeSelected: string;
};

const usePurchaseController = ({ coffeeSelected }: Props): PurchaseProps => {
  const getCoffee = (): Coffee => {
    return JSON.parse(coffeeSelected);
  };

  const confirmPurchase = () => {
    Alert.alert('Successful Purchase', '', [
      { text: 'Confirm', onPress: () => {} },
    ]);
  };

  return { coffeeSelected: getCoffee(), confirmPurchase };
};

export default usePurchaseController;
