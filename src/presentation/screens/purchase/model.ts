import { Coffee } from '../../../presentation/viewModels/model/homeViewModel';

export type PaymentDetail = {
  creditCard: {
    number: string;
  };
};

type PurchaseView = {
  coffeeSelected: Coffee;
  paymentDetail: PaymentDetail;
  confirmPurchase: () => void;
};

export default PurchaseView;
