import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigateScreenHome } from '~/data/useCases';
import { Navigation, Routes } from '../../../src/main/navigation';
import NavigateScreen from '../../../src/data/navigate/navigateScreen';

const Stack = createNativeStackNavigator<StackParams>();

describe('Data: NavigateScreenHome', () => {
  test('should call navigateToHome passing the params correctly to navigate of NavigateScreen', () => {
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
            <Stack.Screen name={Routes.HOME}>
              {() => <View></View>}
            </Stack.Screen>
          </>
        }
      />,
    );

    const navigateScreen = new NavigateScreenSpy(navigation);

    const sut = new NavigateScreenHome(navigateScreen);

    sut.navigateToHome({ any: 'any_value' });

    expect(navigateScreen.routeName).toEqual(Routes.HOME);
    expect(navigateScreen.params).toEqual({ any: 'any_value' });
  });
});

export class NavigateScreenSpy implements NavigateScreen {
  navigationRef: any;
  routeName!: string;
  params!: any;

  constructor(navigationRef: any) {
    this.navigationRef = navigationRef;
  }
  navigate(routeName: string, params?: GenericObject | undefined): void {
    this.routeName = routeName;
    this.params = params;
  }
}
