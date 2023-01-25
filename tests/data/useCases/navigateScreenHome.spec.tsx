import React from 'react';
import { render } from '@testing-library/react-native';
import { RouteParams } from '~/domain/models';
import { Navigate } from '~/domain/useCases';
import { Navigation, Routes } from '../../../src/main/navigation';

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

class NavigateScreenHome implements Navigate {
  constructor(readonly navigateScreen: NavigateScreen) {}

  navigateToHome(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.HOME, params);
  }
}

interface NavigateScreen {
  navigate(routeName: string, params?: GenericObject | undefined): void;
}

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
