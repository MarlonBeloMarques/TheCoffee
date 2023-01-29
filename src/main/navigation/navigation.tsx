import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { DefaultThemes } from '../helpers';
import { StackNavigation } from './stack';

type Props = {
  setNavigationTop: (navigatorRef: NavigationContainerRef<any>) => void;
  initialRouteName: keyof StackParams;
  screensStack: any;
};

const Navigation: React.FC<Props> = ({
  setNavigationTop,
  initialRouteName,
  screensStack,
}) => {
  return (
    <NavigationContainer ref={setNavigationTop} theme={DefaultThemes}>
      <StackNavigation
        initialRouteName={initialRouteName}
        screensStack={screensStack}
      />
    </NavigationContainer>
  );
};

export default Navigation;
