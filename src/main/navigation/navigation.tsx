import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
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
    <NavigationContainer
      ref={setNavigationTop}
      theme={{
        dark: false,
        colors: {
          primary: '#FFFFFF',
          background: '#FFFFFF',
          card: '#FFFFFF',
          text: '#000000',
          border: '#FFFFFF',
          notification: '#FFFFFF',
        },
      }}
    >
      <StackNavigation initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
};

export default Navigation;
