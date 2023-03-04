import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import { Purchase } from '~/presentation/screens';
import usePurchaseController from '../../../presentation/screens/purchase/usePurchaseController';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const PurchaseFactory: React.FC<Props> = ({ route }) => {
  const purchaseController = usePurchaseController({
    coffeeSelected: route.params!.coffeeSelected,
    paymentDetail: { creditCard: { number: '**5012' } },
  });
  return <Purchase {...purchaseController} />;
};

export default PurchaseFactory;
