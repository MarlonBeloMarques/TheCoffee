import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '~/main';
import * as Navigator from '../../../src/main/navigation';

const Stack = createNativeStackNavigator<StackParams>();

describe('Main: Navigation', () => {
  test('should pass initialRouteName via props correctly for Navigation', () => {
    const { Routes } = Navigator;
    const homeRoutes = Routes.HOME;
    const { sut } = makeSut(homeRoutes);

    const navigation = sut.UNSAFE_getByType(Navigator.Navigation);
    expect(navigation.props.initialRouteName).toEqual(homeRoutes);
  });
});

const makeSut = (initialRouteName = Routes.HOME) => {
  const { Routes } = Navigator;

  const setTopLevelNavigatorSpy = jest.spyOn(Navigator, 'setTopLevelNavigator');
  const navigateSpy = jest.spyOn(CommonActions, 'navigate');
  const sut = render(
    <Main
      initialRouteName={initialRouteName}
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

  return { setTopLevelNavigatorSpy, navigateSpy, sut };
};
