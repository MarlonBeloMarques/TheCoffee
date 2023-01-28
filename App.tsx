import React from 'react';
import Main from '~/main';
import { Routes } from '~/main/navigation';

const App = () => {
  return <Main initialRouteName={Routes.WELCOME} />;
};

export default App;
