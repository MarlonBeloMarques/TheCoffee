import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import { Welcome } from '~/presentation/screens';
import useViewModel from '../../../presentation/screens/welcome/viewModel';
import navigateScreenFactory from '../infra/navigateScreenFactory';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const WelcomeFactory: React.FC<Props> = () => {
  useViewModel(navigateScreenFactory());
  return <Welcome />;
};

export default WelcomeFactory;
