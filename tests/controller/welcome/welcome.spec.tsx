import { renderHook } from '@testing-library/react-native';
import { Navigate } from '~/domain/useCases';
import useWelcomeController from '../../../src/presentation/screens/welcome/useWelcomeController';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Controller: Welcome', () => {
  test('should call navigateToHome of Navigate when pass 3 sec', () => {
    const navigateScreen = new NavigateSpy();
    renderHook(() => useWelcomeController(navigateScreen));

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);

    jest.advanceTimersByTime(3000);
    expect(navigateScreen.navigateToHomeCalled).toEqual(true);
  });
});

class NavigateSpy implements Navigate {
  navigateToHomeCalled = false;

  navigateToHome(): void {
    this.navigateToHomeCalled = true;
  }
}
