import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';
import { PurchaseProps } from '.';

type Props = {
  coffeeSelected: string;
};

const usePurchaseController = ({ coffeeSelected }: Props): PurchaseProps => {
  const getCoffee = (): Coffee => {
    return JSON.parse(coffeeSelected);
  };

  return { coffeeSelected: getCoffee() };
};

export default usePurchaseController;
