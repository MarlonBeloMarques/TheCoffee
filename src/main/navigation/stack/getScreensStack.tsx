import React from 'react';
import { Text, View } from 'react-native';
import {
  HomeFactory,
  PurchaseFactory,
  WelcomeFactory,
} from '../../factories/presentation';
import { Routes } from '../routes';
import { Stack } from './stackNavigation';

const getScreensStack = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name={Routes.WELCOME}>
        {(props) => <WelcomeFactory {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name={Routes.HOME}
        options={{
          animation: 'fade',
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
      <Stack.Screen name={Routes.PURCHASE}>
        {(props) => <PurchaseFactory {...props} />}
      </Stack.Screen>
    </>
  );
};

export default getScreensStack;
