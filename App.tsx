import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Main from '~/main';
import { Routes, getScreensStack } from '~/main/navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Main initialRouteName={Routes.WELCOME} screensStack={getScreensStack()} />
  );
};

export default App;
