import { renderHook } from '@testing-library/react-native';
import { Navigate } from '~/domain/useCases';
import useViewModel from '../../../src/presentation/screens/welcome/viewModel';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('ViewModel: Welcome', () => {
  test('should call navigateToHome of Navigate when pass 5 sec', () => {
    const navigateScreen = new NavigateSpy();
    renderHook(() => useViewModel(navigateScreen));

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);

    jest.advanceTimersByTime(5000);
    expect(navigateScreen.navigateToHomeCalled).toEqual(true);
  });
});

class NavigateSpy implements Navigate {
  navigateToHomeCalled = false;

  navigateToHome(): void {
    this.navigateToHomeCalled = true;
  }
}
