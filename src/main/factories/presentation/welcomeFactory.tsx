import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import { Welcome } from '~/presentation/screens';
import useViewModel from '../../../presentation/screens/welcome/useWelcomeController';
import navigateScreenFactory from '../infra/navigateScreenHomeFactory';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const WelcomeFactory: React.FC<Props> = () => {
  useViewModel(navigateScreenFactory());
  return <Welcome />;
};

export default WelcomeFactory;
