import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import {
  Navigation,
  Routes,
  navigator,
  setTopLevelNavigator,
} from '~/main/navigation';
import { ReactNavigationAdapter } from '~/infra';

describe('Infra: ReactNavigationAdapter', () => {
  test('should call dispatch navigate action of React Navigation when call navigate', async () => {
    const { sut, navigateSpy } = makeSut();
    sut.navigate(Routes.HOME, { any: 'any_params' });

    await waitFor(() => {
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
      initialRouteName={Routes.HOME}
    />,
  );

  const sut = new ReactNavigationAdapter();

  return { sut, navigateSpy, navigator };
};
