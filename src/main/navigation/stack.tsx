import React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '~/presentation/themes';
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
        headerTintColor: colors.text,
        title: '',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={Routes.HOME}
        options={{
          headerLeft: () => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                the coffee.
              </Text>
            </View>
          ),
        }}
      >
        {(props) => <HomeFactory {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
