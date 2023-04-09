import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import { Purchase } from '~/presentation/screens';
import { ReactNavigationAdapter } from '~/infra';
import usePurchaseController from '../../../presentation/screens/purchase/usePurchaseController';
import navigateScreenHomeFactory from '../infra/navigateScreenHomeFactory';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const PurchaseFactory: React.FC<Props> = ({ route }) => {
  const purchaseController = usePurchaseController({
    productSelected: route.params!.productSelected,
    paymentDetail: { creditCard: { number: '**5012' } },
    navigateToHome: navigateScreenHomeFactory(new ReactNavigationAdapter()),
  });
  return <Purchase {...purchaseController} />;
};

export default PurchaseFactory;
