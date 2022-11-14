import React from 'react';
import { StatusBar, Text, View } from 'react-native';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle={'dark-content'} />
      <Text>{'The Coffee'}</Text>
    </View>
  );
};

export default App;
