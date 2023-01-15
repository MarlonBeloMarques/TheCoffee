import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeFactory } from '../factories/presentation';
import { Routes } from './routes';

const Stack = createNativeStackNavigator<StackParams>();

type StackNavigationParams = {
  initialRouteName: keyof StackParams;
};

const StackNavigation: React.FC<StackNavigationParams> = ({
  initialRouteName,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTransparent: false,
        headerBackTitleVisible: false,
        headerTintColor: '#000000',
        title: '',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name={Routes.HOME}>
        {(props) => <HomeFactory {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
