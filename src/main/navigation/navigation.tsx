import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { DefaultThemes } from '../helpers';
import StackNavigation from './stack';

type Props = {
  setNavigationTop: (navigatorRef: NavigationContainerRef<any>) => void;
  initialRouteName: keyof StackParams;
};

const Navigation: React.FC<Props> = ({
  setNavigationTop,
  initialRouteName,
}) => {
  return (
    <NavigationContainer ref={setNavigationTop} theme={DefaultThemes}>
      <StackNavigation initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
};

export default Navigation;
