import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from '@testing-library/react-native';
import { Navigation, Routes } from '~/main/navigation';
import { NavigateScreenPurchase } from '~/data/useCases';
import { NavigateScreenSpy } from '../spies/navigateScreenSpy';

const Stack = createNativeStackNavigator<StackParams>();

describe('Data: NavigateScreenPurchase', () => {
  test('should call navigateToPurchase passing the params correctly to navigate of NavigateScreen', () => {
    const { sut, navigateScreen } = makeSut();

    sut.navigateToPurchase({ any: 'any_value' });

    expect(navigateScreen.routeName).toEqual(Routes.PURCHASE);
    expect(navigateScreen.params).toEqual({ any: 'any_value' });
  });
});

const makeSut = () => {
  let navigation: any;

  render(
    <Navigation
      setNavigationTop={(navigationRef) => (navigation = navigationRef)}
      initialRouteName={Routes.HOME}
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

  const navigateScreen = new NavigateScreenSpy(navigation);

  const sut = new NavigateScreenPurchase(navigateScreen);

  return { sut, navigateScreen };
};
