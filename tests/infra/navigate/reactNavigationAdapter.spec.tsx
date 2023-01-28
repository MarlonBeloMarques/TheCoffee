import React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { Navigation, Routes } from '~/main/navigation';
import { ReactNavigationAdapter } from '~/infra';

describe('Infra: ReactNavigationAdapter', () => {
  test('should call dispatch navigate action of React Navigation when call navigate', async () => {
    const { sut, navigateSpy } = makeSut();
    sut.navigate(Routes.HOME, { any: 'any_params' });

    await waitFor(() => {
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(Routes.HOME, {
        any: 'any_params',
      });
    });
  });
});

const makeSut = () => {
  let navigation = {} as NavigationContainerRef<any>;
  const navigateSpy = jest.spyOn(CommonActions, 'navigate');

  render(
    <Navigation
      setNavigationTop={(navigationRef) => (navigation = navigationRef)}
      initialRouteName={Routes.WELCOME}
    />,
  );

  const sut = new ReactNavigationAdapter(navigation);

  return { sut, navigateSpy };
};
