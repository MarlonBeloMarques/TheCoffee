import React from 'react';
import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Navigation,
  Routes,
  navigator,
  setTopLevelNavigator,
} from '~/main/navigation';
import { ReactNavigationAdapter } from '~/infra';

const Stack = createNativeStackNavigator<StackParams>();

describe('Infra: ReactNavigationAdapter', () => {
  test('should call dispatch navigate action of React Navigation when call navigate', async () => {
    const { sut, navigateSpy } = makeSut();

    await waitFor(() => {
      sut.navigate(Routes.HOME, { any: 'any_params' });
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith({
        name: Routes.HOME,
        params: {
          any: 'any_params',
        },
      });
    });
  });
});

const makeSut = () => {
  const navigateSpy = jest.spyOn(CommonActions, 'navigate');

  render(
    <Navigation
      setNavigationTop={(navigationRef) => setTopLevelNavigator(navigationRef)}
      initialRouteName={Routes.WELCOME}
      screensStack={
        <>
          <Stack.Screen name={Routes.WELCOME}>
            {() => <View></View>}
          </Stack.Screen>
          <Stack.Screen name={Routes.HOME}>{() => <View></View>}</Stack.Screen>
        </>
      }
    />,
  );

  const sut = new ReactNavigationAdapter();

  return { sut, navigateSpy, navigator };
};
