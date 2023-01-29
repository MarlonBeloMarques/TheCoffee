import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '~/presentation/themes';

export const Stack = createNativeStackNavigator<StackParams>();

type StackNavigationParams = {
  initialRouteName: keyof StackParams;
  screensStack: any;
};

const StackNavigation: React.FC<StackNavigationParams> = ({
  initialRouteName,
  screensStack,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTransparent: false,
        headerBackTitleVisible: false,
        headerTintColor: colors.text,
        title: '',
        headerShadowVisible: false,
      }}
    >
      {screensStack}
    </Stack.Navigator>
  );
};

export default StackNavigation;
