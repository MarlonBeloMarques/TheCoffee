import React from 'react';
import Main from '~/main';
import { Routes, getScreensStack } from '~/main/navigation';

const App = () => {
  return (
    <Main initialRouteName={Routes.WELCOME} screensStack={getScreensStack()} />
  );
};

export default App;
