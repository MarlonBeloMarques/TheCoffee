import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigateScreenHome } from '~/data/useCases';
import { Navigation, Routes } from '../../../src/main/navigation';
import { NavigateScreenSpy } from '../spies/navigateScreenSpy';

const Stack = createNativeStackNavigator<StackParams>();

describe('Data: NavigateScreenHome', () => {
  test('should call navigateToHome passing the params correctly to navigate of NavigateScreen', () => {
    const { sut, navigateScreen } = makeSut();
    sut.navigateToHome({ any: 'any_value' });

    expect(navigateScreen.routeName).toEqual(Routes.HOME);
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

  const sut = new NavigateScreenHome(navigateScreen);

  return { sut, navigateScreen };
};
