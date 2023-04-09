import { Product } from '../../../presentation/viewModels/model/homeViewModel';

export type PaymentDetail = {
  creditCard: {
    number: string;
  };
};

type PurchaseView = {
  productSelected: Product;
  paymentDetail: PaymentDetail;
  confirmPurchase: () => void;
};

export default PurchaseView;
