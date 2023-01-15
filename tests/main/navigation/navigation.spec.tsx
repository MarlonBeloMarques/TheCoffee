import React from 'react';
import { render } from '@testing-library/react-native';
import { CommonActions } from '@react-navigation/native';
import Main from '~/main';
import * as Navigator from '../../../src/main/navigation';

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
  const setTopLevelNavigatorSpy = jest.spyOn(Navigator, 'setTopLevelNavigator');
  const navigateSpy = jest.spyOn(CommonActions, 'navigate');
  const sut = render(<Main initialRouteName={initialRouteName} />);

  return { setTopLevelNavigatorSpy, navigateSpy, sut };
};
