import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainerRef } from '@react-navigation/native';
import { Navigation, setTopLevelNavigator } from './navigation';

type Props = {
  initialRouteName: keyof StackParams;
  screensStack: any;
};

const Main: React.FC<Props> = ({ initialRouteName, screensStack }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <WrapperScreen>
      <StatusBar barStyle={'dark-content'} />
      <Navigation
        setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
          setTopLevelNavigator(navigationRef)
        }
        initialRouteName={initialRouteName}
        screensStack={screensStack}
      />
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
`;

export default Main;
