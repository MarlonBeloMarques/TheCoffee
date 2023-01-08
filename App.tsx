import React from 'react';
import { StatusBar, View } from 'react-native';
import { HomeFactory } from './src/main/factories/presentation';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ height: 57 }} />
      <HomeFactory />
    </View>
  );
};

export default App;
