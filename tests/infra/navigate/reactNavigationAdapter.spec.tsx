import React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { NavigateScreen } from '~/data/navigate';
import { Navigation, Routes } from '~/main/navigation';

describe('Infra: ReactNavigationAdapter', () => {
  test('should call dispatch navigate action of React Navigation when call navigate', () => {
    let navigation = {} as NavigationContainerRef<any>;
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');

    render(
      <Navigation
        setNavigationTop={(navigationRef) => (navigation = navigationRef)}
        initialRouteName={Routes.WELCOME}
      />,
    );

    const sut = new ReactNavigationAdapter(navigation);

    sut.navigate(Routes.HOME, { any: 'any_params' });

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(Routes.HOME, {
      any: 'any_params',
    });
  });
});

class ReactNavigationAdapter implements NavigateScreen {
  constructor(readonly navigation: NavigationContainerRef<any>) {}
  navigate(routeName: string, params?: GenericObject | undefined): void {
    this.navigation.dispatch(CommonActions.navigate(routeName, params));
  }
}
