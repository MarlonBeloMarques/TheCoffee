import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigateScreenHome } from '~/data/useCases';
import { Navigation, Routes } from '../../../src/main/navigation';
import NavigateScreen from '../../../src/data/navigate/navigateScreen';

describe('Data: NavigateScreenHome', () => {
  test('should call navigateToHome passing the params correctly to navigate of NavigateScreen', () => {
    let navigation: any;

    render(
      <Navigation
        setNavigationTop={(navigationRef) => (navigation = navigationRef)}
        initialRouteName={Routes.HOME}
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
